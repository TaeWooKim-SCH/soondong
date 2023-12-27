import Image from "next/image";
import Link from "next/link";
import SideBar from "../Sidebar";

export default function HeaderNav() {
  const headerItems = ["모든 동아리", "공연예술", "종교", "봉사", "교양학술", "체육", "전시창작", "준동아리"];

  return (
    <header className="h-[100px] px-5 flex justify-between items-center sm:px-10">
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
        <div className="hidden space-x-7 mr-20 xl:block">
          {headerItems.map((item) => (
            <Link href={`/clubs?category=${item}`} key={item}>{item}</Link>
          ))}
        </div>
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
        <SideBar />
      </section>
    </header>
  );
}