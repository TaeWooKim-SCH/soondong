import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXT_AUTH_SECRET;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Method Not Allowed
  if (req.method !== 'GET') {
    return res.status(405).send('잘못된 요청 메서드');
  }

  const token = await getToken({ req, secret });

  if (!token) {
    return res.status(401).send('접근 권한 없음');
  }

  return res.status(201).send('동아리 신청 내역');
}