export default function JoinCard({ joinData }: PropsType) {
  return (
    <article className="border-2 border-silver rounded-md p-5">
      <section className="flex justify-between items-center mb-3">
        <div className="text-lg font-bold sm:text-xl">{joinData.club_name}</div>
        <div className="border-[1.5px] border-blue rounded-full text-xs px-3 py-1">대기중</div>
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
    club_join_state: string;
  }
}