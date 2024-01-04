'use client'

import Link from "next/link";
import { useState } from "react";

export default function LoginSection() {
  const [isLogin, setIsLogin] = useState(() => {
    if (typeof(window) !== 'undefined' ? sessionStorage.getItem('loginInfo') : null) return true;
    else return false;
  }); // 로그인 상태

  return (
    <>
      {isLogin ? (
        <div>
        로그인상태
        </div>
      ) : (
        <div className="flex items-center">
          <Link
            className="text-xs py-1 px-4 border border-blue rounded-md mr-2 sm:text-sm sm:py-2 sm:px-7 sm:mr-5"
            href="/login"
          >로그인</Link>
          <Link
            className="text-xs py-1 px-4 bg-blue text-white rounded-md sm:text-sm sm:py-2 sm:px-7"
            href="/signup"
          >회원가입</Link>
        </div>
      )}
    </>
  );
}