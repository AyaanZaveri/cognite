import Logo from "@/components/Logo";
import Search from "@/components/search";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { Tag } from "@/types";
import { User } from "@prisma/client";
import Sidebar from "@/components/Sidebar";
import QuickCreate from "@/components/QuickCreate";
import HomeCard from "@/components/home/Card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import WikiModal from "@/components/WikiModal";
import YouTubeModal from "@/components/YouTubeModal";
import { Suspense } from "react";

interface Cog {
  id: string;
  name: string;
  description: string;
  imgUrl: string | null;
  slug: string;
  tags: Tag[];
}

export default async function Home() {
  const session = await getAuthSession();

  const cogs = await db.cog.findMany({
    include: {
      tags: true,
    },
    where: {
      user: {
        username: "ion",
      },
      slug: {
        in: ["apple-vision-pro", "galaxy-s24", "mixture-of-experts", "discord"],
      },
    },
    orderBy: {
      createdDate: "desc",
    },
  });

  return (
    <div className="h-full">
      <div className="flex h-full min-h-[100vh] flex-row">
        <Suspense fallback={<span>Loading...</span>}>
          <Sidebar session={session?.user ? session : null} />
          <div className="grow lg:pb-2 lg:pr-2 lg:pt-2">
            <div className="-z-10 h-full bg-background bg-gradient-to-b bg-clip-border shadow-sm dark:from-orange-600/[0.15] dark:to-black md:dark:border lg:rounded-lg">
              <div className="flex h-full w-full flex-col items-center gap-2 p-0 pb-8">
                <div className="mt-24 pb-4">
                  <Logo size="5xl" />
                </div>
                <div className="flex w-full flex-col gap-2 px-8 md:w-4/5">
                  <div className="relative flex w-full flex-row space-x-2">
                    <div className="absolute z-50 flex w-full flex-col space-y-2">
                      <div className="flex w-full flex-row space-x-2">
                        <WikiModal />
                        {/* <YouTubeModal /> */}
                      </div>
                      <Search session={session} />
                    </div>
                  </div>
                </div>
                <div className="w-full select-none px-12 pt-28">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
                    {cogs.map((cog: Cog) => (
                      <HomeCard key={cog?.id} cog={cog} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Suspense>
      </div>
    </div>
  );
}
