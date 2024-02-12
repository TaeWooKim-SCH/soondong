'use client'

export default function Toggle({ state, onClick }: PropsType) {
  return (
    <button
      className={`relative w-[45px] h-[20px] sm:w-[55px] sm:h-[25px] rounded-full cursor-pointer ${
        state ? 'bg-blue' : 'bg-silver'
      }`}
      onClick={onClick}
    >
      <div
      className={`absolute top-1/2 -translate-y-1/2 w-[18px] h-[18px] sm:w-[22px] sm:h-[22px] bg-white rounded-full transition-all ${
        state ? 'right-[0.1rem]' : 'right-[1.6rem] sm:right-[1.95rem]'
      }`}
      ></div>
    </button>
  );
}

interface PropsType extends React.ComponentProps<'button'> {
  state: boolean;
}