import Layout from "@/app/_components/layouts/Layout";
import NotFound from "@/app/not-found";
import { decrypt } from "@/utils/modules";

export default function AdminHome({ searchParams }: PageProps) {
  const id = decodeURIComponent(decrypt(searchParams.id, process.env.NEXT_PUBLIC_AES_ID_SECRET_KEY));
  
  if (id !== process.env.ADMIN_ID || !id) {
    return <NotFound />;
  }

  return (
    <Layout>
      <div className="text-blue font-bold text-2xl">동아리 개설 신청 내역</div>
    </Layout>
  );
}

interface PageProps {
  searchParams: {
    id: string;
  }
}