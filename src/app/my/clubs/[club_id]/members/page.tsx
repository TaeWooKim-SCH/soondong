import Layout from "@/app/_components/layouts/Layout";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function MyClubMembers({ params }: PageProps) {
  const session = await getServerSession(authOptions);
  const members = await getData(params.club_id, session?.user.id);
  console.log(members);

  return (
    <Layout className="flex flex-col items-center">
      <section className="flex flex-col items-center mb-5 sm:mb-10">
        <div className="text-2xl text-blue font-bold md:text-[2rem]">동아리 구성원 관리</div>
      </section>
      <section>

      </section>
    </Layout>
  );
}

async function getData(club_id: string, user_id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/my/clubs/${club_id}/members?user=${user_id}`, { cache: 'no-store' });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

interface PageProps {
  params: {
    club_id: string;
  }
}