import Link from "next/link";
import { getServerSession } from "next-auth";

import Title from "@/app/_components/Title";
import Layout from "@/app/_components/layouts/Layout";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import MyClubCard from "./_components/MyClubCard";

export default async function MyClubs() {
  // 서버에서 getToken 함수가 먹히지 않아 세션을 클라이언트에서 받고 서버로 넘겨줌
  const session = await getServerSession(authOptions);
  const myClubs: MyClubInfo[] = await getData(session?.user.id);

  return (
    <Layout className="px-10 py-10">
      <section className="max-w-[600px] mx-auto flex justify-between mb-10">
        <Title>내 동아리 관리</Title>
        <div>
          <Link
            className="text-xs py-2 px-4 bg-blue text-white rounded-md sm:text-sm"
            href="/my/clubs/add"
          >동아리 개설</Link>
        </div>
      </section>
      {!myClubs.length ? (
        <section className="grid grid-cols-1 text-center">
          <div className="text-3xl text-blue font-bold mt-52">직접 개설한 동아리가 없어요!!!</div>
        </section>
      ) : (
        <section className="grid grid-cols-1 gap-5 place-items-center">
          {myClubs.map((myClubInfo) => (
            <MyClubCard myClubInfo={myClubInfo} key={myClubInfo.club_id} />
          ))}
        </section>
      )}
    </Layout>
  );
}

async function getData(userId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/my/clubs?user=${userId}`, { cache: 'no-store' });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  
  return res.json();
}

interface MyClubInfo {
  club_id: string;
  club_name: string;
  club_description: string;
  club_recruit_period: string;
  club_img_url: string;
  club_category: string;
}