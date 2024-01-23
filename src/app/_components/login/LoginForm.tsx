'use client'

import { SubmitHandler, useForm } from "react-hook-form";
import { FaUser } from "react-icons/fa";
import { RiLock2Fill } from "react-icons/ri";

export default function LoginForm() {
  const { register, handleSubmit, watch, formState: { isSubmitting } } = useForm<FormInputs>({
    defaultValues: { id: '', password: ''}
  });

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    console.log(data);
  }

  return (
    <form className="grid grid-cols-1" onSubmit={handleSubmit(onSubmit)}>
      <section className="mb-3 flex justify-center items-center">
        <div className="mr-2">
          <FaUser size="20" color="#26539C" />
        </div>
        <input
          className={`px-1 py-2 mb-1 outline-none bg-bg-color border-b border-b-silver`}
          type='text'
          placeholder="아이디"
          {...register('id')}
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
          {...register('password')}
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