// Create an admin SQL file without putting the password in command history.
const fs = require('node:fs');
const path = require('node:path');
const readline = require('node:readline');
const { Writable } = require('node:stream');
const bcrypt = require('bcryptjs');

async function main() {
  const option = process.argv.indexOf('--output');
  const output = option >= 0 ? process.argv[option + 1] : undefined;
  if (!output || process.argv.length !== 4) throw new Error('Usage: node cloudflare/scripts/create-admin.cjs --output <new-sql-file>');
  if (!process.stdin.isTTY || !process.stdout.isTTY) throw new Error('Run this command in an interactive terminal.');
  if (fs.existsSync(output)) throw new Error('Output already exists; choose a new filename.');
  let muted = false;
  const destination = new Writable({write(chunk, encoding, callback) {if (!muted) process.stdout.write(chunk, encoding); callback();}});
  const rl = readline.createInterface({input:process.stdin,output:destination,terminal:true});
  const ask = (question, secret=false) => new Promise(resolve => {
    process.stdout.write(question);
    muted = secret;
    rl.question('', answer => {muted=false;if(secret) process.stdout.write('\n');resolve(answer);});
  });
  let email, first, last, password, confirm;
  try {
    email=(await ask('Admin email: ')).trim().toLowerCase();
    first=(await ask('First name: ')).trim();
    last=(await ask('Last name: ')).trim();
    password=await ask('New admin password: ',true);
    confirm=await ask('Repeat password: ',true);
  } finally {muted=false;rl.close();}
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !first || !last || /[\r\n]/.test(first+last)) throw new Error('Enter a valid name and email.');
  if (password !== confirm || password.length < 12 || Buffer.byteLength(password,'utf8') > 72 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password) || !/[^a-zA-Z0-9]/.test(password)) throw new Error('Passwords must match and contain at least 12 characters, uppercase, lowercase, a number and a symbol.');
  const hash=await bcrypt.hash(password,10);
  const quote=value=>"'"+value.replaceAll("'","''")+"'";
  const sql=`INSERT INTO admin (fname,lname,email,password) VALUES (${quote(first)},${quote(last)},${quote(email)},${quote(hash)});\n`;
  fs.mkdirSync(path.dirname(path.resolve(output)),{recursive:true});
  fs.writeFileSync(output,sql,{encoding:'utf8',flag:'wx',mode:0o600});
  console.log('Administrator SQL file created. Import it into the intended D1 database and then delete the file.');
}
main().catch(error=>{console.error(error.message);process.exitCode=1;});
