import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { CgProfile } from "react-icons/cg";

export default async function UserInfo() {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <section>
      <div>
        <CgProfile className="sm:size-[40px]" color="#26539C" size="30" />
      </div>
    </section>
  );
}