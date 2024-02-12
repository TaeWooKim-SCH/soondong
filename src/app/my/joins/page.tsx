import { getServerSession } from "next-auth";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Layout from "@/app/_components/layouts/Layout";
import Title from "@/app/_components/Title";
import ToggleContainer from "@/app/_components/ToggleContainer";
import JoinsContainer from "./_components/JoinsContainer";

async function getData(userId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/my/clubs/joins?user=${userId}`, { cache: 'no-store' });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  
  return res.json();
}

export default async function MyJoins() {
  // 서버에서 getToken 함수가 먹히지 않아 세션을 클라이언트에서 받고 서버로 넘겨줌
  const session = await getServerSession(authOptions);
  const joinsData: JoinData[] = await getData(session?.user.id);
  
  return (
    <Layout className="flex flex-col items-center">
      <section className="w-full mb-5 sm:w-[500px]">
        <Title>동아리 신청 목록</Title>
        <div className="flex justify-end items-center mt-3">
          <div className="mr-3 text-end text-sm sm:text-base">가입된 동아리만 보기</div>
          <ToggleContainer toggleName="joined" />
        </div>
      </section>
      <JoinsContainer joinsData={joinsData} />
    </Layout>
  );
}

interface JoinData {
  club_id: string;
  club_name: string;
  club_description: string;
  join_state: 'pending' | 'accept' | 'reject'; // accept, pending, reject 중 하나
}