import Image from "next/image";
import Layout from "../_components/Layouts/Layout";
import SignupInput from "../_components/SignupInput";

export default function Signup() {
  return (
    <Layout>
      <section className="px-10 py-32 flex flex-col justify-center items-center border border-blue rounded-lg sm:px-20">
        <Image className="w-[250px] mb-16" src="/Logo.svg" alt="로고" width={500} height={0} priority={true} />
        <form className="grid grid-cols-1">
          <section>
            <SignupInput placeholder="아이디" />
            <button type="button" className="ml-3 border border-blue text-blue text-sm rounded-md px-3 py-1">중복확인</button>
          </section>
          <SignupInput placeholder="비밀번호" />
          <SignupInput placeholder="비밀번호 확인" />
          <SignupInput placeholder="학번" />
          <section>
            <SignupInput placeholder="학교 이메일"/>
            <button type="button" className="ml-3 border border-blue text-blue text-sm rounded-md px-3 py-1">이메일 인증</button>
          </section>
          <section className="mt-10">
            <div className="font-bold mb-1">약관동의</div>
            <hr className="border-silver mb-3" />
            <ul>
              <li>
                <label>
                  <input className="mr-2" type="checkbox" />
                  <span>[필수] 이용약관 동의</span>
                </label>
              </li>
              <li>
                <label>
                  <input className="mr-2" type="checkbox" />
                  <span>[필수] 개인정보 수집 및 이용 동의</span>
                </label>
              </li>
            </ul>
          </section>
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