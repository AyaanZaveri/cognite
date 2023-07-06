"use client";

import { Space_Grotesk, Inter } from "next/font/google";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import ListCogs from "@/components/ListCogs";

const inter = Inter({ subsets: ["latin"] });
const space_grotesk = Space_Grotesk({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function Home() {
  return (
    <main>
      <div
        className="flex flex-col w-full items-center justify-center gap-8 h-full"
        style={{
          paddingLeft: 240,
        }}
      >
        <div className="items-center pt-12 pb-4 text-5xl select-none inline-flex gap-2 mt-6">
          <span
            className={
              space_grotesk.className +
              " font-semibold pb-2 animate-text bg-gradient-to-r from-orange-500 via-amber-500 to-red-500 bg-clip-text text-transparent"
            }
          >
            Cognition
          </span>
          <span className="pb-2">🔥</span>
        </div>
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
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
              className="flex w-full flex-row gap-3"
            >
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
