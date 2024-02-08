import { NextApiRequest, NextApiResponse } from "next";
import { RowDataPacket } from "mysql2";

import { db } from "@/utils/database";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Method Not Allowed
  if (req.method !== 'GET') {
    return res.status(405).send('잘못된 요청 메서드');
  }

  try {
    const club_category = req.query.category
    const connectDb = await db.promise().getConnection();
    const [ row ] = await connectDb.query<RowDataPacket[]>(
      `SELECT club_id, club_name, club_description, club_recruit_period, club_img_url, club_category
      FROM tb_club ${club_category ? `WHERE club_category = '${club_category}'` : ''}`
    );
    connectDb.release();
    return res.status(200).json(row);
  } catch (err) {
    console.error(err);
    return res.status(500).send('내부 서버 오류');
  }
}