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
  const [question, setQuestion] = useState<string>('');
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
      club_join_questions: [],
      club_recruit_period: '모집 방식 선택',
      period_start: '',
      period_end: ''
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

  // 질문 취소 버튼 클릭 핸들러
  const questionCancleClickHandler = (idx: number) => {
    const result = watch('club_join_questions').filter((el, elIdx) => idx !== elIdx);
    setValue('club_join_questions', result);
  }

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
          club_join_questions: data.club_join_questions,
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
    <form className="grid grid-cols-1 gap-7" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
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
      <button className="bg-blue py-2 w-[100px] mx-auto rounded-md text-white">개설신청</button>
      { isSubmitting && <LoadingUI /> }
    </form>
  );
}

interface FormInputs {
  club_name: string;
  club_category: '카테고리 선택' | '공연예술' | '종교' | '봉사' | '교양학술' | '체육' | '전시창작' | '준동아리';
  club_description: string;
  club_post: string;
  club_join_questions: string[];
  club_img: File;
  club_img_url: string;
  club_recruit_period: string;
  period_start: string;
  period_end: string;
}