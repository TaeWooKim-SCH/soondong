'use client'

import SelectColleage from "./SelectCollege";
import SignupInput from "./SignupInput";

export default function SignupForm() {
  const emailAuthHandler = async (email: string) => {
    const res = await fetch('api/auth/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    });
  }

  return (
    <form className="grid grid-cols-1">
      <section>
        <SignupInput placeholder="아이디" />
        <button type="button" className="ml-3 border border-blue text-blue text-sm rounded-md px-3 py-1">중복확인</button>
      </section>
      <SignupInput placeholder="비밀번호" />
      <SignupInput placeholder="비밀번호 확인" />
      <SignupInput placeholder="이름 (닉네임X)" />
      <SignupInput placeholder="학번" />
      <SelectColleage />
      <SignupInput placeholder="전화번호 ('-'를 빼고 입력해주세요)" />
      <section>
        <SignupInput placeholder="학교 이메일"/>
        <button type="button" className="ml-3 border border-blue text-blue text-sm rounded-md px-3 py-1">이메일 인증</button>
      </section>
      <section>
        <SignupInput placeholder="인증번호"/>
        <button type="button" className="ml-3 border border-blue text-blue text-sm rounded-md px-3 py-1">확인</button>
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
  );
}