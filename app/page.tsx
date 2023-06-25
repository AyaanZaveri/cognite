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
import { PineconeClient } from "@pinecone-database/pinecone";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { HuggingFaceInferenceEmbeddings } from "langchain/embeddings/hf";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import { sidebarWidthState } from "@/atoms/sidebar";
import { useRecoilState } from "recoil";
import { BufferMemory } from "langchain/memory";
import { writeFile } from "fs/promises";
import WebCard from "@/components/Cogs/Web";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { EPubLoader } from "langchain/document_loaders/fs/epub";
import FileInput from "@/components/FileInput";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { createEmbeddings } from "@/utils/embed";
import { createChain } from "@/utils/chain";
import { saveAs } from "file-saver";
import { getVideoId } from "@/utils/ytTranscript";
import { CONDENSE_TEMPLATE, QA_TEMPLATE } from "@/lib/prompts";
import FileCard from "@/components/Cogs/File";
import { useChat } from "ai/react";
import remarkGfm from "remark-gfm";
import { BaseLanguageModel } from "langchain/dist/base_language";
import { BaseChatModel } from "langchain/dist/chat_models/base";
import NotionCard from "@/components/Cogs/Notion";

const inter = Inter({ subsets: ["latin"] });
const space_grotesk = Space_Grotesk({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function Home() {
  const [isAnswerLoading, setIsAnswerLoading] = useState(false);
  const [notesText, setNotesText] = useState("");
  const [question, setQuestion] = useState("");
  const [answerText, setAnswerText] = useState<any>();
  const [streamedAnswer, setStreamedAnswer] = useState<string>("");
  const [streamingModel, setStreamingModel] = useState<BaseChatModel>();
  const [userUrl, setUserUrl] = useState<string>("");
  const [ytTranscript, setYtTranscript] = useState<string>("");
  const [chain, setChain] = useState<any>(null);
  const [sidebarWidth, setSidebarWidth] = useRecoilState(sidebarWidthState);
  const [fileCogLoading, setFileCogLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [streaming, setStreaming] = useState(false);
  const [boosted, setBoosted] = useState(false);

  const cogs = [
    {
      id: 1,
      title: "The Woodlands",
      img: "https://thewoodlandsss.peelschools.org/images/logo.svg",
      description:
        "The Woodlands Secondary School is a school in Mississauga, Ontario, Canada",
      urls: [
        "https://sites.google.com/pdsb.net/twsstudentservices/woodlands-club-hub",
        "https://sites.google.com/pdsb.net/twsstudentservices/home?authuser=0",
        "https://en.wikipedia.org/wiki/The_Woodlands_School_(Mississauga)",
        "https://sites.google.com/pdsb.net/twsstudentservices/important-links-and-info?authuser=0",
      ],
      type: "web",
    },
    {
      id: 2,
      title: "John Fraser",
      img: "https://johnfraser.peelschools.org/images/logo.svg",
      description:
        "John Fraser Secondary School is a school in Mississauga, Ontario, Canada",
      urls: [
        "https://johnfrasersac.com/allclubs/",
        "https://en.wikipedia.org/wiki/John_Fraser_Secondary_School",
      ],
      type: "web",
    },
    {
      id: 3,
      title: "French League",
      img: "https://www.raycast.com/_next/image?url=https%3A%2F%2Ffiles.raycast.com%2Fp83cp3dpry9ktfemji1dcy4af5jp&w=128&q=75",
      description:
        "France's top football league with 20 clubs competing for the championship",
      urls: [
        "https://www.ligue1.com/ranking",
        "https://www.ligue1.com/ranking/scorers",
        "https://www.ligue1.com/ranking/assists",
        "https://www.ligue1.com/fixtures-results",
      ],
      type: "web",
    },
    {
      id: 4,
      title: "LangChain",
      img: "https://em-content.zobj.net/thumbs/240/apple/354/parrot_1f99c.png",
      description: "LangChain JS Documentation",
      urls: [],
      type: "web",
    },
    {
      id: 5,
      title: "Website",
      img: "https://em-content.zobj.net/thumbs/240/apple/354/globe-with-meridians_1f310.png",
      description: "Custom Website",
      urls: [userUrl],
      type: "web",
    },
    {
      id: 6,
      title: "Youtube",
      img: "https://cdn-icons-png.flaticon.com/512/1384/1384060.png",
      description: "Youtube Video",
      urls: [
        "https://youtubetranscript.com/?server_vid=" + getVideoId(userUrl),
      ],
      type: "web",
    },
    {
      id: 7,
      title: "Notion",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Notion-logo.svg/1024px-Notion-logo.svg.png",
      description: "Notion Page",
      urls: ["/Users/ayaanzaveri/Code/cognition/NotionDB"],
      type: "notion",
    },
  ];

  useEffect(() => {
    const model = new ChatOpenAI(
      {
        openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
        streaming: true,
        modelName: boosted ? "gpt-4" : "gpt-3.5-turbo",
        temperature: 0.7,
        topP: 1,
        callbacks: [
          {
            handleLLMStart() {
              setStreaming(true);
            },
            handleLLMNewToken(token: string) {
              setStreamedAnswer((prev) => prev + token);
            },
            handleLLMEnd() {
              setStreaming(false);
            },
          },
        ],
      },
      {
        basePath: process.env.NEXT_PUBLIC_OPENAI_ENDPOINT,
      }
    );

    setStreamingModel(model);
  }, [boosted]);

  const nonStreamingModel = new ChatOpenAI(
    {
      openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    },
    {
      basePath: process.env.NEXT_PUBLIC_OPENAI_ENDPOINT,
    }
  );

  const handleChatSubmit = async (prompt: string) => {
    setStreamedAnswer("");
    setQuestion(prompt);
    setIsAnswerLoading(true);

    const res = await chain.call({
      question: prompt,
      // chat_history: history,
    });

    console.log(res);

    setIsAnswerLoading(false);
  };

  // console.log(streamedAnswer);

  console.log(chain);

  const handleFileCog = async (file: File) => {
    if (file.type === "application/pdf") {
      setFileCogLoading(true);

      const loader = new PDFLoader(file);
      const docs = await loader.loadAndSplit();

      const vectorStore = await createEmbeddings(docs);
      const conversationalChain = await createChain(
        vectorStore,
        streamingModel as BaseLanguageModel,
        nonStreamingModel
      );

      setChain(conversationalChain);
      console.log("DONE 🔥");
      setFileCogLoading(false);
    } else if (file.type === "application/epub+zip") {
      console.log("epub");
    } else {
      console.log("Unsupported file type");
    }
  };

  // const { messages, input, handleInputChange, handleSubmit } = useChat();

  console.log(boosted, streamingModel);

  return (
    <main>
      <div
        className="flex flex-col w-full items-center justify-center gap-8 h-full"
        style={{
          paddingLeft: sidebarWidth,
        }}
      >
        <div className="items-center pt-12 pb-4 text-5xl select-none inline-flex gap-2 mt-6 hover:scale-105 transition duration-1000 ease-in-out">
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
            {cogs.map((cog, idx) => (
              <>
                {cog.type == "web" ? (
                  <WebCard
                    key={idx}
                    cog={cog}
                    streamingModel={streamingModel as BaseChatModel}
                    nonStreamingModel={nonStreamingModel}
                    setChain={setChain}
                  />
                ) : cog.type == "notion" ? (
                  <NotionCard
                    key={idx}
                    cog={cog}
                    streamingModel={streamingModel as BaseChatModel}
                    nonStreamingModel={nonStreamingModel}
                    setChain={setChain}
                  />
                ) : null}
              </>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="URL of the site you want to cognite 🔗"
              onChange={(e) => setUserUrl(e.target.value)}
              className="w-full font-normal resize-none border-none mt-8 hover:bg-zinc-50 rounded-md py-3 px-4 shadow-sm outline-none ring-1 ring-zinc-200 hover:ring-2 transition-all duration-300 hover:ring-zinc-300 focus:ring-2 focus:ring-orange-500 placeholder:text-zinc-500/60"
            />
          </div>

          <div
            className={`mt-4 ${
              fileCogLoading ? "text-green-500" : "text-orange-500"
            }`}
          >
            <FileInput onFileSelected={handleFileCog} />
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
                handleChatSubmit(notesText);
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
                className="w-max rounded-md select-none outline-none bg-zinc-900 px-8 py-2 font-medium text-white shadow-sm transition-all duration-300 hover:scale-105 active:scale-105 hover:bg-zinc-800 focus:ring focus:ring-orange-500 active:ring active:ring-orange-500"
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
