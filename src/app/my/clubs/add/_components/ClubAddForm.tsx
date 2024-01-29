'use client'

import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { throttle } from "lodash";
import { useState } from "react";

import LoadingUI from "@/app/_components/LoadingUI";

export default function ClubAddForm() {
  const router = useRouter();
  const clubsCategory = ['공연예술', '종교', '봉사', '교양학술', '체육', '전시창작', '준동아리'];
  const [isPeriod, setIsPeriod] = useState<boolean>(false);
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
      club_recruit_period: '모집 방식 선택',
      period_start: '',
      period_end: ''
    },
    mode: 'onChange'
  });

  // 모집 방식을 선택했을 때 기간을 활성화시키기 위한 change 함수 커스텀
  // TODO: 이미지를 업로드할 때마다가 아닌 개설신청을 했을 때 요청으로 변경
  // TODO: 블로깅
  const periodChangeHandler = register('club_recruit_period', {
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (e.target.value === "정기모집") {
        setIsPeriod(true);
        return;
      }
      else {
        setValue('period_start', '');
        setValue('period_end', '');
        setIsPeriod(false);
        return;
      }
    }
  });

  // 동아리 포스터 업로드 핸들러
  const clubImgUploadHandler = register('club_img', {
    onChange: async (e: React.ChangeEvent<HTMLInputElement>) => {
      
    }
  })

  // if (e.target.files) {
  //   const formData = new FormData();
  //   formData.append('club_img', e.target.files[0]);
  //   const res = await fetch('/api/clubs/add-img', {
  //     method: 'POST',
  //     // headers: { "Content-Type": "multipart/form-data" },
  //     body: formData
  //   })
  // }

  // 동아리 개설 신청 핸들러
  const onSubmit: SubmitHandler<FormInputs> = throttle(async (data) => {
    console.log(data);
    // 필수 입력 요소 검사
    if (data.club_category === '카테고리 선택') {
      return alert('동아리 카테고리를 선택해주세요.');
    }
    else if (data.club_recruit_period === '모집 방식 선택') {
      return alert('동아리 모집 방식을 선택해주세요.');
    }
    else if (!data.club_img.length) {
      return alert('동아리 대표 포스터를 등록해주세요.');
    }
    else if (data.club_recruit_period === '정기모집' && (
      !data.period_start || !data.period_end
    )) {
      return alert('동아리 모집 기간을 선택해주세요.');
    }

    try {
      const form = new FormData();
      form.append('club_img', data.club_img[0]);
      console.log(form);
      const res = await fetch('/api/clubs/add-img', {
        method: 'POST',
        // headers: { "Content-Type": "multipart/form-data" },
        body: form
      });
      const json: { img_url: string; } = await res.json();
      setValue('club_img_url', json.img_url);
    } catch (err) {
      console.error('이미지 업로드 실패', err);
    }

    try {
      const body = {
        club_name: data.club_name,
        club_category: data.club_category,
        club_description: data.club_description,
        club_post: data.club_post,
        club_recruit_period: data.club_recruit_period,
        period_start: data.period_start,
        period_end: data.period_end,
        club_img_url: data.club_img_url
      };

      const res = await fetch('/api/clubs/add', {
        method: 'POST',
        headers: { 'Content-Type': 'appliction/json' },
        body: JSON.stringify(body)
      });

      if (res.ok) {
        return router.push('/my/clubs');
      } else {
        return alert('동아리 개설 요청에 실패했습니다.');
      }
    } catch (err) {
      console.error('개설 요청 실패', err);
    }
  });

  return (
    <form className="grid grid-cols-1 gap-5" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <section className="grid md:gap-10 md:grid-cols-2">
        <article className="mb-5 md:mb-0">
          <div className="text-lg text-blue font-bold mb-3">동아리 이름</div>
          <input
            className="px-3 py-2 rounded-md outline-none w-[250px] border border-silver"
            type="text"
            placeholder="동아리 명을 입력해주세요"
            {...register('club_name', { required: true })}
          />
        </article>
        <article>
          <div className="text-lg text-blue font-bold mb-3">동아리 카테고리</div>
          <select
            className="px-3 py-2 rounded-md outline-none w-[250px] border border-silver"
            {...register('club_category', { required: true })}
          >
            <option value="카테고리 선택">카테고리 선택</option>
            {clubsCategory.map((category, idx) => (
              <option value={category} key={idx}>{category}</option>
            ))}
          </select>
        </article>
      </section>
      <section>
        <div className="text-lg text-blue font-bold mb-3">동아리 한 줄 소개</div>
        <input
          className="px-3 py-2 rounded-md outline-none w-full border border-silver"
          type="text"
          placeholder="동아리에 대해 간략히 표현해보세요"
          {...register('club_description', { required: true })}
        />
      </section>
      <section>
        <div className="text-lg text-blue font-bold mb-3">동아리 홍보글</div>
        <textarea
          className="h-[200px] px-3 py-2 rounded-md outline-none w-full border border-silver resize-none"
          placeholder="동아리에 대해 마음껏 소개해보세요"
          {...register('club_post', { required: true })}
        />
      </section>
      <section>
        <div className="text-lg text-blue font-bold mb-3">동아리 대표 포스터</div>
        <input
          className="px-3 py-2 rounded-md outline-none w-full border border-silver bg-white"
          type="file"
          {...register('club_img')}
          onChange={clubImgUploadHandler.onChange}
        />
      </section>
      <section className="mb-10">
        <div className="text-lg text-blue font-bold mb-3">동아리 모집기간</div>
        <article className="sm:flex items-center">
          <section>
            <select
              className="px-3 py-2 mr-5 rounded-md outline-none border border-silver"
              {...register('club_recruit_period', { required: true })}
              onChange={periodChangeHandler.onChange}
            >
              <option value="모집 방식 선택">모집 방식 선택</option>
              <option value="상시모집">상시모집</option>
              <option value="정기모집">정기모집</option>
            </select>
          </section>
          {isPeriod && (
            <section className="flex items-center">
              <input
                className="px-1 py-2 outline-none bg-bg-color border-b border-b-silver"
                type="date"
                {...register('period_start')}
              />
              <div className="mx-2 font-bold text-lg">~</div>
              <input
                className="px-1 py-2 outline-none bg-bg-color border-b border-b-silver"
                type="date"
                {...register('period_end')}
              />
            </section>
          )}
        </article>
      </section>
      <button className="bg-blue py-2 w-[100px] mx-auto rounded-md text-white text-bold">개설신청</button>
      { isSubmitting && <LoadingUI /> }
    </form>
  );
}

interface FormInputs {
  club_name: string;
  club_category: '카테고리 선택' | '공연예술' | '종교' | '봉사' | '교양학술' | '체육' | '전시창작' | '준동아리';
  club_description: string;
  club_post: string;
  club_img: File;
  club_img_url: string;
  club_recruit_period: string;
  period_start: string;
  period_end: string;
}