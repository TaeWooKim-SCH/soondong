import Image from "next/image";
import Link from "next/link";

export default function PostCard({ clubInfo }: PropsType) {
  return (
    <Link href="/clubs/3" className="shadow-xl rounded-md transition-all bg-white hover:scale-[1.03]">
      <Image
        className="w-full rounded-t-md"
        src={clubInfo.club_img_link}
        alt="대표이미지"
        width={500}
        height={0}
        priority={true}
      />
      <section className="px-4 py-3 bg-white rounded-b-md">
        <div className="font-bold mb-1">{clubInfo.club_name}</div>
        <div className="text-xs mb-1">{clubInfo.club_description}</div>
        <div
          className={`mb-3 text-xs font-bold ${
            clubInfo.club_recruit_period === "마감" ? 'text-silver' : 'text-blue'
          }`}
        >{clubInfo.club_recruit_period}</div>
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
    club_img_link: string;
    club_category: string;
    club_recruit_period: string;
  }
}