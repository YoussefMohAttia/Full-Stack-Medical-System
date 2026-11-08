import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {chromium} from 'playwright';
import {DatabaseSync} from 'node:sqlite';
import {readdirSync} from 'node:fs';
import bcrypt from 'bcryptjs';

test('assistant confines requests and works on the home page', {timeout:90000}, async()=>{
 const received=[];
 const provider=createServer((req,res)=>{let text='';req.on('data',chunk=>text+=chunk);req.on('end',()=>{received.push({body:JSON.parse(text),key:req.headers['x-goog-api-key']});res.writeHead(200,{'content-type':'application/json'});res.end(JSON.stringify({candidates:[{content:{parts:[{text:JSON.stringify({scope:'in_scope',reply:'Mock product answer.'})}]}}]}));});});
 await new Promise(resolve=>provider.listen(8787,'127.0.0.1',resolve));
 const dir='.wrangler/launch-test/state/v3/d1/miniflare-D1DatabaseObject';
 const db=new DatabaseSync(`${dir}/${readdirSync(dir).find(x=>x.endsWith('.sqlite')&&x!=='metadata.sqlite')}`);
 const email=`assistant-check-${Date.now()}@example.test`,password='TestPassword123!';
 const customerId=Number(db.prepare('INSERT INTO customers(fname,lname,email,password,phone,city,address,is_verified) VALUES (?,?,?,?,?,?,?,1)').run('Assistant','Tester',email,await bcrypt.hash(password,10),'01000000000','Alexandria','Example address').lastInsertRowid);
 let browser;
 try {
  const first=await fetch('http://127.0.0.1:8792/');const html=await first.text(),cookie=first.headers.getSetCookie().find(v=>v.startsWith('xp_session=')).split(';')[0],csrf=html.match(/name="csrf_token" value="([^"]+)"/)?.[1];assert.ok(csrf);
  const testIp=`192.0.2.${Math.floor(Math.random()*200)+1}`;
  const ask=async(message,token=csrf,language='en',ip=testIp)=>fetch('http://127.0.0.1:8792/api/assistant',{method:'POST',headers:{'content-type':'application/json',cookie,'cf-connecting-ip':ip},body:JSON.stringify({csrf_token:token,message,language})});
  assert.equal((await ask('What is Bronex?','wrong')).status,403);
  let res=await ask('My account email is person@example.com');assert.match((await res.json()).reply,/personal contact/);assert.equal(received.length,0);
  res=await ask('I have difficulty breathing');assert.match((await res.json()).reply,/urgent/);assert.equal(received.length,0);
  res=await ask('What is Bronex?');const answer=(await res.json()).reply;assert.match(answer,/Mock product answer/);assert.match(answer,/01007718313/);assert.equal(received.length,1);
  assert.match(received[0].body.systemInstruction.parts[0].text,/Never diagnose/);
  assert.equal(received[0].body.contents[0].parts[0].text,'What is Bronex?');
  const rateIp=`198.51.100.${Math.floor(Math.random()*200)+1}`;
  const rateAsk=()=>fetch('http://127.0.0.1:8792/api/assistant',{method:'POST',headers:{'content-type':'application/json',cookie,'cf-connecting-ip':rateIp},body:JSON.stringify({csrf_token:csrf,message:'What is Bronex?',language:'en'})});
  db.prepare('DELETE FROM assistant_rate_limits WHERE bucket=?').run(rateIp);
  for(let i=0;i<15;i++)assert.equal((await rateAsk()).status,200,`message ${i+1}`);
  res=await rateAsk();assert.equal(res.status,429);assert.ok(Number(res.headers.get('retry-after'))<=60&&Number(res.headers.get('retry-after'))>0);
  assert.equal((await rateAsk()).status,429,'retries during the pause remain blocked');
  db.prepare('UPDATE assistant_rate_limits SET blocked_until=? WHERE bucket=?').run(Math.floor(Date.now()/1000)-1,rateIp);
  assert.equal((await rateAsk()).status,200,'messages work again after the pause');
  assert.equal(db.prepare('SELECT attempts FROM assistant_rate_limits WHERE bucket=?').get(rateIp).attempts,1);
  db.prepare('UPDATE assistant_rate_limits SET window_start=?,attempts=15,blocked_until=0 WHERE bucket=?').run(Math.floor(Date.now()/1000)-121,rateIp);
  assert.equal((await rateAsk()).status,200,'the two-minute window resets');
  db.prepare('DELETE FROM assistant_rate_limits WHERE bucket=?').run(rateIp);
  assert.doesNotMatch(html,/local-test-key/);
  browser=await chromium.launch({headless:true,channel:'chrome'});
  for(const width of [390,1440]){
   const page=await browser.newPage({viewport:{width,height:844},extraHTTPHeaders:{'cf-connecting-ip':testIp}});await page.goto('http://127.0.0.1:8792/',{waitUntil:'domcontentloaded'});
   await page.evaluate(()=>window.scrollTo(0,document.body.scrollHeight));assert.equal(await page.locator('#xpChatLaunch').isVisible(),true);
   await page.locator('#xpChatLaunch').click();assert.equal(await page.locator('#xpChat').isVisible(),true);
   await page.locator('#xpChatInput').fill('What is Bronex?');await page.locator('#xpChatSend').click();await page.getByText('Mock product answer.').waitFor();
   if(width===390)await page.locator('.navbar-toggler').click();await page.locator('#languageToggle').click();assert.equal(await page.locator('html').getAttribute('dir'),'rtl');assert.equal(await page.locator('#xpChatInput').getAttribute('placeholder'),'اكتب سؤالك...');
   await page.locator('#themeToggle').click();assert.equal(await page.locator('body').evaluate(e=>e.classList.contains('dark')),true);
   await page.keyboard.press('Escape');assert.equal(await page.locator('#xpChat').isVisible(),false);
   for(const route of ['/about','/customer/search','/customer/products/XPH-101','/customer/products/XPH-204','/customer/products/XPH-312']){await page.goto('http://127.0.0.1:8792'+route,{waitUntil:'domcontentloaded'});assert.equal(await page.locator('#xpAssistant').count(),1);const box=await page.locator('#xpAssistant').boundingBox();assert.ok(width-(box.x+box.width)<30,'assistant should stay on the right in Arabic')}
   for(const route of ['/customer/login','/customer/register','/customer/reserve/XPH-101']){await page.goto('http://127.0.0.1:8792'+route,{waitUntil:'domcontentloaded'});assert.equal(await page.locator('#xpAssistant').count(),0)}
   await page.goto('http://127.0.0.1:8792/customer/login',{waitUntil:'domcontentloaded'});
   await page.locator('#email').fill(email);await page.locator('#password').fill(password);await page.locator('button[type=submit]').click();await page.waitForURL('**/customer/dashboard');
   await page.goto('http://127.0.0.1:8792/customer/reserve/XPH-101',{waitUntil:'domcontentloaded'});assert.equal(await page.locator('#xpAssistant').count(),0);
   await page.close();
  }
 } finally {if(browser)await browser.close();db.prepare('DELETE FROM customers WHERE SSN=?').run(customerId);db.close();await new Promise(resolve=>provider.close(resolve))}
});
