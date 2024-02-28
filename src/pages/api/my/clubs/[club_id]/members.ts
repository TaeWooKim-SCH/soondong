import { NextApiRequest, NextApiResponse } from "next";
import { RowDataPacket } from "mysql2";

import { db } from "@/utils/database";
import { decrypt } from "@/utils/modules";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { club_id } = req.query;
  const { user } = req.query;

  // 403 Forbidden
  if (!user || typeof(user) !== 'string') {
    return res.status(403).send('잘못된 접근');
  }

  // 동아리 회장 검증
  try {
    const connectDb = await db.promise().getConnection();
    const [ row ] = await connectDb.query<RowDataPacket[]>(`SELECT club_admin_id FROM tb_club where club_id = '${club_id}'`);
    if (decrypt(decodeURIComponent(user), process.env.NEXT_PUBLIC_AES_ID_SECRET_KEY) !== row[0].club_admin_id) {
      connectDb.release();
      return res.status(403).send('잘못된 접근');
    }
    connectDb.release();
  } catch (err) {
    console.log(err);
    return res.status(500).send('서버 관련 오류');
  }

  // 요청 메서드 구분
  switch (req.method) {
    case 'GET':
      try {
        const connectDb = await db.promise().getConnection();
        const members = await connectDb.query<RowDataPacket[]>(`
          SELECT join_id, name, student_id, school_college, school_department, phone_number, join_questions, member_position, join_state
          FROM tb_club_members
            INNER JOIN tb_member
            ON tb_club_members.user_id = tb_member.id
          WHERE tb_club_members.club_id = '${club_id}'
        `);
        connectDb.release();
        return res.status(200).json(members[0]);
      } catch (err) {
        console.error(err);
        return res.status(500).send('내부 서버 오류');
      }
    case 'POST':
      return res.status(405).send('잘못된 요청 메서드');
    case 'PUT':
      const body = req.body;
      try {
        const connectDb = await db.promise().getConnection();
        const result = await connectDb.query<RowDataPacket[]>(`
          UPDATE tb_club_members
          SET join_state = '${body.state}'
          WHERE join_id = '${body.join_id}'
        `);
        connectDb.release();
        return res.status(200).json({join_state: body.join_state});
      } catch (err) {
        console.error(err);
        return res.status(500).send('내부 서버 오류');
      }
    case 'DELETE':
      return res.status(405).send('잘못된 요청 메서드');
  }

  return res.json({});
}