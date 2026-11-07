import express from 'express';
import multer from 'multer';
import { env } from 'cloudflare:workers';
import { page } from './auth';
import { checkCsrf, redirectWith, type Session } from './session';
import { notify } from './email';
import { productInfo } from './views';

const settings = env as unknown as Record<string,string> & {DB:D1Database; PROOFS:R2Bucket};
const db=settings.DB;
const router=express.Router();
const upload=multer({storage:multer.memoryStorage(), limits:{fileSize:5*1024*1024,files:1,fields:10}});
function guard(role:'admin'|'customer') {return (_req:express.Request,res:express.Response,next:express.NextFunction)=>{if(!(res.locals.session as Session)[role]) {res.redirect(`/${role}/login`);return;} next();};}
function todayEgypt() {const p=new Intl.DateTimeFormat('en-CA',{timeZone:'Africa/Cairo',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());const get=(type:string)=>p.find(v=>v.type===type)?.value;return `${get('year')}-${get('month')}-${get('day')}`;}
function validDate(d:string) {if(!/^\d{4}-\d{2}-\d{2}$/.test(d)) return false;const x=new Date(`${d}T00:00:00Z`);return !Number.isNaN(x.getTime()) && x.toISOString().slice(0,10)===d;}
function proofType(bytes:Buffer):string|null {if(bytes.length>=8 && bytes.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10]))) return 'image/png';if(bytes.length>=3 && bytes[0]===255 && bytes[1]===216 && bytes[2]===255) return 'image/jpeg';if(bytes.length>=12 && bytes.toString('ascii',0,4)==='RIFF' && bytes.toString('ascii',8,12)==='WEBP') return 'image/webp';return null;}
function discountCode(value: unknown) {return String(value||'').trim().toUpperCase();}
async function findDiscount(code:string) {return code?db.prepare('SELECT code,percent FROM discount_codes WHERE code=? AND is_active=1').bind(code).first<{code:string;percent:number}>():null;}
router.get('/customer/dashboard',guard('customer'),async(req,res,next)=>{try{const rows=await db.prepare('SELECT r.*, p.product_name, p.product_name_ar FROM reservations r JOIN products p ON p.product_id=r.product_id WHERE r.customer_ssn=? ORDER BY r.reservation_id DESC').bind((res.locals.session as Session).customer).all();await page(req,res,'customer/dashboard.html',{reservations:rows.results});}catch(e){next(e);}});
router.get('/customer/reserve/:id',guard('customer'),async(req,res,next)=>{try{const product=await db.prepare("SELECT * FROM products WHERE product_id=? AND status='active'").bind(req.params.id).first<{product_id:string}>();if(!product){res.status(404).send('Product not found');return;}await page(req,res,'customer/reserve.html',{product,info:productInfo(product),product_id:req.params.id,today:todayEgypt(),instapay_account:settings.INSTAPAY_ACCOUNT||'mohamed.araby71@instapay'});}catch(e){next(e);}});
router.post('/customer/reserve/:id/discount',guard('customer'),checkCsrf,async(req,res,next)=>{try{
 const id=String(req.params.id),code=discountCode(req.body.discount_code);if(code.length>40||(!code&&String(req.body.discount_code||'').trim())){res.status(400).json({valid:false});return;}
 const product=await db.prepare("SELECT unit_price FROM products WHERE product_id=? AND status='active'").bind(id).first<{unit_price:number}>();if(!product){res.status(404).json({valid:false});return;}
 const quantity=Number(req.body.quantity);if(!Number.isSafeInteger(quantity)||quantity<1||quantity>100000){res.status(400).json({valid:false});return;}
 const discount=await findDiscount(code);const subtotal=Math.round(Number(product.unit_price)*100)*quantity/100;
 if(!discount){res.json({valid:false,subtotal});return;}
 const amount=Math.round(subtotal*Number(discount.percent))/100;res.json({valid:true,percent:Number(discount.percent),subtotal,discount_amount:amount,total:Math.round((subtotal-amount)*100)/100});
}catch(e){next(e);}});
router.post('/customer/reserve/:id',guard('customer'),upload.single('payment_proof'),checkCsrf,async(req,res,next)=>{
 let stored='';
 try{
  const session=res.locals.session as Session, id=String(req.params.id), date=String(req.body.pickup_date||''), quantity=Number(req.body.quantity), method=String(req.body.payment_method||''), code=discountCode(req.body.discount_code);
  if(!validDate(date)||date<todayEgypt()||!Number.isSafeInteger(quantity)||quantity<1||quantity>100000||!['cash','instapay'].includes(method)){await redirectWith(res,`/customer/reserve/${encodeURIComponent(id)}`,'Choose a valid collection date, quantity and payment option.','danger');return;}
  const product=await db.prepare("SELECT * FROM products WHERE product_id=? AND status='active'").bind(id).first<{product_name:string;unit_price:number}>();
  if(!product){res.status(404).send('Product not found');return;}
  if(code.length>40){await redirectWith(res,`/customer/reserve/${encodeURIComponent(id)}`,'Enter a valid discount code.','danger');return;}
  const discount=await findDiscount(code);if(code&&!discount){await redirectWith(res,`/customer/reserve/${encodeURIComponent(id)}`,'This discount code is not valid.','danger');return;}
  if(method==='instapay'){
    const type=req.file && proofType(req.file.buffer);if(!req.file||!type){await redirectWith(res,`/customer/reserve/${encodeURIComponent(id)}`,'Upload a valid PNG, JPEG or WEBP payment screenshot.','danger');return;}
    stored=`payment_proofs/${crypto.randomUUID()}`;
    await settings.PROOFS.put(stored,req.file.buffer,{httpMetadata:{contentType:type}});
  }
  const end=new Date(`${date}T00:00:00Z`);end.setUTCDate(end.getUTCDate()+1);
  const subtotal=Math.round(Number(product.unit_price)*100)*quantity/100,percent=Number(discount?.percent||0),discountAmount=Math.round(subtotal*percent)/100,total=Math.round((subtotal-discountAmount)*100)/100;
  const result=await db.prepare("INSERT INTO reservations(customer_ssn,product_id,reservation_date,pickup_date,collection_end_date,price,status,quantity,payment_method,payment_proof,payment_status,subtotal,discount_code,discount_percent,discount_amount) VALUES (?,?,CURRENT_TIMESTAMP,?,?,?,'active',?,?,?,?,?,?,?,?)").bind(session.customer,id,date,end.toISOString().slice(0,10),total,quantity,method,stored||null,method==='cash'?'cash_on_collection':'pending_verification',subtotal,discount?.code||null,percent,discountAmount).run();
  stored='';
  const account=await db.prepare('SELECT fname,lname,email,phone,city,address FROM customers WHERE SSN=?').bind(session.customer).first<Record<string,string>>();
  const sent=await notify('New XPharma reservation',`Reservation: ${result.meta.last_row_id}\nCustomer: ${account?.fname} ${account?.lname}\nEmail: ${account?.email}\nPhone: ${account?.phone}\nCity: ${account?.city}\nAddress: ${account?.address}\nProduct: ${product.product_name} (${id})\nQuantity: ${quantity}\nCollection: ${date}\nPayment: ${method}\nSubtotal: EGP ${subtotal.toFixed(2)}\nDiscount: ${percent}%${discount?.code?` (${discount.code})`:''}\nTotal: EGP ${total.toFixed(2)}`);
  await redirectWith(res,'/customer/dashboard',sent?'Reservation submitted successfully.':'Your reservation was saved, but the notification could not be sent. Please contact XPharma.',sent?'success':'warning');
 }catch(e){if(stored) await settings.PROOFS.delete(stored).catch(()=>{});next(e);}
});
router.post('/customer/reservation/cancel/:id',guard('customer'),checkCsrf,async(req,res,next)=>{try{
 const session=res.locals.session as Session;
 const reservation=await db.prepare("SELECT r.*,p.product_name,c.fname,c.lname,c.email,c.phone FROM reservations r JOIN products p ON p.product_id=r.product_id JOIN customers c ON c.SSN=r.customer_ssn WHERE r.reservation_id=? AND r.customer_ssn=? AND r.status='active'").bind(req.params.id,session.customer).first<Record<string,string>>();
 if(!reservation){await redirectWith(res,'/customer/dashboard','Reservation could not be cancelled.','danger');return;}
 const updated=await db.prepare("UPDATE reservations SET status='cancelled',cancellation_date=CURRENT_TIMESTAMP WHERE reservation_id=? AND customer_ssn=? AND status='active'").bind(req.params.id,session.customer).run();
 if(!updated.meta.changes){await redirectWith(res,'/customer/dashboard','Reservation could not be cancelled.','danger');return;}
 const sent=await notify('XPharma reservation cancelled',`Reservation: ${reservation.reservation_id}\nCustomer: ${reservation.fname} ${reservation.lname}\nEmail: ${reservation.email}\nPhone: ${reservation.phone}\nProduct: ${reservation.product_name}\nQuantity: ${reservation.quantity}\nCollection: ${reservation.pickup_date}\nPayment: ${reservation.payment_method}`);
 await redirectWith(res,'/customer/dashboard',sent?'Reservation cancelled successfully':'Your cancellation was saved, but the notification could not be sent. Please contact XPharma.',sent?'success':'warning');
 }catch(e){next(e);}});
