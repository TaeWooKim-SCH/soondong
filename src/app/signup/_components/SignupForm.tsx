'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { throttle } from "lodash";

import SignupInput from "./SignupInput";
import { collegeInfo } from "../../_modules/data";
import { decrypt, encrypt } from "@/utils/modules";
import LoadingUI from "../../_components/LoadingUI";

export default function SignupForm() {
  const router = useRouter();
  const [departs, setDeparts] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const idRegex = /^[a-z]+[a-z0-9]{5,19}$/g;
  const idMessage = '아이디는 영문자로 시작하는 영문자 또는 숫자 6~20자로 입력해야 합니다.';
  const pwRegex = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/;
  const pwMessage = '비밀번호는 8~16자 영문, 숫자 조합으로 입력해야 합니다.';
  const emailRegex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  const {
      register,
      handleSubmit,
      watch,
      setValue,
      formState: { isSubmitting, errors }
    } = useForm<FormInputs>({
    defaultValues: {
      id: '',
      id_auth: false,
      password: '',
      password_confirm: '',
      name: '',
      student_id: '',
      school_college: '단과대 선택',
      school_department: '학과 선택',
      phone_number: '',
      school_email: '',
      school_auth: false,
      school_auth_code: '',
      agree_use: false,
      agree_privacy: false
    },
    mode: 'onChange'
  });
  const { onChange } = register('school_college', {
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (e.target.value === '단과대 선택') {
        return;
      }
      const result = collegeInfo.filter((college) => college.collegeName === e.target.value)[0].departList;
      setDeparts(result);
    }
  });
  
  // 아이디 중복확인 요청 핸들러
  const existIdAuthHandler = throttle(async (id: string) => {
    if (errors.id || !watch('id')) {
      return alert(idMessage);
    }

    try {
      setLoading(true);
      const res = await fetch('/api/auth/id', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
      });
      setLoading(false);
      if (res.status === 409) {
        return alert('이미 가입된 아이디입니다.');
      }
      else if (res.status === 200) {
        setValue('id_auth', true);
        return alert('사용 가능한 아이디입니다.');
      }
      else {
        return alert('알 수 없는 오류가 발생했습니다. 다시 시도해주세요.');
      }
    } catch (err) {
      console.error('중복확인 요청에 실패했습니다.', err);
    }
  }, 2000);
  
  // 이메일 인증번호 전송 요청 핸들러
  const emailAuthHandler = throttle(async (email: string) => {
    if (!email.includes('@sch.ac.kr') || errors.school_email) {
      return alert('학교 이메일을 입력해주세요.');
    }
    alert(`${email}로 인증번호를 전송했습니다. 메일함을 확인해주세요.`);
    try {
      const res = await fetch('/api/auth/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });
      
      const json: EmailAuthRes = await res.json();
      sessionStorage.setItem('email_auth_code', json.auth_code);
    } catch (err) {
      console.error('인증 요청에 실패했습니다.', err);
    }
  }, 3000);
  
  // 이메일 인증번호 확인 핸들러
  const emailAuthConfirmHandler = throttle((code: string) => {
    const encryptedCode = sessionStorage.getItem('email_auth_code');
    if (encryptedCode) { // 세션스토리지에 암호화된 인증 코드가 존재한다면
      const decryptedCode = decrypt(encryptedCode, process.env.NEXT_PUBLIC_AES_EMAIL_SECRET_KEY); // 인증 코드 복호화
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
  }, 3000);
  
  // 회원가입 요청 핸들러 -> 쓰로틀 적용하기
  const onSubmit: SubmitHandler<FormInputs> = throttle(async (data) => {
    if (!data.id_auth) {
      return alert('아이디 중복확인을 해주세요.');
    }
    else if (!data.name) {
      return alert('이름을 입력해주세요.');
    }
    else if (data.student_id.length !== 8) {
      return alert('학번을 다시 확인해주세요.');
    }
    else if (data.school_college === '단과대 선택' || data.school_department === '학과 선택') {
      return alert('단과대와 학과를 선택해주세요.')
    }
    else if (!data.school_auth) {
      return alert('이메일 인증을 해주세요.');
    }
    else if (!data.agree_use || !data.agree_privacy) {
      return alert('약관에 동의를 해주세요.');
    }

    try {
      const reqForm = {
        id: data.id,
        password: encrypt(data.password, process.env.NEXT_PUBLIC_AES_PW_SECRET_KEY),
        student_id: data.student_id,
        name: data.name,
        phone_number: data.phone_number,
        school_college: data.school_college,
        school_department: data.school_department
      };

      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqForm)
      });

      if (res.ok) {
        alert('가입이 완료되었습니다.');
        return router.push('/login');
      }
      else {
        return alert('가입에 실패하였습니다.');
      }
    } catch (err) {
      console.error('오류가 발생했습니다.', err);
    }
  }, 2000);
  
  return (
    <form className="grid grid-cols-1" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      { isSubmitting && <LoadingUI /> }
      <section className="mb-3">
        <div>
          <SignupInput
            className={`${watch('id_auth') || loading ? 'bg-light-silver text-silver' : ''}`}
            placeholder="아이디"
            disabled={watch('id_auth')}
            register={{...register('id', {
              required: true,
              pattern: {
                value: idRegex,
                message: idMessage
              }
            })}}
          />
          <button
            className={`ml-3 text-sm rounded-md px-3 py-1 ${watch('id_auth') || loading ? 'bg-blue text-white' : 'border border-blue text-blue'}`}
            type="button"
            onClick={() => existIdAuthHandler(watch('id'))}
            disabled={watch('id_auth') || loading}
          >중복확인</button>
        </div>
        {errors.id && <div className="text-[0.65rem] text-blue">{errors.id.message}</div>}
      </section>
      <section className="mb-3">
        <SignupInput
          type="password"
          placeholder="비밀번호"
          register={{...register('password', {
            required: true,
            pattern: {
              value: pwRegex,
              message: pwMessage
            }
          })}}
        />
        {errors.password && <div className="text-[0.65rem] text-blue">{errors.password.message}</div>}
      </section>
      <section className="mb-3">
        <SignupInput
          type="password"
          placeholder="비밀번호 확인"
          register={{...register('password_confirm', {
            required: true,
            validate: {
              matchPassword: (value) => {
                const password = watch('password');
                return password === value || '비밀번호가 일치하지 않습니다.'
              }
            }
          })}}
        />
        {errors.password_confirm && <div className="text-[0.65rem] text-blue">{errors.password_confirm.message}</div>}
      </section>
      <section className="mb-3">
        <SignupInput
          placeholder="이름 (닉네임X)"
          register={{ ...register('name', { required: true }) }}
        />
      </section>
      <section className="mb-3">
        <SignupInput
          placeholder="학번 (8자리)"
          register={{ ...register('student_id', { required: true }) }}
        />
      </section>
      <section className="grid grid-cols-2 gap-5">
        <select
          className="px-1 py-2 mb-5 outline-none bg-bg-color border-b border-b-silver"
          {...register('school_college')}
          onChange={onChange}
        >
          <option value="단과대 선택">단과대 선택</option>
          {collegeInfo.map((college, idx) => (
            <option value={college.collegeName} key={idx}>{ college.collegeName }</option>
          ))}
        </select>
        <select
          className="px-1 py-2 mb-5 outline-none bg-bg-color border-b border-b-silver"
          {...register('school_department')}
        >
          <option value="학과 선택">학과 선택</option>
          {departs.map((depart, idx) => (
            <option value={depart} key={idx}>{ depart }</option>
          ))}
        </select>
      </section>
      <section className="mb-3">
        <SignupInput
          placeholder="전화번호 ('-' 제외하고 입력)"
          register={{ ...register('phone_number') }}
        />
      </section>
      <section className="mb-3">
        <SignupInput
          className={`${watch('school_auth') ? 'bg-light-silver text-silver' : ''}`}
          placeholder="학교 이메일"
          disabled={watch('school_auth')}
          register={{...register('school_email', {
            required: true,
            pattern: emailRegex
          })}}
        />
        <button
          className={`ml-3 text-sm rounded-md px-3 py-1 ${watch('school_auth') ? 'bg-blue text-white' : 'border border-blue text-blue'}`}
          type="button"
          onClick={() => emailAuthHandler(watch('school_email'))}
          disabled={watch('school_auth')}
        >학교 인증</button>
      </section>
      <section>
        <SignupInput
          className={`${watch('school_auth') ? 'bg-light-silver text-silver' : ''}`}
          placeholder="인증번호" register={{ ...register('school_auth_code') }}
          disabled={watch('school_auth')}
        />
        <button
          className={`ml-3 text-sm rounded-md px-3 py-1 ${watch('school_auth') ? 'bg-blue text-white' : 'border border-blue text-blue'}`}
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
              <input
                className="mr-2"
                type="checkbox"
                onClick={() => setValue('agree_use', !watch('agree_use'))}
              />
              <span>[필수] 이용약관 동의</span>
            </label>
          </li>
          <li>
            <label>
              <input
                className="mr-2"
                type="checkbox"
                onClick={() => setValue('agree_privacy', !watch('agree_privacy'))}
              />
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
  id_auth: boolean;
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
  agree_use: boolean;
  agree_privacy: boolean;
}

interface EmailAuthRes {
  success: boolean;
  auth_code: string;
}