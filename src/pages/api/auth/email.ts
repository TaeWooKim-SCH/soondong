import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from 'nodemailer';

import { encrypt, generateRandomCode } from "@/utils/modules";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Method Not Allowed
  if (req.method !== 'POST') {
    return res.status(405).redirect('/home'); 
  }

  try {
    const body = req.body;

    if (!body.email || !body.email.includes('@sch.ac.kr')) {
      return res.status(400).send("잘못된 바디 정보");
    }

    // Nodemailer transporter 생성
    let authCode = generateRandomCode();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'zop123493@gmail.com',
        pass: process.env.GOOGLE_APP_PASSWORD, // Gmail '앱 비밀번호'
      },
    });

    // 전송할 이메일 내용 설정
    const mailOptions = {
      from: `${process.env.BUSINESS_NAME} <${process.env.ADMIN_EMAIL}>`,
      to: body.email,
      subject: '순동 학교 이메일 인증번호입니다.',
      html: `<div>안녕하세요. 순동에서 이메일 인증번호를 보내드립니다.</div><div>인증번호: ${authCode}</div>`,
    };

    // 이메일 전송
    const info = await transporter.sendMail(mailOptions);
    console.log(authCode);
    console.log('이메일 전송 성공:', info.response);
    return res.status(200).json({ success: true, auth_code: encrypt(authCode) });
  } catch (error) {
    console.error('이메일 전송 실패:', error);
    return res.status(500).json({ success: false, error });
  }
}
