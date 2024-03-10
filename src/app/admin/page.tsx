import Image from "next/image";

import Layout from "../_components/layouts/Layout";
import AdminLoginForm from "./_components/AdminLoginForm";

export default function AdminLogin() {
  return (
    <Layout className="flex justify-center items-center">
      <section className="mx-auto mb-20 flex flex-col justify-center items-center rounded-lg sm:py-32 sm:border sm:border-blue sm:px-20">
        <div className="text-2xl text-blue font-bold mb-16">관리자 로그인</div>
        <AdminLoginForm />
      </section>
    </Layout>
  );
}