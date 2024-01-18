export default function SelectColleage() {
  return (
    <section className="grid grid-cols-2 gap-5">
      <select className="px-1 py-2 mb-5 outline-none bg-bg-color border-b border-b-silver">
        <option>단과대 선택</option>
        <option>SW중심대학</option>
        <option>공과대학</option>
      </select>
      <select className="px-1 py-2 mb-5 outline-none bg-bg-color border-b border-b-silver">
        <option>학과 선택</option>
        <option>SW중심대학</option>
        <option>공과대학</option>
      </select>
    </section>
  );
}