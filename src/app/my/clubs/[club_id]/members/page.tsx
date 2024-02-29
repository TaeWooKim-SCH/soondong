import { getServerSession } from "next-auth";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { encrypt } from "@/utils/modules";
import Layout from "@/app/_components/layouts/Layout";
import MemberCard from "./_components/MemberCard";

export default async function MyClubMembers({ params }: PageProps) {
  const session = await getServerSession(authOptions);
  const members:MemberType[] = await getData(params.club_id, session?.user.id);
  
  // 대기중인 사용자 먼저 보여주기
  members.sort((a, b) => {
    if (a.join_state === 'pending' && b.join_state !== 'pending') {
      return -1;
    } else {
      return 1;
    }
  })
  
  return (
    <Layout className="flex flex-col items-center px-10 py-10">
      <section className="flex flex-col items-center mb-5 sm:mb-10">
        <div className="text-2xl text-blue font-bold md:text-[2rem]">동아리 구성원 관리</div>
      </section>
      <section>
        <ul className={`grid grid-cols-1 gap-5 ${!members[0].join_questions && 'sm:grid-cols-2 md:grid-cols-3'}`}>
        {/* <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3"> */}
          {members.map((memberInfo) => (
            <MemberCard
              adminId={session?.user.id}
              clubId={params.club_id}
              memberInfo={memberInfo}
              key={memberInfo.student_id}
            />
          ))}
        </ul>
      </section>
    </Layout>
  );
}

async function getData(club_id: string, admin_id: string) {
  const encryptedAdminId = encrypt(admin_id, process.env.NEXT_PUBLIC_AES_ID_SECRET_KEY);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/my/clubs/${club_id}/members?user=${encodeURIComponent(encryptedAdminId)}`,
    { cache: 'no-store' }
  );

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

interface MemberType {
  join_id: string;
  name: string;
  student_id: string;
  school_college: string;
  school_department: string;
  phone_number: string;
  join_questions: { [key: string]: string[] } | null;
  member_position: string;
  join_state: string;
}