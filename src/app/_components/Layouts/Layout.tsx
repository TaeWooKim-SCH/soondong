'use client'

import { useEffect } from "react";
import Footer from "./Footer";
import HeaderNav from "./HeaderNav";
import { useSession } from "next-auth/react";

export default function Layout({ children, className }: { children: React.ReactNode, className?: React.ReactNode }) {
  const { data: session } = useSession();
  
  useEffect(() => {
    console.log(session);
  }, [session])

  return (
    <main className="bg-bg-color w-[100vw] min-h-full">
      {/*  */}
      <HeaderNav />
      {/*  */}
      <section className={`min-h-[80vh] px-10 py-10 sm:px-16 md:px-28 xl:px-44 ${className}`}>{ children }</section>
      {/*  */}
      <Footer />
      {/*  */}
    </main>
  );
}