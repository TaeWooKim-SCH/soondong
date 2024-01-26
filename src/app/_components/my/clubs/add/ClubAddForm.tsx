'use client'

import { useForm } from "react-hook-form";

export default function ClubAddForm() {
  const clubsCategory = ['공연예술', '종교', '봉사', '교양학술', '체육', '전시창작', '준동아리'];
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting, errors }
  } = useForm<FormInputs>({
  defaultValues: {
    club_name: '',
    club_category: '카테고리 선택',
    club_description: '',
    club_post: '',
    club_recruit_period: ''
  },
  mode: 'onChange'
});

  return (
    <form className="grid grid-cols-1 gap-5">
      <section className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <article>
          <div className="text-lg text-blue font-bold mb-3">동아리 이름</div>
          <input className="px-3 py-2 rounded-md outline-none w-[250px] border border-silver" type="text" />
        </article>
        <article>
          <div className="text-lg text-blue font-bold mb-3">동아리 카테고리</div>
          <select className="px-3 py-2 rounded-md outline-none w-[250px] border border-silver">
            <option>카테고리 선택</option>
            {clubsCategory.map((category, idx) => (
              <option key={idx}>{category}</option>
            ))}
          </select>
        </article>
      </section>
      <section>
        <div className="text-lg text-blue font-bold mb-3">동아리 한 줄 소개</div>
        <input className="px-3 py-2 rounded-md outline-none w-full border border-silver" type="text" />
      </section>
      <section>
        <div className="text-lg text-blue font-bold mb-3">동아리 홍보글</div>
        <textarea className="h-[200px] px-3 py-2 rounded-md outline-none w-full border border-silver resize-none" />
      </section>
      <section>
        <div className="text-lg text-blue font-bold mb-3">동아리 대표 포스터</div>
        <input className="px-3 py-2 rounded-md outline-none w-full border border-silver bg-white" type="file" />
      </section>
      <section className="mb-10">
        <div className="text-lg text-blue font-bold mb-3">동아리 모집기간</div>
        <select className="px-3 py-2 rounded-md outline-none border border-silver">
          <option>모집 방식 선택</option>
          <option>상시모집</option>
          <option>정기모집</option>
        </select>
      </section>
      <button className="bg-blue py-2 w-[100px] mx-auto rounded-md text-white text-bold">개설신청</button>
    </form>
  );
}

interface FormInputs {
  club_name: string;
  club_category: '카테고리 선택' | '공연예술' | '종교' | '봉사' | '교양학술' | '체육' | '전시창작' | '준동아리';
  club_description: string;
  club_post: string;
  club_img: File;
  club_recruit_period: string;
}