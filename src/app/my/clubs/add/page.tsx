import Title from "@/app/_components/Title";
import Layout from "@/app/_components/layouts/Layout";
import ClubAddForm from "@/app/_components/my/clubs/add/ClubAddForm";

export default function AddClub() {
  return (
    <Layout className="flex flex-col items-center">
      <section className="flex flex-col items-center mb-10">
        <Title className="mb-5 sm:text-[2rem]">동아리 개설하기</Title>
        <div className="text-silver font-semibold">직접 개설하고 싶은 동아리를 언제든지 개설해 보세요!</div>
      </section>
      <ClubAddForm />
    </Layout>
  );
}