'use client'

import { signIn, useSession } from "next-auth/react";
import Image from "next/image";

export default function KakaoBtn({ children }: { children: React.ReactNode }) {
  const {data: session} = useSession();
  
  const authFetch = async () => {
    await signIn("kakao", {callbackUrl: '/home'});
    // await fetch('/api/login', {
    //   method: 'POST',
    //   body: JSON.stringify(session)
    // });
  }

  return (
    <button
      className="flex justify-center items-center bg-yellow rounded-lg py-2 px-6"
      onClick={authFetch}
    >
      <Image className="w-[30px]" src="/kakao-logo.svg" alt="카카오로고" width={100} height={0} />
      <div className="ml-2 sm:text-lg">{ children }</div>
    </button>
  );
}