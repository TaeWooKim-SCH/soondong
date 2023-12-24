import Image from "next/image";
import Link from "next/link";

export default function HeaderNav() {
  const DesktopItems = ["모든 동아리", "공연예술", "종교", "봉사", "교양학술", "체육", "전시창작", "준동아리"];

  return (
    <header className="h-[100px] px-10 flex justify-between items-center">
      <Image
        className="w-[150px]"
        src="/Logo.svg"
        alt="로고"
        width={400}
        height={0}
      />
      <section className="flex">
        <div className="space-x-7 mr-20">
          {DesktopItems.map((item) => (
            <Link href={`/clubs?name=${item}`} key={item}>{item}</Link>
          ))}
        </div>
        <div>
          <Link
            className="py-2 px-7 border border-blue rounded-md mr-5"
            href="/login"
          >로그인</Link>
          <Link
            className="py-2 px-7 bg-blue text-white rounded-md"
            href="/signup"
          >회원가입</Link>
        </div>
      </section>
    </header>
  );
}