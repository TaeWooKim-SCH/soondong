import Image from "next/image";
import Link from "next/link";
import SideBar from "../Sidebar";
import LoginSection from "../header/LoginSection";

export default function HeaderNav() {
  const headerItems = ["모든 동아리", "공연예술", "종교", "봉사", "교양학술", "체육", "전시창작", "준동아리"];

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
        <div className="hidden space-x-7 mr-20 xl:block">
          {headerItems.map((item) => (
            <Link href={`/clubs?category=${item}`} key={item}>{item}</Link>
          ))}
        </div>
        <LoginSection />
        <SideBar />
      </section>
    </header>
  );
}