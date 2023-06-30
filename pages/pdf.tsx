"use client";

import { useChat } from "ai/react";
import { CallbackManager } from "langchain/callbacks";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { BufferMemory } from "langchain/memory";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { useEffect, useState } from "react";
const cheerio = require("cheerio");

export default function Chat() {
  const [combinedText, setCombinedText] = useState("");
  const [vectorStore, setVectorStore] = useState<any>(null);

  const urls = [
    "https://sites.google.com/pdsb.net/twsstudentservices/woodlands-club-hub",
    "https://sites.google.com/pdsb.net/twsstudentservices/home?authuser=0",
    "https://en.wikipedia.org/wiki/The_Woodlands_School_(Mississauga)",
    "https://sites.google.com/pdsb.net/twsstudentservices/important-links-and-info?authuser=0",
  ];

  const getText = async () => {
    const res = await fetch(`/api/extract`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ urls }),
    });

    const data = await res.json();

    // console.log(data);
    setCombinedText(data.extracted_text);
  };

  // const memory = new BufferMemory({
  //   memoryKey: "chat_history",
  //   inputKey: "question",
  //   outputKey: "text",
  //   returnMessages: true,
  // });
  // console.log(combinedText)

  useEffect(() => {
    getText();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getChain = async () => {
    const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });

    const docs = await splitter.createDocuments([combinedText as string]);

    const vectorStore = await MemoryVectorStore.fromDocuments(
      docs,
      new OpenAIEmbeddings(
        {
          openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
        },
        {
          basePath: process.env.NEXT_PUBLIC_OPENAI_ENDPOINT,
        }
      )
    );

    setVectorStore(vectorStore);
  };

  useEffect(() => {
    getChain();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [combinedText]);

  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: "/api/stream",
      body: { vectorStore: vectorStore },
    });

  // console.log(memory);

  // console.log(combinedText);

  return (
    <div>
      <h1 className="text-3xl font-bold text-center">Chat with PDF</h1>

      <div className="flex justify-center h-5">
        {isLoading ? (
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900">
            Loading
          </div>
        ) : (
          <span className="h-5 w-5" />
        )}
      </div>

      <div className="mx-auto w-full max-w-md py-24 flex flex-col stretch">
        {messages.length > 0
          ? messages.map((m) => (
              <div key={m.id} className="whitespace-pre-wrap">
                {m.role === "user" ? "User: " : "AI: "}
                {m.content}
              </div>
            ))
          : null}

        <form onSubmit={handleSubmit}>
          <input
            className="fixed w-full max-w-md bottom-0 border border-gray-300 rounded mb-8 shadow-xl p-2"
            value={input}
            placeholder="Say something..."
            onChange={handleInputChange}
          />
        </form>
      </div>
    </div>
  );
}
