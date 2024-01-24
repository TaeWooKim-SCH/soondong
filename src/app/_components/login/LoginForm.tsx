'use client'

import { SubmitHandler, useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { FaUser } from "react-icons/fa";
import { RiLock2Fill } from "react-icons/ri";
import LoadingUI from "../LoadingUI";
import { throttle } from "lodash";
import { encrypt } from "@/utils/modules";

export default function LoginForm() {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<FormInputs>({
    defaultValues: { id: '', password: ''}
  });

  const onSubmit: SubmitHandler<FormInputs> = throttle(async (data) => {
    if (!data.id) {
      return alert('아이디를 입력해주세요.');
    }
    else if (!data.password) {
      return alert('아이디를 입력해주세요.');
    }
    try {
      const res = await signIn('credentials', {
        id: encrypt(data.id, process.env.NEXT_PUBLIC_AES_ID_SECRET_KEY),
        password: encrypt(data.password, process.env.NEXT_PUBLIC_AES_PW_SECRET_KEY),
        redirect: false
      });
      if (res?.error) {
        alert('아이디 또는 비밀번호가 일치하지 않습니다.');
        window.location.reload();
      }
      else {
        window.location.reload();
      }
    } catch (err) {
      console.error('로그인 실패', err);
    }
  }, 2000);

  return (
    <form className="grid grid-cols-1" onSubmit={handleSubmit(onSubmit)}>
      {isSubmitting && <LoadingUI />}
      <section className="mb-3 flex justify-center items-center">
        <div className="mr-2">
          <FaUser size="20" color="#26539C" />
        </div>
        <input
          className={`px-1 py-2 mb-1 outline-none bg-bg-color border-b border-b-silver`}
          type='text'
          placeholder="아이디"
          {...register('id', { required: true })}
        />
      </section>
      <section className="flex justify-center items-center">
        <div className="mr-2">
          <RiLock2Fill size="20" color="#26539C" />
        </div>
        <input
          className={`px-1 py-2 mb-1 outline-none bg-bg-color border-b border-b-silver`}
          type='password'
          placeholder="비밀번호"
          {...register('password', { required: true })}
        />
      </section>
      <button className="mt-10 bg-blue text-white px-5 py-2 rounded-md font-normal">로그인</button>
    </form>
  );
}

interface FormInputs {
  id: string;
  password: string;
}