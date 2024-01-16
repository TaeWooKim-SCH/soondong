import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../utills/database";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXT_AUTH_SECRET;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      const token = await getToken({ req, secret });
      
      if (token) {
        try {
          const connectDb = await db.promise().getConnection();
          const result = await connectDb.query(`select id from tb_member where name = '${token?.email}';`);
          console.log(result);
          if (Array.isArray(result[0]) && !result[0].length) {
            connectDb.release();
            return res.redirect('/signup/form');
          }
          else {
            connectDb.release();
            return res.redirect('/home');
          }
        }
        catch (err) {
          console.error(err);
          return res.status(500).send("내부 서버 오류");
        }
      }
      else {
        return res.redirect('/home').status(404);
      }
    case 'POST':
      console.log('post 요청');
      break;
    case 'DELETE':
      console.log('DELETE 요청');
      break;
  }
}