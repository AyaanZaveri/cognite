import { Cogs } from "@/types";
import dynamic from "next/dynamic";
const Logo = dynamic(() => import("@/components/Logo"));
import prisma from "@/lib/prisma";
import Image from "next/image";
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

const space_grotesk = Space_Grotesk({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

async function getListCogs() {
  const cogs = await prisma!.cog.findMany({
    include: {
      user: true,
    },
  });

  return cogs;
}

export default async function Home() {
  const cogs: Cogs[] = await getListCogs();

  return (
    <main>
      <div
        className="flex h-full w-full flex-col items-center justify-center gap-8"
        style={{
          paddingLeft: 240,
        }}
      >
        <div className="mt-16 pb-4">
          <Logo size="5xl" />
        </div>
        <div className="w-full select-none px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
            {cogs?.length >= 1 ? (
              cogs?.map((cog: any, idx: number) => (
                <Card
                  key={cog.id}
                  className="duaration-300 relative transition duration-300 ease-in-out hover:cursor-pointer hover:bg-zinc-50 active:scale-[0.98]"
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
                            space_grotesk.className +
                            " text-lg font-semibold text-zinc-800"
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
              ))
            ) : (
              <div className="h-36 w-full animate-pulse rounded-md bg-zinc-100"></div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
