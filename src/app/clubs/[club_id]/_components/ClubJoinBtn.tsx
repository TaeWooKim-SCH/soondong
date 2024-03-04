'use client'

import { useState } from "react";
import { throttle } from "lodash";

import LoadingUI from "@/app/_components/LoadingUI";
import { useSession } from "next-auth/react";

export default function ClubJoinBtn({ clubId, isForm, joinForm }: PropsType) {
  const { status } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const clubJoinClickHandler = throttle(async () => {
    // 로그인 상태일 때만 가입 가능
    if (status === 'unauthenticated') {
      return alert('로그인 후 시도해주세요.');
    }

    // 가입 질문이 있을 때 검증
    if (isForm) {
      for (let i in joinForm) {
        if (!joinForm[i]) {
          return alert(`'${i}'에 대한 답변을 작성해주세요.`);
        }
      }
    }

    try {
      // 가입자 정보 재확인 요청
      setIsLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/clubs/join/${clubId}`);
      if (res.status === 401) {
        setIsLoading(false);
        return alert('로그인 후 시도해주세요.');
      } else if (res.status === 409) {
        setIsLoading(false);
        return alert('이미 신청된 동아리입니다.');
      } else if (!res.ok) {
        setIsLoading(false);
        throw new Error('Failed to fetch data');
      } else {
        setIsLoading(false);
        const json = await res.json();
        const confirmUserInfo = confirm(`이름: ${json.name}\n학번: ${json.student_id}\n전화번호: ${json.phone_number}\n단과대: ${json.school_college}\n학과: ${json.school_department}\n\n위 정보가 맞습니까? (일치하지 않는다면 마이페이지에서 정보를 수정해주세요.)`);

        if (!confirmUserInfo) {
          return;
        }
        else {
          // 가입 요청
          const body: {[key: string]: string[];} = {};
          for (let i in joinForm) { // textarea 줄바꿈 처리
            body[i] = joinForm[i].includes('\n') ? joinForm[i].split('\n') : [joinForm[i]];
          }
          const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/clubs/join/${clubId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
          });
          if (!res.ok) {
            alert('가입 신청에 실패했습니다.');
            window.location.reload();
          }
          else {
            alert('가입 신청에 성공했습니다.');
            window.location.reload();
          }
        }
      }
    } catch (err) {
      console.error(err);
    }
  }, 2000);

  return (
    <>
      <button
        className="bg-blue px-3 py-1 rounded-md text-white text-sm sm:text-base sm:px-4"
        onClick={clubJoinClickHandler}
      >가입신청</button>
      {/* 모달은 버전 2에서 구현 */}
      {/* <Link
        href={`/clubs/${clubId}?ismodal=true`}
        className="bg-blue px-3 py-1 rounded-md text-white text-sm sm:text-base sm:px-4"
      >가입신청</Link> */}
      {isLoading && <LoadingUI />}
    </>
  );
}

interface PropsType {
  clubId: string;
  isForm: boolean;
  joinForm: { [key: string]: string; };
}