import Card from "@/components/Cogs/Card";
import { Cogs } from "@/types";
import dynamic from "next/dynamic";
const Logo = dynamic(() => import("@/components/Logo"));
import prisma from "@/lib/prisma";

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
          <Logo size="text-5xl" />
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
    </main>
  );
}
