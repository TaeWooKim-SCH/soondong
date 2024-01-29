import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/utils/database";

import { generateRandomString } from "@/utils/modules";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXT_AUTH_SECRET;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Method Not Allowed
  if (req.method !== 'POST') {
    return res.status(405).send('잘못된 요청 메서드');
  }
  const body: ClubAddFormData = JSON.parse(req.body);
  const token = await getToken({ req, secret });
  if (token) {
    const club_admin_id = token.id;
    const club_id = generateRandomString();
    console.log(club_id);
    const club_like_count = 0;
    try {
      const connectDb = await db.promise().getConnection();
      const result = await connectDb.query(
        `insert into tb_club(club_id, club_admin_id, club_name, club_description, club_post, club_img_url, club_recruit_period, club_like_count, club_category)
        values('${club_id}', '${club_admin_id}', '${body.club_name}', '${body.club_description}', '${body.club_post}', '${body.club_img_url}', '${body.club_recruit_period}', '${club_like_count}', '${body.club_category}');`
      );
    } catch (err) {
      console.error(err);
      return res.status(500).send('내부 서버 오류');
    }
  }
  res.status(200).json(body);
}

interface ClubAddFormData {
  club_name: string;
  club_category: string;
  club_description: string;
  club_post: string;
  club_recruit_period: string;
  period_start: string;
  period_end: string;
  club_img_url: string;
}