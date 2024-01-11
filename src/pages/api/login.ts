import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../utills/database";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXT_AUTH_SECRET;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = await getToken({ req, secret });
  console.log(token);
  db.query(`select name from tb_member where name = ${token?.name};`, (err, result) => {
    if (err) {
      console.error(err);
    }
    else {
      if (result) return res.json(true);
      else return res.json(false);
      // return res.json(result);
      
    }
  });

  db.end();
}