import PostCard from "../_components/PostCard";
import Title from "../_components/Title";
import Toggle from "../_components/Toggle";
import Layout from "../_components/layouts/Layout";

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
      <section className="mb-10">
        <Title>모든 동아리 ({clubsData.length})</Title>
        <div className="flex justify-end items-center">
          <div className="mr-3">모집 중인 동아리만 보기</div>
          <Toggle />
        </div>
      </section>
      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-10">
        {clubsData.map((clubInfo) => (
          <PostCard key={clubInfo.club_id} clubInfo={clubInfo} />
        ))}
      </section>
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