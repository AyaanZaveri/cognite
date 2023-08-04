import Logo from "@/components/Logo";
import Image from "next/image";
import { Space_Grotesk } from "next/font/google";
import ChatBox from "@/components/ChatBox";
import Chat from "@/components/Chat";
import prisma from "@/lib/prisma";
import Link from "next/link";
import UserHoverCard from "@/components/UserHoverCard";

export const dynamic = "force-dynamic";

const space_grotesk = Space_Grotesk({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

interface Cog {
  id: string;
  name: string;
  description: string;
  imgUrl: string;
  slug: string;
  user: {
    username: string;
  };
}

interface User {
  username: string;
  id: string;
  createdDate: string;
  bio: string;
}

async function getCog(id: string) {
  const cog = await prisma.cog.findUnique({
    where: {
      id: id,
    },
    include: {
      user: true,
    },
  });

  return cog;
}

async function getId(username: string, slug: string) {
  const res = await prisma.cog.findFirst({
    where: {
      slug: slug,
      user: {
        username: username,
      },
    },
  });
  return res;
}

export default async function Page({
  params,
}: {
  params: { slug: string; user: string };
}) {
  const { user, slug } = params;

  const id = await getId(user, slug);

  const cog: Cog = (await getCog(id?.id!)) as Cog;

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
          src={cog?.imgUrl}
          alt={cog?.slug}
          unoptimized={true}
          width={128}
          height={128}
          draggable={false}
          className="rounded-lg transition-all duration-1000 ease-in-out hover:scale-110"
        />
        <div className="flex flex-col items-center gap-4">
          <h1
            className={`text-center text-7xl font-bold ${space_grotesk.className}`}
          >
            {cog?.name}
          </h1>
          <div className="flex flex-col items-center">
            <p className="text-lg text-muted-foreground">{cog?.description}</p>
            <span className="text-accent-foreground">
              Created by{" "}
              <UserHoverCard
                user={cog?.user as User}
                nameClass="cursor-pointer font-semibold transition-colors duration-300 ease-in-out hover:text-orange-500 active:text-orange-500"
              />
            </span>
          </div>
        </div>
      </div>
      <Chat id={id?.id!} />
    </div>
  );
}
