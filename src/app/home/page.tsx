import Layout from "../_components/layouts/Layout";
import PostCard from "../_components/PostCard";
import Title from "../_components/Title";
import Carousel from "./_components/Carousel";

async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/home`, { cache: 'no-store' });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  
  return res.json();
}

export default async function Home() {
  const clubsData: ClubsData[] = await getData();

  return (
    <Layout className="px-0 py-0 sm:px-0 md:px-0 xl:px-0">
      <Carousel clubsData={clubsData} />
      <section className="mb-10 px-10 py-10 sm:px-16 md:px-28 xl:px-44">
        <Title className="mb-5">현재 모집중인 동아리</Title>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-10">
          {clubsData.map((clubInfo) => (
            <PostCard key={clubInfo.club_id} clubInfo={clubInfo} />
          ))}
        </div>
      </section>
      {/* TODO: 좋아요 기능 구현 후 구현 */}
      {/* <section className="mb-10">
        <Title className="mb-5">인기 동아리</Title>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {clubsData.map((clubInfo) => (
            <PostCard key={clubInfo.club_id} clubInfo={clubInfo} />
          ))}
        </div>
      </section> */}
    </Layout>
  );
}

interface ClubsData {
  club_id: string;
  club_name: string;
  club_description: string;
  club_post: string;
  club_img_url: string;
  club_recruit_period: string;
  club_like_count: number;
  club_category: string;
}