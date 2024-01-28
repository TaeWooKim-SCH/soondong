import { NextApiRequest, NextApiResponse } from "next";
import { S3 } from "aws-sdk";
import formidable from "formidable";
import fs from 'fs';

// 바디파서 해제
export const config = {
  api: {
    bodyParser: false
  }
}

const s3 = new S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Method Not Allowed
  if (req.method !== 'POST') {
    return res.status(405).send('잘못된 요청 메서드');
  }

  // 바디 폼 데이터 파싱
  const form = formidable({});
  const [filed, files] = await form.parse(req);

  if (files.club_img) {
    const readStream = fs.createReadStream(files.club_img[0].filepath);
    const uploadParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: files.club_img[0].originalFilename || '',
      Body: readStream,
    };

    try {
      const result = await s3.upload(uploadParams).promise();
      console.log(result.Location);
      return res.status(201).json({ img_url: result.Location });
    } catch (err) {
      console.error('S3 업로드 실패', err);
      return res.status(500).send('서버 관련 오류');
    }
  } else {
    res.status(500).send('알 수 없는 오류');
  }
}