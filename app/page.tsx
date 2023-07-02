"use client";

import { Space_Grotesk, Inter } from "next/font/google";
import { useEffect, useState } from "react";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { sidebarWidthState } from "@/atoms/sidebar";
import { useRecoilState } from "recoil";
import WebCard from "@/components/Cogs/Card";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";
import { BaseChatModel } from "langchain/dist/chat_models/base";
import Card from "@/components/Cogs/Card";
import Cog from "@/models/Cog";

const inter = Inter({ subsets: ["latin"] });
const space_grotesk = Space_Grotesk({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export default async function Home() {
  const [isAnswerLoading, setIsAnswerLoading] = useState(false);
  const [notesText, setNotesText] = useState("");
  const [question, setQuestion] = useState("");
  const [streamedAnswer, setStreamedAnswer] = useState<string>("");
  const [streamingModel, setStreamingModel] = useState<BaseChatModel>();
  const [chain, setChain] = useState<any>(null);
  const [sidebarWidth, setSidebarWidth] = useRecoilState(sidebarWidthState);
  const [fileCogLoading, setFileCogLoading] = useState(false);
  const [streaming, setStreaming] = useState(false);

  const cogs: any = [];

  return (
    <main>
      <div
        className="flex flex-col w-full items-center justify-center gap-8 h-full"
        style={{
          paddingLeft: sidebarWidth,
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {cogs.map((cog: any, idx: number) => (
              <>{cog.type == "web" ? <Card key={idx} cog={cog} /> : null}</>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="URL of the site you want to cognite 🔗"
              className="w-full font-normal resize-none border-none mt-8 hover:bg-zinc-50 rounded-md py-3 px-4 shadow-sm outline-none ring-1 ring-zinc-200 hover:ring-2 transition-all duration-300 hover:ring-zinc-300 focus:ring-2 focus:ring-orange-500 placeholder:text-zinc-500/60"
            />
          </div>

          <div
            className={`mt-4 ${
              fileCogLoading ? "text-green-500" : "text-orange-500"
            }`}
          >
            {/* <FileInput onFileSelected={handleFileCog} /> */}
          </div>
        </div>

        <div className="w-full h-full flex flex-col px-8 py-2 pb-24">
          <div className="mb-4 flex justify-start">
            <div className="bg-zinc-100/75 rounded-xl px-4 py-3 text-zinc-700 max-w-xl break-words">
              <span className="prose transition-all duration-300">
                <ReactMarkdown>
                  {"Hi there! Try **cogniting** something 🔥"}
                </ReactMarkdown>
              </span>
            </div>
          </div>

          {question.length > 0 ? (
            <div className="mb-4 flex justify-end">
              <div className="bg-orange-100/75 rounded-xl px-4 py-3 text-zinc-700 max-w-xl break-words">
                <span className="prose transition-all duration-300">
                  <ReactMarkdown>{question}</ReactMarkdown>
                </span>
              </div>
            </div>
          ) : null}

          {streamedAnswer.length > 0 ? (
            <div className="mb-4 flex justify-start">
              <div
                className={`bg-zinc-100/75 rounded-xl px-4 py-3 text-zinc-700 max-w-2xl break-words transition-all duration-1000 ${
                  streaming ? "ring-[2.5px] ring-zinc-200" : ""
                }`}
              >
                <span className="prose transition-all duration-300">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {streamedAnswer}
                  </ReactMarkdown>
                </span>
              </div>
            </div>
          ) : null}
        </div>

        <div
          className="bottom-6 w-full fixed"
          style={{
            paddingLeft: sidebarWidth / 2,
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
                onChange={(e) => setNotesText(e.target.value)}
                placeholder="What would you like to cognite 🔥"
                className="w-full font-normal select-none resize-none hover:bg-zinc-50 rounded-md py-3 px-4 shadow-sm outline-none ring-1 ring-zinc-200 hover:ring-2 transition-all duration-300 hover:ring-zinc-300 focus:ring-2 focus:ring-orange-500 placeholder:text-zinc-500/60"
              ></input>
              {/* make a black button that says make question */}
              <button
                className="w-max rounded-md select-none outline-none bg-black px-8 py-2 font-medium text-white transition-all duration-300 hover:bg-zinc-800 hover:shadow-2xl hover:shadow-zinc-500/10 active:scale-[0.98]"
                type="submit"
                style={{
                  marginRight: sidebarWidth / 2,
                }}
              >
                {isAnswerLoading ? (
                  <span className="inline-flex animate-pulse gap-2">
                    Thinking <p>🧠</p>
                  </span>
                ) : (
                  <span className="inline-flex gap-2">
                    Cognite <p>🔥</p>
                  </span>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
