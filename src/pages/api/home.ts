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

    return res.status(200).json(row);
  } catch (err) {
    console.error(err);
    return res.status(500).send('내부 서버 오류');
  }
}