import { Cogs } from "@/types";
import { Space_Grotesk } from "next/font/google";
import Logo from "@/components/Logo";
import ListCogs from "@/components/ListCogs";
import prisma from "@/lib/prisma-edge";

export default async function Home() {
  const cogs = await prisma!.cog.findMany({
    orderBy: {
      createdDate: "desc",
    },
    include: {
      user: true,
      tags: true,
    },
    where: {
      private: false,
    }
  });

  return (
    <main>
      <div className="flex h-full w-full flex-col items-center justify-center gap-8 p-0 pb-8 md:pl-[240px]">
        <div className="mt-16 pb-4">
          <Logo size="5xl" />
        </div>
        <div className="w-full select-none px-8">
          <ListCogs cogs={cogs} />
        </div>
      </div>
    </main>
  );
}
