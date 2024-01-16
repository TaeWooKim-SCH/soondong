'use client'

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { CgProfile } from "react-icons/cg";

export default function LoginSection() {
  const { data: session, status } = useSession();

  const signOutHandler = () => {
    signOut();
  }
  
  if (status === 'loading') {
    return <div className="min-w-[120px]"></div>;
  }

  else {
    if (session) {
      return (
        <div className="flex justify-center items-center">
          <div className="mr-2 cursor-pointer sm:mr-5">
            <CgProfile className="sm:size-[40px]" color="#26539C" size="30" />
          </div>
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
}