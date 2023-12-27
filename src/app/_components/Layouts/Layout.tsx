import Footer from "./Footer";
import HeaderNav from "./HeaderNav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="bg-bg-color w-[100vw] min-h-full">
      {/*  */}
      <HeaderNav />
      {/*  */}
      <section className="px-10 py-10 sm:px-16 md:px-28 xl:px-44">{ children }</section>
      {/*  */}
      <Footer />
      {/*  */}
    </main>
  );
}