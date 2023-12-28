import Image from "next/image";
import Layout from "./Layout";

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout className="flex justify-center items-center">
      <section className="px-10 py-32 flex flex-col justify-center items-center border border-blue rounded-lg sm:px-20">
        <Image className="w-[250px] mb-16" src="/Logo.svg" alt="로고" width={500} height={0} priority={true} />
        <button className="flex justify-center items-center bg-yellow rounded-lg py-2 px-6">
          <Image className="w-[30px]" src="/kakao-logo.svg" alt="카카오로고" width={100} height={0} />
          <div className="ml-2 sm:text-lg">{ children }</div>
        </button>
      </section>
    </Layout>
  );
}