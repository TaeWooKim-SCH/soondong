import Image from 'next/image'
import Link from 'next/link'

// import WelcomeTyping from './_components/WelcomeTyping';

export default function Home() {
  return (
    <main className="bg-bg-color w-full h-full flex flex-col justify-center items-center space-y-32">
      <Image
        className="w-[300px] sm:w-[400px]"
        src="/Logo.svg"
        alt="로고"
        width={400}
        height={0}
      />
      <div className="text-2xl font-bold text-light-black sm:text-3xl">
        {/* <WelcomeTyping /> */}
        <div>안녕하세요.</div>
        <div><span className="text-main-blue-color">다양한 동아리</span>를 연결해주는</div>
        <div><span className="text-main-blue-color">순동</span>입니다.</div>
      </div>
      <Link className="py-3 px-9 bg-main-blue-color rounded-md text-white" href="/home">시작하기</Link>
    </main>
  )
}
