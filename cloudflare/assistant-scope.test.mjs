import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {DatabaseSync} from 'node:sqlite';
import {readdirSync} from 'node:fs';

test('assistant classifies questions and enforces the off-topic pause', {timeout:60000}, async()=>{
 let calls=0, malformed=false;
 const provider=createServer((req,res)=>{let body='';req.on('data',c=>body+=c);req.on('end',()=>{calls++;const request=JSON.parse(body);const msg=request.contents[0].parts[0].text;assert.equal(request.generationConfig.responseMimeType,'application/json');const scope=msg.startsWith('unrelated')?'off_topic':'in_scope';const text=malformed?'not json':JSON.stringify({scope,reply:scope==='in_scope'?'Helpful product answer':''});res.writeHead(200,{'content-type':'application/json'});res.end(JSON.stringify({candidates:[{content:{parts:[{text}]}}]}));});});
 await new Promise(resolve=>provider.listen(8787,'127.0.0.1',resolve));
 const dir='.wrangler/launch-test/state/v3/d1/miniflare-D1DatabaseObject';const db=new DatabaseSync(`${dir}/${readdirSync(dir).find(x=>x.endsWith('.sqlite')&&x!=='metadata.sqlite')}`);
 const ip='192.0.2.193';
 try{
  db.prepare('DELETE FROM assistant_scope_limits WHERE bucket=?').run(ip);db.prepare('DELETE FROM assistant_rate_limits WHERE bucket=?').run(ip);
  const page=await fetch('http://127.0.0.1:8792/');const html=await page.text();const cookie=page.headers.getSetCookie().find(v=>v.startsWith('xp_session=')).split(';')[0];const csrf=html.match(/name="csrf_token" value="([^"]+)"/)[1];
  const ask=message=>fetch('http://127.0.0.1:8792/api/assistant',{method:'POST',headers:{'content-type':'application/json',cookie,'cf-connecting-ip':ip},body:JSON.stringify({csrf_token:csrf,message})});
  let r=await ask('unrelated one');assert.match((await r.json()).reply,/outside my scope/);
  r=await ask('unrelated two');assert.match((await r.json()).reply,/outside my scope/);
  r=await ask('Can you tell me what this cream does?');assert.match((await r.json()).reply,/Helpful product answer/);assert.equal(db.prepare('SELECT count(*) n FROM assistant_scope_limits WHERE bucket=?').get(ip).n,0);
  for(let i=1;i<=3;i++){r=await ask('unrelated '+i);const result=await r.json();assert.match(result.reply,i===3?/three unrelated questions/:/outside my scope/);}
  const before=calls;r=await ask('What is Bronex?');assert.equal(r.status,429);assert.equal((await r.json()).error,'off_topic_locked');assert.ok(Number(r.headers.get('retry-after'))>0);assert.equal(calls,before);
  db.prepare('UPDATE assistant_scope_limits SET blocked_until=? WHERE bucket=?').run(Math.floor(Date.now()/1000)-1,ip);
  r=await ask('unrelated after pause');assert.match((await r.json()).reply,/outside my scope/);assert.equal(db.prepare('SELECT consecutive FROM assistant_scope_limits WHERE bucket=?').get(ip).consecutive,1);
  malformed=true;r=await ask('product?');assert.equal(r.status,502);assert.equal(db.prepare('SELECT consecutive FROM assistant_scope_limits WHERE bucket=?').get(ip).consecutive,1);
  malformed=false;r=await ask('What is Bronex?');assert.match((await r.json()).reply,/Helpful product answer/);
 }finally{db.prepare('DELETE FROM assistant_scope_limits WHERE bucket=?').run(ip);db.prepare('DELETE FROM assistant_rate_limits WHERE bucket=?').run(ip);db.close();await new Promise(resolve=>provider.close(resolve));}
});
