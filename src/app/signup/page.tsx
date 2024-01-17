import Image from "next/image";
import Layout from "../_components/Layouts/Layout";
import SignupForm from "../_components/SignupForm";

export default function Signup() {
  return (
    <Layout>
      <section className="px-10 py-32 flex flex-col justify-center items-center border border-blue rounded-lg sm:px-20">
        <Image className="w-[250px] mb-16" src="/Logo.svg" alt="로고" width={500} height={0} priority={true} />
        <SignupForm />
      </section>
    </Layout>
  );
}


// export default function Signup() {
//   return (
//     <LoginLayout>카카오로 시작하기</LoginLayout>
//   );
// }