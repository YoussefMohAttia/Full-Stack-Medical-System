import { parse, serialize } from 'cookie';
import type { Request, Response, NextFunction } from 'express';
import { env } from 'cloudflare:workers';

export interface Session { csrf: string; created: number; customer?: number; admin?: number; pending?: number; email?: string; flash?: [string,string][]; id: string; previousId?: string }
const settings = env as unknown as Record<string,string> & {DB:D1Database};
if (!settings.SESSION_SECRET || settings.SESSION_SECRET.length < 32) throw new Error('SESSION_SECRET must contain at least 32 characters');
const db=settings.DB;
export function randomToken() { const array = new Uint8Array(32); crypto.getRandomValues(array); return Buffer.from(array).toString('base64url'); }
async function digest(id:string) {return Buffer.from(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(id))).toString('hex');}
const fresh = (): Session => ({id:randomToken(),csrf: randomToken(), created: Date.now()});
export async function setSession(res: Response, session: Session) {
  const {id,previousId,...data}=session;
  if(previousId) {
    await db.batch([db.prepare('DELETE FROM web_sessions WHERE id_hash=?').bind(await digest(previousId)),db.prepare('INSERT INTO web_sessions(id_hash,data,expires_at) VALUES (?,?,?)').bind(await digest(id),JSON.stringify(data),data.created+86400000)]);
    delete session.previousId;
  } else {
    await db.prepare('UPDATE web_sessions SET data=?,expires_at=? WHERE id_hash=?').bind(JSON.stringify(data),data.created+86400000,await digest(id)).run();
  }
  res.append('Set-Cookie', serialize('xp_session', id, {httpOnly:true,sameSite:'lax',secure:settings.APP_ENV==='production',path:'/',maxAge:86400}));
}
export async function sessions(req: Request, res: Response, next: NextFunction) {
  try {
    const cookie=parse(req.headers.cookie || '').xp_session || '';
    let session:Session|undefined;
    if(/^[\w-]{43}$/.test(cookie)) {
      const row=await db.prepare('SELECT data FROM web_sessions WHERE id_hash=? AND expires_at>?').bind(await digest(cookie),Date.now()).first<{data:string}>();
      if(row) session={...JSON.parse(row.data),id:cookie};
    }
    if(!session) {session=fresh();const {id,...data}=session;await db.prepare('INSERT INTO web_sessions(id_hash,data,expires_at) VALUES (?,?,?)').bind(await digest(id),JSON.stringify(data),data.created+86400000).run();}
    res.locals.session=session;
    next();
  } catch (error) {next(error);}
}
export function checkCsrf(req: Request, res: Response, next: NextFunction) {
  if (!req.body || typeof req.body.csrf_token !== 'string' || req.body.csrf_token !== (res.locals.session as Session).csrf) {res.status(403).send('Invalid request');return;}
  next();
}
export async function redirectWith(res: Response, path: string, message?: string, category='success') {
  const session = res.locals.session as Session;
  if (message) session.flash = [[category,message]];
  await setSession(res, session);
  res.redirect(path);
}
export function resetIdentity(session: Session) {delete session.customer;delete session.admin;delete session.pending;delete session.email;session.previousId=session.id;session.id=randomToken();session.csrf=randomToken();session.created=Date.now();}
