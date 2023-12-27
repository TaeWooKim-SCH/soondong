'use client'

import Link from "next/link";
import { useState } from "react";
import { IoClose, IoMenu } from "react-icons/io5";

export default function SideBar() {
  const headerItems = ["모든 동아리", "공연예술", "종교", "봉사", "교양학술", "체육", "전시창작", "준동아리"];
  const [isSideBar, setIsSideBar] = useState(false);

  const sideBarHandler = () => {
    setIsSideBar((prev) => !prev);
  }

  return (
    <section className="xl:hidden">
      <div className="ml-2 cursor-pointer sm:ml-5" onClick={sideBarHandler}>
        <IoMenu className="sm:size-[40px]" size="30" color="#26539C" />
      </div>
      <div className={`absolute top-0 right-0 duration-500 h-full bg-blue ${isSideBar ? "translate-x-0" : "translate-x-[100%]"}`}>
        <div className="text-end mt-3 mr-3 mb-5">
          <IoClose className="inline-block cursor-pointer sm:size-[40px]" onClick={sideBarHandler} fill="white" size="30" />
        </div>
        <div className="px-20 flex flex-col items-center text-white sm:text-xl">
          {headerItems.map((item) => (
            <Link className="mb-5" href={`/clubs?category=${item}`} key={item}>{item}</Link>
          ))}
        </div>
      </div>
    </section>
  );
}