import { test } from 'node:test';
import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import { readdirSync } from 'node:fs';
import { createServer } from 'node:http';
import bcrypt from 'bcryptjs';

const base = process.env.XPHARMA_TEST_URL || 'http://127.0.0.1:8790';
const dbDir = process.env.XPHARMA_TEST_D1_DIR || '.wrangler/state/v3/d1/miniflare-D1DatabaseObject';
const dbFile = readdirSync(dbDir).find(x => x.endsWith('.sqlite') && x !== 'metadata.sqlite');
const db = new DatabaseSync(`${dbDir}/${dbFile}`);
class Client {
 cookie=''; csrf='';
 async go(path, options={}) {
  const headers = new Headers(options.headers || {}); if(this.cookie)headers.set('cookie',this.cookie);
  const response=await fetch(base+path,{...options,headers,redirect:'manual'});
  for(const c of response.headers.getSetCookie()) if(c.startsWith('xp_session=')) this.cookie=c.split(';')[0];
  const content=await response.text(); const match=content.match(/name="csrf_token" value="([^"]+)"/); if(match)this.csrf=match[1];
  return {response,content};
 }
 async post(path,data) {const form=new URLSearchParams({...data,csrf_token:this.csrf});return this.go(path,{method:'POST',headers:{'content-type':'application/x-www-form-urlencoded'},body:form});}
}
test('end-to-end customer and administrator flows', {timeout:120000}, async()=>{
 const id=Date.now().toString(), email=`e2e${id}@example.test`, adminEmail=`admin${id}@example.test`, password='TestPass123';
 const user=new Client(), admin=new Client();
 const messages=[];
 const mail=createServer((req,res)=>{let body='';req.on('data',chunk=>body+=chunk);req.on('end',()=>{messages.push(JSON.parse(body));res.writeHead(200,{'content-type':'application/json'});res.end('{}');});});
 await new Promise(resolve=>mail.listen(8788,'127.0.0.1',resolve));
 try {
  for(const url of ['/','/about','/customer/search','/customer/products/XPH-101']) {const {response,content}=await user.go(url);assert.equal(response.status,200,url);assert.match(content,/<html/);}
  assert.equal((await user.go('/customer/dashboard')).response.status,302);
  await user.go('/customer/register');
  let r=await user.post('/customer/register',{fname:'Test',lname:'Customer',email,password,phone:'01007718313',city:'Alexandria',address:'Example address'});assert.equal(r.response.headers.get('location'),'/customer/verify');
  let account=db.prepare('SELECT SSN,is_verified FROM customers WHERE email=?').get(email);assert.ok(account);assert.equal(account.is_verified,0);
  assert.equal(messages[0]?.to[0],email);
  const code=messages[0]?.text.match(/\b\d{6}\b/)?.[0];
  assert.ok(code);
  const unverified=new Client();await unverified.go('/customer/login');let attempt=await unverified.post('/customer/login',{email,password});assert.equal(attempt.response.headers.get('location'),'/customer/verify');
  // The new sign-in attempt sent a new code and invalidated the first one.
  const newestCode=messages.at(-1)?.text.match(/\b\d{6}\b/)?.[0];assert.ok(newestCode);
  await user.go('/customer/verify');r=await user.post('/customer/verify',{code:'abcdef'});assert.equal(r.response.headers.get('location'),'/customer/verify');
  await user.go('/customer/verify');r=await user.post('/customer/verify',{code:newestCode});assert.equal(r.response.headers.get('location'),'/customer/login');
  await user.go('/customer/login');r=await user.post('/customer/login',{email,password});assert.equal(r.response.headers.get('location'),'/customer/dashboard');
  r=await user.go('/customer/dashboard');assert.equal(r.response.status,200);
  for(const route of ['/admin','/admin/login','/admin/dashboard','/admin/reports','/admin/customers']) assert.equal((await user.go(route)).response.status,404,route);
  r=await user.go('/customer/reserve/XPH-101');assert.equal(r.response.status,200);assert.match(r.content,/Blemease/);
  for(const [code,percent,total] of [['XPH-25-B18ED432',25,217.5],['XPH-30-43D7DF91',30,203],['XPH-35-EFF19E41',35,188.5],['XPH-40-0909066B',40,174]]) {
   const discount=await user.post('/customer/reserve/XPH-101/discount',{discount_code:code,quantity:'2'});
   assert.equal(discount.response.status,200);const data=JSON.parse(discount.content);assert.equal(data.valid,true);assert.equal(data.percent,percent);assert.equal(data.total,total);
  }
  const invalidDiscount=await user.post('/customer/reserve/XPH-101/discount',{discount_code:'INVALID-CODE',quantity:'2'});
  assert.equal(JSON.parse(invalidDiscount.content).valid,false);
  const date=new Date(Date.now()+86400000).toISOString().slice(0,10);
  const invalid=await user.go('/customer/reserve/XPH-101',{method:'POST',headers:{'content-type':'application/x-www-form-urlencoded'},body:new URLSearchParams({pickup_date:date,quantity:'2',payment_method:'cash',csrf_token:'wrong'})});assert.equal(invalid.response.status,403);
  r=await user.post('/customer/reserve/XPH-101',{pickup_date:date,quantity:'2',payment_method:'cash'});assert.equal(r.response.headers.get('location'),'/customer/dashboard');
  assert.equal(messages.at(-1)?.to[0],'Xpharma25@gmail.com');assert.match(messages.at(-1)?.subject,/reservation/i);
  let reservation=db.prepare('SELECT * FROM reservations WHERE customer_ssn=? ORDER BY reservation_id DESC').get(account.SSN);assert.equal(reservation.quantity,2);assert.equal(reservation.price,290);
  await user.go('/customer/reserve/XPH-101');
  const form=new FormData();form.set('csrf_token',user.csrf);form.set('pickup_date',date);form.set('quantity','1');form.set('payment_method','instapay');form.set('payment_proof',new Blob([Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/aYkAAAAASUVORK5CYII=','base64')],{type:'image/png'}),'proof.png');
  r=await user.go('/customer/reserve/XPH-101',{method:'POST',body:form});assert.equal(r.response.headers.get('location'),'/customer/dashboard');
  const proof=db.prepare('SELECT * FROM reservations WHERE customer_ssn=? ORDER BY reservation_id DESC').get(account.SSN);assert.equal(proof.payment_method,'instapay');assert.ok(proof.payment_proof);
  assert.equal((await user.go(`/admin/reservations/${proof.reservation_id}/payment-proof`)).response.status,404);
  const hash=await bcrypt.hash(password,10);db.prepare('INSERT INTO admin(fname,lname,email,password) VALUES (?,?,?,?)').run('Test','Admin',adminEmail,hash);
  await admin.go('/admin/login');r=await admin.post('/admin/login',{email:adminEmail,password});assert.equal(r.response.headers.get('location'),'/admin/dashboard');
  assert.equal((await admin.go('/admin/dashboard')).response.status,200);
  const report=await admin.go(`/admin/reports?start_date=${date}&end_date=${date}`);assert.equal(report.response.status,200);assert.match(report.content,/View and manage order/);
  const detail=await admin.go(`/admin/orders/${proof.reservation_id}`);assert.equal(detail.response.status,200);assert.match(detail.content,/Download proof/);
  assert.match(detail.content,/text-bg-warning text-dark/);
  assert.match((await admin.go('/admin/reports?status=pending_verification')).content,new RegExp(`/admin/orders/${proof.reservation_id}`));
  assert.doesNotMatch((await admin.go('/admin/reports?status=active')).content,new RegExp(`/admin/orders/${proof.reservation_id}`));
  const downloaded=await admin.go(`/admin/reservations/${proof.reservation_id}/payment-proof`);assert.equal(downloaded.response.status,200);assert.equal(downloaded.response.headers.get('content-type'),'image/png');
  const badAdminCsrf=await admin.go(`/admin/orders/${proof.reservation_id}/payment`,{method:'POST',headers:{'content-type':'application/x-www-form-urlencoded'},body:new URLSearchParams({action:'verify',csrf_token:'invalid'})});assert.equal(badAdminCsrf.response.status,403);assert.equal(db.prepare('SELECT payment_status FROM reservations WHERE reservation_id=?').get(proof.reservation_id).payment_status,'pending_verification');
  const pendingView=await user.go('/customer/dashboard');assert.match(pendingView.content,/text-bg-warning text-dark/);assert.match(pendingView.content,/Pending verification/);
  r=await user.post(`/admin/orders/${proof.reservation_id}/payment`,{action:'verify'});assert.equal(r.response.status,404);assert.equal(db.prepare('SELECT payment_status FROM reservations WHERE reservation_id=?').get(proof.reservation_id).payment_status,'pending_verification');
  await admin.go(`/admin/orders/${proof.reservation_id}`);r=await admin.post(`/admin/orders/${proof.reservation_id}/status`,{action:'complete'});assert.equal(r.response.headers.get('location'),`/admin/orders/${proof.reservation_id}`);assert.equal(db.prepare('SELECT status FROM reservations WHERE reservation_id=?').get(proof.reservation_id).status,'active');
  await admin.go(`/admin/orders/${proof.reservation_id}`);await admin.post(`/admin/orders/${proof.reservation_id}/payment`,{action:'reject',note:'Test review'});assert.equal(db.prepare('SELECT payment_status FROM reservations WHERE reservation_id=?').get(proof.reservation_id).payment_status,'rejected');
  const rejectedPage=await user.go('/customer/dashboard');assert.match(rejectedPage.content,/Upload a new payment screenshot/);
  const replacement=new FormData();replacement.set('csrf_token',user.csrf);replacement.set('payment_proof',new Blob([Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/aYkAAAAASUVORK5CYII=','base64')],{type:'image/png'}),'new-proof.png');
  r=await user.go(`/customer/reservation/${proof.reservation_id}/payment-proof`,{method:'POST',body:replacement});assert.equal(r.response.headers.get('location'),'/customer/dashboard');assert.equal(db.prepare('SELECT payment_status FROM reservations WHERE reservation_id=?').get(proof.reservation_id).payment_status,'pending_verification');
  const previous=db.prepare('SELECT proof_id FROM reservation_proof_history WHERE reservation_id=?').get(proof.reservation_id);assert.ok(previous);
  assert.equal((await user.go(`/admin/reservations/${proof.reservation_id}/previous-proof/${previous.proof_id}`)).response.status,404);
  assert.equal((await admin.go(`/admin/reservations/${proof.reservation_id}/previous-proof/${previous.proof_id}`)).response.status,200);
  await admin.go(`/admin/orders/${proof.reservation_id}`);await admin.post(`/admin/orders/${proof.reservation_id}/payment`,{action:'reject'});assert.equal(db.prepare('SELECT payment_status FROM reservations WHERE reservation_id=?').get(proof.reservation_id).payment_status,'rejected');
  await admin.go(`/admin/orders/${proof.reservation_id}`);await admin.post(`/admin/orders/${proof.reservation_id}/payment`,{action:'reopen'});assert.equal(db.prepare('SELECT payment_status FROM reservations WHERE reservation_id=?').get(proof.reservation_id).payment_status,'pending_verification');
  await admin.go(`/admin/orders/${proof.reservation_id}`);await admin.post(`/admin/orders/${proof.reservation_id}/payment`,{action:'verify'});assert.equal(db.prepare('SELECT payment_status FROM reservations WHERE reservation_id=?').get(proof.reservation_id).payment_status,'verified');
  assert.match((await admin.go('/admin/reports?status=active')).content,new RegExp(`/admin/orders/${proof.reservation_id}`));
  assert.ok(db.prepare('SELECT COUNT(*) AS n FROM admin_activity WHERE reservation_id=?').get(proof.reservation_id).n>=3);
  const customerView=await user.go('/customer/dashboard');assert.match(customerView.content,/Verified/);assert.match(customerView.content,/text-bg-success/);
  await admin.go(`/admin/orders/${proof.reservation_id}`);await admin.post(`/admin/orders/${proof.reservation_id}/status`,{action:'complete'});assert.equal(db.prepare('SELECT status FROM reservations WHERE reservation_id=?').get(proof.reservation_id).status,'completed');
  const customersPage=await admin.go('/admin/customers');assert.equal(customersPage.response.status,200);assert.match(customersPage.content,/Example address/);assert.equal((await user.go('/admin/customers')).response.status,404);
  const addPage=await admin.go('/admin/products/add');assert.equal(addPage.response.status,200);assert.match(addPage.content,/Product image/);const newProduct=new FormData();for(const [key,value] of Object.entries({product_id:`TEST-${id}`,product_name:'Test Product',product_name_ar:'منتج تجريبي',pack_size:'50',unit_price:'25',description_en:'A custom product description',description_ar:'وصف منتج تجريبي',purpose_en:'Daily skin care',purpose_ar:'للعناية اليومية',csrf_token:admin.csrf}))newProduct.set(key,value);
  newProduct.set('product_image',new Blob([Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/aYkAAAAASUVORK5CYII=','base64')],{type:'image/png'}),'product.png');
  r=await admin.go('/admin/products/add',{method:'POST',body:newProduct});assert.equal(r.response.headers.get('location'),'/admin/products');assert.ok(db.prepare('SELECT product_id FROM products WHERE product_id=?').get(`TEST-${id}`));
  const productDetail=await user.go(`/customer/products/TEST-${id}`);assert.match(productDetail.content,/A custom product description/);assert.match(productDetail.content,/وصف منتج تجريبي/);assert.match(productDetail.content,new RegExp(`/media/products/TEST-${id}`));assert.equal((await user.go(`/media/products/TEST-${id}`)).response.status,200);
  const productReservation=await user.go(`/customer/reserve/TEST-${id}`);assert.equal(productReservation.response.status,200);assert.match(productReservation.content,new RegExp(`/media/products/TEST-${id}`));
  const editPage=await admin.go(`/admin/products/TEST-${id}/edit`);assert.equal(editPage.response.status,200);assert.match(editPage.content,/A custom product description/);await admin.post(`/admin/products/TEST-${id}/edit`,{product_name:'Updated Test Product',product_name_ar:'منتج محدث',pack_size:'50',unit_price:'30',status:'active',description_en:'Updated product description',description_ar:'وصف محدث',purpose_en:'Updated purpose'});
  for(const path of ['/', '/customer/search', `/customer/products/TEST-${id}`, `/customer/reserve/TEST-${id}`]){const updatedPage=await user.go(path);assert.equal(updatedPage.response.status,200,path);assert.match(updatedPage.content,/30\.00/,path);}
  assert.match((await user.go(`/customer/products/TEST-${id}`)).content,/Updated product description/);assert.match((await user.go('/customer/search')).content,/Updated purpose/);
  assert.equal(db.prepare('SELECT price FROM reservations WHERE reservation_id=?').get(proof.reservation_id).price,145);
  await user.go(`/customer/reserve/TEST-${id}`);await user.post(`/customer/reserve/TEST-${id}`,{pickup_date:date,quantity:'1',payment_method:'cash'});const productOrder=db.prepare('SELECT * FROM reservations WHERE customer_ssn=? AND product_id=?').get(account.SSN,`TEST-${id}`);assert.ok(productOrder);
  const unauthorizedDelete=await user.post(`/admin/products/TEST-${id}/delete`,{});assert.equal(unauthorizedDelete.response.status,404);
  await admin.go('/admin/products');const badDelete=await admin.go(`/admin/products/TEST-${id}/delete`,{method:'POST',headers:{'content-type':'application/x-www-form-urlencoded'},body:new URLSearchParams({csrf_token:'wrong'})});assert.equal(badDelete.response.status,403);
  r=await admin.post(`/admin/products/TEST-${id}/delete`,{});assert.equal(r.response.headers.get('location'),'/admin/products');assert.equal(db.prepare('SELECT status FROM products WHERE product_id=?').get(`TEST-${id}`).status,'deleted');assert.equal((await user.go(`/customer/products/TEST-${id}`)).response.status,404);assert.match((await user.go('/customer/dashboard')).content,/Updated Test Product/);assert.equal((await admin.go(`/admin/orders/${productOrder.reservation_id}`)).response.status,200);
  assert.equal(db.prepare("SELECT COUNT(*) n FROM admin_activity WHERE product_id=? AND action='product_deleted'").get(`TEST-${id}`).n,1);
  await admin.go('/admin/products');r=await admin.post(`/admin/products/TEST-${id}/restore`,{});assert.equal(r.response.headers.get('location'),'/admin/products');assert.equal(db.prepare('SELECT status FROM products WHERE product_id=?').get(`TEST-${id}`).status,'inactive');assert.equal((await user.go(`/customer/products/TEST-${id}`)).response.status,404);
  assert.equal(db.prepare("SELECT COUNT(*) n FROM admin_activity WHERE product_id=? AND action='product_restored'").get(`TEST-${id}`).n,1);
  await admin.go(`/admin/products/TEST-${id}/edit`);await admin.post(`/admin/products/TEST-${id}/edit`,{product_name:'Updated Test Product',product_name_ar:'منتج محدث',pack_size:'50',unit_price:'30',status:'inactive'});assert.equal(db.prepare('SELECT status FROM products WHERE product_id=?').get(`TEST-${id}`).status,'inactive');assert.doesNotMatch((await user.go('/customer/search')).content,/Updated Test Product/);assert.equal((await user.go(`/media/products/TEST-${id}`)).response.status,404);
  await user.go('/customer/dashboard');r=await user.post(`/customer/reservation/cancel/${reservation.reservation_id}`,{});assert.equal(r.response.headers.get('location'),'/customer/dashboard');
  assert.equal(db.prepare('SELECT status FROM reservations WHERE reservation_id=?').get(reservation.reservation_id).status,'cancelled');
  assert.match(messages.at(-1)?.subject,/cancelled/i);
  await user.go('/customer/reserve/XPH-101');await user.post('/customer/reserve/XPH-101',{pickup_date:date,quantity:'1',payment_method:'cash'});
  const cancelOrder=db.prepare('SELECT * FROM reservations WHERE customer_ssn=? ORDER BY reservation_id DESC').get(account.SSN);
  await admin.go(`/admin/orders/${cancelOrder.reservation_id}`);await admin.post(`/admin/orders/${cancelOrder.reservation_id}/status`,{action:'cancel',note:'Test cancellation'});
  assert.equal(db.prepare('SELECT status FROM reservations WHERE reservation_id=?').get(cancelOrder.reservation_id).status,'cancelled');assert.match(messages.at(-1)?.subject,/cancelled/i);
  const secondAdmin=new Client();await secondAdmin.go('/admin/login');await secondAdmin.post('/admin/login',{email:adminEmail,password});
  await admin.go('/admin/account');r=await admin.post('/admin/account',{current_password:password,new_password:'NewTestPass123!',confirm_password:'NewTestPass123!'});assert.equal(r.response.headers.get('location'),'/admin/login');
  assert.equal((await secondAdmin.go('/admin/dashboard')).response.status,302);
  await admin.go('/admin/login');r=await admin.post('/admin/login',{email:adminEmail,password:'NewTestPass123!'});assert.equal(r.response.headers.get('location'),'/admin/dashboard');
  const previousCookie=admin.cookie;await admin.go('/admin/logout');admin.cookie=previousCookie;assert.equal((await admin.go('/admin/dashboard')).response.status,302);
 } finally {
  const account=db.prepare('SELECT SSN FROM customers WHERE email=?').get(email);
  if(account){db.prepare('DELETE FROM admin_activity WHERE reservation_id IN (SELECT reservation_id FROM reservations WHERE customer_ssn=?)').run(account.SSN);db.prepare('DELETE FROM reservation_proof_history WHERE reservation_id IN (SELECT reservation_id FROM reservations WHERE customer_ssn=?)').run(account.SSN);db.prepare('DELETE FROM reservations WHERE customer_ssn=?').run(account.SSN);db.prepare('DELETE FROM verification_codes WHERE customer_ssn=?').run(account.SSN);db.prepare('DELETE FROM customers WHERE SSN=?').run(account.SSN);}
  db.prepare('DELETE FROM admin_activity WHERE product_id=?').run(`TEST-${id}`);
  db.prepare('DELETE FROM admin_activity WHERE admin_ssn IN (SELECT admin_ssn FROM admin WHERE email=?)').run(adminEmail);
  db.prepare('DELETE FROM admin WHERE email=?').run(adminEmail);
  db.prepare('DELETE FROM products WHERE product_id=?').run(`TEST-${id}`);
  await new Promise(resolve=>mail.close(resolve));
 }
});
