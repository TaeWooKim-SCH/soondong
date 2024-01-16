import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../utills/database";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXT_AUTH_SECRET;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      const token = await getToken({ req, secret });
      
      if (token) {
        db.query(`select name from tb_member where name = '${token?.name}';`, (err, result) => {
          if (err) {
            console.error(err);
            db.end();
            return res.status(500).send("내부 서버 오류");
          }
          else {
            if (Array.isArray(result) && !result.length) {
              db.end();
              return res.redirect('/signup/form');
            }
            else {
              db.end();
              return res.redirect('/home');
            }
          }
        });
      }
      else {
        return res.redirect('/home').status(404);
      }

      break;
    case 'POST':
      console.log('post 요청');
      break;
    case 'DELETE':
      console.log('DELETE 요청');
      break;
  }
}