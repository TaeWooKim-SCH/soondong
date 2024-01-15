import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../utills/database";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXT_AUTH_SECRET;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = await getToken({ req, secret });
  console.log(token);
  if (token) {
    db.execute(`select name from tb_member where name = '${token?.name}';`, (err, result) => {
      if (err) {
        console.error(err);
      }
      else {
        if (Array.isArray(result) && !result.length) return res.redirect('/signup/form');
        else return res.redirect('/home');
      }
    });
  }
  else {
    return res.redirect('/home').status(404);
  }

  db.end();
}