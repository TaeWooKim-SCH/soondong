import Image from "next/image";
import Link from "next/link";

import LoginSection from "../header/LoginSection";
import NavigationBar from "../NavigationBar";

export default function HeaderNav() {
  return (
    <header className="h-[10vh] px-5 flex justify-between items-center sm:px-10">
      <Link href="/home">
        <Image
          className="w-[100px] sm:w-[150px]"
          src="/Logo.svg"
          alt="로고"
          width={400}
          height={0}
          priority={true}
        />
      </Link>
      <section className="flex items-center">
        <div className="hidden space-x-7 mr-10 md:block">
          <Link href="/home">홈</Link>
          <Link href={`/clubs?category=${encodeURIComponent('모든 동아리')}`}>동아리 목록</Link>
          <Link href="/notification">공지사항</Link>
          <Link href="https://open.kakao.com/o/srTkVkcg">문의하기</Link>
        </div>
        <LoginSection />
        <NavigationBar />
      </section>
    </header>
  );
}