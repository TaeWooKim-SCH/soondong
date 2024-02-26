import {
  FaBorderAll,
  FaMicrophone,
  FaPray,
  FaHandHoldingHeart,
  FaBookOpen,
  FaRunning
} from "react-icons/fa";
import { RiGalleryFill } from "react-icons/ri";
import { BiSolidReport } from "react-icons/bi";

import Layout from "../_components/layouts/Layout";
import Title from "../_components/Title";
import ToggleContainer from "../_components/ToggleContainer";
import ClubsSection from "./_components/ClubsSection";
import CategoryLink from "./_components/CategoryLink";

async function getData(category: string | undefined) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/clubs${
    category && category !== '모든 동아리' ? `?category=${category}` : ''
  }`, { cache: 'no-store' });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Clubs({ searchParams }: PageProps) {
  const clubsData: ClubType[] = await getData(searchParams?.category);

  return (
    <Layout>
      <section className="mb-5">
        <div className="flex justify-start space-x-8 mb-10 text-sm text-blue overflow-x-auto md:justify-center">
          <CategoryLink categoryName="모든 동아리" searchParams={searchParams?.category}>
            <FaBorderAll size="30" color="#26539C" />
          </CategoryLink>
          <CategoryLink categoryName="공연예술" searchParams={searchParams?.category}>
            <FaMicrophone size="30" color="#26539C" />
          </CategoryLink>
          <CategoryLink categoryName="종교" searchParams={searchParams?.category}>
            <FaPray size="30" color="#26539C" />
          </CategoryLink>
          <CategoryLink categoryName="봉사" searchParams={searchParams?.category}>
            <FaHandHoldingHeart size="30" color="#26539C" />
          </CategoryLink>
          <CategoryLink categoryName="교양학술" searchParams={searchParams?.category}>
            <FaBookOpen size="30" color="#26539C" />
          </CategoryLink>
          <CategoryLink categoryName="체육" searchParams={searchParams?.category}>
            <FaRunning size="30" color="#26539C" />
          </CategoryLink>
          <CategoryLink categoryName="전시창작" searchParams={searchParams?.category}>
            <RiGalleryFill size="30" color="#26539C" />
          </CategoryLink>
          <CategoryLink categoryName="준동아리" searchParams={searchParams?.category}>
            <BiSolidReport size="30" color="#26539C" />
          </CategoryLink>
        </div>
        <Title>{searchParams?.category} ({clubsData.length})</Title>
        <div className="flex justify-end items-center mt-3">
          <div className="mr-3 text-sm sm:text-base">모집 중인 동아리만 보기</div>
          <ToggleContainer toggleName="recruiting" />
        </div>
      </section>
      <ClubsSection clubsData={clubsData} />
    </Layout>
  );
}

interface PageProps {
  searchParams?: {
    [key: string]: string | undefined
  };
}

interface ClubType {
  club_id: string;
  club_name: string;
  club_description: string;
  club_img_url: string;
  club_recruit_period: string;
  club_category: string;
}