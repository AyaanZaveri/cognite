import { createChain } from "@/utils/chain";
import { createEmbeddings } from "@/utils/embed";
import { BaseChatModel } from "langchain/dist/chat_models/base";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { Space_Grotesk } from "next/font/google";
import Image from "next/image";
import React, { useState } from "react";
import { NotionLoader } from "langchain/document_loaders/fs/notion";

interface WebCardProps {
  cog: {
    id: number;
    title: string;
    img: string;
    description: string;
    urls: string[];
  };
  streamingModel: BaseChatModel;
  nonStreamingModel: BaseChatModel;
  setChain: any;
}

const space_grotesk = Space_Grotesk({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const NotionCard = ({
  cog,
  streamingModel,
  nonStreamingModel,
  setChain,
}: WebCardProps) => {
  const [cogLoading, setCogLoading] = useState<boolean>(false);

  const handleCog = async () => {
    setCogLoading(true);

    const loader = new NotionLoader(cog.urls[0]);

    const notionDocs = await loader.load();

    const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });

    const docs = await splitter.splitDocuments(notionDocs);

    const vectorStore = await createEmbeddings(docs);

    const conversationalChain = await createChain(
      vectorStore,
      streamingModel,
      nonStreamingModel
    );

    console.log(conversationalChain);

    setChain(conversationalChain);

    setCogLoading(false);
  };

  return (
    <div
      key={cog.id}
      className={`relative flex flex-col w-full rounded-xl p-5 transition-all duration-300 cursor-pointer transform active:scale-[0.98] ${
        cogLoading
          ? "bg-green-50 hover:bg-green-100 active:bg-green-100 animate-pulse"
          : "bg-orange-50 hover:bg-orange-100 active:bg-orange-100"
      }`}
      onClick={() => handleCog()}
    >
      <div className="flex items-center mb-2">
        <div className="relative w-8 h-8 bg-white rounded-md ring-1 ring-zinc-200">
          <Image
            src={cog.img}
            alt={cog.title}
            layout="fill"
            objectFit="contain"
            className="p-1.5 rounded-lg"
          />
        </div>
        <h5
          className={
            space_grotesk.className +
            " ml-3 font-semibold text-lg text-zinc-800"
          }
        >
          {cog.title}
        </h5>
      </div>
      <p className="text-sm font-light text-zinc-600">{cog.description}</p>
    </div>
  );
};

export default NotionCard;
