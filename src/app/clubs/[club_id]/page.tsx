import Layout from "@/app/_components/layouts/Layout";
import ClubDetailSection from "./_components/ClubDetailSection";

export default async function ClubDetail({ params }: PageProps) {
  const clubInfo: ClubsData = await getData(params.club_id);

  return (
    <Layout className="flex flex-col items-center py-10">
      <ClubDetailSection clubInfo={clubInfo} />
    </Layout>
  );
}

async function getData(club_id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/clubs/${club_id}`, { cache: 'no-store' });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

interface PageProps {
  params: {
    club_id: string;
  },
}

interface ClubsData {
  club_id: string;
  club_name: string;
  club_description: string;
  club_post: string;
  club_join_questions: string[];
  club_img_url: string;
  club_recruit_period: string;
  club_like_count: number;
  club_category: string;
}