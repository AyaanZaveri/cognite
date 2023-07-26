import Card from "@/components/Cogs/Card";
import { getAuthSession } from "@/lib/auth";
import timestampDate from "@/utils/timestampDate";
import { CalendarDays } from "lucide-react";
import Image from "next/image";
import React from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

async function getUserCogs(userId: string) {
  const cogs = await prisma!.cog.findMany({
    include: {
      user: true,
    },
    where: {
      userId: userId,
    },
  });

  return cogs;
}

export default async function Page() {
  const session = await getAuthSession();

  const cogs = await getUserCogs(session?.user?.id as string);

  const date = timestampDate(session?.user?.createdDate as string);

  return (
    <div
      style={{
        paddingLeft: 240,
      }}
    >
      <div className="-space-y-10 p-5">
        <div className="relative h-48 w-full">
          <Image
            src={"https://i.ibb.co/r0nsc7X/Gradient-1.png"}
            alt="Banner Image"
            fill={true}
            className="rounded-xl object-cover"
            draggable={false}
          />
        </div>
        <div className="ml-6 flex flex-col items-start justify-end">
          <div className="relative h-20 w-20 rounded-lg">
            <Image
              src={session?.user?.image as string}
              alt="Profile Image"
              fill={true}
              className="rounded-xl ring-4 ring-white transition-all duration-200 ease-in-out hover:rotate-6"
              draggable={false}
            />
          </div>
          <div className="flex items-center pt-3">
            <span className="text-xs text-muted-foreground">Joined {date}</span>
            <CalendarDays className="ml-1 h-3 w-3 opacity-70" />{" "}
          </div>

          <span className={`mt-1 text-3xl font-bold text-zinc-700`}>
            @{session?.user?.username}
          </span>

          <span className={`mt-1 text-muted-foreground`}>
            <ReactMarkdown>{session?.user?.bio as string}</ReactMarkdown>
          </span>
        </div>
      </div>
      <div className="w-full select-none px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
          {cogs?.length >= 1 ? (
            cogs?.map((cog: any, idx: number) => <Card key={idx} cog={cog} />)
          ) : (
            <div className="h-36 w-full animate-pulse rounded-md bg-zinc-100"></div>
          )}
        </div>
      </div>
    </div>
  );
}
