import { env } from 'cloudflare:workers';
import { connect } from 'cloudflare:sockets';
import { smtpSession } from './smtp.mts';
const settings = env as unknown as Record<string,string>;
export async function sendEmail(recipient: string, subject: string, text: string): Promise<boolean> {
  try {
    if (settings.MAIL_PROVIDER === 'gmail') {
      if (!settings.SMTP_USERNAME || !settings.SMTP_PASSWORD || !settings.SMTP_FROM) return false;
      const socket=connect({hostname:'smtp.gmail.com',port:465},{secureTransport:'on',allowHalfOpen:false});
      await smtpSession(socket,{username:settings.SMTP_USERNAME,password:settings.SMTP_PASSWORD,from:settings.SMTP_FROM},{to:recipient,subject,text});
      return true;
    }
    if (!settings.RESEND_API_KEY || !settings.RESEND_FROM) return false;
    const endpoint = settings.APP_ENV === 'test' && settings.RESEND_TEST_ENDPOINT ? settings.RESEND_TEST_ENDPOINT : 'https://api.resend.com/emails';
    const response = await fetch(endpoint, { method:'POST', headers:{ Authorization:`Bearer ${settings.RESEND_API_KEY}`, 'Content-Type':'application/json'}, body:JSON.stringify({from:settings.RESEND_FROM, to:[recipient], subject, text}), signal:AbortSignal.timeout(10000) });
    return response.ok;
  } catch { return false; }
}
export async function notify(subject: string, text: string) { return sendEmail(settings.NOTIFICATION_EMAIL || 'Xpharma25@gmail.com', subject, text); }

