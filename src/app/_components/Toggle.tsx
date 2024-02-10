'use client'

import { useToggle } from "../_modules/store";

export default function Toggle({ toggleName }: PropsType) {
  const {
    recruiting,
    joined,
    updateRecuiting,
    updateJoined
  } = useToggle();

  const toggleClickHandler = () => {
    toggleName === 'recruiting' ? updateRecuiting() : updateJoined();
  };

  switch (toggleName) {
    case 'recruiting':
      return (
        <div
          className={`relative w-[45px] h-[20px] sm:w-[55px] sm:h-[25px] rounded-full cursor-pointer ${
            recruiting ? 'bg-blue' : 'bg-silver'
          }`}
          onClick={toggleClickHandler}
        >
          <div
          className={`absolute top-1/2 -translate-y-1/2 w-[18px] h-[18px] sm:w-[22px] sm:h-[22px] bg-white rounded-full transition-all ${
            recruiting ? 'right-[0.1rem]' : 'right-[1.6rem] sm:right-[1.95rem]'
          }`}
          ></div>
        </div>
      );
    case 'joined':
      return (
        <div
          className={`relative w-[45px] h-[20px] sm:w-[55px] sm:h-[25px] rounded-full cursor-pointer ${
            joined ? 'bg-blue' : 'bg-silver'
          }`}
          onClick={toggleClickHandler}
        >
          <div
          className={`absolute top-1/2 -translate-y-1/2 w-[18px] h-[18px] sm:w-[22px] sm:h-[22px] bg-white rounded-full transition-all ${
            joined ? 'right-[0.1rem]' : 'right-[1.6rem] sm:right-[1.95rem]'
          }`}
          ></div>
        </div>
      );
  }
}

interface PropsType {
  toggleName: 'recruiting' | 'joined';
}