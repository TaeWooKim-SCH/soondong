import HeaderNav from "./HeaderNav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="bg-bg-color w-[100vw] min-h-full">
      {/*  */}
      <HeaderNav />
      {/*  */}
      { children }
      {/*  */}
    </main>
  );
}