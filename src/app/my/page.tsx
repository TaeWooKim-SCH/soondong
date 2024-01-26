import Link from "next/link";
import Layout from "../_components/layouts/Layout";
import UserInfo from "./_components/UserInfo";

export default function My() {
  return (
    <Layout className="flex flex-col justify-center items-center">
      <div className="grid grid-cols-1 gap-10">
        <UserInfo />
        <section className="grid grid-cols-1 gap-10 border border-blue rounded-md text-center py-10">
          <div>
            <Link href="/my/joins">동아리 신청 목록</Link>
          </div>
          <div>
            <Link href="/my/likes">동아리 찜 목록</Link>
          </div>
          <div>
            <Link href="/my/clubs">내 동아리 관리</Link>
          </div>
        </section>
      </div>
    </Layout>
  );
}