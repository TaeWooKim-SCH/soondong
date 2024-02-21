import { NextApiRequest, NextApiResponse } from "next";
import { RowDataPacket } from "mysql2";

import { db } from "@/utils/database";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { club_id } = req.query;
  const { user } = req.query;

  switch (req.method) {
    case 'GET':
      try {
        const connectDb = await db.promise().getConnection();
        const [ row ] = await connectDb.query<RowDataPacket[]>(`SELECT club_admin_id FROM tb_club where club_id = '${club_id}'`);
        if (user !== row[0].club_admin_id) {
          return res.status(403).send('잘못된 접근');
        } else {
          const members = await connectDb.query<RowDataPacket[]>(`
            SELECT name, student_id, school_college, school_department, phone_number
            FROM tb_club_members
              INNER JOIN tb_member
              ON tb_club_members.user_id = tb_member.id
            WHERE tb_club_members.club_id = '${club_id}'
          `);
          return res.status(200).json(members[0]);
        }
      } catch (err) {
        console.error(err);
        return res.status(500).send('내부 서버 오류');
      }
    case 'POST':
      return res.status(405).send('잘못된 요청 메서드');
    case 'PUT':
      return res.status(405).send('잘못된 요청 메서드');
    case 'DELETE':
      return res.status(405).send('잘못된 요청 메서드');
  }

  return res.json({});
}