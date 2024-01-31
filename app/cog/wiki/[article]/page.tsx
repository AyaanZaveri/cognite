import Logo from "@/components/Logo";
import Image from "next/image";
import { Rubik, Space_Grotesk } from "next/font/google";
import Link from "next/link";
import UserHoverCard from "@/components/UserHoverCard";
import { getAuthSession } from "@/lib/auth";
import { Session } from "next-auth";
import { db } from "@/lib/db";
import Sidebar from "@/components/Sidebar";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { HuggingFaceInferenceEmbeddings } from "langchain/embeddings/hf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { Suspense } from "react";
import OpenAI from "openai";
import { OpenAIStream } from "ai";
import { Tokens } from "ai/react";
import Chat from "@/components/chat-wiki";

export const dynamic = "force-dynamic";

const togetherai = new OpenAI({
  apiKey: process.env.TOGETHER_AI_API_KEY || "",
  baseURL: process.env.TOGETHER_AI_ENDPOINT,
});

const space_grotesk = Space_Grotesk({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const rubik = Rubik({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const embeddingsModel = new HuggingFaceInferenceEmbeddings({
  apiKey: process.env.NEXT_PUBLIC_HUGGINGFACEHUB_API_KEY,
  model: "sentence-transformers/all-MiniLM-L6-v2",
});

async function getWiki(article: string) {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/wiki/parse`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      search: article,
    }),
  });

  const { data } = await response.json();

  return {
    title: data.title,
    image: data.image,
  } as {
    title: string;
    image: string;
  };
}

export default async function Page({
  params,
}: {
  params: { slug: string; user: string; article: string };
}) {
  const { article } = params;

  const session = await getAuthSession();

  const wiki = await getWiki(article);

  return (
    <div className="h-full">
      <div className="flex h-full min-h-[100vh] flex-row">
        <Sidebar session={session?.user ? session : null} />
        <div className="grow lg:pb-2 lg:pr-2 lg:pt-2">
          <div className="h-full bg-background bg-gradient-to-b bg-clip-border shadow-sm dark:from-orange-600/10 dark:to-black md:dark:border lg:rounded-lg">
            <div className="p-5">
              <Link href={"/"}>
                <Logo size="3xl" />
              </Link>
            </div>
            <Suspense fallback={<div>Loading...</div>}>
              <div className="flex flex-col items-center justify-center gap-6 p-5">
                {wiki?.image ? (
                  <div className="relative inline-flex h-28 w-28 items-center justify-center rounded-lg bg-orange-50/70 transition-all duration-1000 ease-in-out hover:scale-110">
                    <Image
                      src={wiki?.image}
                      alt={wiki?.title as string}
                      fill
                      objectFit="contain"
                      draggable={false}
                      className="p-4"
                    />
                  </div>
                ) : (
                  <div className="relative grid place-items-center rounded bg-white p-0.5">
                    <Image
                      src={
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Wikipedia-W-visual-balanced.svg/1280px-Wikipedia-W-visual-balanced.svg.png"
                      }
                      alt="Wikipedia"
                      height={96}
                      width={96}
                    />
                  </div>
                )}

                <div className="flex flex-col items-center gap-4">
                  <h1
                    className={`text-center text-5xl font-bold sm:text-6xl md:text-7xl ${space_grotesk.className}`}
                  >
                    {wiki?.title}
                  </h1>
                  <div className="flex flex-col items-center">
                    <p
                      className={`text-center text-lg text-muted-foreground ${rubik.className}`}
                    >
                      Learn about {wiki?.title} from Wikipedia
                    </p>
                  </div>
                </div>
              </div>
              <Chat article={wiki?.title} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
