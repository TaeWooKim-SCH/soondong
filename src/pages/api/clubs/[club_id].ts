import { NextApiRequest, NextApiResponse } from "next";
import { RowDataPacket } from "mysql2";

import { db } from "@/utils/database";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Method Not Allowed
  if (req.method !== 'GET') {
    return res.status(405).send('잘못된 요청 메서드');
  }
  
  const { club_id } = req.query;

  if (club_id) {
    try {
      const connectDb = await db.promise().getConnection();
      const [ row ] = await connectDb.query<RowDataPacket[]>(`SELECT * FROM tb_club where club_id = '${club_id}'`);
      const result = {...row[0]};
      delete result.club_admin_id;
      delete result.club_join_state;
      connectDb.release();
      return res.status(200).json(result);
    } catch (err) {
      console.error(err);
      return res.status(500).send('내부 서버 오류');
    }
  } else {
    return res.status(403).send('잘못된 접근');
  }
}