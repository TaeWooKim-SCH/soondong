import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../utills/database";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXT_AUTH_SECRET;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = await getToken({ req, secret });
  if (token) {
    db.execute(`select name from tb_member where name = '${token?.name}';`, (err, result) => {
      if (err) {
        console.error(err);
      }
      else {
        console.log(result);
        if (Array.isArray(result) && !result.length) return res.redirect('/signup/form');
        else return res.redirect('/home');
      }
    });
  }

  db.end();
}