'use client'

import { encrypt } from "@/utils/modules";

export default function MemberCard({ adminId, clubId, memberInfo }: PropsType) {
  // react-query 도입 검토
  const joinStateHandler = async (admin_id: string, club_id: string, join_id: string, state: 'accept' | 'reject') => {
    const encryptedAdminId = encrypt(admin_id, process.env.NEXT_PUBLIC_AES_ID_SECRET_KEY);
    try {
      const res = await fetch(`/api/my/clubs/${club_id}/members?user=${encodeURIComponent(encryptedAdminId)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          join_id: join_id,
          state: state
        })
      });
      
      if (!res.ok) {
        throw new Error('Failed to UPDATE');
      } else {
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
      return alert('가입상태 변경에 실패했습니다. 다시 시도해주세요.');
    }
  }

  return (
    <article className="border-[1.5px] border-blue rounded-md p-3 sm:p-5 space-y-2 text-sm sm:text-base">
      <section className="font-bold text-blue mb-3 text-base sm:text-lg">{ memberInfo.name }</section>
      <section>학번: { memberInfo.student_id }</section>
      <section>단과대: { memberInfo.school_college }</section>
      <section>학과: { memberInfo.school_department }</section>
      <section>전화번호: { memberInfo.phone_number }</section>
      <section>직위: { memberInfo.member_position }</section>
      {memberInfo.join_state === 'pending' ? (
        <section className="flex items-center">
          <div>가입상태:</div>
          <div className="ml-2">
            <button
              className="text-xs border-[1.5px] border-blue rounded-md px-3 py-1 mr-1"
              onClick={() => joinStateHandler(adminId, clubId, memberInfo.join_id, 'accept')}
            >승인</button>
            <button
              className="text-xs border-[1.5px] border-red rounded-md px-3 py-1"
              onClick={() => joinStateHandler(adminId, clubId, memberInfo.join_id, 'reject')}
            >거부</button>
          </div>
        </section>
      ) : (memberInfo.join_state === 'accept' ? (
        <section>가입상태: 승인</section>
        ) : (
        <section>가입상태: 거부</section>
      ))}
    </article>
  );
}

interface PropsType {
  adminId: string;
  clubId: string;
  memberInfo: {
    join_id: string;
    name: string;
    student_id: string;
    school_college: string;
    school_department: string;
    phone_number: string;
    member_position: string;
    join_state: string;
  }
}