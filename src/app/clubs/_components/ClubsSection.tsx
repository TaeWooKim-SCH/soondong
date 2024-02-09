'use client'

import PostCard from "@/app/_components/PostCard";
import Title from "@/app/_components/Title";

export default function ClubsSection({ clubsData }: PropsType) {
  return (
    <>
      {!clubsData.length ? (
        <section className="flex justify-center items-center mt-44">
          <Title>아직 없어요! 동아리를 창설해보세요!</Title>
        </section>
      ) : (
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-10">
          {clubsData.map((clubInfo) => (
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