import Logo from "@/components/Logo";
import Image from "next/image";
import { Space_Grotesk } from "next/font/google";
import ChatBox from "@/components/ChatBox";
import Chat from "@/components/Chat";

const space_grotesk = Space_Grotesk({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

async function getCogs(slug: string) {
  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/cog/info?slug=${slug}`
  );
  return res.json();
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const cogsData = await getCogs(slug);

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
        <h1 className="text-3xl font-bold text-zinc-800">Chat</h1>
        <div className="h-48">
          <Chat />
        </div>
        <ChatBox />
      </div>
    </div>
  );
}
