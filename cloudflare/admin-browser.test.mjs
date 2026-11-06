import {test} from 'node:test';
import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import {readdirSync} from 'node:fs';
import {chromium} from 'playwright';
import bcrypt from 'bcryptjs';
const base=process.env.XPHARMA_TEST_URL||'http://127.0.0.1:8792';
const dir=process.env.XPHARMA_TEST_D1_DIR||'.wrangler/admin-qa/state/v3/d1/miniflare-D1DatabaseObject';
const db=new DatabaseSync(`${dir}/${readdirSync(dir).find(x=>x.endsWith('.sqlite')&&x!=='metadata.sqlite')}`);
test('admin pages support mobile, Arabic, English and dark mode',{timeout:90000},async()=>{
 const id=Date.now(),email=`admin-ui-${id}@example.test`,customer=`customer-ui-${id}@example.test`,password='TestPassword123!';
 const hash=await bcrypt.hash(password,10);let adminId,customerId,orderId,browser;
 try {
  adminId=Number(db.prepare('INSERT INTO admin(fname,lname,email,password) VALUES (?,?,?,?)').run('Test','Admin',email,hash).lastInsertRowid);
  customerId=Number(db.prepare('INSERT INTO customers(fname,lname,email,password,phone,city,address,is_verified) VALUES (?,?,?,?,?,?,?,1)').run('Test','Customer',customer,hash,'01000000000','Alexandria','Example Street').lastInsertRowid);
  orderId=Number(db.prepare("INSERT INTO reservations(customer_ssn,product_id,reservation_date,pickup_date,collection_end_date,price,status,quantity,payment_method,payment_status,payment_proof) VALUES (?,'XPH-101','2026-11-01','2026-11-02','2026-11-03',145,'active',1,'instapay','pending_verification','payment_proofs/test.png')").run(customerId).lastInsertRowid);
  browser=await chromium.launch({headless:true,executablePath:'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',args:['--no-sandbox']});
  for(const viewport of [{width:1365,height:850},{width:390,height:844}]){
   const context=await browser.newContext({viewport});const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
   await page.goto(base+'/admin/login',{waitUntil:'domcontentloaded'});await page.locator('#email').fill(email);await page.locator('#password').fill(password);await page.locator('button[type=submit]').click();await page.waitForURL('**/admin/dashboard');
   assert.match(await page.locator('body').innerText(),/Payments to review/);assert.match(await page.locator('body').innerText(),/Admin password/);
   await page.goto(base+`/admin/orders/${orderId}`,{waitUntil:'domcontentloaded'});assert.match(await page.locator('body').innerText(),/Mark payment verified/);assert.match(await page.locator('body').innerText(),/Example Street/);
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth <= innerWidth + 2),'admin order page should fit the viewport');
   if(viewport.width<500)await page.locator('.navbar-toggler').click();
   await page.locator('#languageToggle').click();assert.equal(await page.locator('html').getAttribute('dir'),'rtl');assert.match(await page.locator('body').innerText(),/تأكيد استلام الدفع/);
   await page.locator('#themeToggle').click();assert.equal(await page.locator('body').evaluate(e=>e.classList.contains('dark')),true);
   await page.goto(base+'/admin/products',{waitUntil:'domcontentloaded'});assert.match(await page.locator('body').innerText(),/إدارة المنتجات/);
   assert.ok(await page.getByRole('button',{name:'حذف المنتج'}).count()>=1);
   if(viewport.width<500)await page.locator('.navbar-toggler').click();
   await page.locator('#languageToggle').click();assert.equal(await page.locator('html').getAttribute('dir'),'ltr');assert.match(await page.locator('body').innerText(),/Manage products/);assert.ok(await page.getByRole('button',{name:'Delete product'}).count()>=1);
   assert.deepEqual(errors,[]);await context.close();
  }
 }finally{
  if(browser)await browser.close();
  if(orderId)db.prepare('DELETE FROM reservations WHERE reservation_id=?').run(orderId);
  if(customerId)db.prepare('DELETE FROM customers WHERE SSN=?').run(customerId);
  if(adminId)db.prepare('DELETE FROM admin WHERE admin_ssn=?').run(adminId);
 }
});
