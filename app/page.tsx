import { Cogs } from "@/types";
import dynamic from "next/dynamic";

const ListCogs = dynamic(() => import("@/components/ListCogs"));
const Logo = dynamic(() => import("@/components/Logo"));

async function getListCogs() {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/cog/list`, {
    cache: "no-store",
  });
  const { data } = await res.json();

  console.log(data)

  return data;
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
        <div className="mt-20 pb-4">
          <Logo size="text-5xl" />
        </div>
        <div className="w-full select-none px-8">
          <ListCogs cogs={cogs} />
        </div>
      </div>
    </main>
  );
}
