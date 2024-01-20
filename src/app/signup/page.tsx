import Image from "next/image";

import Layout from "../_components/Layouts/Layout";
import SignupForm from "../_components/SignupForm";

export default function Signup() {
  return (
    <Layout>
      <section className="mx-auto mb-20 flex flex-col justify-center items-center rounded-lg sm:py-32 sm:border sm:border-blue  sm:px-20 lg:max-w-[60vw]">
        <Image className="w-[250px] mb-16" src="/Logo.svg" alt="로고" width={500} height={0} priority={true} />
        <SignupForm />
      </section>
    </Layout>
  );
}