router.post('/customer/reservation/:id/payment-proof',guard('customer'),upload.single('payment_proof'),checkCsrf,async(req,res,next)=>{
 let stored='';
 try{
  const session=res.locals.session as Session,id=String(req.params.id),type=req.file&&proofType(req.file.buffer);
  if(!/^\d{1,15}$/.test(id)||!Number.isSafeInteger(Number(id))||Number(id)<1||!req.file||!type){await redirectWith(res,'/customer/dashboard','Upload a valid PNG, JPEG or WEBP payment screenshot.','danger');return;}
  const order=await db.prepare("SELECT r.*,p.product_name,c.fname,c.lname,c.email FROM reservations r JOIN products p ON p.product_id=r.product_id JOIN customers c ON c.SSN=r.customer_ssn WHERE r.reservation_id=? AND r.customer_ssn=? AND r.status='active' AND r.payment_method='instapay' AND r.payment_status='rejected' AND r.payment_proof IS NOT NULL").bind(id,session.customer).first<Record<string,string>>();
  if(!order){await redirectWith(res,'/customer/dashboard','The payment proof cannot be replaced for this order.','danger');return;}
  stored=`payment_proofs/${crypto.randomUUID()}`;
  await settings.PROOFS.put(stored,req.file.buffer,{httpMetadata:{contentType:type}});
  const result=await db.batch([
   db.prepare("INSERT INTO reservation_proof_history(reservation_id,payment_proof) SELECT reservation_id,payment_proof FROM reservations WHERE reservation_id=? AND customer_ssn=? AND status='active' AND payment_method='instapay' AND payment_status='rejected' AND payment_proof=?").bind(id,session.customer,order.payment_proof),
   db.prepare("UPDATE reservations SET payment_proof=?,payment_status='pending_verification' WHERE reservation_id=? AND customer_ssn=? AND status='active' AND payment_method='instapay' AND payment_status='rejected' AND payment_proof=?").bind(stored,id,session.customer,order.payment_proof)
  ]);
  if(!result[1].meta.changes){await settings.PROOFS.delete(stored);stored='';await redirectWith(res,'/customer/dashboard','The payment proof cannot be replaced for this order.','danger');return;}
  stored='';
  const sent=await notify('Updated XPharma payment proof',`Reservation: ${id}\nCustomer: ${order.fname} ${order.lname}\nEmail: ${order.email}\nProduct: ${order.product_name}\nA replacement InstaPay screenshot is waiting for review.`);
  await redirectWith(res,'/customer/dashboard',sent?'Payment proof submitted for review.':'Your proof was saved, but the notification could not be sent. Please contact XPharma.',sent?'success':'warning');
 }catch(e){if(stored)await settings.PROOFS.delete(stored).catch(()=>{});next(e);}
});
export default router;
