import Layout from "../_components/Layouts/Layout";
import PostCard from "../_components/PostCard";
import Title from "../_components/Title";

export default function Home() {
  return (
    <Layout>
      <section>
        <Title>현재 모집중인 동아리</Title>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-3">
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
        </div>
      </section>
      <section>
        <Title>인기 동아리</Title>
      </section>
    </Layout>
  );
}