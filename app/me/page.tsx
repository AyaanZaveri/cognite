import { getAuthSession } from "@/lib/auth";
import timestampDate from "@/utils/timestampDate";
import { CalendarDays } from "lucide-react";
import Image from "next/image";
import React from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Space_Grotesk } from "next/font/google";
import UserHoverCard from "@/components/UserHoverCard";
import { db } from "@/lib/db";
import MeCard from "@/components/me/Card";
import { Tag, User } from "@prisma/client"
import CoolBlur from "@/components/CoolBlur";

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
    }
  });

  const date = timestampDate(session?.user?.createdDate);

  return (
    <div className="p-0 md:pl-[240px]">
      <CoolBlur />
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
            <span className="text-xs text-muted-foreground">Joined {date}</span>
            <CalendarDays className="ml-1 h-3 w-3 text-muted-foreground" />{" "}
          </div>

          <span className={`mt-1 text-3xl font-bold`}>
            @{session?.user?.username}
          </span>

          <span className={`mt-1 text-muted-foreground`}>
            <ReactMarkdown>{session?.user?.bio as string}</ReactMarkdown>
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
  );
}
