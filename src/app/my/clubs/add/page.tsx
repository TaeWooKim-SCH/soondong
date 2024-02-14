import Layout from "@/app/_components/layouts/Layout";
import ClubAddForm from "@/app/my/clubs/add/_components/ClubAddForm";

export default function AddClub() {
  return (
    <Layout className="flex flex-col items-center">
      <section className="flex flex-col items-center mb-10">
        <div className="text-2xl text-blue font-bold mb-5 md:text-[2rem]">동아리 개설하기</div>
        <div className="text-silver text-sm font-semibold sm:text-md">직접 개설하고 싶은 동아리를 언제든지 개설해 보세요!</div>
      </section>
      <ClubAddForm />
    </Layout>
  );
}