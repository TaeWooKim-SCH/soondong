import Image from "next/image";
import Link from "next/link";

import { calculRemainDate } from "@/utils/modules";

export default function MyClubCard({ myClubInfo }: PropsType) {
  const remainPeriod = calculRemainDate(myClubInfo.club_recruit_period);

  return (
    <article className="flex w-full border-[1.5px] border-silver rounded-md p-3 sm:w-[600px] sm:p-5">
        <Image
          className="w-[80px] h-[120px] rounded-md shadow-lg object-cover mr-3 sm:mr-5 sm:w-[160px] sm:h-[240px]"
          src={myClubInfo.club_img_url}
          alt="동아리 포스터"
          width={500}
          height={0}
        />
      <section className="w-full flex flex-col justify-between">
        <div className="space-y-1">
          <div className="flex items-center space-x-1 sm:space-x-2">
            <Link
              className="font-bold sm:text-lg"
              href={`/clubs/${myClubInfo.club_id}`}
            >{myClubInfo.club_name}</Link>
            <div
              className="text-[0.6rem] text-white rounded-full bg-blue inline-block px-[0.4rem] py-[0.1rem] sm:px-2 sm:py-1 sm:text-xs"
            >{myClubInfo.club_category}</div>
          </div>
          <div className="text-xs sm:text-sm">{myClubInfo.club_description}</div>
          {myClubInfo.club_recruit_period === '상시모집' ? (
            <div
              className="mb-3 text-xs font-bold text-blue sm:text-sm"
            >{myClubInfo.club_recruit_period}</div>
          ) : (
            <div
              className={`mb-3 text-xs font-bold sm:text-sm ${
                remainPeriod < 0 ? 'text-silver' : 'text-blue'
              }`}
            >{remainPeriod < 0 ? '마감' : `D-${remainPeriod}`}</div>
          )}
        </div>
        <div className="flex justify-end">
          <Link
            className="text-xs py-1 px-3 border border-blue rounded-md mr-2 sm:text-sm sm:py-2 sm:px-7 sm:mr-5"
            href={`/my/clubs/${myClubInfo.club_id}/fix`}
          >정보수정</Link>
          <Link
            className="text-xs py-1 px-3 border border-blue rounded-md sm:text-sm sm:py-2 sm:px-7"
            href={`/my/clubs/${myClubInfo.club_id}/members`}
          >구성원 관리</Link>
        </div>
      </section>
    </article>
  );
}

interface PropsType {
  myClubInfo: {
    club_id: string;
    club_name: string;
    club_description: string;
    club_recruit_period: string;
    club_img_url: string;
    club_category: string;
  }
}