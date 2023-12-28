import Layout from "../_components/Layouts/Layout";
import PostCard from "../_components/PostCard";
import Title from "../_components/Title";

export default function Home() {
  return (
    <Layout>
      <section className="mb-10">
        <Title className="mb-5">현재 모집중인 동아리</Title>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
        </div>
      </section>
      <section className="mb-10">
        <Title className="mb-5">인기 동아리</Title>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-6">
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
        </div>
      </section>
    </Layout>
  );
}