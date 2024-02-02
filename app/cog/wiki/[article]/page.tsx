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
import { Badge } from "@/components/ui/badge";

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

async function initizalizeWikiCache(article: string) {
  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/api/wiki/completions`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        article,
        init: true,
      }),
    }
  );

  const { status } = await response.json();

  console.log(status);

  return status;
}

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

  const wikiCacheStatus = await initizalizeWikiCache(article);

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
                  <div className="relative h-28 w-28 items-center justify-center rounded-lg bg-muted/50 transition-all duration-1000 ease-in-out hover:scale-110">
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
                    <div
                      className={`text-center text-lg text-muted-foreground ${rubik.className} inline-flex items-center justify-center gap-2`}
                    >
                      Learn about{" "}
                      <Link
                        href={`https://en.wikipedia.org/wiki/${wiki?.title}`}
                        target="_blank"
                      >
                        <Badge
                          variant={"outline"}
                          className="text-sm font-normal transition duration-200 ease-in-out hover:cursor-pointer hover:bg-muted hover:ring-[1.5px] hover:ring-amber-500 hover:ring-offset-2 hover:ring-offset-background active:scale-[0.98] active:brightness-90"
                        >
                          {wiki?.title}
                        </Badge>
                      </Link>{" "}
                      from Wikipedia
                    </div>
                  </div>
                </div>
              </div>
              {wikiCacheStatus == 200 ? <Chat article={wiki?.title} /> : null}
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
