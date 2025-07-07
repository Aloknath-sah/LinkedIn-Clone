import { Feed } from "@/components/ui/Feed";
import { News } from "@/components/ui/News";
import { SideBar } from "@/components/ui/SideBar";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const user = await currentUser();

  return (
    <div className="w-full flex justify-between gap-8 px-4 sm:px-10 py-8">
      
        {/* sidebar */}
        <div className="w-[30%]">
          <SideBar user={user} />
        </div>

        {/* feed */}
        <div className="w-full lg:w-[40%]">
          <Feed user={user} />
        </div>

        {/* news */}
        <div className="w-[30%]">
          <News />
        </div>
    </div>
  );
}
