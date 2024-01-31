import { getAuthSession } from "@/lib/auth";
import timestampDate from "@/utils/timestampDate";
import { CalendarDays } from "lucide-react";
import React, { Suspense } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { db } from "@/lib/db";
import MeCard from "@/components/me/Card";
import Sidebar from "@/components/Sidebar";
import { Tag } from "@/types";
import Markdown from "react-markdown";
import { Session } from "next-auth";

export const dynamic = "force-dynamic";

interface Cog {
  id: string;
  name: string;
  description: string;
  imgUrl: string | null;
  slug: string;
  tags: Tag[];
}

export default async function Page() {
  const session = await getAuthSession();

  const cogs = await db.cog.findMany({
    include: {
      tags: true,
    },
    where: {
      userId: session?.user?.id,
    },
    orderBy: {
      createdDate: "desc",
    },
  });

  const date = timestampDate(session?.user?.createdDate);

  return (
    <div className="h-full">
      <div className="flex h-full min-h-[100vh] flex-row">
        <Suspense fallback={<span>Loading...</span>}>
          <Sidebar session={session?.user ? session : null} />
          <div className="grow lg:pb-2 lg:pr-2 lg:pt-2">
            <div className="h-full bg-background bg-gradient-to-b bg-clip-border pb-8 shadow-sm dark:from-orange-600/10 dark:to-black md:dark:border lg:rounded-lg">
              <div className="-space-y-10 p-5">
                <div className="noise relative h-48 w-full rounded-xl bg-amber-500 object-cover"></div>
                <div className="ml-6 flex flex-col items-start justify-end">
                  <div className="relative h-20 w-20 rounded-lg">
                    <Avatar className="h-20 w-20 rounded-xl ring-4 ring-white transition-all duration-200 ease-in-out hover:rotate-6 dark:ring-black">
                      <AvatarImage
                        src={session?.user.image as string}
                        draggable={false}
                      />
                      <AvatarFallback className="rounded-xl text-xl ring-4 ring-white transition-all duration-200 ease-in-out hover:rotate-6 dark:ring-black">
                        {session?.user?.username.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex items-center pt-3">
                    <span className="text-xs text-muted-foreground">
                      Joined {date}
                    </span>
                    <CalendarDays className="ml-1 h-3 w-3 text-muted-foreground" />
                  </div>

                  <span className={`mt-1 text-3xl font-bold`}>
                    @{session?.user?.username}
                  </span>

                  <span className={`mt-1 text-muted-foreground`}>
                    <Markdown>{session?.user?.bio as string}</Markdown>
                  </span>
                </div>
              </div>
              <div className="w-full select-none px-8">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
                  {cogs.map((cog: Cog) => (
                    <MeCard key={cog?.id} cog={cog} session={session} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Suspense>
      </div>
    </div>
  );
}
