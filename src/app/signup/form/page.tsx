import Layout from "@/app/_components/Layouts/Layout";

async function getIsSignup() {
  const res = await fetch('/api/login');
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export default async function Form() {
  // const isSignup = await getIsSignup();
  // console.log(isSignup);
  return (
    <Layout>
      <main>회원가입 페이지입니다.</main>
    </Layout>
  );
}