import { NextApiRequest, NextApiResponse } from "next";

import { db } from "@/utils/database";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Method Not Allowed
  if (req.method !== 'POST') {
    return res.status(405).send('잘못된 요청 메서드');
  }

  const body: SignupFormData = req.body;

  // 아이디 중복확인 -> 다른 툴을 이용해 접근할 때를 방지
  const response = await fetch(`${process.env.DOMAIN}/api/auth/id`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: body.id })
  });

  if (!response.ok) {
    return res.status(403).send('잘못된 접근입니다.');
  }

  try {
    const connectDb = await db.promise().getConnection();
    const result = await connectDb.query(
      `insert into tb_member(id, student_id, password, name, phone_number, school_college, school_department, school_email)
      values('${body.id}', '${body.student_id}', '${body.password}', '${body.name}', '${body.phone_number}', '${body.school_college}', '${body.school_department}', '${body.school_email}');`
    );
    connectDb.release();
    return res.status(200).json(body);
  } catch (err) {
    console.error(err);
    return res.status(500).send('내부 서버 오류');
  }
}

interface SignupFormData {
  id: string;
  password: string;
  name: string;
  phone_number: string;
  student_id: string;
  school_college: string;
  school_department: string;
  school_email: string;
}