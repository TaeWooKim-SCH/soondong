import Image from "next/image";
import Link from "next/link";

import { calculRemainDate } from "@/utils/modules";

export default function PostCard({ clubInfo }: PropsType) {
  const remainPeriod = calculRemainDate(clubInfo.club_recruit_period);

  return (
    <Link href={`/clubs/${clubInfo.club_id}`} className="shadow-xl rounded-md transition-all bg-white hover:scale-[1.03]">
      <Image
        className="w-full h-[400px] rounded-t-md object-cover"
        src={clubInfo.club_img_url}
        alt="대표이미지"
        width={500}
        height={400}
        priority={true}
      />
      <section className="px-4 py-3 bg-white rounded-b-md">
        <div className="font-bold mb-1">{clubInfo.club_name}</div>
        <div className="text-xs mb-1">{clubInfo.club_description}</div>
        {clubInfo.club_recruit_period === '상시모집' ? (
          <div
            className="mb-3 text-xs font-bold text-blue"
          >{clubInfo.club_recruit_period}</div>
        ) : (
          <div
            className={`mb-3 text-xs font-bold ${
              remainPeriod < 0 ? 'text-silver' : 'text-blue'
            }`}
          >{remainPeriod < 0 ? '마감' : `D-${remainPeriod}`}</div>
        )}
        <div
          className="text-xs text-white rounded-full bg-blue inline-block px-2 py-1"
        >{clubInfo.club_category}</div>
      </section>
    </Link>
  );
}

interface PropsType {
  clubInfo: {
    club_id: string;
    club_name: string;
    club_description: string;
    club_img_url: string;
    club_recruit_period: string;
    club_category: string;
  }
}