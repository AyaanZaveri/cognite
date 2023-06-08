"use client";

import { Space_Grotesk, Inter, Poppins } from "next/font/google";
import { useEffect, useState } from "react";
import JSON5 from "json5";
import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";
import {
  CharacterTextSplitter,
  RecursiveCharacterTextSplitter,
  TextSplitter,
} from "langchain/text_splitter";
import { OpenAI, PromptTemplate } from "langchain/dist";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import { sidebarWidthState } from "@/atoms/sidebar";
import { useRecoilState } from "recoil";
import { BufferMemory } from "langchain/memory";
import { writeFile } from "fs/promises";
import Card from "@/components/Cogs/Card";

const inter = Inter({ subsets: ["latin"] });
const space_grotesk = Space_Grotesk({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function Home() {
  const [isAnswerLoading, setIsAnswerLoading] = useState(false);
  const [isSiteFetching, setIsSiteFetching] = useState(false);
  const [notesText, setNotesText] = useState("");
  const [question, setQuestion] = useState("");
  const [answerText, setAnswerText] = useState<any>();
  const [streamedAnswer, setStreamedAnswer] = useState<string>("");
  const [userUrl, setUserUrl] = useState<string>("");
  const [chain, setChain] = useState<any>(null);
  const [sidebarWidth, setSidebarWidth] = useRecoilState(sidebarWidthState);
  const [history, setHistory] = useState([]);
  const [messages, setMessages] = useState([
    {
      message: "Hi there! How can I help?",
      type: "apiMessage",
    },
  ]);
  const urls = [
    {
      id: 1,
      title: "The Woodlands",
      emoji: "🏫",
      urls: [
        "https://sites.google.com/pdsb.net/twsstudentservices/woodlands-club-hub",
        "https://sites.google.com/pdsb.net/twsstudentservices/home?authuser=0",
        "https://en.wikipedia.org/wiki/The_Woodlands_School_(Mississauga)",
        "https://sites.google.com/pdsb.net/twsstudentservices/important-links-and-info?authuser=0",
      ],
    },
    {
      id: 2,
      title: "John Fraser",
      emoji: "🏫",
      urls: [
        "https://johnfrasersac.com/allclubs/",
        "https://en.wikipedia.org/wiki/John_Fraser_Secondary_School",
      ],
    },
  ];

  const model = new ChatOpenAI(
    {
      openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
      streaming: true,
      modelName: "gpt-3.5-turbo",
      temperature: 0.7,
      topP: 1,
      callbacks: [
        {
          handleLLMNewToken(token: string) {
            setStreamedAnswer((prev) => prev + token);
          },
        },
      ],
    },
    {
      basePath: process.env.NEXT_PUBLIC_OPENAI_ENDPOINT,
    }
  );

  const scrapeSite = async (urls: string[]) => {
    const res = await fetch(`/api/extract`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ urls }),
    });

    const data = await res.json();

    console.log(data);

    return data.extracted_text;
  };

  const getTextChunks = async () => {
    const siteText = await scrapeSite(urls[1].urls);

    console.log(siteText);

    const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });

    const docs = await splitter.createDocuments([siteText as string]);

    console.log(docs);

    return docs;
  };

  const fetchSite = async () => {
    setIsSiteFetching(true);

    const docs = await getTextChunks();

    const vectorStore = await MemoryVectorStore.fromDocuments(
      docs,
      new OpenAIEmbeddings(
        {
          openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
          stripNewLines: true,
          verbose: true,
        },
        {
          basePath: process.env.NEXT_PUBLIC_OPENAI_ENDPOINT,
        }
      )
    );

    const conversationalChain = ConversationalRetrievalQAChain.fromLLM(
      model,
      vectorStore.asRetriever()
    );

    setChain(conversationalChain);

    setIsSiteFetching(false);
  };

  const handleChatSubmit = async (prompt: string) => {
    setStreamedAnswer("");
    setQuestion(prompt);
    setIsAnswerLoading(true);

    setMessages((prevMessages) => [
      ...prevMessages,
      { message: prompt, type: "userMessage" },
    ]);

    const res = await chain.call({
      question: prompt,
      chat_history: [],
    });

    setMessages((prevMessages) => [
      ...prevMessages,
      { message: res.text, type: "apiMessage" },
    ]);

    setIsAnswerLoading(false);
  };

  useEffect(() => {
    if (messages.length >= 3) {
      setHistory([
        [
          messages[messages.length - 2].message,
          messages[messages.length - 1].message,
        ],
      ] as any);
    }
  }, [messages]);

  return (
    <main>
      <div
        className="flex flex-col w-full items-center justify-center gap-8 h-screen"
        style={{
          paddingLeft: sidebarWidth,
        }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* <Card
            cog="The Woodlands Secondary School"
            imgUrl="https://thewoodlandsss.peelschools.org/images/logo.svg"
          /> */}
        </div>
        <div className="items-center pt-12 pb-4 text-5xl select-none inline-flex gap-2">
          <span
            className={
              space_grotesk.className + " font-medium text-zinc-700 pb-2"
            }
          >
            Cognition
          </span>
          <span className="pb-2">🔥</span>
        </div>
        <form
          className="flex w-full flex-row gap-3 px-8"
          onSubmit={(e) => {
            e.preventDefault();
            fetchSite();
          }}
        >
          <input
            type="text"
            placeholder="URL of the site you want to cognite 🔗"
            onChange={(e) => setUserUrl(e.target.value)}
            className="w-full font-normal resize-none hover:bg-zinc-50 rounded-md py-3 px-4 shadow-sm outline-none ring-1 ring-zinc-200 hover:ring-2 transition-all duration-300 hover:ring-zinc-300 focus:ring-2 focus:ring-orange-500 placeholder:text-zinc-500/60"
          />
          <button
            type="submit"
            className="w-max rounded-md outline-none bg-zinc-900 px-8 py-2 font-medium text-white shadow-sm transition-all duration-300 hover:scale-105 active:scale-105 hover:bg-zinc-800 focus:ring focus:ring-orange-500 active:ring active:ring-orange-500"
          >
            <span className="inline-flex w-full gap-2 justify-center">
              {isSiteFetching ? (
                <span className="inline-flex w-full gap-2 justify-center animate-pulse">
                  Setting <p>⛓️</p>
                </span>
              ) : (
                <span className="inline-flex w-full gap-2 justify-center">
                  Set <p>🔗</p>
                </span>
              )}
            </span>
          </button>
        </form>
        <div className="w-full overflow-y-auto h-full flex flex-col mb-20 px-8 py-2">
          <div className="mb-4 flex justify-start">
            <div className="bg-zinc-100 rounded-lg px-4 py-3 text-zinc-700 max-w-xl break-words">
              Hi there! Try cogniting something 🔥
            </div>
          </div>

          <div className="mb-4 flex justify-end">
            <div className="bg-orange-500 rounded-lg px-4 py-3 text-white max-w-xl break-words">
              {question}
            </div>
          </div>

          <div className="mb-4 flex justify-start">
            <div className="bg-zinc-100 rounded-lg px-4 py-3 text-zinc-700 max-w-xl break-words">
              {streamedAnswer ? (
                <span>{streamedAnswer}</span>
              ) : streamedAnswer?.length < 0 && isAnswerLoading == false ? (
                <span className="inline-flex animate-pulse gap-2">
                  Thinking <p>🧠</p>
                </span>
              ) : null}
            </div>
          </div>
        </div>

        <div className="bottom-0 w-full">
          <div className="flex w-full flex-row gap-6">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleChatSubmit(notesText);
              }}
              className="flex w-full flex-row gap-3 p-8"
            >
              <input
                name=""
                id=""
                onChange={(e) => setNotesText(e.target.value)}
                placeholder="What would you like to cognite 🔥"
                className="w-full font-normal resize-none hover:bg-zinc-50 rounded-md py-3 px-4 shadow-sm outline-none ring-1 ring-zinc-200 hover:ring-2 transition-all duration-300 hover:ring-zinc-300 focus:ring-2 focus:ring-orange-500 placeholder:text-zinc-500/60"
              ></input>
              {/* make a black button that says make question */}
              <button
                className="w-max rounded-md outline-none bg-zinc-900 px-8 py-2 font-medium text-white shadow-sm transition-all duration-300 hover:scale-105 active:scale-105 hover:bg-zinc-800 focus:ring focus:ring-orange-500 active:ring active:ring-orange-500"
                type="submit"
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
            {/* <div className="flex w-full flex-col items-end justify-end gap-3">
            <textarea
              name=""
              id=""
              rows={10}
              onChange={(e) => setAnswerText(e.target.value)}
              placeholder="Write your answer 👍"
              className="w-full resize-none rounded-md p-4 shadow-sm outline-none ring-1 ring-zinc-200 transition-all duration-300 hover:ring-zinc-300 focus:ring-1 focus:ring-orange-500"
            ></textarea>
            <button
              className="w-max rounded-md bg-zinc-900 px-6 py-2 font-medium text-white shadow-sm transition-all duration-300 hover:bg-zinc-800 focus:ring focus:ring-orange-500 active:ring active:ring-orange-500"
              onClick={() => getChatCompletionStream(notesText)}
            >
              {isAnswerLoading ? (
                <span className="inline-flex animate-pulse gap-2">
                  Thinking <p>🧠</p>
                </span>
              ) : (
                "Quiz Me"
              )}
            </button>
          </div> */}
          </div>
        </div>
      </div>
      {/* <div className="mt-2 pb-16 flex justify-center">
        <div className="flex w-9/12 flex-col gap-3 text-center">
          <p className="text-2xl font-semibold text-zinc-800">
            {answerText?.text}
          </p>
        </div>
      </div> */}
    </main>
  );
}
