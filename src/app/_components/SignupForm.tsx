'use client'

import { SubmitHandler, useForm } from "react-hook-form";
import SelectColleage from "./SelectCollege";
import SignupInput from "./SignupInput";

export default function SignupForm() {
  const { register, handleSubmit, watch, formState } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = (data) => console.log(data);

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
    <form className="grid grid-cols-1" onSubmit={handleSubmit(onSubmit)}>
      <section>
        <SignupInput placeholder="아이디" register={{ ...register('id') }} />
        <button type="button" className="ml-3 border border-blue text-blue text-sm rounded-md px-3 py-1">중복확인</button>
      </section>
      <SignupInput placeholder="비밀번호" register={{ ...register('password') }} />
      <SignupInput placeholder="비밀번호 확인" register={{ ...register('password_confirm') }} />
      <SignupInput placeholder="이름 (닉네임X)" register={{ ...register('name') }} />
      <SignupInput placeholder="학번" register={{ ...register('student_id') }} />
      <SelectColleage />
      <SignupInput placeholder="전화번호 ('-'를 빼고 입력해주세요)" register={{ ...register('phone_number') }} />
      <section>
        <SignupInput placeholder="학교 이메일" register={{ ...register('school_email') }} />
        <button
          className="ml-3 border border-blue text-blue text-sm rounded-md px-3 py-1"
          type="button"
          {...register('school_auth', { value: false })}
        >이메일 인증</button>
      </section>
      <section>
        <SignupInput placeholder="인증번호" register={{ ...register('school_auth_code') }} />
        <button
          className="ml-3 border border-blue text-blue text-sm rounded-md px-3 py-1"
          type="button"
        >확인</button>
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

interface FormInputs {
  id: string;
  password: string;
  password_confirm: string;
  name: string;
  student_id: string;
  school_college: string;
  school_department: string;
  phone_number: string;
  school_email: string;
  school_auth: boolean;
  school_auth_code: string;
}