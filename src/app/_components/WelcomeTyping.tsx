'use client'

import { TypeAnimation } from 'react-type-animation';

export default function WelcomeTyping() {
  return (
    <TypeAnimation
      sequence={[
        '안녕하세요.',
        500,
        '다양한 동아리를 연결해주는',
        500,
        '순동입니다.'
        ,2000
      ]}
      speed={30}
      repeat={Infinity}
    />
  );
}