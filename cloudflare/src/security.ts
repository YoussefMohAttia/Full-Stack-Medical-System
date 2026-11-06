import bcrypt from 'bcryptjs';
export async function hashPassword(password: string) { return bcrypt.hash(password, 10); }
export async function verifyPassword(password: string, stored: unknown) {
  try {
    if (typeof stored !== 'string') return false;
    const hash = stored;
    if (!/^\$2[aby]\$/.test(hash)) return false;
    return await bcrypt.compare(password, hash);
  } catch { return false; }
}
export async function hashCode(code: string, pepper: string) {
  const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(`${pepper}:${code}`));
  return Buffer.from(b).toString('hex');
}
export function verificationCode() { const n = new Uint32Array(1); const range = 4294000000; do { crypto.getRandomValues(n); } while(n[0] >= range); return String(n[0] % 1000000).padStart(6,'0'); }
