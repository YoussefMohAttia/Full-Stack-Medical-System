import {test} from 'node:test';
import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import {readdirSync,readFileSync} from 'node:fs';
import {chromium} from 'playwright';
import bcrypt from 'bcryptjs';
const base=process.env.XPHARMA_TEST_URL||'http://127.0.0.1:8792';
const dir=process.env.XPHARMA_TEST_D1_DIR||'.wrangler/translation-qa/state/v3/d1/miniflare-D1DatabaseObject';
const db=new DatabaseSync(`${dir}/${readdirSync(dir).find(x=>x.endsWith('.sqlite')&&x!=='metadata.sqlite')}`);
test('reservation page translates, updates totals and preserves the InstaPay address',{timeout:90000},async()=>{
 const email=`translate-${Date.now()}@example.test`,password='TestPassword123!',hash=await bcrypt.hash(password,10);let customerId,browser;
 try {
  customerId=Number(db.prepare('INSERT INTO customers(fname,lname,email,password,phone,city,address,is_verified) VALUES (?,?,?,?,?,?,?,1)').run('Test','Customer',email,hash,'01000000000','Alexandria','Example Street').lastInsertRowid);
  browser=await chromium.launch({headless:true,executablePath:'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',args:['--no-sandbox']});
  for(const viewport of [{width:1365,height:850},{width:390,height:844}]){
   const context=await browser.newContext({viewport});const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
   await page.goto(base+'/customer/login',{waitUntil:'domcontentloaded'});await page.locator('#email').fill(email);await page.locator('#password').fill(password);await page.locator('button[type=submit]').click();await page.waitForURL('**/customer/dashboard');
   await page.goto(base+'/customer/reserve/XPH-312',{waitUntil:'domcontentloaded'});
   assert.equal((await page.locator('label[for=cash] strong').innerText()).trim(),'Cash on collection');
   if(viewport.width<500)await page.locator('.navbar-toggler').click();await page.locator('#languageToggle').click();
   assert.equal(await page.locator('html').getAttribute('lang'),'ar');
   assert.match(await page.locator('h1').innerText(),/اطلب برونكس جل للمساج/);
   assert.match(await page.title(),/اطلب برونكس جل للمساج/);
   assert.equal((await page.locator('label[for=quantity]').innerText()).trim(),'الكمية');
   assert.equal((await page.locator('label[for=cash] strong').innerText()).trim(),'الدفع عند الاستلام');
   assert.match(await page.locator('.safety-note').innerText(),/تراجع إكس فارما/);
   await page.locator('#quantity').fill('2');
   assert.match((await page.locator('#orderTotalAmount').innerText()).replace(/[\u200e\u200f]/g,''),/١٩٠/);
   for(const handle of await page.locator('[data-preserve-ltr]').allTextContents())assert.equal(handle.trim(),'mohamed.araby71@instapay');
   await page.locator('#instapay').check();await page.locator('#instapayModal.show').waitFor();
   const qr=page.locator('#instapayModal .instapay-qr');assert.equal(await qr.getAttribute('src'),'/static/images/payments/instapay-mohamed-araby.jpeg');
   const qrResponse=await page.request.get(base+await qr.getAttribute('src'));assert.equal(qrResponse.status(),200);assert.deepEqual(await qrResponse.body(),readFileSync('Info/Pictures/Instapay.jpeg'));
   assert.match(await page.locator('#instapayModal h2').innerText(),/أكمل التحويل/);
   assert.match((await page.locator('#modalTotalAmount').innerText()).replace(/[\u200e\u200f]/g,''),/١٩٠/);
   assert.equal(await page.locator('#instapayModal .btn-close').getAttribute('aria-label'),'إغلاق');
   await page.locator('#instapayModal .btn-close').click();await page.locator('#instapayModal').waitFor({state:'hidden'});
   if(viewport.width<500 && !(await page.locator('#nav').evaluate(el=>el.classList.contains('show'))))await page.locator('.navbar-toggler').click();
   await page.locator('#languageToggle').click();assert.equal(await page.locator('html').getAttribute('lang'),'en');
   assert.equal((await page.locator('label[for=cash] strong').innerText()).trim(),'Cash on collection');
   assert.match(await page.title(),/Order Bronex Massage Gel/);
   assert.equal((await page.locator('#orderTotalAmount').innerText()).trim(),'190.00');
   assert.equal(await page.locator('#instapayModal .btn-close').getAttribute('aria-label'),'Close');
   for(const handle of await page.locator('[data-preserve-ltr]').allTextContents())assert.equal(handle.trim(),'mohamed.araby71@instapay');
   assert.deepEqual(errors,[]);await context.close();
  }
 }finally{if(browser)await browser.close();if(customerId)db.prepare('DELETE FROM customers WHERE SSN=?').run(customerId);}
});
