import Logo from "@/components/Logo";
import Search from "@/components/search";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { Tag } from "@/types";
import { User } from "@prisma/client";
import { searchCogs } from "./_actions/search";

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

  return (
    <div className="h-screen overflow-hidden pb-2 pr-2 pt-2 md:ml-[220px]">
      <div className="scrollbar-hide h-full bg-background bg-gradient-to-b bg-clip-border shadow-sm dark:from-orange-600/10 dark:to-black md:dark:border lg:rounded-lg">
        <div className="flex h-full w-full flex-col items-center gap-8 p-0 pb-8">
          <div className="mt-24 pb-4">
            <Logo size="5xl" />
          </div>
          <div className="w-4/5 px-8">
            <Search />
          </div>
        </div>
      </div>
    </div>
  );
}
