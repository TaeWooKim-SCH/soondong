import Layout from "../_components/layouts/Layout";
import PostCard from "../_components/PostCard";
import Title from "../_components/Title";
import { clubsData } from "../_data/dummy";

export default function Home() {
  return (
    <Layout>
      <section className="mb-10">
        <Title className="mb-5">현재 모집중인 동아리</Title>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-10">
          {clubsData.map((clubInfo) => (
            <PostCard key={clubInfo.club_id} clubInfo={clubInfo} />
          ))}
        </div>
      </section>
      <section className="mb-10">
        <Title className="mb-5">인기 동아리</Title>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {clubsData.map((clubInfo) => (
            <PostCard key={clubInfo.club_id} clubInfo={clubInfo} />
          ))}
        </div>
      </section>
    </Layout>
  );
}