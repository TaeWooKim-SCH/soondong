import { NextApiRequest, NextApiResponse } from "next";

import { db } from "@/utils/database";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Method Not Allowed
  if (req.method !== 'POST') {
    return res.status(405).send('잘못된 요청 메서드');
  }

  try {
    const connectDb = await db.promise().getConnection();
    const result = await connectDb.query(`select id from tb_member where id = '${req.body.id}';`);

    if (Array.isArray(result[0])) {
      if (result[0].length) { // 아이디 중복 발생
        connectDb.release();
        return res.status(409).send('아이디 중복 발생');
      } else { // 아이디 중복 없음
        connectDb.release();
        return res.status(200).send('아이디 중복 없음');
      }
    }
    connectDb.release();
  } catch(err) {
    console.error(err);
    return res.status(500).send('내부 서버 오류');
  }


  return res.status(200).send('중복확인 완료');
}