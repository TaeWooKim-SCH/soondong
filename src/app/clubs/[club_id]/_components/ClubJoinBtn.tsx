'use client'

import { throttle } from "lodash";

export default function ClubJoinBtn() {
  const clubJoinClickHandler = throttle(async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/clubs/join`);
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
      else {
        const json = await res.json();
        const confirmUserInfo = confirm(`이름: ${json.name}\n학번: ${json.student_id}\n전화번호: ${json.phone_number}\n단과대: ${json.school_college}\n학과: ${json.school_department}\n\n위 정보가 맞습니까? (일치하지 않는다면 마이페이지에서 정보를 수정해주세요.)`);

        if (!confirmUserInfo) {
          return;
        }
      }
    } catch (err) {
      console.error(err);
    }
  }, 2000);

  return (
    <button
      className="bg-blue px-3 py-1 rounded-md text-white text-sm sm:text-base sm:px-4"
      onClick={clubJoinClickHandler}
    >신청하기</button>
  );
}