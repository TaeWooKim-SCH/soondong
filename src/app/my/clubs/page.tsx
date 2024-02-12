import Title from "@/app/_components/Title";
import Layout from "@/app/_components/layouts/Layout";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function MyClubs() {
  // 서버에서 getToken 함수가 먹히지 않아 세션을 클라이언트에서 받고 서버로 넘겨줌
  const session = await getServerSession(authOptions);
  const myClubs = await getData(session?.user.id);
  console.log(myClubs);

  return (
    <Layout className="lg:px-96 xl:px-[500px]">
      <section className="flex justify-between">
        <Title>내 동아리 관리</Title>
        <div>
          <Link
            className="text-xs py-2 px-4 bg-blue text-white rounded-md sm:text-sm"
            href="/my/clubs/add"
          >동아리 개설</Link>
        </div>
      </section>
      <section className="grid grid-cols-1 text-center">
        <div className="text-3xl text-blue font-bold mt-52">직접 개설한 동아리가 없어요!!!</div>
      </section>
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