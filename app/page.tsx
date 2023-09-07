import Logo from "@/components/Logo";
import ListCogs from "@/components/ListCogs";
import { getTheme } from "@/helpers/getTheme";
import CoolBlur from "@/components/CoolBlur";
import { User } from "@prisma/client";
import QuickCreate from "@/components/QuickCreate";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import CogCard from "@/components/cog/Card";
import { Tag } from "@/types";

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

  const cogs = await db.cog.findMany({
    include: {
      user: true,
      tags: true,
    },
    where: {
      private: false,
    },
    orderBy: {
      createdDate: "desc",
    },
  });

  return (
    <main className="md:pl-[240px]">
      <CoolBlur />
      <div className="flex h-full w-full flex-col items-center justify-center gap-8 p-0 pb-8">
        <div className="mt-16 pb-4">
          <Logo size="5xl" />
        </div>
        <div className="w-full select-none px-8">
          <div className="mb-4">
            <QuickCreate session={session} />
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
            {cogs.map((cog) => (
              <CogCard key={cog?.id} cog={cog as Cog} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
