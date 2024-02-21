import Layout from "@/app/_components/layouts/Layout";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function MyClubMembers({ params }: PageProps) {
  const session = await getServerSession(authOptions);
  const members:MemberType[] = await getData(params.club_id, session?.user.id);
  console.log(members);

  return (
    <Layout className="flex flex-col items-center">
      <section className="flex flex-col items-center mb-5 sm:mb-10">
        <div className="text-2xl text-blue font-bold md:text-[2rem]">동아리 구성원 관리</div>
      </section>
      <section>
        <ul className="text-center">
          <li className="grid grid-cols-7 text-xs sm:text-base">
            <div>이름</div>
            <div>학번</div>
            <div>단과대</div>
            <div>학과</div>
            <div>전화번호</div>
            <div>직위</div>
            <div>가입상태</div>
          </li>
          {members.map((memberInfo) => (
            <li className="grid grid-cols-7 text-xs sm:text-base" key={memberInfo.student_id}>
              <div>{memberInfo.name}</div>
              <div>{memberInfo.student_id}</div>
              <div>{memberInfo.school_college}</div>
              <div>{memberInfo.school_department}</div>
              <div>{memberInfo.phone_number}</div>
              <div>{memberInfo.member_position}</div>
              <div>{memberInfo.join_state}</div>
            </li>
          ))}
        </ul>
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

interface MemberType {
  name: string;
  student_id: string;
  school_college: string;
  school_department: string;
  phone_number: string;
  member_position: string;
  join_state: string;
}