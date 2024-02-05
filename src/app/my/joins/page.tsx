import { getServerSession } from "next-auth";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Layout from "@/app/_components/layouts/Layout";
import Title from "@/app/_components/Title";
import Toggle from "@/app/_components/Toggle";
import JoinCard from "./_components/JoinCard";

async function getData(userId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/my/clubs/joins?user=${userId}`, { cache: 'no-store' });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  
  return res.json();
}

export default async function MyJoins() {
  const session = await getServerSession(authOptions);
  const joinsData: JoinData[] = await getData(session?.user.id);
  
  return (
    <Layout className="flex flex-col items-center">
      <section className="w-full mb-10 sm:w-[500px]">
        <Title>동아리 신청 목록</Title>
        <div className="flex justify-end items-center">
          <div className="mr-3 text-end text-sm sm:text-base">가입된 동아리만 보기</div>
          <Toggle />
        </div>
      </section>
      <section className="w-full grid grid-cols-1 gap-5 sm:w-[500px]">
        {joinsData.map((join) => (
          <JoinCard joinData={join} key={join.club_id} />
        ))}
      </section>
    </Layout>
  );
}

interface JoinData {
  club_id: string;
  club_name: string;
  club_description: string;
  join_state: 'pending' | 'accept' | 'reject'; // accept, pending, reject 중 하나
}