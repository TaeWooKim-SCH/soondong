'use client'

import { useEffect, useState } from "react";

import { useToggle } from "@/app/_modules/store";
import { calculRemainDate } from "@/utils/modules";
import Title from "@/app/_components/Title";
import PostCard from "@/app/_components/PostCard";

export default function ClubsSection({ clubsData }: PropsType) {
  const [clubs, setClubs] = useState<ClubType[]>(clubsData);
  const { recruiting } = useToggle();
  
  useEffect(() => {
    if (recruiting) {
      const result = clubsData.filter((club) => {
        const remainPeriod = calculRemainDate(club.club_recruit_period);
        if (remainPeriod > 0 || club.club_recruit_period === '상시모집') {
          return club;
        } else {
          return;
        }
      });
      setClubs(result);
    } else {
      setClubs(clubsData);
    }
  }, [clubsData, recruiting]);

  return (
    <>
      {!clubsData.length ? (
        <section className="flex justify-center items-center mt-44">
          <Title>아직 없어요! 동아리를 창설해보세요!</Title>
        </section>
      ) : (
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-10">
          {clubs.map((clubInfo) => (
            <PostCard key={clubInfo.club_id} clubInfo={clubInfo} />
          ))}
        </section>
      )}
    </>
  );
}

interface PropsType {
  clubsData: ClubType[];
}

interface ClubType {
  club_id: string;
  club_name: string;
  club_description: string;
  club_img_url: string;
  club_recruit_period: string;
  club_category: string;
}