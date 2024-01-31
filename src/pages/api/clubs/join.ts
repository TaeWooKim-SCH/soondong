import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { RowDataPacket } from "mysql2";

import { db } from "@/utils/database";

const secret = process.env.NEXT_AUTH_SECRET;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = await getToken({ req, secret });

  // Unauthorized
  if (!token) {
    return res.status(401).send('접근 권한 없음');
  }

  switch (req.method) {
    case 'GET':
      const connectDb = await db.promise().getConnection();
      const [ row ] = await connectDb.query<RowDataPacket[]>(
        `SELECT student_id, name, phone_number, school_college, school_department
        FROM tb_member where id = '${token.id}'`
      );
      return res.status(200).json(row[0]);
  }
}