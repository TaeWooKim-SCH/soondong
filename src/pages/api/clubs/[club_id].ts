import { NextApiRequest, NextApiResponse } from "next";
import { RowDataPacket } from "mysql2";

import { db } from "@/utils/database";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { club_id } = req.query;
  
  switch (req.method) {
    case 'GET':
      if (club_id) {
        try {
          const connectDb = await db.promise().getConnection();
          const [ row ] = await connectDb.query<RowDataPacket[]>(`SELECT * FROM tb_club where club_id = '${club_id}'`);
          const result = {...row[0]};
          delete result.club_admin_id;
          delete result.club_join_state;
          result.club_join_questions = JSON.parse(result.club_join_questions);
          connectDb.release();
          return res.status(200).json(result);
        } catch (err) {
          console.error(err);
          return res.status(500).send('내부 서버 오류');
        }
      } else {
        return res.status(403).send('잘못된 접근');
      }
    case 'PUT':
      if (club_id) {
        const body: UpdateBodyType = JSON.parse(req.body);

        // 모집 방식이 정기모집일 때 데이터 수정
        if (body.club_recruit_period === '정기모집') {
          body.club_recruit_period = `${body.period_start}~${body.period_end}`;
        }

        try {
          const connectDb = await db.promise().getConnection();
          const [ row ] = await connectDb.query<RowDataPacket[]>(`
            UPDATE tb_club
            SET club_description = '${body.club_description}', club_post = '${body.club_post}', club_join_questions = '${body.club_join_questions.length ? JSON.stringify(body.club_join_questions) : null}', club_recruit_period = '${body.club_recruit_period}'
            WHERE club_id = '${club_id}'
          `);
          connectDb.release();
          return res.status(200).json({});
        } catch (err) {
          console.error(err);
          return res.status(500).send('내부 서버 오류');
        }
      } else {
        return res.status(403).send('잘못된 접근');
      }
    case 'POST':
      return res.status(405).send('잘못된 요청 메서드');
    case 'DELETE':
      return res.status(405).send('잘못된 요청 메서드');
  }
}

interface UpdateBodyType {
  club_description: string;
  club_post: string;
  club_join_questions: string[];
  club_recruit_period: string;
  period_start: string;
  period_end: string;
}