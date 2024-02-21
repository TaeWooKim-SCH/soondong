import { NextApiRequest, NextApiResponse } from "next";
import { RowDataPacket } from "mysql2";

import { db } from "@/utils/database";


export default async function handler(req: MyRequest, res: NextApiResponse) {
  // Method Not Allowed
  if (req.method !== 'GET') {
    return res.status(405).send('잘못된 요청 메서드');
  }
  
  const user_id = req.query.user;
  if (!user_id) {
    return res.status(401).send('접근 권한 없음');
  }
  try {
    const connectDb = await db.promise().getConnection();
    const [ row ] = await connectDb.query<RowDataPacket[]>(
      `select tb_club_members.club_id, club_name, club_description, join_state from tb_club_members
        inner join tb_club
        on tb_club_members.club_id = tb_club.club_id
      where tb_club_members.user_id = '${user_id}';`
    );
    return res.status(200).json(row);
  } catch (err) {
    console.error('데이터베이스 오류', err);
    res.status(500).send('내부 서버 오류');
  }
}

interface MyRequest extends NextApiRequest {
  query: {
    user: string;
  }
}