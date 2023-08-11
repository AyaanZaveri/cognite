import Logo from "@/components/Logo";
import Image from "next/image";
import { Space_Grotesk } from "next/font/google";
import Chat from "@/components/Chat";
import prisma from "@/lib/prisma";
import Link from "next/link";
import UserHoverCard from "@/components/UserHoverCard";
import { getAuthSession } from "@/lib/auth";
import { Session } from "next-auth";

export const dynamic = "force-dynamic";

const space_grotesk = Space_Grotesk({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

async function getCog(username: string, slug: string, session: Session | null) {
  const cog = await prisma.cog.findFirst({
    where: {
      slug: slug,
      user: {
        username: username,
      },
      OR: [
        {
          private: false, // Include public cogs
        },
        {
          private: true, // Include private cogs owned by the given user
          userId: session?.user?.id ? session.user.id : "bob",
        },
      ],
    },
    include: {
      user: true,
    },
  });

  return cog;
}

export default async function Page({
  params,
}: {
  params: { slug: string; user: string };
}) {
  const { user, slug } = params;

  const session = await getAuthSession();

  const cog = await getCog(user, slug, session);

  return (
    <div className="p-0 md:pl-[240px]">
      {/* <h1>{JSON.stringify(cogs)}</h1> */}
      <div className="p-5">
        <Link href={"/"}>
          <Logo size="3xl" />
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center gap-6 p-5">
        <Image
          src={cog?.imgUrl as string}
          alt={cog?.slug as string}
          unoptimized={true}
          width={128}
          height={128}
          draggable={false}
          className="rounded-lg transition-all duration-1000 ease-in-out hover:scale-110"
        />

        <div className="flex flex-col items-center gap-4">
          <h1
            className={`text-center text-5xl font-bold sm:text-6xl md:text-7xl ${space_grotesk.className}`}
          >
            {cog?.name}
          </h1>
          <div className="flex flex-col items-center">
            <p className="text-center text-lg text-muted-foreground">
              {cog?.description}
            </p>
            <span className="text-accent-foreground">
              Created by{" "}
              <UserHoverCard
                user={cog?.user}
                nameClass="cursor-pointer font-semibold transition-colors duration-300 ease-in-out hover:text-orange-500 active:text-orange-500"
              />
            </span>
          </div>
        </div>
      </div>
      <Chat id={cog?.id!} />
    </div>
  );
}
