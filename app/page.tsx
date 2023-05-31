"use client";

import { Inter, Poppins } from "next/font/google";
import { useEffect, useState } from "react";
import JSON5 from "json5";
import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAI } from "langchain/dist";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { ConversationalRetrievalQAChain } from "langchain/chains";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [isAnswerLoading, setIsAnswerLoading] = useState(false);
  const [isSiteFetching, setIsSiteFetching] = useState(false);
  const [notesText, setNotesText] = useState("");
  const [question, setQuestion] = useState("");
  const [answerText, setAnswerText] = useState<any>();
  const [streamedAnswer, setStreamedAnswer] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<any>([]);
  const [docs, setDocs] = useState<any>();
  const [userUrl, setUserUrl] = useState<string>("");
  const [chain, setChain] = useState<any>(null);

  const fetchSite = async () => {
    setIsSiteFetching(true);

    const loader = new CheerioWebBaseLoader(userUrl);
    const siteDocs = await loader.load();

    console.log("siteDocs", siteDocs);

    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 2500,
      chunkOverlap: 200,
      separators: [".", "!", "?", "\n", " ", "\t", "\r"],
    });

    const splittedDocs = await splitter.splitDocuments(siteDocs);

    const vectorStore = await MemoryVectorStore.fromDocuments(
      splittedDocs,
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

    const model = new ChatOpenAI(
      {
        openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
        streaming: true,
        modelName: "gpt-3.5-turbo",
        // callbacks: [
        //   {
        //     handleLLMNewToken(token: string) {
        //       res.write(token);
        //     },
        //   },
        // ],
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

    const conversationalChain = ConversationalRetrievalQAChain.fromLLM(
      model,
      vectorStore.asRetriever(),
      {
        returnSourceDocuments: true,
      }
    );

    setChain(conversationalChain);

    setIsSiteFetching(false);
  };

  console.log(streamedAnswer);

  const handleChatSubmit = async (prompt: string) => {
    setStreamedAnswer("");
    setQuestion(prompt);
    setIsAnswerLoading(true);

    const res = await chain.call({
      question: prompt,
      chat_history: chatHistory,
    });

    console.log(res);

    setIsAnswerLoading(false);
  };

  console.log(docs);

  return (
    <main className={inter.className}>
      <div className="flex flex-col w-full items-center justify-center gap-8 h-screen">
        <div className="flex flex-col items-center gap-2 p-8">
          <h1 className="mt-10 select-none bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text py-2 text-6xl font-bold text-transparent">
            Cognition
          </h1>
          <span className="select-none font-medium">
            Learn. Faster. <span className="text-orange-500">Smarter.</span>
          </span>
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
            className="w-full resize-none rounded-lg py-3 px-4 shadow-sm outline-none ring-1 ring-stone-200 transition-all duration-300 hover:ring-stone-300 focus:ring-2 focus:ring-orange-500"
          />
          <button
            type="submit"
            className="w-max rounded-lg bg-stone-900 px-8 py-2 font-medium text-white shadow-sm transition-all duration-300 hover:scale-105 active:scale-105 hover:bg-stone-800 focus:ring focus:ring-orange-500 active:ring active:ring-orange-500"
          >
            <span className="inline-flex w-full gap-2 justify-center">
              {isSiteFetching ? (
                <p className="inline-flex w-full gap-2 justify-center animate-pulse">
                  Setting <p>⛓️</p>
                </p>
              ) : (
                <p className="inline-flex w-full gap-2 justify-center">Set <p>🔗</p></p>
              )}
            </span>
          </button>
        </form>
        <div className="w-full overflow-y-auto h-full flex flex-col mb-20 px-8 py-2">
          <div className="mb-4 flex justify-start">
            <div className="bg-stone-50 rounded-lg px-4 py-3 ring-1 ring-stone-200 font-medium text-stone-700">
              Hi there! Ask me something related to the url.
            </div>
          </div>

          <div className="mb-4 flex justify-end">
            <div className="bg-orange-500 ring-orange-400 ring-1 rounded-lg px-4 py-3 font-medium text-white">
              {question}
            </div>
          </div>

          <div className="mb-4 flex justify-start">
            <div className="bg-stone-100 ring-1 ring-stone-200 rounded-lg px-4 py-3 font-medium text-stone-700">
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

        <div className="flex w-full flex-row gap-6 bottom-0 fixed">
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
              placeholder="What would you like to cognite? 🤔"
              className="w-full resize-none rounded-lg py-3 px-4 shadow-sm outline-none ring-1 ring-stone-200 transition-all duration-300 hover:ring-stone-300 focus:ring-2 focus:ring-orange-500"
            ></input>
            {/* make a black button that says make question */}
            <button
              className="w-max rounded-lg bg-stone-900 px-8 py-2 font-medium text-white shadow-sm transition-all duration-300 hover:scale-105 active:scale-105 hover:bg-stone-800 focus:ring focus:ring-orange-500 active:ring active:ring-orange-500"
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
              className="w-full resize-none rounded-lg p-4 shadow-sm outline-none ring-1 ring-stone-200 transition-all duration-300 hover:ring-stone-300 focus:ring-1 focus:ring-orange-500"
            ></textarea>
            <button
              className="w-max rounded-md bg-stone-900 px-6 py-2 font-medium text-white shadow-sm transition-all duration-300 hover:bg-stone-800 focus:ring focus:ring-orange-500 active:ring active:ring-orange-500"
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
      {/* <div className="mt-2 pb-16 flex justify-center">
        <div className="flex w-9/12 flex-col gap-3 text-center">
          <p className="text-2xl font-semibold text-stone-800">
            {answerText?.text}
          </p>
        </div>
      </div> */}
    </main>
  );
}
