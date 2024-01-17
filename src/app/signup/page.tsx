import Image from "next/image";
import Layout from "../_components/Layouts/Layout";
import SignupInput from "../_components/SignupInput";

export default function Signup() {
  return (
    <Layout>
      <section className="px-10 py-32 flex flex-col justify-center items-center border border-blue rounded-lg sm:px-20">
        <Image className="w-[250px] mb-16" src="/Logo.svg" alt="로고" width={500} height={0} priority={true} />
        <form className="flex flex-col justify-center items-center">
          <SignupInput placeholder="아이디" />
          <SignupInput placeholder="비밀번호" />
          <SignupInput placeholder="비밀번호 확인" />
          <SignupInput placeholder="학번" />
          <SignupInput placeholder="학교 이메일"/>
          <button className="mt-10 bg-blue text-white px-5 py-2 rounded-md font-normal">회원가입</button>
        </form>
      </section>
    </Layout>
  );
}


// export default function Signup() {
//   return (
//     <LoginLayout>카카오로 시작하기</LoginLayout>
//   );
// }