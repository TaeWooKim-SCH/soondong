export default function MemberCard({ memberInfo }: PropsType) {
  return (
    <article className="border-[1.5px] border-blue rounded-md p-5">
      <section>이름: { memberInfo.name }</section>
      <section>학번: { memberInfo.student_id }</section>
      <section>단과대: { memberInfo.school_college }</section>
      <section>학과: { memberInfo.school_department }</section>
      <section>직위: { memberInfo.member_position }</section>
      <section>가입상태: { memberInfo.join_state }</section>
    </article>
  );
}

interface PropsType {
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