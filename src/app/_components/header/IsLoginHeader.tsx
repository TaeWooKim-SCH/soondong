'use client'

import Link from "next/link";
import { signOut } from "next-auth/react";
import { CgProfile } from "react-icons/cg";

export default function IsLoginHeader() {
  const signOutHandler = () => {
    signOut();
  }

  return (
    <div className="flex justify-center items-center">
      <Link className="mr-2 cursor-pointer sm:mr-5" href="/my">
        <CgProfile className="sm:size-[40px]" color="#26539C" size="30" />
      </Link>
      <button
        className="text-xs py-1 px-4 border border-blue rounded-md mr-2 sm:text-sm sm:py-2 sm:px-7 sm:mr-5"
        onClick={signOutHandler}
      >로그아웃</button>
    </div>
  );
}