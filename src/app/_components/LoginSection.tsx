'use client'

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function LoginSection() {
  const { data: session, status } = useSession();

  const signOutHandler = () => {
    signOut();
  }

  if (session) {
    return (
      <div>
        <button
          className="text-xs py-1 px-4 border border-blue rounded-md mr-2 sm:text-sm sm:py-2 sm:px-7 sm:mr-5"
          onClick={signOutHandler}
        >로그아웃</button>
      </div>
    );
  }

  else {
    return (
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
    );
  }
}