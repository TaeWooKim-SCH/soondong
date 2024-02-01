import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { RowDataPacket } from "mysql2";

import { db } from "@/utils/database";
import { generateRandomString } from "@/utils/modules";

const secret = process.env.NEXT_AUTH_SECRET;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = await getToken({ req, secret });

  // Unauthorized
  if (!token) {
    return res.status(401).send('접근 권한 없음');
  }
  
  switch (req.method) {
    case 'GET':
      try {
        const connectDb = await db.promise().getConnection();
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
        const { club_id } = req.query;
        const join_id = generateRandomString();
        const connectDb = await db.promise().getConnection();
        const result = await connectDb.query<RowDataPacket[]>(
          `insert into tb_club_members(join_id, club_id, user_id)
          values('${join_id}', '${club_id}', '${token.id}')`
        );
        connectDb.release();
        return res.status(201).send('가입 신청 성공');
      } catch (err) {
        console.error(err);
        return res.status(500).send('내부 서버 오류');
      }
  }
}