import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { CgProfile } from "react-icons/cg";

export default async function UserInfo() {
  const session = await getServerSession(authOptions);
  
  return (
    <section className="flex justify-center items-center px-24 py-5 border border-blue rounded-md">
      <div>
        <CgProfile className="sm:size-[50px]" color="#26539C" size="40" />
      </div>
      <div className="ml-5">
        <div className="font-bold">{session?.user.name}</div>
        <div className="text-sm text-silver">{session?.user.id}</div>
      </div>
    </section>
  );
}