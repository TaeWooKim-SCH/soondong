import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/utils/database";
import { RowDataPacket } from "mysql2";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Method Not Allowed
  if (req.method !== 'GET') {
    return res.status(405).send('잘못된 요청 메서드');
  }

  try {
    const connectDb = await db.promise().getConnection();
    const [ row ] = await connectDb.query<RowDataPacket[]>('SELECT * FROM tb_club');
    console.log(row);
    const result = row.map((club) => {
      const result_club = {
        club_id: club.club_id,
        club_name: club.club_name,
        club_description: club.club_description,
        club_post: club.club_post,
        club_img_url: club.club_img_url,
        club_recruit_period: club.club_recruit_period,
        club_like_count: club.club_like_count,
        club_category: club.club_category
      };
      return result_club;
    })

    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).send('내부 서버 오류');
  }
}