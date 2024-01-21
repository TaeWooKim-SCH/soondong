import Image from "next/image";
import Layout from "./Layout";
import KakaoBtn from "../KakaoBtn";

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout className="flex justify-center items-center">
      <section className="px-10 py-32 flex flex-col justify-center items-center border border-blue rounded-lg sm:px-20">
        <Image className="w-[250px] mb-16" src="/Logo.svg" alt="로고" width={500} height={0} priority={true} />
        <KakaoBtn>{children}</KakaoBtn>
      </section>
    </Layout>
  );
}