import { getAuthSession } from "@/lib/auth";
import timestampDate from "@/utils/timestampDate";
import { CalendarDays } from "lucide-react";
import Image from "next/image";
import React from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Space_Grotesk } from "next/font/google";
import UserHoverCard from "@/components/UserHoverCard";
import prisma from "@/lib/prisma";

const space_grotesk = Space_Grotesk({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

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

          <span className={`mt-1 text-3xl font-bold text-primary`}>
            @{session?.user?.username}
          </span>

          <span className={`mt-1 text-muted-foreground`}>
            <ReactMarkdown>{session?.user?.bio as string}</ReactMarkdown>
          </span>
        </div>
      </div>
      <div className="w-full select-none px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
          {cogs?.map((cog: any, idx: number) => (
            <Card
              key={cog.id}
              className="duaration-300 relative transition duration-300 ease-in-out hover:cursor-pointer hover:bg-accent active:scale-[0.98]"
            >
              <Link
                href={`/cog/${cog?.user?.username}/${cog.slug}`}
                className="p-6"
              >
                <CardHeader className="relative p-0 px-6">
                  <div className="flex flex-row items-center gap-x-3">
                    <Avatar className="h-7 w-7 rounded-sm">
                      <AvatarImage src={cog.imgUrl} draggable={false} />
                      <AvatarFallback className="h-7 w-7 rounded-sm">
                        {cog.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <CardTitle
                      className={
                        space_grotesk.className + " text-lg font-semibold "
                      }
                    >
                      {cog.name}
                    </CardTitle>
                  </div>
                  <CardDescription>{cog.description}</CardDescription>
                </CardHeader>
              </Link>
              <CardFooter className="absolute bottom-0 right-0 p-3">
                <UserHoverCard user={cog?.user} />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
