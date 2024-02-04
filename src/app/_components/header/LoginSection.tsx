import Link from "next/link";
import { getServerSession } from "next-auth";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import IsLoginHeader from "./IsLoginHeader";

export default async function LoginSection() {
  const session = await getServerSession(authOptions);

  if (session) {
    return <IsLoginHeader />;
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