'use client'

import Link from "next/link";
import { useState } from "react";

export default function SideBar() {
  const headerItems = ["모든 동아리", "공연예술", "종교", "봉사", "교양학술", "체육", "전시창작", "준동아리"];
  const [isSideBar, setIsSideBar] = useState(false);

  const sideBarHandler = () => {
    setIsSideBar((prev) => !prev);
  }

  return (
    <section className="xl:hidden">
      <div className="ml-2 relative w-[30px] h-[30px] flex flex-col justify-evenly cursor-pointer z-50 sm:ml-5" onClick={sideBarHandler}>
        <div
          className={`absolute transition-all w-[30px] h-[4px] bg-blue rounded-md ${isSideBar ? 'top-1/2 -translate-y-1/2 rotate-45 bg-white' : 'top-2'}`}
          ></div>
        <div
          className={`absolute transition-all w-[30px] h-[4px] bg-blue rounded-md ${isSideBar ? 'top-1/2 -translate-y-1/2 -rotate-45 bg-white' : 'top-4'}`}
          ></div>
      </div>
      <div className={`absolute top-0 right-0 duration-300 w-full h-[100vh] bg-blue z-40 ${isSideBar ? "translate-y-0" : "-translate-y-[100%]"}`}>
        <div className="px-20 py-24 flex flex-col items-center text-white sm:text-xl">
          {headerItems.map((item) => (
            <Link className="mb-5" href={`/clubs?category=${item}`} key={item}>{item}</Link>
          ))}
        </div>
      </div>
    </section>
  );
}