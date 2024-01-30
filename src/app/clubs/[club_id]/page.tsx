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
      <section className="w-full flex justify-between items-end border-b-[1.5px] border-blue pb-1 mb-5 sm:pb-3 sm:w-[500px]">
        <article className="flex items-end">
          <div className="flex flex-col justify-start items-start">
            <div
              className="text-xs text-white rounded-full bg-blue inline-block px-2 pt-[2px] pb-[3px] mb-1"
            >{clubInfo.club_category}</div>
            <div className="font-bold text-xl sm:text-[1.7rem] mr-2">{clubInfo.club_name}</div>
          </div>
          {clubInfo.club_recruit_period === '상시모집' ? (
            <div className="font-bold text-base text-blue sm:text-lg">[{clubInfo.club_recruit_period}]</div>
          ) : (
            <div
              className={`font-bold text-base sm:text-lg ${
                remainPeriod > 0 ? 'text-blue' : 'text-silver'
              }`}
            >{remainPeriod > 0 ? `[D-${remainPeriod}]` : '[마감]'}</div>
          )}
          
        </article>
        <article className="flex items-center">
          {/* 버전 2에서 구현 */}
          {/* <div className="mr-1 sm:mr-3">
            <IoMdHeartEmpty size="30" color="#26539C" />
          </div> */}
          <button className="bg-blue px-3 py-1 rounded-md text-white text-sm sm:text-base sm:px-4">신청하기</button>
        </article>
      </section>
      <section className="w-full mb-5 sm:mb-10 sm:w-[500px]">
        <Image
          className="w-[500px] rounded-md shadow-lg mx-auto"
          src={clubInfo.club_img_url}
          width={1000}
          height={0}
          alt="동아리 포스터"
        />
      </section>
      <section className="w-full border-[1.5px] border-blue p-3 rounded-md text-sm sm:text-lg sm:w-[500px] sm:p-5">
      {/* <section className="w-full bg-gray p-3 rounded-md sm:text-lg sm:w-[500px] sm:p-5"> */}
        {clubPost.map((post, idx) => {
          if (!post) {
            return <br key={idx} />;
          }
          return <p className="break-words" key={idx}>{post}</p>;
        })}
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