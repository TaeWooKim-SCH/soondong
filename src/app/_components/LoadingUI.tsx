import { AiOutlineLoading } from "react-icons/ai";

export default function LoadingUI() {
  return (
    <main className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vh] bg-white/50 flex justify-center items-center">
      <div className="flex justify-center items-center">
        <AiOutlineLoading className="animate-spin" size="50" color="#26539C" />
      </div>
    </main>
  )
}