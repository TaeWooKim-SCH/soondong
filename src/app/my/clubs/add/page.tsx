import Title from "@/app/_components/Title";
import Layout from "@/app/_components/layouts/Layout";

export default function AddClub() {
  const clubsCategory = ['공연예술', '종교', '봉사', '교양학술', '체육', '전시창작', '준동아리'];

  return (
    <Layout className="flex flex-col items-center">
      <section className="flex flex-col items-center mb-10">
        <Title className="mb-5 sm:text-[2rem]">동아리 개설하기</Title>
        <div className="text-silver font-semibold">직접 개설하고 싶은 동아리를 언제든지 개설해 보세요!</div>
      </section>
      <form className="grid grid-cols-1 gap-5">
        <section className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <article>
            <div className="text-lg text-blue font-bold mb-3">동아리 이름</div>
            <input className="px-3 py-2 rounded-md outline-none w-[250px] border border-silver" type="text" />
          </article>
          <article>
            <div className="text-lg text-blue font-bold mb-3">동아리 카테고리</div>
            <select className="px-3 py-2 rounded-md outline-none w-[250px] border border-silver">
              <option>카테고리 선택</option>
              {clubsCategory.map((category, idx) => (
                <option key={idx}>{category}</option>
              ))}
            </select>
          </article>
        </section>
        <section>
          <div className="text-lg text-blue font-bold mb-3">동아리 한 줄 소개</div>
          <input className="px-3 py-2 rounded-md outline-none w-full border border-silver" type="text" />
        </section>
        <section>
          <div className="text-lg text-blue font-bold mb-3">동아리 홍보글</div>
          <textarea className="h-[200px] px-3 py-2 rounded-md outline-none w-full border border-silver resize-none" />
        </section>
        <section>
          <div className="text-lg text-blue font-bold mb-3">동아리 대표 포스터</div>
          <input className="px-3 py-2 rounded-md outline-none w-full border border-silver bg-white" type="file" />
        </section>
        <section>
          <div className="text-lg text-blue font-bold mb-3">동아리 모집기간</div>
          <select className="px-3 py-2 rounded-md outline-none border border-silver">
            <option>모집 방식 선택</option>
            <option>상시모집</option>
            <option>정기모집</option>
          </select>
        </section>
        <button className="bg-blue py-2 w-[100px] mx-auto rounded-md text-white text-bold">개설신청</button>
      </form>
    </Layout>
  );
}