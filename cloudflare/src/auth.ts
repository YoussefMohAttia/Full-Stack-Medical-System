import express from 'express';
import { env } from 'cloudflare:workers';
import { render } from './views';
import { checkCsrf, redirectWith, resetIdentity, setSession, type Session } from './session';
import { hashPassword, verifyPassword, verificationCode, hashCode } from './security';
import { sendEmail } from './email';

const settings = env as unknown as Record<string, string> & { DB: D1Database };
const db = settings.DB;
export const routes = express.Router();
export async function page(req: express.Request, res: express.Response, name: string, data: Record<string, unknown> = {}) {
  const session = res.locals.session as Session;
  const messages = session.flash || [];
  delete session.flash;
  let accountName = '';
  if (session.customer || session.admin) {
    const account = session.customer
      ? await db.prepare('SELECT fname,lname FROM customers WHERE SSN=?').bind(session.customer).first<{fname:string;lname:string}>()
      : await db.prepare('SELECT fname,lname FROM admin WHERE admin_ssn=?').bind(session.admin).first<{fname:string;lname:string}>();
    accountName = account ? [account.fname, account.lname].filter(Boolean).join(' ').trim() : '';
  }
  await setSession(res, session);
  const assistantVisible=['/','/about','/customer/search'].includes(req.path)||/^\/customer\/products\/[^/]+\/?$/.test(req.path);
  res.send(render(name, { ...data, assistant_visible:assistantVisible, account_name:accountName, csrf_token: session.csrf, session:{customer_ssn:session.customer,admin:session.admin}, request:{ path:req.path, args:req.query, form:req.body || {} }, get_flashed_messages:() => messages }));
}
const form = express.urlencoded({extended:false, limit:'20kb'});
routes.use(form);
async function limit(req: express.Request, res: express.Response, next: express.NextFunction) {
  try {
    const limits: Record<string, number> = {'/customer/register':8,'/customer/login':15,'/admin/login':10,'/admin/account':10,'/customer/verify':20,'/customer/verify/resend':5};
    const isDiscountCheck = /^\/customer\/reserve\/[^/]+\/discount$/.test(req.path);
    const max = isDiscountCheck ? 30 : limits[req.path]; if (req.method !== 'POST' || !max) {next();return;}
    const key = `${isDiscountCheck ? '/customer/discount' : req.path}:${req.headers['cf-connecting-ip'] || req.ip || 'unknown'}`;
    const now = Math.floor(Date.now()/1000);
    const row = await db.prepare(`INSERT INTO security_attempts (bucket,window_start,attempts) VALUES (?, ?, 1) ON CONFLICT(bucket) DO UPDATE SET attempts=CASE WHEN window_start < ? THEN 1 ELSE attempts+1 END, window_start=CASE WHEN window_start < ? THEN ? ELSE window_start END RETURNING attempts`).bind(key,now,now-900,now-900,now).first<{attempts:number}>();
    if (row && row.attempts > max) {res.status(429).send('Too many attempts. Please try again later.');return;}
    next();
  } catch (error) {next(error);}
}
routes.use(limit);
async function sendCode(customer: {SSN:number;email:string}) {
  const code = verificationCode();
  const codeHash = await hashCode(`${customer.SSN}:${code}`, settings.SESSION_SECRET);
  await db.batch([
    db.prepare("UPDATE verification_codes SET used_at=CURRENT_TIMESTAMP WHERE customer_ssn=? AND used_at IS NULL").bind(customer.SSN),
    db.prepare("INSERT INTO verification_codes(customer_ssn,code_hash,channel,expires_at) VALUES (?,?,'email',?)").bind(customer.SSN,codeHash,String(Date.now()+600000))
  ]);
  return sendEmail(customer.email,'Verify your XPharma account',`Your XPharma verification code is ${code}. It expires in 10 minutes.`);
}
routes.get('/customer/register', (req,res,next) => {page(req,res,'customer/register.html').catch(next);});
routes.post('/customer/register', checkCsrf, async (req,res,next) => {
  try {
    const {fname,lname,password,phone,city,address} = req.body;
    const email = String(req.body.email || '').trim().toLowerCase();
    if (![fname,lname,city,address].every((v:unknown) => typeof v === 'string' && v.trim().length > 0) || String(fname).length>100 || String(lname).length>100 || String(city).length>100 || String(address).length>500 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length>254 || !/^\d{11}$/.test(String(phone)) || typeof password !== 'string' || password.length<8 || Buffer.byteLength(password)>72 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/\d/.test(password)) {await redirectWith(res,'/customer/register','Enter valid account details, an 11-digit phone number, and a password with uppercase, lowercase and a number.','danger');return;}
    if (await db.prepare('SELECT SSN FROM customers WHERE LOWER(email)=?').bind(email).first()) {await redirectWith(res,'/customer/register','Email already registered','danger');return;}
    const hash = await hashPassword(password);
    const result = await db.prepare("INSERT INTO customers (fname,lname,email,password,phone,city,address,is_verified,verification_channel) VALUES (?,?,?,?,?,?,?,0,'email')").bind(fname.trim(),lname.trim(),email,hash,phone,city.trim(),address.trim()).run();
    const customer = {SSN:Number(result.meta.last_row_id),email};
    const sent = await sendCode(customer);
    const session = res.locals.session as Session; resetIdentity(session); session.pending=customer.SSN; session.email=email;
    await redirectWith(res,'/customer/verify',sent?'A verification code was sent. Enter it to activate your account.':'Account created, but email could not be sent. Contact XPharma and resend the code.',sent?'success':'warning');
  } catch (error) {next(error);}
});
routes.get('/customer/verify', (req,res,next) => {const s=res.locals.session as Session;if(!s.pending){res.redirect('/customer/login');return;}page(req,res,'customer/verify.html',{email:s.email}).catch(next);});
routes.post('/customer/verify', checkCsrf, async (req,res,next) => {
  try {
    const s = res.locals.session as Session; if(!s.pending){res.redirect('/customer/login');return;}
    const code = String(req.body.code || '').trim();
    const record = await db.prepare("SELECT * FROM verification_codes WHERE customer_ssn=? AND channel='email' AND used_at IS NULL ORDER BY verification_id DESC LIMIT 1").bind(s.pending).first<{verification_id:number;code_hash:string;expires_at:string;attempts:number}>();
    if (!record || Number(record.expires_at)<Date.now() || record.attempts>=5) {await redirectWith(res,'/customer/verify','This code expired. Request a new one.','danger');return;}
    if (!/^\d{6}$/.test(code) || await hashCode(`${s.pending}:${code}`, settings.SESSION_SECRET) !== record.code_hash) {await db.prepare('UPDATE verification_codes SET attempts=attempts+1 WHERE verification_id=?').bind(record.verification_id).run(); await redirectWith(res,'/customer/verify','Incorrect verification code.','danger');return;}
    await db.batch([db.prepare('UPDATE customers SET is_verified=1 WHERE SSN=?').bind(s.pending),db.prepare('UPDATE verification_codes SET used_at=CURRENT_TIMESTAMP WHERE verification_id=?').bind(record.verification_id)]);
    resetIdentity(s); await redirectWith(res,'/customer/login','Account verified. You can now sign in.');
  } catch(error){next(error);}
});
routes.post('/customer/verify/resend', checkCsrf, async (req,res,next) => {
  try {const s=res.locals.session as Session;if(!s.pending || !s.email){res.redirect('/customer/login');return;} const sent=await sendCode({SSN:s.pending,email:s.email});await redirectWith(res,'/customer/verify',sent?'A new verification code was sent.':'Email could not be sent. Please contact XPharma.',sent?'success':'danger');} catch(error){next(error);}
});
for (const role of ['customer','admin'] as const) {
  const path = `/${role}/login`;
  routes.get(path, (req,res,next) => {page(req,res,`${role}/login.html`).catch(next);});
  routes.post(path,checkCsrf,async(req,res,next) => {
    try {
      const email=String(req.body.email||'').trim().toLowerCase(), password=String(req.body.password||'');
      const table=role==='customer'?'customers':'admin';
      const user=await db.prepare(`SELECT * FROM ${table} WHERE LOWER(email)=?`).bind(email).first<{SSN:number;admin_ssn:number;password:unknown;is_verified:number;email:string}>();
      if (!user || !(await verifyPassword(password,user.password))) {await redirectWith(res,path,'Invalid email or password','danger');return;}
      const s=res.locals.session as Session;resetIdentity(s);
      if (role==='customer' && !user.is_verified) {s.pending=user.SSN;s.email=user.email;const sent=await sendCode({SSN:user.SSN,email:user.email});await redirectWith(res,'/customer/verify',sent?'A new verification code was sent.':'Email could not be sent. Please contact XPharma.',sent?'success':'danger');return;}
      if(role==='customer') s.customer=user.SSN; else s.admin=user.admin_ssn;
      await redirectWith(res,`/${role}/dashboard`,'Login successful');
    } catch(error){next(error);}
  });
  routes.get(`/${role}/logout`,async(_req,res,next)=>{try{resetIdentity(res.locals.session as Session);await redirectWith(res,'/');}catch(error){next(error);}});
}
