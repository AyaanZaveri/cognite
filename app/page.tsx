import Logo from "@/components/Logo";
import ListCogs from "@/components/ListCogs";
import { getTheme } from "@/helpers/getTheme";
import CoolBlur from "@/components/CoolBlur";
import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "@prisma/client/edge";

const prismaWithAccelerate = new PrismaClient().$extends(withAccelerate());

export default async function Home() {
  const theme = getTheme();

  const cogs = await prismaWithAccelerate!.cog.findMany({
    orderBy: {
      createdDate: "desc",
    },
    include: {
      user: true,
      tags: true,
    },
    where: {
      private: false,
    },
  });

  console.log(theme);

  return (
    <main className="md:pl-[240px]">
      <CoolBlur />
      <div className="flex h-full w-full flex-col items-center justify-center gap-8 p-0 pb-8">
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
