import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Cogs } from "@/types";
import { getServerSession } from "next-auth";
import { headers } from "next/dist/client/components/headers";
import dynamic from "next/dynamic";

const ListCogs = dynamic(() => import("@/components/ListCogs"));
const Logo = dynamic(() => import("@/components/Logo"));

async function getListCogs() {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/cog/list`, {
    cache: "no-store",
  });
  const { data } = await res.json();
  console.log("data", data);
  return data;
}

async function createCog(cogData: Cogs) {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/cog/create`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(cogData),
    });

    if (!res.ok) {
      throw new Error("Network response was not ok" + res.statusText);
    }

    const response = await res.json();
    console.log(response);
  } catch (error) {
    console.error("Error:", error);
  }
}

export default async function Home() {
  const cogs: Cogs[] = await getListCogs();

  const session = await getServerSession(authOptions);

  await createCog({
    user: "aytoz",
    userId: session?.user?.id as unknown as number,
    name: "The Woodlands",
    description:
      "The Woodlands Secondary School is a school in Mississauga, Ontario, Canada",
    type: "web",
    slug: "rew",
    imgUrl: "https://thewoodlandsss.peelschools.org/images/logo.svg",
    docs: [{ pageContent: "foo" }, { pageContent: "bar" }],
  });

  return (
    <main>
      <div
        className="flex flex-col w-full items-center justify-center gap-8 h-full"
        style={{
          paddingLeft: 240,
        }}
      >
        <Logo />
        <div className="w-full px-8 select-none">
          <ListCogs cogs={cogs} />
        </div>
        <div
          className="bottom-6 w-full fixed"
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
                className="w-full font-normal select-none resize-none hover:bg-zinc-50 rounded-md py-3 px-4 shadow-sm outline-none ring-1 ring-zinc-200 hover:ring-2 transition-all duration-300 hover:ring-zinc-300 focus:ring-2 focus:ring-orange-500 placeholder:text-zinc-500/60"
              ></input>
              {/* make a black button that says make question */}
              <button
                className="w-max rounded-md select-none outline-none bg-black px-8 py-2 font-medium text-white transition-all duration-300 hover:bg-zinc-800 hover:shadow-2xl hover:shadow-zinc-500/10 active:scale-[0.98]"
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
