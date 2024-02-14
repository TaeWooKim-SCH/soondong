import Layout from "@/app/_components/layouts/Layout";
import ClubFixForm from "./_components/ClubFixForm";
import Image from "next/image";

export default async function MyClubInfoFix({ params }: PageProps) {
  const clubInfo: ClubType = await getData(params.club_id);

  return (
    <Layout className="flex flex-col items-center">
      <section className="flex flex-col items-center mb-5 sm:mb-10">
        <div className="text-2xl text-blue font-bold md:text-[2rem]">동아리 정보 수정 {`<${clubInfo.club_name}>`} </div>
      </section>
      <Image
        className="mb-10 rounded-md shadow-lg"
        src={clubInfo.club_img_url}
        width={400}
        height={0}
        alt="동아리 포스터"
      />
      <ClubFixForm clubInfo={clubInfo} />
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
  }
}

interface ClubType {
  club_id: string;
  club_name: string;
  club_description: string;
  club_post: string;
  club_img_url: string;
  club_recruit_period: string;
  club_like_count: number;
  club_category: string;
}