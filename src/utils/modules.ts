import cryptoJS from 'crypto-js';

export function generateRandomCode() {
  const min = 100000;
  const max = 999999;
  const randomCode = Math.floor(Math.random() * (max - min + 1)) + min;
  return String(randomCode);
}

export function encrypt(code: string) {
  const encrypted = cryptoJS.AES.encrypt(code, process.env.NEXT_PUBLIC_AES_EMAIL_SECRET_KEY);
  return encrypted.toString();
}

export function decrypt(code: string) {
  const decrypted = cryptoJS.AES.decrypt(code, process.env.NEXT_PUBLIC_AES_EMAIL_SECRET_KEY);
  return decrypted.toString(cryptoJS.enc.Utf8);
}