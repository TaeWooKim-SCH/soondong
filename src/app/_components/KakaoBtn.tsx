'use client'

import Image from "next/image";

export default function KakaoBtn({ children }: { children: React.ReactNode }) {
  const authFetch = async () => {
    fetch('/api/auth/kakao', {
      method: 'POST',
      body: JSON.stringify('요청완료')
    });
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