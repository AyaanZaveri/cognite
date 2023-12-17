import Logo from "@/components/Logo";
import Search from "@/components/search";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { Tag } from "@/types";
import { User } from "@prisma/client";
import { searchCogs } from "./_actions/search";
import Sidebar from "@/components/Sidebar";
import QuickCreate from "@/components/QuickCreate";
import CoolBlur from "@/components/CoolBlur";

interface Cog {
  id: string;
  name: string;
  description: string;
  imgUrl: string;
  slug: string;
  tags: Tag[];
  user: User;
}

export default async function Home() {
  const session = await getAuthSession();

  return (
    <div className="h-full">
      <div className="flex h-full min-h-[100vh] flex-row">
        <Sidebar session={session?.user ? session : null} />
        <div className="grow lg:pb-2 lg:pr-2 lg:pt-2">
          <div className="-z-10 h-full bg-background bg-gradient-to-b from-amber-300/10 to-white bg-clip-border shadow-sm dark:from-orange-600/[0.15] dark:to-black md:dark:border lg:rounded-lg">
            <div className="flex h-full w-full flex-col items-center gap-8 p-0 pb-8">
              <div className="mt-24 pb-4">
                <Logo size="5xl" />
              </div>
              <div className="flex w-full flex-row space-x-2 px-8 md:w-4/5">
                <Search />
                <QuickCreate session={session} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
