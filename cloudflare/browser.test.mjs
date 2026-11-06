import { test } from 'node:test';
import assert from 'node:assert/strict';
import { chromium } from 'playwright';
const base=process.env.XPHARMA_TEST_URL || 'http://127.0.0.1:8790';
test('desktop and mobile language, theme and product gallery', {timeout:90000}, async()=>{
 const browser=await chromium.launch({headless:true,executablePath:'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',args:['--no-sandbox']});
 try {
  for(const viewport of [{width:1365,height:850},{width:390,height:844}]) {
   const context=await browser.newContext({viewport});const page=await context.newPage();
   const errors=[];page.on('pageerror',e=>errors.push(e.message));
   await page.goto(base+'/',{waitUntil:'domcontentloaded'});
   assert.match(await page.locator('body').innerText(),/Blemease/);
   assert.ok(await page.locator('.medicine-card').count()>=3);
   if(viewport.width<500) await page.locator('.navbar-toggler').click();
   await page.locator('#languageToggle').click();
   assert.equal(await page.locator('html').getAttribute('dir'),'rtl');
   assert.match(await page.locator('body').innerText(),/المنتجات/);
   await page.locator('#themeToggle').click();assert.equal(await page.locator('body').evaluate(e=>e.classList.contains('dark')),true);
   await page.goto(base+'/customer/products/XPH-101',{waitUntil:'domcontentloaded'});
   assert.equal(await page.locator('html').getAttribute('dir'),'rtl');
   assert.equal(await page.locator('body').evaluate(e=>e.classList.contains('dark')),true);
   assert.match(await page.locator('.product-copy a.btn-primary').innerText(),/اطلب الآن/);
   const prev=await page.locator('.gallery-prev').boundingBox(),next=await page.locator('.gallery-next').boundingBox(),box=await page.locator('.product-gallery').boundingBox();
   assert.ok(prev.x>=box.x-1 && next.x+next.width<=box.x+box.width+1,'gallery arrows stay inside image');
   if(viewport.width<500) await page.locator('.navbar-toggler').click();
   await page.locator('#languageToggle').click();
   assert.equal(await page.locator('html').getAttribute('dir'),'ltr');
   assert.equal((await page.locator('.product-copy a.btn-primary').innerText()).trim(),'Order now');
   assert.match(await page.locator('body').innerText(),/Explore the formula/);
   assert.deepEqual(errors,[]);
   await context.close();
  }
  for(const width of [320,375,390]){
   const context=await browser.newContext({viewport:{width,height:844}});const page=await context.newPage();await page.goto(base+'/',{waitUntil:'domcontentloaded'});
   for(const language of ['en','ar']){
    if(language==='ar'){await page.locator('.navbar-toggler').click();await page.locator('#languageToggle').click();}
    const layout=await page.locator('.footer-contact').evaluate(el=>({overflow:document.documentElement.scrollWidth>innerWidth+1,rows:[...el.querySelectorAll('p')].map(p=>({height:p.getBoundingClientRect().height,line:parseFloat(getComputedStyle(p).lineHeight)||24}))}));
    assert.equal(layout.overflow,false,`${language} footer overflows at ${width}`);
    assert.ok(layout.rows.every(row=>row.height<=row.line*1.5),`${language} footer wraps at ${width}`);
   }
   await context.close();
  }
 } finally {await browser.close();}
});
