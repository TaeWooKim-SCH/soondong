import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Method Not Allowed
  if (req.method !== 'POST') {
    return res.status(405).redirect('/home'); 
  }

  try {
    const body = JSON.parse(req.body);

    if (!body.email) {
      return res.status(400).send("잘못된 바디 정보");
    }

    // Nodemailer transporter 생성
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
      subject: '테스트 이메일',
      text: '안녕하세요, 이것은 테스트 이메일입니다.',
    };

    // 이메일 전송
    const info = await transporter.sendMail(mailOptions);

    console.log('이메일 전송 성공:', info.response);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('이메일 전송 실패:', error);
    return res.status(500).json({ success: false, error });
  }
}