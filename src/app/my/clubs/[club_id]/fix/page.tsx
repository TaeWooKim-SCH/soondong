import Layout from "@/app/_components/layouts/Layout";

export default function MyClubInfoFix({ params }: PageProps) {
  return (
    <Layout>
      <main>수정페이지</main>
    </Layout>
  );
}

interface PageProps {
  params: {
    club_id: string;
  }
}