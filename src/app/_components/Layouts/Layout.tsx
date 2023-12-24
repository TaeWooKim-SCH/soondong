import HeaderNav from "./HeaderNav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="bg-bg-color min-h-full">
      {/*  */}
      <HeaderNav />
      {/*  */}
      { children }
      {/*  */}
    </main>
  );
}