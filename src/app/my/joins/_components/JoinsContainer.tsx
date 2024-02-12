'use client'

import { useEffect, useState } from "react";

import { useToggle } from "@/app/_modules/store";
import Title from "@/app/_components/Title";
import JoinCard from "./JoinCard";

export default function JoinsContainer({ joinsData }: PropsType) {
  const [joins, setJoins] = useState<JoinData[]>(joinsData);
  const { joined } = useToggle();

  useEffect(() => {
    if (joined) {
      const result = joinsData.filter((join) => {
        if (join.join_state === 'accept') {
          return join;
        } else {
          return;
        }
      });
      setJoins(result);
    } else {
      setJoins(joinsData);
    }
  }, [joinsData, joined])

  return (
    <>
      {!joinsData.length ? (
        <section className="flex justify-center items-center mt-44">
          <Title>신청 내역이 없어요! 동아리에 가입해보세요!</Title>
        </section>
      ) : (
        <section className="w-full grid grid-cols-1 sm:w-[500px]">
          {joins.map((join) => (
            <JoinCard joinData={join} key={join.club_id} />
          ))}
        </section>
      )}
    </>
  );
}

interface PropsType {
  joinsData: JoinData[]
}

interface JoinData {
  club_id: string;
  club_name: string;
  club_description: string;
  join_state: 'pending' | 'accept' | 'reject'; // accept, pending, reject 중 하나
}