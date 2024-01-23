import Image from "next/image";

import Layout from "../_components/layouts/Layout";
import LoginForm from "../_components/login/LoginForm";

export default function Login() {
  return (
    <Layout className="flex justify-center items-center">
      <section className="mx-auto mb-20 flex flex-col justify-center items-center rounded-lg sm:py-32 sm:border sm:border-blue sm:px-20">
        <Image className="w-[250px] mb-16" src="/Logo.svg" alt="로고" width={500} height={0} priority={true} />
        <LoginForm />
      </section>
    </Layout>
  );
}
