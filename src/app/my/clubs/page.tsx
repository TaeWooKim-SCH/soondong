import Title from "@/app/_components/Title";
import Layout from "@/app/_components/layouts/Layout";
import Link from "next/link";

export default function MyClubs() {
  return (
    <Layout className="lg:px-96 xl:px-[500px]">
      <section className="flex justify-between">
        <Title>내 동아리 관리</Title>
        <div>
          <Link
            className="text-xs py-2 px-4 bg-blue text-white rounded-md sm:text-sm"
            href="/my/clubs/add"
          >동아리 개설</Link>
        </div>
      </section>
      <section className="grid grid-cols-1 text-center">
        <div className="text-3xl text-blue font-bold mt-52">직접 개설한 동아리가 없어요!!!</div>
      </section>
    </Layout>
  );
}