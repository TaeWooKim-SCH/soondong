import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { RowDataPacket } from "mysql2";

import { db } from "@/utils/database";
import { generateRandomString } from "@/utils/modules";

const secret = process.env.NEXT_AUTH_SECRET;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = await getToken({ req, secret });
  const { club_id } = req.query;

  // Unauthorized
  if (!token) {
    return res.status(401).send('접근 권한 없음');
  }
  
  switch (req.method) {
    case 'GET':
      try {
        const connectDb = await db.promise().getConnection();

        // 중복 가입 방지
        const duplication = await connectDb.query<RowDataPacket[]>(
          `SELECT user_id FROM tb_club_members WHERE user_id = '${token.id}' AND club_id = '${club_id}'`
        );
        if (duplication[0].length >= 1) {
          connectDb.release();
          return res.status(409).send('중복 가입');
        }
        
        // 유저 정보 재확인
        const [ row ] = await connectDb.query<RowDataPacket[]>(
          `SELECT student_id, name, phone_number, school_college, school_department
          FROM tb_member where id = '${token.id}'`
        );
        connectDb.release();
        return res.status(200).json(row[0]);
      } catch (err) {
        console.error(err);
        return res.status(500).send('내부 서버 오류');
      }
    case 'POST':
      try {
        const body = req.body;
        const join_id = generateRandomString();
        const connectDb = await db.promise().getConnection();
        const result = await connectDb.query<RowDataPacket[]>(
          `insert into tb_club_members(join_id, club_id, user_id, join_questions)
          values('${join_id}', '${club_id}', '${token.id}', '${JSON.stringify(body)}')`
        );
        connectDb.release();
        return res.status(201).send('가입 신청 성공');
      } catch (err) {
        console.error(err);
        return res.status(500).send('내부 서버 오류');
      }
  }
}