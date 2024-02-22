import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full h-[10vh] bg-light-blue flex justify-evenly items-center">
      <section className="text-white text-[0.6rem] sm:text-xs flex flex-col justify-center">
        <div className="mb-1">대표자: 김태우</div>
        <div className="mb-1">문의: zop1234@hanmail.net</div>
        <div>© 2024 soondong Powered by Next.js, Vercel App</div>
      </section>
      <section>
        <Image className="w-[80px] sm:w-[100px]" src="/Logo.svg" alt="로고" width={400} height={0} />
      </section>
    </footer>
  );
}