import express from 'express';
import { env } from 'cloudflare:workers';
import { page } from './auth';
import { checkCsrf, redirectWith, resetIdentity, type Session } from './session';
import { notify } from './email';
import { hashPassword, verifyPassword } from './security';
import multer from 'multer';
const db=(env as unknown as {DB:D1Database}).DB, router=express.Router();
const images=(env as unknown as {PROOFS:R2Bucket}).PROOFS;
const productUpload=multer({storage:multer.memoryStorage(),limits:{fileSize:5*1024*1024,files:1,fields:20}});
function imageType(bytes:Buffer):string|null {if(bytes.length>=8&&bytes.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])))return 'image/png';if(bytes.length>=3&&bytes[0]===255&&bytes[1]===216&&bytes[2]===255)return 'image/jpeg';if(bytes.length>=12&&bytes.toString('ascii',0,4)==='RIFF'&&bytes.toString('ascii',8,12)==='WEBP')return 'image/webp';return null;}
function productContent(body:Record<string,unknown>){return {description_en:String(body.description_en||'').trim(),description_ar:String(body.description_ar||'').trim(),purpose_en:String(body.purpose_en||'').trim(),purpose_ar:String(body.purpose_ar||'').trim()};}
function validContent(c:ReturnType<typeof productContent>){return c.description_en.length<=4000&&c.description_ar.length<=4000&&c.purpose_en.length<=120&&c.purpose_ar.length<=120;}
function guard(_req:express.Request,res:express.Response,next:express.NextFunction){if(!(res.locals.session as Session).admin){res.redirect('/admin/login');return;}next();}
router.use('/admin',guard);
const validDate=(d:string)=>/^\d{4}-\d{2}-\d{2}$/.test(d)&&!Number.isNaN(new Date(`${d}T00:00:00Z`).getTime())&&new Date(`${d}T00:00:00Z`).toISOString().slice(0,10)===d;
const todayEgypt=()=>{const p=new Intl.DateTimeFormat('en-CA',{timeZone:'Africa/Cairo',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());const get=(x:string)=>p.find(v=>v.type===x)?.value;return `${get('year')}-${get('month')}-${get('day')}`;};
const idParam=(req:express.Request)=>String(req.params.id);
const positiveId=(id:string)=>/^\d{1,15}$/.test(id)&&Number.isSafeInteger(Number(id))&&Number(id)>0;
const orderUrl=(id:string)=>`/admin/orders/${encodeURIComponent(id)}`;
router.get('/admin/account',(req,res,next)=>{page(req,res,'admin/account.html').catch(next);});
router.post('/admin/account',checkCsrf,async(req,res,next)=>{try{
 const session=res.locals.session as Session,id=session.admin;
 const current=String(req.body.current_password||''),password=String(req.body.new_password||''),confirm=String(req.body.confirm_password||'');
 if(password!==confirm||password.length<12||Buffer.byteLength(password,'utf8')>72||!/[A-Z]/.test(password)||!/[a-z]/.test(password)||!/[0-9]/.test(password)||!/[\W_]/.test(password)){await redirectWith(res,'/admin/account','Choose a matching password with at least 12 characters, upper and lowercase letters, a number and a symbol.','danger');return;}
 const admin=await db.prepare('SELECT password FROM admin WHERE admin_ssn=?').bind(id).first<{password:string}>();
 if(!admin||!(await verifyPassword(current,admin.password))){await redirectWith(res,'/admin/account','Current password is incorrect.','danger');return;}
 const hash=await hashPassword(password);
 const result=await db.batch([
  db.prepare('UPDATE admin SET password=? WHERE admin_ssn=? AND password=?').bind(hash,id,admin.password),
  db.prepare("INSERT INTO admin_activity(admin_ssn,action) SELECT ?,'password_changed' WHERE changes()=1").bind(id),
  db.prepare("DELETE FROM web_sessions WHERE json_extract(data,'$.admin')=? AND changes()=1").bind(id)
 ]);
 if(!result[0].meta.changes){await redirectWith(res,'/admin/account','Password could not be updated. Please try again.','danger');return;}
 resetIdentity(session);await redirectWith(res,'/admin/login','Password updated. Please sign in again.');
}catch(e){next(e);}});
router.get('/admin/dashboard',async(req,res,next)=>{try{
 const stats=await db.prepare(`SELECT (SELECT COUNT(*) FROM products) total_products,(SELECT COUNT(*) FROM products WHERE status='active') active_products,(SELECT COUNT(*) FROM reservations WHERE status='active' AND (payment_method!='instapay' OR payment_status='verified')) active_reservations,(SELECT COUNT(*) FROM reservations WHERE status='active' AND payment_method='instapay' AND payment_status='pending_verification') pending_payments,(SELECT COUNT(*) FROM reservations WHERE status='active' AND pickup_date=?) due_today`).bind(todayEgypt()).first();
 const recent=await db.prepare(`SELECT r.reservation_id,r.pickup_date,r.status,r.payment_method,r.payment_status,r.price,p.product_name,p.product_name_ar,c.fname,c.lname FROM reservations r JOIN products p ON p.product_id=r.product_id JOIN customers c ON c.SSN=r.customer_ssn ORDER BY r.reservation_id DESC LIMIT 6`).all();
 await page(req,res,'admin/dashboard.html',{stats,recent:recent.results});
}catch(e){next(e);}});
router.get('/admin/reports',async(req,res,next)=>{try{
 const start=String(req.query.start_date||''),end=String(req.query.end_date||''),term=String(req.query.q||'').trim().slice(0,100),status=String(req.query.status||''),payment=String(req.query.payment||'');
 const n=Number(req.query.page||1),currentPage=Number.isSafeInteger(n)&&n>0&&n<=10000?n:1;
 if((start&&!validDate(start))||(end&&!validDate(end))||(start&&end&&start>end)||!['','active','pending_verification','rejected','completed','cancelled'].includes(status)||!['','pending_verification','verified','rejected','cash_on_collection','cash_paid'].includes(payment)){await redirectWith(res,'/admin/reports','Choose valid filters.','danger');return;}
 const where:string[]=['1=1'],params:(string|number)[]=[];
 if(start){where.push('r.pickup_date>=?');params.push(start);}if(end){where.push('r.pickup_date<=?');params.push(end);}
 if(status==='active')where.push("r.status='active' AND (r.payment_method!='instapay' OR r.payment_status='verified')");
 else if(status==='pending_verification'||status==='rejected'){where.push("r.status='active' AND r.payment_method='instapay' AND r.payment_status=?");params.push(status);}
 else if(status){where.push('r.status=?');params.push(status);}if(payment){where.push('r.payment_status=?');params.push(payment);}
 if(term){where.push('(p.product_id LIKE ? OR p.product_name LIKE ? OR c.email LIKE ? OR c.phone LIKE ? OR c.fname LIKE ? OR c.lname LIKE ? OR CAST(r.reservation_id AS TEXT)=?)');for(let i=0;i<6;i++)params.push(`%${term}%`);params.push(term);}
 const base=`FROM reservations r JOIN products p ON p.product_id=r.product_id JOIN customers c ON c.SSN=r.customer_ssn WHERE ${where.join(' AND ')}`;
 const total=await db.prepare(`SELECT COUNT(*) count ${base}`).bind(...params).first<{count:number}>();
 const rows=await db.prepare(`SELECT r.*,p.product_name,p.product_name_ar,c.fname,c.lname,c.email,c.phone ${base} ORDER BY r.reservation_id DESC LIMIT 25 OFFSET ?`).bind(...params,(currentPage-1)*25).all();
 const f=new URLSearchParams();if(start)f.set('start_date',start);if(end)f.set('end_date',end);if(term)f.set('q',term);if(status)f.set('status',status);if(payment)f.set('payment',payment);
 const link=(n:number)=>{const p=new URLSearchParams(f);p.set('page',String(n));return '/admin/reports?'+p.toString();};
 await page(req,res,'admin/reports.html',{reservations:rows.results,filters:{start,end,term,status,payment},total:total?.count||0,current_page:currentPage,previous_page:currentPage>1?link(currentPage-1):null,next_page:currentPage*25<(total?.count||0)?link(currentPage+1):null});
}catch(e){next(e);}});
router.get('/admin/orders/:id',async(req,res,next)=>{try{const id=idParam(req);if(!positiveId(id)){res.status(404).send('Not found');return;}
 const order=await db.prepare('SELECT r.*,p.product_name,p.product_name_ar,p.pack_size,c.fname,c.lname,c.email,c.phone,c.city,c.address FROM reservations r JOIN products p ON p.product_id=r.product_id JOIN customers c ON c.SSN=r.customer_ssn WHERE r.reservation_id=?').bind(id).first();if(!order){res.status(404).send('Not found');return;}
 const activity=await db.prepare('SELECT a.*,u.fname,u.lname FROM admin_activity a JOIN admin u ON u.admin_ssn=a.admin_ssn WHERE a.reservation_id=? ORDER BY a.activity_id DESC LIMIT 50').bind(id).all();
 const proofs=await db.prepare('SELECT proof_id,replaced_at FROM reservation_proof_history WHERE reservation_id=? ORDER BY proof_id DESC').bind(id).all();
 await page(req,res,'admin/order_detail.html',{order,activity:activity.results,previous_proofs:proofs.results});
}catch(e){next(e);}});
router.post('/admin/orders/:id/payment',checkCsrf,async(req,res,next)=>{try{
 const id=idParam(req),action=String(req.body.action||''),note=String(req.body.note||'').trim();if(!positiveId(id)||!['verify','reject','reopen'].includes(action)||note.length>500){res.status(400).send('Invalid request');return;}
 const old=action==='reopen'?'rejected':'pending_verification',updated=action==='verify'?'verified':action==='reject'?'rejected':'pending_verification';
 const result=await db.batch([db.prepare("UPDATE reservations SET payment_status=? WHERE reservation_id=? AND status='active' AND payment_method='instapay' AND payment_status=? AND payment_proof IS NOT NULL").bind(updated,id,old),db.prepare("INSERT INTO admin_activity(admin_ssn,reservation_id,action,previous_value,new_value,note) SELECT ?,?,'payment_review',?,?,? WHERE changes()=1").bind((res.locals.session as Session).admin,id,old,updated,note||null)]);
 if(!result[0].meta.changes){await redirectWith(res,orderUrl(id),'Payment could not be updated. Refresh and check the order status.','danger');return;}
 await redirectWith(res,orderUrl(id),action==='verify'?'Payment marked as verified.':action==='reject'?'Payment marked as rejected.':'Payment returned to review.');
}catch(e){next(e);}});
router.post('/admin/orders/:id/status',checkCsrf,async(req,res,next)=>{try{
 const id=idParam(req),action=String(req.body.action||''),note=String(req.body.note||'').trim();if(!positiveId(id)||!['complete','cancel'].includes(action)||note.length>500){res.status(400).send('Invalid request');return;}
 const order=await db.prepare('SELECT r.*,p.product_name,c.fname,c.lname,c.email,c.phone FROM reservations r JOIN products p ON p.product_id=r.product_id JOIN customers c ON c.SSN=r.customer_ssn WHERE r.reservation_id=?').bind(id).first<Record<string,string>>();if(!order){res.status(404).send('Not found');return;}
 if(action==='complete'&&order.payment_method==='instapay'&&order.payment_status!=='verified'){await redirectWith(res,orderUrl(id),'Verify the InstaPay payment before completing this order.','danger');return;}
 const sql=action==='complete'?"UPDATE reservations SET status='completed',completed_at=CURRENT_TIMESTAMP,payment_status=CASE WHEN payment_method='cash' THEN 'cash_paid' ELSE payment_status END WHERE reservation_id=? AND status='active' AND (payment_method='cash' OR (payment_method='instapay' AND payment_status='verified'))":"UPDATE reservations SET status='cancelled',cancellation_date=CURRENT_TIMESTAMP WHERE reservation_id=? AND status='active'";
 const target=action==='complete'?'completed':'cancelled';
 const result=await db.batch([db.prepare(sql).bind(id),db.prepare("INSERT INTO admin_activity(admin_ssn,reservation_id,action,previous_value,new_value,note) SELECT ?,?,'order_status','active',?,? WHERE changes()=1").bind((res.locals.session as Session).admin,id,target,note||null)]);
 if(!result[0].meta.changes){await redirectWith(res,orderUrl(id),'Order could not be updated. Refresh and check its status.','danger');return;}
 if(action==='cancel'){const sent=await notify('XPharma reservation cancelled',`Reservation: ${id}\nCustomer: ${order.fname} ${order.lname}\nEmail: ${order.email}\nPhone: ${order.phone}\nProduct: ${order.product_name}\nQuantity: ${order.quantity}\nCollection: ${order.pickup_date}\nPayment: ${order.payment_method}\nCancelled by an administrator.`);await redirectWith(res,orderUrl(id),sent?'Order cancelled. No refund is automatic.':'Order cancelled, but the cancellation email could not be sent. No refund is automatic.',sent?'success':'warning');return;}
 await redirectWith(res,orderUrl(id),'Order marked as completed.');
}catch(e){next(e);}});
router.get('/admin/products',async(req,res,next)=>{try{const products=await db.prepare("SELECT product_id,product_name,product_name_ar,pack_size,unit_price,status FROM products WHERE status!='deleted' ORDER BY product_name,product_id").all();const deleted=await db.prepare("SELECT product_id,product_name,product_name_ar FROM products WHERE status='deleted' ORDER BY product_name,product_id").all();await page(req,res,'admin/products.html',{products:products.results,deleted_products:deleted.results});}catch(e){next(e);}});
router.get('/admin/customers',async(req,res,next)=>{try{
 const term=String(req.query.q||'').trim().slice(0,100),state=String(req.query.verified||'');
 const requested=Number(req.query.page||1),current=Number.isSafeInteger(requested)&&requested>0&&requested<=10000?requested:1;
 if(!['','yes','no'].includes(state)){await redirectWith(res,'/admin/customers','Choose valid filters.','danger');return;}
 const where:string[]=['1=1'],params:(string|number)[]=[];
 if(term){where.push('(fname LIKE ? OR lname LIKE ? OR email LIKE ? OR phone LIKE ? OR city LIKE ?)');for(let i=0;i<5;i++)params.push(`%${term}%`);}
 if(state){where.push('is_verified=?');params.push(state==='yes'?1:0);}
 const clause=where.join(' AND '),total=await db.prepare(`SELECT COUNT(*) count FROM customers WHERE ${clause}`).bind(...params).first<{count:number}>();
 const rows=await db.prepare(`SELECT SSN,fname,lname,email,phone,city,address,is_verified,(SELECT COUNT(*) FROM reservations r WHERE r.customer_ssn=customers.SSN) order_count FROM customers WHERE ${clause} ORDER BY SSN DESC LIMIT 25 OFFSET ?`).bind(...params,(current-1)*25).all();
 const query=new URLSearchParams();if(term)query.set('q',term);if(state)query.set('verified',state);
 const link=(n:number)=>{const p=new URLSearchParams(query);p.set('page',String(n));return '/admin/customers?'+p.toString();};
 await page(req,res,'admin/customers.html',{customers:rows.results,filters:{term,state},total:total?.count||0,current_page:current,previous_page:current>1?link(current-1):null,next_page:current*25<(total?.count||0)?link(current+1):null});
}catch(e){next(e);}});
router.get('/admin/products/add',(req,res,next)=>{page(req,res,'admin/add_product.html').catch(next);});
router.post('/admin/products/add',productUpload.single('product_image'),checkCsrf,async(req,res,next)=>{let stored='';try{
 const id=String(req.body.product_id||'').trim(),name=String(req.body.product_name||'').trim(),nameAr=String(req.body.product_name_ar||'').trim(),size=Number(req.body.pack_size),price=Number(req.body.unit_price);
 const content=productContent(req.body),type=req.file?imageType(req.file.buffer):null;
 if(!/^[\w-]{1,50}$/.test(id)||!name||name.length>200||nameAr.length>200||!Number.isInteger(size)||size<1||size>100000||!Number.isFinite(price)||price<0||price>1000000||!validContent(content)||(req.file&&!type)){await redirectWith(res,'/admin/products/add','Enter valid product details and a PNG, JPEG or WEBP image.','danger');return;}
 if(req.file&&type){stored=`product_images/${crypto.randomUUID()}`;await images.put(stored,req.file.buffer,{httpMetadata:{contentType:type}});}
 const inserted=await db.batch([db.prepare("INSERT OR IGNORE INTO products(product_id,product_name,product_name_ar,pack_size,status,office_id,unit_price,description_en,description_ar,purpose_en,purpose_ar,image_key) VALUES (?,?,?,?,'active',1,?,?,?,?,?,?)").bind(id,name,nameAr||null,size,price,content.description_en||null,content.description_ar||null,content.purpose_en||null,content.purpose_ar||null,stored||null),db.prepare("INSERT INTO admin_activity(admin_ssn,product_id,action,new_value) SELECT ?,?,'product_created',? WHERE changes()=1").bind((res.locals.session as Session).admin,id,JSON.stringify({name,nameAr,size,price,status:'active',...content,has_image:!!stored}))]);
 if(!inserted[0].meta.changes){if(stored)await images.delete(stored);stored='';await redirectWith(res,'/admin/products/add','A product with that reference already exists.','danger');return;}
 stored='';
 await redirectWith(res,'/admin/products','Product added successfully');
}catch(e){if(stored)await images.delete(stored).catch(()=>{});next(e);}});
router.get('/admin/products/:id/edit',async(req,res,next)=>{try{const product=await db.prepare("SELECT * FROM products WHERE product_id=? AND status!='deleted'").bind(idParam(req)).first();if(!product){res.status(404).send('Not found');return;}await page(req,res,'admin/product_edit.html',{product});}catch(e){next(e);}});
router.post('/admin/products/:id/edit',productUpload.single('product_image'),checkCsrf,async(req,res,next)=>{let stored='';try{
 const id=idParam(req),name=String(req.body.product_name||'').trim(),nameAr=String(req.body.product_name_ar||'').trim(),size=Number(req.body.pack_size),price=Number(req.body.unit_price),status=String(req.body.status||'');
 const content=productContent(req.body),type=req.file?imageType(req.file.buffer):null;
 if(!name||name.length>200||nameAr.length>200||!Number.isInteger(size)||size<1||size>100000||!Number.isFinite(price)||price<0||price>1000000||!['active','inactive'].includes(status)||!validContent(content)||(req.file&&!type)){await redirectWith(res,`/admin/products/${encodeURIComponent(id)}/edit`,'Enter valid product details and a PNG, JPEG or WEBP image.','danger');return;}
 const old=await db.prepare("SELECT product_name,product_name_ar,pack_size,unit_price,status,description_en,description_ar,purpose_en,purpose_ar,image_key FROM products WHERE product_id=? AND status!='deleted'").bind(id).first<{image_key:string|null}>();if(!old){res.status(404).send('Not found');return;}
 if(req.file&&type){stored=`product_images/${crypto.randomUUID()}`;await images.put(stored,req.file.buffer,{httpMetadata:{contentType:type}});}
 const updated=await db.batch([db.prepare("UPDATE products SET product_name=?,product_name_ar=?,pack_size=?,unit_price=?,status=?,description_en=?,description_ar=?,purpose_en=?,purpose_ar=?,image_key=? WHERE product_id=? AND status!='deleted'").bind(name,nameAr||null,size,price,status,content.description_en||null,content.description_ar||null,content.purpose_en||null,content.purpose_ar||null,stored||old.image_key||null,id),db.prepare("INSERT INTO admin_activity(admin_ssn,product_id,action,previous_value,new_value) SELECT ?,?,'product_updated',?,? WHERE changes()=1").bind((res.locals.session as Session).admin,id,JSON.stringify(old),JSON.stringify({product_name:name,product_name_ar:nameAr||null,pack_size:size,unit_price:price,status,...content,has_image:!!(stored||old.image_key)}))]);
 if(!updated[0].meta.changes){if(stored)await images.delete(stored);stored='';await redirectWith(res,'/admin/products','Product could not be updated.','danger');return;}
 if(stored&&old.image_key?.startsWith('product_images/'))await images.delete(old.image_key).catch(()=>{});
 stored='';await redirectWith(res,'/admin/products','Product updated successfully.');
}catch(e){if(stored)await images.delete(stored).catch(()=>{});next(e);}});
router.post('/admin/products/:id/delete',checkCsrf,async(req,res,next)=>{try{
 const id=idParam(req);if(!/^[\w-]{1,50}$/.test(id)){res.status(400).send('Invalid request');return;}
 const result=await db.batch([db.prepare("UPDATE products SET status='deleted' WHERE product_id=? AND status IN ('active','inactive')").bind(id),db.prepare("INSERT INTO admin_activity(admin_ssn,product_id,action,new_value) SELECT ?,?,'product_deleted','deleted' WHERE changes()=1").bind((res.locals.session as Session).admin,id)]);
 await redirectWith(res,'/admin/products',result[0].meta.changes?'Product deleted. Existing orders are preserved.':'Product could not be deleted.',result[0].meta.changes?'success':'danger');
}catch(e){next(e);}});
router.post('/admin/products/:id/restore',checkCsrf,async(req,res,next)=>{try{
 const id=idParam(req);if(!/^[\w-]{1,50}$/.test(id)){res.status(400).send('Invalid request');return;}
 const result=await db.batch([db.prepare("UPDATE products SET status='inactive' WHERE product_id=? AND status='deleted'").bind(id),db.prepare("INSERT INTO admin_activity(admin_ssn,product_id,action,previous_value,new_value) SELECT ?,?,'product_restored','deleted','inactive' WHERE changes()=1").bind((res.locals.session as Session).admin,id)]);
 await redirectWith(res,'/admin/products',result[0].meta.changes?'Product restored as inactive.':'Product could not be restored.',result[0].meta.changes?'success':'danger');
}catch(e){next(e);}});
router.get('/admin/reservations/:id/payment-proof',async(req,res,next)=>{try{const row=await db.prepare('SELECT payment_proof FROM reservations WHERE reservation_id=?').bind(idParam(req)).first<{payment_proof:string}>();if(!row?.payment_proof?.startsWith('payment_proofs/')){res.status(404).send('Not found');return;}const proof=await (env as unknown as {PROOFS:R2Bucket}).PROOFS.get(row.payment_proof);if(!proof){res.status(404).send('Not found');return;}res.setHeader('Content-Type',proof.httpMetadata?.contentType||'application/octet-stream');res.setHeader('Content-Disposition','attachment; filename="payment-proof"');res.setHeader('Cache-Control','no-store');res.send(Buffer.from(await proof.arrayBuffer()));}catch(e){next(e);}});
router.get('/admin/reservations/:id/previous-proof/:proofId',async(req,res,next)=>{try{const id=idParam(req),proofId=String(req.params.proofId);if(!positiveId(id)||!positiveId(proofId)){res.status(404).send('Not found');return;}const row=await db.prepare('SELECT payment_proof FROM reservation_proof_history WHERE reservation_id=? AND proof_id=?').bind(id,proofId).first<{payment_proof:string}>();if(!row?.payment_proof?.startsWith('payment_proofs/')){res.status(404).send('Not found');return;}const proof=await (env as unknown as {PROOFS:R2Bucket}).PROOFS.get(row.payment_proof);if(!proof){res.status(404).send('Not found');return;}res.setHeader('Content-Type',proof.httpMetadata?.contentType||'application/octet-stream');res.setHeader('Content-Disposition','attachment; filename="previous-payment-proof"');res.setHeader('Cache-Control','no-store');res.send(Buffer.from(await proof.arrayBuffer()));}catch(e){next(e);}});
export default router;
