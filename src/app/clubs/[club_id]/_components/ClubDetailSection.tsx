'use client'

import Image from "next/image";
import { Suspense, useEffect, useState } from "react";

import { calculRemainDate } from "@/utils/modules";
import ClubJoinBtn from "./ClubJoinBtn";
import Loading from "../loading";

export default function ClubDetailSection({ clubInfo }: PropsType) {
  const remainPeriod = calculRemainDate(clubInfo.club_recruit_period);
  const clubPost = clubInfo.club_post.split('\n');
  const [joinForm, setJoinForm] = useState<FormInputs>({});
  console.log(clubInfo.club_join_questions);
  const questionInputChangeHandler = (question: string, e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const result = {...joinForm};
    result[question] = e.target.value;
    setJoinForm(result);
  }

  useEffect(() => {
    if (clubInfo.club_join_questions) {
      clubInfo.club_join_questions.forEach((question) => {
        setJoinForm(prevForm => ({ ...prevForm, [question]: '' }));
      });
    }
  }, [clubInfo.club_join_questions]);

  return (
    <>
      <section className="w-full flex justify-between items-end border-b-[1.5px] border-blue pb-1 mb-5 sm:pb-3 sm:w-[500px]">
        <article className="flex items-end">
          <div className="flex flex-col justify-start items-start">
            <div
              className="text-xs text-white rounded-full bg-blue inline-block px-2 pt-[2px] pb-[3px] mb-1"
            >{clubInfo.club_category}</div>
            <div className="font-bold text-xl sm:text-[1.7rem] mr-2">{clubInfo.club_name}</div>
          </div>
          {clubInfo.club_recruit_period === '상시모집' ? (
            <div className="font-bold text-base text-blue sm:text-lg">[{clubInfo.club_recruit_period}]</div>
          ) : (
            <div
              className={`font-bold text-base sm:text-lg ${
                remainPeriod > 0 ? 'text-blue' : 'text-silver'
              }`}
            >{remainPeriod > 0 ? `[D-${remainPeriod}]` : '[마감]'}</div>
          )}
        </article>
        <article className="flex items-center">
          {/* 버전 2에서 구현 */}
          {/* <div className="mr-1 sm:mr-3">
            <IoMdHeartEmpty size="30" color="#26539C" />
          </div> */}
          <Suspense fallback={<Loading />}>
            <ClubJoinBtn clubId={clubInfo.club_id} />
          </Suspense>
        </article>
      </section>
      <section className="w-full mb-5 sm:mb-10 sm:w-[500px]">
        <Image
          className="w-[500px] rounded-md shadow-lg mx-auto"
          src={clubInfo.club_img_url}
          width={1000}
          height={0}
          alt="동아리 포스터"
        />
      </section>
      <section className="w-full border-[1.5px] border-blue p-3 mb-5 rounded-md text-sm sm:text-lg sm:w-[500px] sm:p-5 sm:mb-10">
        {clubPost.map((post, idx) => {
          if (!post) {
            return <br key={idx} />;
          }
          return <p className="break-words" key={idx}>{post}</p>;
        })}
      </section>
      {clubInfo.club_join_questions && (
        <section className="w-full sm:w-[500px]">
          <div className="text-2xl text-blue font-bold mb-5">가입질문</div>
          <div className="space-y-5">
            {clubInfo.club_join_questions.map((question, idx) => (
              <article className="w-full border-[1.5px] border-blue p-5 rounded-md" key={idx}>
                <div className="text-blue font-bold mb-3">Q{idx + 1}. {question}</div>
                <textarea
                  className="w-full min-h-[200px] border border-silver rounded-md px-3 py-2 outline-none resize-none"
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => questionInputChangeHandler(question, e)}
                />
              </article>
            ))}
          </div>
        </section>
      )}
      {/* 가입 신청 모달은 버전 2에서 구현 */}
      {/* {isModal && <JoinModal />} */}
    </>
  );
}

interface PropsType {
  clubInfo: ClubsData;
}

interface ClubsData {
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

interface FormInputs {
  [key: string]: string;
}