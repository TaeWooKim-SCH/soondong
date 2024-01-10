import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../utills/database";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  db.query('select * from tb_member', (err, result) => {
    if (err) {
      console.error(err);
    }
    else {
      return res.json(result);
    }
  });

  db.end();
}