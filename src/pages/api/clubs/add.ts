import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Method Not Allowed
  if (req.method !== 'POST') {
    return res.status(405).send('잘못된 요청 메서드');
  }
  const body = req.body;
  console.log(body.club_img);
  console.log(body.club_post);
  res.status(200).json(body);
}