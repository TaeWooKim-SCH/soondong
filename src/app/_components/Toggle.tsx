'use client'

import { useState } from "react";

export default function Toggle() {
  const [isActive, setIsActive] = useState(false);

  const toggleClickHandler = () => {
    setIsActive((prev) => !prev);
  };

  return (
    <div
      className={`relative w-[55px] h-[25px] rounded-full cursor-pointer ${
        isActive ? 'bg-blue' : 'bg-silver'
      }`}
      onClick={toggleClickHandler}
    >
      <div
        className={`absolute top-1/2 -translate-y-1/2 w-[22px] h-[22px] bg-white rounded-full transition-all ${
          isActive ? 'right-[0.1rem]' : 'right-[1.95rem]'
        }`}
      ></div>
    </div>
  );
}
