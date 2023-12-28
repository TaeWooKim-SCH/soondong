import Image from "next/image";

export default function PostCard() {
  return (
    <main className="shadow-xl rounded-md">
      <Image className="w-full rounded-t-md" src="/test-img1.jpg" alt="대표이미지" width={500} height={0} />
      <section className="px-4 py-3 bg-white rounded-b-md">
        <div className="font-bold mb-1">계츠비</div>
        <div className="text-xs mb-1">순천향대 스키&레저 스포츠 동아리</div>
        <div className="text-xs font-bold text-silver mb-3">마감</div>
        <div className="text-xs text-white rounded-full bg-blue inline-block px-2 py-1">교양학술</div>
      </section>
    </main>
  );
}