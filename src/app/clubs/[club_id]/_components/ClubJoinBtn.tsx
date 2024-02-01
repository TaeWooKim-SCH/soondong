'use client'

import { useState } from "react";
import { throttle } from "lodash";

import LoadingUI from "@/app/_components/LoadingUI";

export default function ClubJoinBtn({ clubId }: PropsType) {
  const [isLoading, setIsLoading] = useState(false);

  const clubJoinClickHandler = throttle(async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/clubs/join/${clubId}`);
      if (res.status === 401) {
        setIsLoading(false);
        return alert('로그인 후 시도해주세요.');
      }
      else if (!res.ok) {
        setIsLoading(false);
        throw new Error('Failed to fetch data');
      }
      else {
        setIsLoading(false);
        const json = await res.json();
        const confirmUserInfo = confirm(`이름: ${json.name}\n학번: ${json.student_id}\n전화번호: ${json.phone_number}\n단과대: ${json.school_college}\n학과: ${json.school_department}\n\n위 정보가 맞습니까? (일치하지 않는다면 마이페이지에서 정보를 수정해주세요.)`);

        if (!confirmUserInfo) {
          return;
        }
        else {
          const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/clubs/join/${clubId}`, { method: 'POST' });
          if (!res.ok) {
            return alert('가입 신청에 실패했습니다.');
          }
          else {
            return alert('가입 신청에 성공했습니다.');
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
      {isLoading && <LoadingUI />}
    </>
  );
}

interface PropsType {
  clubId: string;
}