import { createChain } from "@/utils/chain";
import { createEmbeddings } from "@/utils/embed";
import { BaseChatModel } from "langchain/dist/chat_models/base";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MongoDBAtlasVectorSearch } from "langchain/vectorstores/mongodb_atlas";
import { BSON, MongoClient } from "mongodb";
import { Space_Grotesk } from "next/font/google";
import Image from "next/image";
import React, { useState } from "react";
import mongoose, { ConnectOptions } from "mongoose";
import Link from "next/link";

interface CardProps {
  cog: {
    id: number;
    title: string;
    img: string;
    description: string;
    urls: string[];
  };
}

const space_grotesk = Space_Grotesk({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const Card = ({ cog }: CardProps) => {
  return (
    <Link
      href={`/cog/${cog.id}`}
      key={cog.id}
      className={`relative flex flex-col w-full rounded-xl p-5 transition-all duration-300 cursor-pointer transform active:scale-[0.98] bg-zinc-50 hover:bg-zinc-100 hover:ring-1 hover:ring-zinc-200 hover:shadow-2xl hover:shadow-zinc-500/10`}
    >
      <div className="flex items-center mb-2">
        <div className="relative w-8 h-8 bg-white rounded-md ring-1 ring-zinc-200">
          <Image
            src={cog.img}
            alt={cog.title}
            layout="fill"
            objectFit="contain"
            className="p-1.5 rounded-lg"
            draggable={false}
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
    </Link>
  );
};

export default Card;
