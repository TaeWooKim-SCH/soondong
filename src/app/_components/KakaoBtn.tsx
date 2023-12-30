'use client'

import { signIn } from "next-auth/react";
import Image from "next/image";

export default function KakaoBtn({ children }: { children: React.ReactNode }) {

  return (
    <button
      className="flex justify-center items-center bg-yellow rounded-lg py-2 px-6"
      onClick={() => signIn("kakao")}
    >
      <Image className="w-[30px]" src="/kakao-logo.svg" alt="카카오로고" width={100} height={0} />
      <div className="ml-2 sm:text-lg">{ children }</div>
    </button>
  );
}