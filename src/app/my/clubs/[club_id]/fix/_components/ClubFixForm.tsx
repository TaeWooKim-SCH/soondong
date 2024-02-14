'use client'

import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { throttle } from "lodash";
import { useState } from "react";

import LoadingUI from "@/app/_components/LoadingUI";

export default function ClubFixForm({ clubInfo }: PropsType) {
  const router = useRouter();
  const clubsCategory = ['공연예술', '종교', '봉사', '교양학술', '체육', '전시창작', '준동아리'];
  const [isPeriod, setIsPeriod] = useState<boolean>(clubInfo.club_recruit_period === '상시모집' ? false : true);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting, errors }
  } = useForm<FormInputs>({
    defaultValues: {
      club_name: clubInfo.club_name,
      club_category: clubInfo.club_category,
      club_description: clubInfo.club_description,
      club_post: clubInfo.club_post,
      club_recruit_period: clubInfo.club_recruit_period === '상시모집' ? '상시모집' : '정기모집',
      period_start: clubInfo.club_recruit_period === '상시모집' ? '' : clubInfo.club_recruit_period.split('~')[0],
      period_end: clubInfo.club_recruit_period === '상시모집' ? '' : clubInfo.club_recruit_period.split('~')[1],
      club_img_url: clubInfo.club_img_url
    },
    mode: 'onChange'
  });

  // 모집 방식을 선택했을 때 기간을 활성화시키기 위한 change 함수 커스텀
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

  // 동아리 개설 신청 핸들러
  const onSubmit: SubmitHandler<FormInputs> = throttle(async (data) => {
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

    // S3에 동아리 포스터 업로드
    try {
      const form = new FormData();
      form.append('club_img', data.club_img[0]);

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

    // 동아리 개설 신청
    if (watch('club_img_url')) {
      try {
        const body = {
          club_name: data.club_name,
          club_category: data.club_category,
          club_description: data.club_description,
          club_post: data.club_post,
          club_recruit_period: data.club_recruit_period,
          period_start: data.period_start,
          period_end: data.period_end,
          club_img_url: watch('club_img_url')
        };
  
        const res = await fetch('/api/clubs/add', {
          method: 'POST',
          headers: { 'Content-Type': 'appliction/json' },
          body: JSON.stringify(body)
        });
  
        if (res.ok) {
          alert('동아리 개설 신청되었습니다. 승인까지 최대 3일 정도 소요될 수 있습니다.');
          return router.push('/my/clubs');
        } else {
          return alert('동아리 개설 요청에 실패했습니다.');
        }
      } catch (err) {
        console.error('개설 요청 실패', err);
      }
    } else {
      return alert('동아리 포스터 업로드에 실패하였습니다. 새로고침 후 다시 시도해주세요.');
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
      <button className="bg-blue py-2 w-[100px] mx-auto rounded-md text-white text-bold">수정신청</button>
      { isSubmitting && <LoadingUI /> }
    </form>
  );
}

interface PropsType {
  clubInfo: {
    club_id: string;
    club_name: string;
    club_description: string;
    club_post: string;
    club_img_url: string;
    club_recruit_period: string;
    club_like_count: number;
    club_category: string;
  }
}

interface FormInputs {
  club_name: string;
  club_category: string;
  club_description: string;
  club_post: string;
  club_img: File;
  club_img_url: string;
  club_recruit_period: string;
  period_start: string | Date;
  period_end: string | Date;
}