import Logo from "@/components/Logo";
import Image from "next/image";
import { Space_Grotesk } from "next/font/google";
import ChatBox from "@/components/ChatBox";
import Chat from "@/components/Chat";
import prisma from "@/lib/prisma";

const space_grotesk = Space_Grotesk({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

async function getCogs(id: string) {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/cog/info?id=${id}`, {
    cache: "no-store",
  });
  return res.json();
}

async function getId(username: string, slug: string) {
  // return the id from the slug with prisma find
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

  console.log(id);

  const cogsData = await getCogs(id?.id!);

  const cogs = cogsData.data;

  return (
    <div
      style={{
        paddingLeft: 240,
      }}
    >
      {/* <h1>{JSON.stringify(cogs)}</h1> */}
      <div className="p-5">
        <Logo size="text-3xl" />
      </div>
      <div className="flex flex-col items-center justify-center gap-6 p-5">
        <Image
          src={cogs?.imgUrl}
          alt={cogs?.slug}
          width={128}
          height={128}
          draggable={false}
          className="transition-all duration-1000 ease-in-out hover:scale-110"
        />
        <div className="flex flex-col items-center gap-5">
          <h1
            className={`text-center text-7xl font-bold text-zinc-800 ${space_grotesk.className}`}
          >
            {cogs?.name}
          </h1>
          <div className="flex flex-col items-center">
            <p className="text-lg text-zinc-500">{cogs?.description}</p>
            <span className="text-zinc-700">
              Created by{" "}
              <b className="cursor-pointer font-semibold transition-colors duration-500 ease-in-out hover:text-orange-500 active:text-orange-500">
                @{cogs?.user?.username}
              </b>
            </span>
          </div>
        </div>
      </div>
      <Chat id={id?.id!} />
    </div>
  );
}
