import Layout from "../_components/layouts/Layout";
import Title from "../_components/Title";
import ToggleContainer from "../_components/ToggleContainer";
import ClubsSection from "./_components/ClubsSection";

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
  const clubsData: ClubType[] = await getData(searchParams?.category);

  return (
    <Layout>
      <section className="mb-5">
        <Title>{searchParams?.category} ({clubsData.length})</Title>
        <div className="flex justify-end items-center mt-3">
          <div className="mr-3 text-sm sm:text-base">모집 중인 동아리만 보기</div>
          <ToggleContainer toggleName="recruiting" />
        </div>
      </section>
      <ClubsSection clubsData={clubsData} />
    </Layout>
  );
}

interface PageProps {
  searchParams?: {
    [key: string]: string | undefined
  };
}

interface ClubType {
  club_id: string;
  club_name: string;
  club_description: string;
  club_img_url: string;
  club_recruit_period: string;
  club_category: string;
}