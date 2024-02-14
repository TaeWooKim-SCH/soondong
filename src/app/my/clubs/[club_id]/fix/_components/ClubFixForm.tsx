'use client'

import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { throttle } from "lodash";
import { useState } from "react";

import LoadingUI from "@/app/_components/LoadingUI";

export default function ClubFixForm({ clubInfo }: PropsType) {
  const router = useRouter();
  const [isPeriod, setIsPeriod] = useState<boolean>(clubInfo.club_recruit_period === '상시모집' ? false : true);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting, errors }
  } = useForm<FormInputs>({
    defaultValues: {
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
    if (data.club_recruit_period === '모집 방식 선택') {
      return alert('동아리 모집 방식을 선택해주세요.');
    }
    else if (data.club_recruit_period === '정기모집' && (
      !data.period_start || !data.period_end
    )) {
      return alert('동아리 모집 기간을 선택해주세요.');
    }

    // 동아리 정보 수정 신청
    try {
      const body = {
        club_description: data.club_description,
        club_post: data.club_post,
        club_recruit_period: data.club_recruit_period,
        period_start: data.period_start,
        period_end: data.period_end,
      };
      
      const res = await fetch(`/api/clubs/${clubInfo.club_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'appliction/json' },
        body: JSON.stringify(body)
      });
      
      if (res.ok) {
        alert('동아리 정보가 수정되었습니다.');
        return router.push('/my/clubs');
      } else {
        return alert('동아리 정보 수정에 실패했습니다.');
      }
    } catch (err) {
      console.error('정보 수정 실패', err);
    }
  });

  return (
    <form className="w-full max-w-[600px] grid grid-cols-1 gap-5" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
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
          className="h-[300px] px-3 py-2 rounded-md outline-none w-full border border-silver resize-none"
          placeholder="동아리에 대해 마음껏 소개해보세요"
          {...register('club_post', { required: true })}
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
  club_description: string;
  club_post: string;
  club_img_url: string;
  club_recruit_period: string;
  period_start: string;
  period_end: string;
}