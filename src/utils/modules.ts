import cryptoJS from 'crypto-js';

export function generateRandomCode() {
  const min = 100000;
  const max = 999999;
  const randomCode = Math.floor(Math.random() * (max - min + 1)) + min;
  return String(randomCode);
}

export function generateRandomString() {
  return Math.random().toString(16).substring(2);
}

export function encrypt(code: string, key: string) {
  const encrypted = cryptoJS.AES.encrypt(code, key);
  return encrypted.toString();
}

export function decrypt(code: string, key: string) {
  const decrypted = cryptoJS.AES.decrypt(code, key);
  return decrypted.toString(cryptoJS.enc.Utf8);
}

export function calculRemainDate(period: string) {
  const recruitPeriod = period.split('~');
  const recruitEndDate = new Date(recruitPeriod[1]).getTime();
  const todayDate = new Date().getTime();
  const remainPeriod = Math.ceil((recruitEndDate - todayDate) / (1000 * 60 * 60 * 24));
  return remainPeriod;
}