import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Cogs } from "@/types";
import { getServerSession } from "next-auth";
import { headers } from "next/dist/client/components/headers";
import dynamic from "next/dynamic";

const ListCogs = dynamic(() => import("@/components/ListCogs"));
const Logo = dynamic(() => import("@/components/Logo"));

async function getListCogs() {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/cog/list`);
  const { data } = await res.json();
  console.log("data", data);
  return data;
}

export default async function Home() {
  const cogs: Cogs[] = await getListCogs();

  console.log("cogs", cogs);

  return (
    <main>
      <div
        className="flex h-full w-full flex-col items-center justify-center gap-8"
        style={{
          paddingLeft: 240,
        }}
      >
        <Logo />
        <div className="w-full select-none px-8">
          <ListCogs cogs={cogs} />
        </div>
        <div
          className="fixed bottom-6 w-full"
          style={{
            paddingLeft: 240 / 2,
          }}
        >
          <div className="flex w-full flex-row gap-6 px-8">
            <form className="flex w-full flex-row gap-3">
              <input
                name=""
                id=""
                placeholder="What would you like to cognite 🔥"
                className="w-full select-none resize-none rounded-md px-4 py-3 font-normal shadow-sm outline-none ring-1 ring-zinc-200 transition-all duration-300 placeholder:text-zinc-500/60 hover:bg-zinc-50 hover:ring-2 hover:ring-zinc-300 focus:ring-2 focus:ring-orange-500"
              ></input>
              {/* make a black button that says make question */}
              <button
                className="w-max select-none rounded-md bg-black px-8 py-2 font-medium text-white outline-none transition-all duration-300 hover:bg-zinc-800 hover:shadow-2xl hover:shadow-zinc-500/10 active:scale-[0.98]"
                type="submit"
                style={{
                  marginRight: 240 / 2,
                }}
              >
                {/* {isAnswerLoading ? (
                  <span className="inline-flex animate-pulse gap-2">
                    Thinking <p>🧠</p>
                  </span>
                ) : ( */}
                <span className="inline-flex gap-2">
                  Cognite <p>🔥</p>
                </span>
                {/* )} */}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
