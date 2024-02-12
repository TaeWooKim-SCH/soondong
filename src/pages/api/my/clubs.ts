import { NextApiRequest, NextApiResponse } from "next";
import { RowDataPacket } from "mysql2";

import { db } from "@/utils/database";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXT_AUTH_SECRET;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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
      `SELECT club_id, club_name, club_description, club_recruit_period, club_img_url, club_category
      FROM tb_club where club_admin_id = '${req.query.user}'`
    );
    connectDb.release();
    return res.status(200).json(row);
  } catch (err) {
    console.error(err);
    return res.status(500).send('내부 서버 오류');
  }
}