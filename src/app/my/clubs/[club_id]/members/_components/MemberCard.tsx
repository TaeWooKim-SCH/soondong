

export default function MemberCard({ clubId, memberInfo }: PropsType) {
  const joinStateHandler = async (studentId: string, state: 'accept' | 'reject') => {
    const res = await fetch(`/api/my/clubs/${clubId}/members?user`)
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
            >승인</button>
            <button
              className="text-xs border-[1.5px] border-red rounded-md px-3 py-1"
            >거부</button>
          </div>
        </section>
      ) : (
        <section>가입상태: { memberInfo.join_state }</section>
      )}
    </article>
  );
}

interface PropsType {
  clubId: string;
  memberInfo: {
    name: string;
    student_id: string;
    school_college: string;
    school_department: string;
    phone_number: string;
    member_position: string;
    join_state: string;
  }
}