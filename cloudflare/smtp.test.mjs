import { test } from 'node:test';
import assert from 'node:assert/strict';
import { smtpSession } from './src/smtp.mts';
const encoder=new TextEncoder();
function mockSocket(rejectAuth=false) {
  let controller, writes=[], closed=false;
  const readable=new ReadableStream({start(c){controller=c;c.enqueue(encoder.encode('220 smtp.test ready\r\n'));}});
  const writable=new WritableStream({write(bytes){
    const value=new TextDecoder().decode(bytes);writes.push(value);
    let answer;
    if(value.startsWith('EHLO')) answer='250-smtp.test\r\n250 AUTH PLAIN LOGIN\r\n';
    else if(value.startsWith('AUTH')) answer=rejectAuth?'535 Authentication failed\r\n':'235 Authentication succeeded\r\n';
    else if(value.startsWith('MAIL FROM')) answer='250 Sender accepted\r\n';
    else if(value.startsWith('RCPT TO')) answer='250 Recipient accepted\r\n';
    else if(value==='DATA\r\n') answer='354 Start mail input\r\n';
    else if(value.startsWith('From:')) answer='250 Queued\r\n';
    else if(value==='QUIT\r\n') answer='221 Goodbye\r\n';
    else throw new Error('Unexpected SMTP command');
    // Responses may arrive fragmented, including inside a line.
    const middle=Math.floor(answer.length/2);controller.enqueue(encoder.encode(answer.slice(0,middle)));controller.enqueue(encoder.encode(answer.slice(middle)));
  }});
  return {readable,writable,async close(){closed=true;},get writes(){return writes;},get closed(){return closed;}};
}
const settings={username:'xpharma@example.test',password:'abcdefghijklmnop',from:'xpharma@example.test'};
test('SMTP sends an encoded message and closes the TLS session',async()=>{
 const socket=mockSocket();await smtpSession(socket,settings,{to:'customer@example.test',subject:'Verify account',text:'Your code is 123456.'});
 assert.equal(socket.closed,true);assert.ok(socket.writes.some(v=>v.startsWith('AUTH PLAIN ')));
 const data=socket.writes.find(v=>v.startsWith('From:'));assert.ok(data.includes('Content-Transfer-Encoding: base64'));assert.ok(data.includes(Buffer.from('Your code is 123456.').toString('base64')));
});
test('SMTP rejects bad credentials and stops before sending',async()=>{
 const socket=mockSocket(true);await assert.rejects(smtpSession(socket,settings,{to:'customer@example.test',subject:'Test',text:'test'}));
 assert.equal(socket.closed,true);assert.equal(socket.writes.some(v=>v.startsWith('MAIL FROM')),false);
});
test('SMTP rejects header injection',async()=>{
 const socket=mockSocket();await assert.rejects(smtpSession(socket,settings,{to:'customer@example.test\r\nBcc:evil@example.test',subject:'Test',text:'test'}));
});

