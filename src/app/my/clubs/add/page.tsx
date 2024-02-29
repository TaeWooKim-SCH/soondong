import Layout from "@/app/_components/layouts/Layout";
import ClubAddForm from "@/app/my/clubs/add/_components/ClubAddForm";

export default function AddClub() {
  // TODO: 동아리 포스터가 없어도 개설 가능하도록 구현. 이미지가 없을 땐 순동 기본이미지로 보여주기
  return (
    <Layout className="flex flex-col items-center py-10">
      <section className="flex flex-col items-center mb-10">
        <div className="text-2xl text-blue font-bold mb-5 md:text-[2rem]">동아리 개설하기</div>
        <div className="text-silver text-sm font-semibold sm:text-md">직접 개설하고 싶은 동아리를 언제든지 개설해 보세요!</div>
      </section>
      <ClubAddForm />
    </Layout>
  );
}