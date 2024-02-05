import Link from "next/link";

export default function JoinCard({ joinData }: PropsType) {
  return (
    <article className="border-2 border-silver rounded-md p-5">
      <section className="flex justify-between items-center mb-3">
        <Link
          className="text-lg font-bold sm:text-xl"
          href={`/clubs/${joinData.club_id}`}
        >{joinData.club_name}</Link>
        {joinData.join_state === 'pending' ? (
          <div className="border-[1.5px] border-blue rounded-full text-xs px-3 py-1">대기중</div>
        ) : (joinData.join_state === 'accept' ? (
            <div className="bg-blue rounded-full text-white text-xs px-3 py-1">가입됨</div>
          ) : (
            <div className="bg-red rounded-full text-white text-xs px-3 py-1">거절됨</div>
          )
        )}
      </section>
      <div className="text-sm sm:text-base">{joinData.club_description}</div>
    </article>
  );
}

interface PropsType {
  joinData: {
    club_id: string;
    club_name: string;
    club_description: string;
    join_state: 'pending' | 'accept' | 'reject'
  }
}