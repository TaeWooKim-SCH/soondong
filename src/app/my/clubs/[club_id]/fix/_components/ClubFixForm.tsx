'use client'

import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { throttle } from "lodash";
import { useState } from "react";

import LoadingUI from "@/app/_components/LoadingUI";

export default function ClubFixForm({ clubInfo }: PropsType) {
  const router = useRouter();
  const [isPeriod, setIsPeriod] = useState<boolean>(clubInfo.club_recruit_period === '상시모집' ? false : true);
  const [question, setQuestion] = useState<string>('');
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
      club_join_questions: clubInfo.club_join_questions,
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

  // 질문 입력 체인지 핸들러
  const questionChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
  }

  // 질문 입력이 끝난 후 추가 버튼 클릭 핸들러
  const questionAddClickHandler = () => {
    if (!question) {
      return alert('질문 내용을 입력해주세요.');
    }
    if (watch('club_join_questions').length >= 3) {
      return alert('질문은 최대 3개까지만 등록할 수 있습니다.');
    }
    const result = [...watch('club_join_questions')];
    result.push(question);
    setValue('club_join_questions', result);
    setQuestion('');
  }

  const questionCancleClickHandler = (idx: number) => {
    const result = watch('club_join_questions').filter((el, elIdx) => idx !== elIdx);
    setValue('club_join_questions', result);
  }

  // 동아리 정보 수정 신청 핸들러
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
        club_join_questions: data.club_join_questions,
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
        return router.push(`/clubs/${clubInfo.club_id}`);
      } else {
        return alert('동아리 정보 수정에 실패했습니다.');
      }
    } catch (err) {
      console.error('정보 수정 실패', err);
    }
  });

  return (
    <form className="w-full max-w-[600px] grid grid-cols-1 gap-7" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
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
      <section>
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
      <section className="mb-10">
        <div className="text-lg text-blue font-bold mb-3">동아리 가입질문 ( 최대 3개 ) - 선택사항</div>
        <article className="sm:grid sm:grid-cols-5 sm:gap-5">
          <input
            className="px-3 py-2 rounded-md outline-none w-full border border-silver sm:col-span-4"
            type="text"
            value={question}
            onChange={questionChangeHandler}
            placeholder="동아리 가입신청 시 받을 질문을 입력해주세요"
          />
          <button
            className="bg-blue py-2 px-7 mt-3 mx-auto rounded-md text-white text-sm sm:text-base sm:mt-0"
            type="button"
            onClick={questionAddClickHandler}
          >추가</button>
        </article>
        <article>
          {watch('club_join_questions').length ? watch('club_join_questions').map((question, idx) => (
            <div className="flex items-center mt-3" key={idx}>
              <div className="font-bold text-blue text-sm sm:text-base">Q{idx + 1}. {question}</div>
              <button
                className="px-3 py-1 ml-3 border-[1.5px] border-red rounded-md text-xs sm:text-sm"
                type="button"
                onClick={() => questionCancleClickHandler(idx)}
              >취소</button>
            </div>
          )) : null}
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
    club_join_questions: string[];
    club_img_url: string;
    club_recruit_period: string;
    club_like_count: number;
    club_category: string;
  }
}

interface FormInputs {
  club_description: string;
  club_post: string;
  club_join_questions: string[];
  club_img_url: string;
  club_recruit_period: string;
  period_start: string;
  period_end: string;
}