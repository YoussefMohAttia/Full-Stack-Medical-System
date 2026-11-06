import {test} from 'node:test';
import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import {readdirSync} from 'node:fs';
import bcrypt from 'bcryptjs';
import {chromium} from 'playwright';

const base=process.env.XPHARMA_TEST_URL||'http://127.0.0.1:8791';
const dir=process.env.XPHARMA_TEST_D1_DIR||'.wrangler/launch-test/state/v3/d1/miniflare-D1DatabaseObject';
const db=new DatabaseSync(`${dir}/${readdirSync(dir).find(x=>x.endsWith('.sqlite')&&x!=='metadata.sqlite')}`);

test('discount checkout displays the amount that will be submitted', {timeout:90000}, async()=>{
 const email=`discount-ui-${Date.now()}@example.test`,password='TestPassword123!',hash=await bcrypt.hash(password,10);
 const id=Number(db.prepare('INSERT INTO customers(fname,lname,email,password,phone,city,address,is_verified) VALUES (?,?,?,?,?,?,?,1)').run('Test','Discount',email,hash,'01000000000','Alexandria','Test address').lastInsertRowid);
 let browser;
 try {
  browser=await chromium.launch({headless:true,channel:'chrome'});
  const page=await browser.newPage({viewport:{width:390,height:844}});
  await page.goto(base+'/customer/login',{waitUntil:'domcontentloaded'});
  await page.locator('#email').fill(email);await page.locator('#password').fill(password);
  await page.locator('button[type=submit]').click();await page.waitForURL('**/customer/dashboard');
  await page.goto(base+'/customer/reserve/XPH-101',{waitUntil:'domcontentloaded'});
  await page.locator('#discount_code').fill('XPH-40-0909066B');
  await page.locator('#instapay').click();
  assert.equal(await page.locator('#cash').isChecked(),true);
  assert.equal(await page.locator('#applied_discount_code').inputValue(),'');
  await page.locator('#applyDiscount').click();
  await page.waitForFunction(()=>document.querySelector('#applied_discount_code').value==='XPH-40-0909066B');
  assert.equal(await page.locator('#orderTotalAmount').innerText(),'87.00');
  await page.locator('#quantity').fill('2');
  assert.equal(await page.locator('#orderTotalAmount').innerText(),'174.00');
  await page.locator('#instapay').check();
  assert.equal(await page.locator('#modalTotalAmount').innerText(),'174.00');
  await page.locator('#instapayModal .btn-close').click();
  await page.locator('#discount_code').fill('invalid');
  assert.equal(await page.locator('#applied_discount_code').inputValue(),'');
  assert.equal(await page.locator('#orderTotalAmount').innerText(),'290.00');
  await page.locator('.navbar-toggler').click();await page.locator('#languageToggle').click();
  await page.locator('#applyDiscount').click();
  await page.waitForFunction(()=>document.querySelector('#discountMessage').textContent.includes('غير صالح'));
 } finally {
  if(browser)await browser.close();
  db.prepare('DELETE FROM customers WHERE SSN=?').run(id);
  db.close();
 }
});
