import { env } from 'cloudflare:workers';
import { httpServerHandler } from 'cloudflare:node';
import express from 'express';
import { sessions } from './session';
import { page, routes } from './auth';
import orders from './orders';
import admin from './admin';
import assistant from './assistant';
import { productInfo } from './views';
const database=(env as unknown as {DB:D1Database}).DB;
const app=express();app.disable('x-powered-by');
app.use((_req,res,next)=>{res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('X-Frame-Options','SAMEORIGIN');res.setHeader('Referrer-Policy','strict-origin-when-cross-origin');res.setHeader('Cache-Control','no-store');if((env as unknown as Record<string,string>).IS_STAGING==='true')res.setHeader('X-Robots-Tag','noindex, nofollow');next();});
app.get('/api/health',(_req,res)=>res.json({status:'ok'}));
app.get('/api/products',async(_req,res,next)=>{try{const rows=await database.prepare("SELECT product_id,product_name,pack_size,unit_price FROM products WHERE status='active' ORDER BY product_id").all();res.json({products:rows.results});}catch(e){next(e);}});
app.get('/api/products/:id',async(req,res,next)=>{try{const p=await database.prepare("SELECT product_id,product_name,pack_size,unit_price FROM products WHERE status='active' AND product_id=?").bind(req.params.id).first();if(!p){res.status(404).json({error:'Product not found'});return;}res.json({product:p});}catch(e){next(e);}});
app.get('/media/products/:id',async(req,res,next)=>{try{const p=await database.prepare("SELECT image_key FROM products WHERE product_id=? AND status='active'").bind(req.params.id).first<{image_key:string|null}>();if(!p?.image_key?.startsWith('product_images/')){res.status(404).send('Not found');return;}const image=await (env as unknown as {PROOFS:R2Bucket}).PROOFS.get(p.image_key);if(!image){res.status(404).send('Not found');return;}res.setHeader('Content-Type',image.httpMetadata?.contentType||'application/octet-stream');res.setHeader('Cache-Control','public, max-age=0, must-revalidate');res.send(Buffer.from(await image.arrayBuffer()));}catch(e){next(e);}});
app.use(sessions);
// Customer sessions cannot browse the separate admin interface. Signed-out
// administrators can still reach their login, which requires admin credentials.
app.use('/admin',(_req,res,next)=>{if(res.locals.session.customer&&!res.locals.session.admin){res.status(404).send('Not found');return;}next();});
app.use(routes);app.use(assistant);app.use(orders);app.use(admin);
app.get(['/','/customer/search'],async(req,res,next)=>{try{const name=String(req.query.product_name||'').slice(0,100),price=Number(req.query.max_price||0);const rows=await database.prepare("SELECT * FROM products WHERE status='active' AND (LOWER(product_name) LIKE LOWER(?) OR product_name_ar LIKE ?) AND (? <= 0 OR unit_price <= ?) ORDER BY product_id").bind(`%${name}%`,`%${name}%`,price,price).all<{product_id:string}>();const product_info=Object.fromEntries(rows.results.map(p=>[p.product_id,productInfo(p)]));await page(req,res,req.path==='/'?'index.html':'customer/search.html',{products:rows.results,product_info});}catch(e){next(e);}});
app.get('/about',(req,res,next)=>{page(req,res,'about.html').catch(next);});
app.get('/customer/products/:id',async(req,res,next)=>{try{const product=await database.prepare("SELECT * FROM products WHERE product_id=? AND status='active'").bind(req.params.id).first<{product_id:string}>();if(!product){res.status(404).send('Product not found');return;}await page(req,res,'customer/product_detail.html',{product,info:productInfo(product)});}catch(e){next(e);}});
app.use((_req,res)=>res.status(404).send('Not found'));
app.use((err:unknown,_req:express.Request,res:express.Response,_next:express.NextFunction)=>{console.error(err);if((err as {code?:string}).code==='LIMIT_FILE_SIZE'){res.status(413).send('File too large');return;}res.status(500).send('An unexpected error occurred');});
app.listen(3000);
const handler=httpServerHandler({port:3000});
export default {
  async fetch(request:Request,bindings:{ASSETS:Fetcher},context:ExecutionContext){const url=new URL(request.url);if(url.pathname.startsWith('/static/')){if(url.pathname.startsWith('/static/uploads/'))return new Response('Not found',{status:404});url.pathname=url.pathname.slice('/static'.length);return bindings.ASSETS.fetch(new Request(url,request));}return (handler as any).fetch(request,bindings,context);},
  scheduled(_event:ScheduledController, bindings:{DB:D1Database}, context:ExecutionContext) {
    const now=Date.now();
    context.waitUntil(bindings.DB.batch([
      bindings.DB.prepare('DELETE FROM web_sessions WHERE expires_at < ?').bind(now),
      bindings.DB.prepare('DELETE FROM security_attempts WHERE window_start < ?').bind(Math.floor(now/1000)-86400),
      bindings.DB.prepare('DELETE FROM assistant_rate_limits WHERE window_start < ? AND blocked_until < ?').bind(Math.floor(now/1000)-86400,Math.floor(now/1000)),
      bindings.DB.prepare('DELETE FROM verification_codes WHERE CAST(expires_at AS INTEGER) < ?').bind(now-86400000)
    ]));
  }
};

