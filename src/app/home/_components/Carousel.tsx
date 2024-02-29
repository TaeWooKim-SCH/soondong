'use client'

import Image from "next/image";
import { useState, useEffect } from "react";

export default function Carousel({ clubsData }: PropsType) {
  const randomInt = Math.floor(Math.random() * (clubsData.length - 4));
  const carouselClubs = clubsData.slice(randomInt, randomInt + 4);
  const carouselWidth = `${clubsData.length * 100}vw`;
  const [current, setCurrent] = useState<number>(0);
  const moveStyle: {[key: number]: string;} = {
    0: 'translate-x-0 bg-[#B5C0D0]',
    1: 'translate-x-[-100vw] bg-[#CCD3CA]',
    2: 'translate-x-[-200vw] bg-[#cec2b8]',
    3: 'translate-x-[-300vw] bg-[#EED3D9]',
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (current === clubsData.length - 1) {
        setCurrent(0);
      } else {
        setCurrent(current + 1);
      }
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, [clubsData.length, current])

  return (
    <section className="w-[100vw] h-[400px] relative shadow-lg">
      <div className={`absolute top-0 left-0 flex duration-500 w-[${carouselWidth}] ${moveStyle[current]}`}>
        {carouselClubs.map((clubInfo) => (
          <article className="w-[100vw] h-[400px] flex justify-center items-center" key={clubInfo.club_id}>
            <div className="max-w-[600px] flex justify-center items-start">
              <Image
                className="w-[240px] h-[320px] object-cover rounded-md shadow-lg"
                src={clubInfo.club_img_url}
                width={500}
                height={0}
                alt="동아리 포스터"
              />
              <div className="ml-5">
                <div
                  className="text-xs text-white rounded-full bg-blue inline-block px-2 pt-[2px] pb-[3px] mb-1"
                >{clubInfo.club_category}</div>
                <div className="text-3xl text-blue font-bold">{clubInfo.club_name}</div>
                <div className="mt-3">{clubInfo.club_description}</div>
                <div className="p-3 mt-3 bg-silver/35 rounded-md text-sm">{clubInfo.club_post.substring(0, 200)}...</div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

interface PropsType {
  clubsData: ClubsData[];
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