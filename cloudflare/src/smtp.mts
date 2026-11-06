// Gmail SMTP over Cloudflare's TLS socket. This module never logs credentials,
// server replies, verification codes, or message contents.
export interface SmtpSocket {
  readable: ReadableStream<Uint8Array>;
  writable: WritableStream<Uint8Array>;
  close(): Promise<void>;
}
export interface SmtpSettings { username: string; password: string; from: string }
const validAddress = (value: string) => /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value);
const encoder = new TextEncoder();
const decoder = new TextDecoder();
const base64 = (value: string) => Buffer.from(value, 'utf8').toString('base64');

export async function smtpSession(socket: SmtpSocket, settings: SmtpSettings, message?: {to:string;subject:string;text:string}): Promise<void> {
  if (!validAddress(settings.username) || !validAddress(settings.from) || /[\r\n]/.test(settings.password)) {await socket.close().catch(()=>{});throw new Error('Invalid SMTP configuration');}
  if (message && (!validAddress(message.to) || /[\r\n]/.test(message.subject))) {await socket.close().catch(()=>{});throw new Error('Invalid message address or subject');}
  const reader=socket.readable.getReader(), writer=socket.writable.getWriter();
  let buffer='';
  async function response(expected: number[]) {
    for (;;) {
      const end=buffer.indexOf('\n');
      if(end<0) {
        const result=await reader.read();
        if(result.done) throw new Error('SMTP connection closed');
        buffer+=decoder.decode(result.value,{stream:true});
        if(buffer.length>32768) throw new Error('SMTP response too large');
        continue;
      }
      const line=buffer.slice(0,end+1).replace(/\r?\n$/,'');buffer=buffer.slice(end+1);
      if(!/^\d{3}[ -]/.test(line)) throw new Error('Invalid SMTP response');
      if(line[3]===' ') {if(!expected.includes(Number(line.slice(0,3)))) throw new Error('SMTP request rejected');return;}
    }
  }
  async function command(value: string, expected:number[]) {await writer.write(encoder.encode(value+'\r\n'));await response(expected);}
  const timeout=setTimeout(()=>{void socket.close();},15000);
  try {
    await response([220]);
    await command('EHLO xpharma.local',[250]);
    await command('AUTH PLAIN '+base64(`\0${settings.username}\0${settings.password.replace(/ /g,'')}`),[235]);
    if(message){
      await command(`MAIL FROM:<${settings.from}>`,[250]);
      await command(`RCPT TO:<${message.to}>`,[250,251]);
      await command('DATA',[354]);
      const body=base64(message.text).match(/.{1,76}/g)?.join('\r\n') ?? '';
      const content=[`From: XPharma <${settings.from}>`,`To: <${message.to}>`,`Subject: =?UTF-8?B?${base64(message.subject)}?=`,`Date: ${new Date().toUTCString()}`,'MIME-Version: 1.0','Content-Type: text/plain; charset=UTF-8','Content-Transfer-Encoding: base64','',body,'.'].join('\r\n');
      await command(content,[250]);
    }
    // Once the message is accepted, a failed QUIT must not be reported as a
    // delivery failure: retrying would send a duplicate message.
    if(message) await command('QUIT',[221]).catch(()=>{});
    else await command('QUIT',[221]);
  } finally {
    clearTimeout(timeout);
    reader.releaseLock();writer.releaseLock();
    await socket.close().catch(()=>{});
  }
}
