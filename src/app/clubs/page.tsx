import Layout from "../_components/layouts/Layout";
import Title from "../_components/Title";
import Toggle from "../_components/Toggle";
import PostCard from "../_components/PostCard";

async function getData(category: string | undefined) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/clubs${
    category && category !== '모든 동아리' ? `?category=${category}` : ''
  }`, { cache: 'no-store' });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Clubs({ searchParams }: PageProps) {
  const clubsData: ClubsType[] = await getData(searchParams?.category);

  return (
    <Layout>
      <section className="mb-5">
        <Title>모든 동아리 ({clubsData.length})</Title>
        <div className="flex justify-end items-center mt-3">
          <div className="mr-3 text-sm sm:text-base">모집 중인 동아리만 보기</div>
          <Toggle />
        </div>
      </section>
      {!clubsData.length ? (
        <section className="flex justify-center items-center mt-44">
          <Title>아직 없어요! 동아리를 창설해보세요!</Title>
        </section>
      ) : (
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-10">
          {clubsData.map((clubInfo) => (
            <PostCard key={clubInfo.club_id} clubInfo={clubInfo} />
          ))}
        </section>
      )}
    </Layout>
  );
}

interface PageProps {
  searchParams?: {
    [key: string]: string | undefined
  };
}

interface ClubsType {
  club_id: string;
  club_name: string;
  club_description: string;
  club_img_url: string;
  club_recruit_period: string;
  club_category: string;
}