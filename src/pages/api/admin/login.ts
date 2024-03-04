import { NextApiRequest, NextApiResponse } from "next";

import { decrypt } from "@/utils/modules";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const body: BodyTypes = req. body;
  const decryptId = decrypt(body.id, process.env.NEXT_PUBLIC_AES_ID_SECRET_KEY);
  const decryptPw = decrypt(body.password, process.env.NEXT_PUBLIC_AES_PW_SECRET_KEY);
  
  if (decryptId === process.env.ADMIN_ID && decryptPw === process.env.ADMIN_PW) {
    return res.status(200).send('로그인 성공');
  } else {
    return res.status(401).send('아이디 또는 비밀번호 불일치');
  }
}

interface BodyTypes {
  id: string;
  password: string;
}