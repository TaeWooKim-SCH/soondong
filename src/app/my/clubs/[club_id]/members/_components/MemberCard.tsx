'use client'

import { useMutation } from "@tanstack/react-query";

import { encrypt } from "@/utils/modules";
import LoadingUI from "@/app/_components/LoadingUI";

export default function MemberCard({ adminId, clubId, memberInfo }: PropsType) {
  const joinQuestions: [string, string][] | null = memberInfo.join_questions ? Object.entries(JSON.parse(memberInfo.join_questions)) : null;
  
  // TODO: 커스텀훅으로 구현  
  const updateJoinStateHandler = async (el: UpdateJoinHandlerParams) => {
    const encryptedAdminId = encrypt(el.admin_id, process.env.NEXT_PUBLIC_AES_ID_SECRET_KEY);
    const res = await fetch(`/api/my/clubs/${el.club_id}/members?user=${encodeURIComponent(encryptedAdminId)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        join_id: el.join_id,
        state: el.state
      })
    });
    if (!res.ok) {
      throw new Error('Failed to update user data');
    }
    return res.json();
  }
  const { mutate, isPending } = useMutation({
    mutationFn: updateJoinStateHandler,
    onSuccess: () => window.location.reload(),
    onError: (err) => {
      console.error(err);
      return alert('가입상태 변경에 실패했습니다. 다시 시도해주세요.');
    }
  });
  const updateInfo = { admin_id: adminId, club_id: clubId, join_id: memberInfo.join_id };

  if (isPending) {
    return <LoadingUI />;
  }

  return (
    <article className="max-w-[800px] border-[1.5px] border-blue rounded-md p-3 sm:p-5 space-y-2 text-sm sm:text-base">
      <section className="font-bold text-blue text-base sm:text-lg">{ memberInfo.name }</section>
      <section className="border-[1.5px] border-blue rounded-md p-3 text-sm sm:text-base">
        {joinQuestions && joinQuestions.map((question, idx) => (
          <article className="mb-3" key={idx}>
            <div className="text-blue font-bold mb-1">Q{idx + 1}. {question[0]}</div>
            <div>{question[1]}</div>
          </article>
        ))}
      </section>
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
              onClick={() => mutate({...updateInfo, state: 'accept'})}
            >승인</button>
            <button
              className="text-xs border-[1.5px] border-red rounded-md px-3 py-1"
              onClick={() => mutate({...updateInfo, state: 'reject'})}
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
    join_questions: string | null;
    member_position: string;
    join_state: string;
  }
}

interface UpdateJoinHandlerParams {
  admin_id: string;
  club_id: string;
  join_id: string;
  state: 'accept' | 'reject';
}