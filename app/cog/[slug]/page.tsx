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

async function getCogs(id: number) {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/cog/info?id=${id}`);
  return res.json();
}

async function getIdFromSlug(slug: string) {
  // return the id from the slug with prisma find
  const res = await prisma.cog.findUnique({
    where: {
      slug: slug,
    },
  });
  return res;
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const id = await getIdFromSlug(slug);

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
        <Image src={cogs?.imgUrl} alt={cogs?.slug} width={128} height={128} />
        <div className="flex flex-col items-center gap-2">
          <h1
            className={`text-6xl font-bold text-zinc-800 ${space_grotesk.className}`}
          >
            {cogs?.name}
          </h1>
          <p className="text-zinc-500">{cogs?.description}</p>
        </div>
      </div>
      <Chat id={id?.id!} />
    </div>
  );
}
