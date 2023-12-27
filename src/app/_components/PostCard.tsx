import Image from "next/image";

export default function PostCard() {
  return (
    <main className="border border-silver">
      <Image className="w-full" src="/test-img1.jpg" alt="대표이미지" width={500} height={0} />
      <section className="p-5">
        <div>계츠비</div>
        <div>순천향대 스키&레저 스포츠 동아리</div>
        <div>마감</div>
        <div>교양학술</div>
      </section>
    </main>
  );
}