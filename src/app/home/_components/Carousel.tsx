'use client'

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

export default function Carousel({ clubsData }: PropsType) {
  const randomInt = Math.floor(Math.random() * (clubsData.length - 4));
  const carouselClubs = clubsData.slice(randomInt, randomInt + 4);
  const carouselWidth = `${clubsData.length * 100}vw`;
  const [current, setCurrent] = useState<number>(0);
  const moveStyle: {[key: number]: string;} = {
    0: 'translate-x-0 bg-[#c6d1e0]',
    1: 'translate-x-[-100vw] bg-[#CCD3CA]',
    2: 'translate-x-[-200vw] bg-[#eae2b7]',
    3: 'translate-x-[-300vw] bg-[#ebd3be]',
  };

  const arrowLeftClickHandler = () => {
    setCurrent((prev) => {
      if (prev <= 0) {
        return carouselClubs.length - 1;
      } else {
        return prev - 1;
      }
    })
  }

  const arrowRightClickHandler = () => {
    setCurrent((prev) => {
      if (prev >= carouselClubs.length - 1) {
        return 0;
      } else {
        return prev + 1;
      }
    })
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (current === clubsData.length - 1) {
        setCurrent(0);
      } else {
        setCurrent(current + 1);
      }
    }, 4000);
    return () => {
      clearInterval(interval);
    };
  }, [clubsData.length, current])

  return (
    <section className="w-[100vw] h-[300px] relative shadow-lg md:h-[400px]">
      <div className={`h-full absolute top-0 left-0 flex duration-500 w-[${carouselWidth}] ${moveStyle[current]}`}>
        {carouselClubs.map((clubInfo) => (
          <article className="w-[100vw] h-full flex justify-center items-center" key={clubInfo.club_id}>
            <div className="max-w-[600px] flex justify-center items-center px-5 sm:item-start sm:px-0">
              <Image
                className="w-[150px] h-[200px] object-cover rounded-md shadow-lg md:w-[240px] md:h-[320px]"
                src={clubInfo.club_img_url}
                width={500}
                height={0}
                alt="동아리 포스터"
              />
              <div className="ml-5">
                <div
                  className="text-xs text-white rounded-full bg-blue inline-block px-2 pt-[2px] pb-[3px] mb-1"
                >{clubInfo.club_category}</div>
                <div className="text-xl text-blue font-bold sm:text-2xl md:text-3xl">{clubInfo.club_name}</div>
                <div className="mt-3 text-sm md:text-base">{clubInfo.club_description}</div>
                <div className="p-3 mt-3 bg-silver/35 rounded-md text-xs hidden sm:block md:text-sm">{clubInfo.club_post.substring(0, 100)}...</div>
                <Link
                  className="flex justify-end items-center mt-10 text-sm text-[#575757]"
                  href={`/clubs/${clubInfo.club_id}`}
                >
                  <div className="mr-1">{clubInfo.club_name} 더보기</div>
                  <div>
                    <FaArrowRightLong size="15" />
                  </div>
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="absolute top-1/2 left-10 -translate-y-1/2 arrowLeftContainer cursor-pointer hidden duration-300 md:block hover:scale-[1.2]"
        onClick={arrowLeftClickHandler}
      >
        <FaAngleLeft size="40" color="#6D6C6C" />
      </div>
      <div className="absolute top-1/2 right-10 -translate-y-1/2 arrowRightContainer cursor-pointer hidden duration-300 md:block hover:scale-[1.2]"
        onClick={arrowRightClickHandler}
      >
        <FaAngleRight size="40" color="#6D6C6C" />
      </div>
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center">
        <div className="cursor-pointer md:hidden" onClick={arrowLeftClickHandler}>
          <FaAngleLeft size="20" color="#6D6C6C" />
        </div>
        <div className="mx-3">{current + 1} / {carouselClubs.length}</div>
        <div className="cursor-pointer md:hidden" onClick={arrowRightClickHandler}>
          <FaAngleRight size="20" color="#6D6C6C" />
        </div>
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