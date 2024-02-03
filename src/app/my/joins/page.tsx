import Layout from "@/app/_components/layouts/Layout";
import Title from "@/app/_components/Title";
import Toggle from "@/app/_components/Toggle";

async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/my/clubs/joins`, { cache: 'no-store' });

  // if (!res.ok) {
  //   throw new Error('Failed to fetch data');
  // }
  
  return res.json();
}

export default async function MyJoins() {
  const joinsData = await getData();
  console.log(joinsData);
  return (
    <Layout className="flex flex-col items-center">
      <section className="w-full mb-10 sm:w-[500px]">
        <Title>동아리 신청 목록</Title>
        <div className="flex justify-end items-center">
          <div className="mr-3 text-end text-sm sm:text-base">가입된 동아리만 보기</div>
          <Toggle />
        </div>
      </section>
      <section className="w-full grid grid-cols-1 sm:w-[500px]">
        <article className="border-2 border-silver rounded-md p-5">
          <section className="flex justify-between items-center mb-3">
            <div className="text-lg font-bold sm:text-xl">계츠비</div>
            <div className="border-[1.5px] border-blue rounded-full text-xs px-3 py-1">대기중</div>
          </section>
          <div className="text-sm sm:text-base">순천향대 스키&레저 스포츠 동아리</div>
        </article>
      </section>
    </Layout>
  );
}