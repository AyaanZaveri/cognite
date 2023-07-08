import dynamic from "next/dynamic";

const ListCogs = dynamic(() => import("@/components/ListCogs"));
const Logo = dynamic(() => import("@/components/Logo"));

export default function Home() {
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
          <ListCogs />
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
