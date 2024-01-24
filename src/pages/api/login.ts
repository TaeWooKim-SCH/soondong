import { NextApiRequest, NextApiResponse } from "next";
import { RowDataPacket } from "mysql2";

import { db } from "../../utils/database";
import { decrypt } from "@/utils/modules";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Method Not Allowed
  if (req.method !== 'POST') {
    return res.status(405).send('잘못된 요청 메서드')
  }

  // 아이디 조회
  try {
    const body: BodyTypes = req.body;
    const decryptedBodyId = decrypt(body.id, process.env.NEXT_PUBLIC_AES_ID_SECRET_KEY);
    const decryptedBodyPw = decrypt(body.password, process.env.NEXT_PUBLIC_AES_PW_SECRET_KEY);
    const connectDb = await db.promise().getConnection();
    const [ row ] = await connectDb.query<RowDataPacket[]>(`select * from tb_member where id = '${decryptedBodyId}'`);

    if (!row.length) {
      return res.status(404).send('유저 정보 없음');
    }
    else {
      const result = row[0];
      const decryptedResultPw = decrypt(result.password, process.env.NEXT_PUBLIC_AES_PW_SECRET_KEY);
      if (decryptedBodyPw === decryptedResultPw) {
        return res.status(200).json({ name: result.name, id: result.id });
      }
      else {
        return res.status(401).send('비밀번호 일치하지 않음');
      }
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send('데이터베이스 연결 오류');
  }
}

interface BodyTypes {
  id: string;
  password: string;
}
