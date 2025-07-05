import { Feed } from "@/components/ui/Feed";
import { News } from "@/components/ui/News";
import { SideBar } from "@/components/ui/SideBar";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const user = await currentUser();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20">
      <div className="w-[100%] mx-auto flex justify-between gap-8">
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
    </div>
  );
}
