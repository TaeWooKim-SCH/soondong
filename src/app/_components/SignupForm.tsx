'use client'

import { SubmitHandler, useForm } from "react-hook-form";
import cryptoJS from 'crypto-js';

import SelectColleage from "./SelectCollege";
import SignupInput from "./SignupInput";

export default function SignupForm() {
  const { register, handleSubmit, watch, setValue, formState } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = (data) => console.log(data);

  const emailAuthHandler = async (email: string) => {
    // TODO: 쓰로틀 또는 디바운스 등을 이용해 요청을 제한해야 함
    alert(`${email}로 인증번호를 전송했습니다. 메일함을 확인해주세요.`);

    const res = await fetch('api/auth/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    });

    const json: EmailAuthRes = await res.json();
    sessionStorage.setItem('email_auth_code', json.auth_code);
  }

  const emailAuthConfirmHandler = (code: string) => {
    const encryptedCode = sessionStorage.getItem('email_auth_code');
    if (encryptedCode) { // 세션스토리지에 암호화된 인증 코드가 존재한다면
      const decryptedCode = decrypt(encryptedCode); // 인증 코드 복호화
      // TODO: 순천향대 이메일만 허용하도록 코드 수정
      // TODO: 인증에 성공하면 입력 코드와 입력 확인 버튼을 비활성화 시켜야 함
      if (decryptedCode === code) { // 입력한 코드와 복호화된 코드가 같다면
        sessionStorage.removeItem('email_auth_code');
        setValue('school_auth', true);
        return alert('인증성공');
      } else {
        return alert('인증실패');
      }
    } else {
      return alert('이메일을 입력하고 이메일 인증 버튼을 눌러주신 후 시도해주세요.');
    }
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
          onClick={() => emailAuthHandler(watch('school_email'))}
          {...register('school_auth', { value: false })}
        >이메일 인증</button>
      </section>
      <section>
        {/* TODO: 이메일 인증에 성공하면 input 배경색 변경하고 버튼의 디자인도 바뀌도록 하기 */}
        <SignupInput className={`${watch('school_auth') ? 'bg-silver' : ''}`} placeholder="인증번호" register={{ ...register('school_auth_code') }} />
        <button
          className="ml-3 border border-blue text-blue text-sm rounded-md px-3 py-1"
          type="button"
          onClick={() => emailAuthConfirmHandler(watch('school_auth_code'))}
          disabled={watch('school_auth')}
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

function decrypt(code: string) {
  console.log(process.env.NEXT_PUBLIC_AES_SECRET_KEY);
  const decrypted = cryptoJS.AES.decrypt(code, process.env.NEXT_PUBLIC_AES_SECRET_KEY);
  return decrypted.toString(cryptoJS.enc.Utf8);
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

interface EmailAuthRes {
  success: boolean;
  auth_code: string;
}