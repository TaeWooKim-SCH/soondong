import Image from "next/image";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";

import Layout from "@/app/_components/layouts/Layout";
import { calculRemainDate } from "@/utils/modules";

export default async function ClubDetail({ params }: PageProps) {
  const clubInfo: ClubsData = await getData(params.club_id);
  const remainPeriod = calculRemainDate(clubInfo.club_recruit_period);
  const clubPost = clubInfo.club_post.split('\n');

  return (
    <Layout className="flex flex-col items-center">
      <section className="flex justify-between items-center border-b-2 border-silver pb-3 mb-5 sm:w-[600px]">
        <article className="flex items-center text-2xl">
          <div className="font-bold mr-3">{clubInfo.club_name}</div>
          {clubInfo.club_recruit_period === '상시모집' ? (
            <div className="font-bold text-blue">{clubInfo.club_recruit_period}</div>
          ) : (
            <div
              className={`font-bold ${
                remainPeriod > 0 ? 'text-blue' : 'text-silver'
              }`}
            >{remainPeriod > 0 ? `D-${remainPeriod}` : '마감'}</div>
          )}
          <div
            className="text-xs text-white rounded-full bg-blue inline-block px-2 pt-[2px] pb-[3px] ml-3"
          >{clubInfo.club_category}</div>
        </article>
        <article className="flex items-center">
          <div className="mr-3">
            <IoMdHeartEmpty size="30" color="red" />
          </div>
          <button className="bg-blue px-4 py-1 rounded-md text-white text-base">신청하기</button>
        </article>
      </section>
      <section className="pb-5 mb-10 border-b-2 border-silver sm:w-[600px]">
        <Image
          className="w-[400px] rounded-md shadow-lg mx-auto"
          src={clubInfo.club_img_url}
          width={1000}
          height={0}
          alt="동아리 포스터"
        />
      </section>
      <section className="text-lg bg-silver p-5 rounded-md">
        {clubPost.map((post, idx) => <p key={idx}>{post}</p>)}
      </section>
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