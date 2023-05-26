"use client";

import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import { Document } from "langchain/document";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RetrievalQAChain } from "langchain/chains";
import { OpenAI } from "langchain/llms/openai";
import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [isNotesLoading, setIsNotesLoading] = useState(false);
  const [notesText, setNotesText] = useState("");
  const [question, setQuestion] = useState("");
  const [answerText, setAnswerText] = useState("");
  const [docs, setDocs] = useState<any>()

  const fetchSite = async () => {
    const loader = new CheerioWebBaseLoader(
      "https://sites.google.com/pdsb.net/twsstudentservices/woodlands-club-hub"
    );
    const siteDocs = await loader.load();
    setDocs(siteDocs);

    return new Response("Hello World!");
  };

  useEffect(() => {
    fetchSite()
  }, [])

  const getChatCompletionStream = async (prompt: string) => {
    setIsNotesLoading(true);
    setQuestion("");

    const store = await MemoryVectorStore.fromDocuments(
      docs,
      new OpenAIEmbeddings({
        openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
      })
    );

    const model = new OpenAI({
      openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    });

    const chain = RetrievalQAChain.fromLLM(model, store.asRetriever());

    const question = notesText;

    const res = await chain.call({
      query: `Answer the question in a friendly and detailed way and please use emojis: ${question}`,
    });

    console.log(res);

    setIsNotesLoading(false);

    return new Response(res.text);
  };

  return (
    <main className={inter.className}>
      <div className="flex flex-col items-center justify-center gap-20 p-8">
        <div className="flex flex-col items-center gap-2">
          <h1 className="mt-10 select-none bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text py-2 text-6xl font-bold text-transparent">
            Cognition
          </h1>
          <span className="select-none font-medium">
            Study. Faster. <span className="text-orange-500">Smarter.</span>
          </span>
        </div>
        <div className="flex w-full flex-row gap-6">
          <div className="flex w-full flex-col gap-3">
            <textarea
              name=""
              id=""
              rows={10}
              onChange={(e) => setNotesText(e.target.value)}
              placeholder="Paste your study notes 📝"
              className="w-full resize-none rounded-lg p-4 shadow-sm outline-none ring-1 ring-slate-200 transition-all duration-300 hover:ring-slate-300 focus:ring-2 focus:ring-orange-500"
            ></textarea>
            {/* make a black button that says make question */}
            <button
              className="w-max rounded-md bg-slate-900 px-6 py-2 font-medium text-white shadow-sm transition-all duration-300 hover:bg-slate-800 focus:ring focus:ring-orange-500 active:ring active:ring-orange-500"
              onClick={() => getChatCompletionStream(notesText)}
            >
              {isNotesLoading ? (
                <span className="inline-flex animate-pulse gap-2">
                  Thinking <p>🧠</p>
                </span>
              ) : (
                "Ask ⚡️"
              )}
            </button>
          </div>
          {/* <div className="flex w-full flex-col items-end justify-end gap-3">
            <textarea
              name=""
              id=""
              rows={10}
              onChange={(e) => setAnswerText(e.target.value)}
              placeholder="Write your answer 👍"
              className="w-full resize-none rounded-lg p-4 shadow-sm outline-none ring-1 ring-slate-200 transition-all duration-300 hover:ring-slate-300 focus:ring-2 focus:ring-orange-500"
            ></textarea>
            <button
              className="w-max rounded-md bg-slate-900 px-6 py-2 font-medium text-white shadow-sm transition-all duration-300 hover:bg-slate-800 focus:ring focus:ring-orange-500 active:ring active:ring-orange-500"
              onClick={() => getChatCompletionStream(notesText)}
            >
              {isNotesLoading ? (
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
      <div className="mt-2 flex justify-center">
        <div className="flex w-9/12 flex-col gap-3 text-center">
          <p className="text-2xl font-semibold text-slate-800">{question}</p>
        </div>
      </div>
    </main>
  );
}
