"use client";

import { Cogs } from "@/types";
import { scrapeSite } from "@/utils/scrapeSite";
import axios from "axios";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { Session, User } from "next-auth";
import { Space_Grotesk } from "next/font/google";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const space_grotesk = Space_Grotesk({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const Create = (session: { session: Session | null }) => {
  const [cogData, setCogData] = useState<Cogs>({
    name: "",
    description: "",
    type: "",
    slug: "",
    imgUrl: "",
    docs: [],
    user: session?.session?.user?.name?.split(" ")[0] as string,
    userId: session?.session?.user?.id as any,
  });

  const [website, setWebsite] = useState<string>("");
  const [websiteLoaded, setWebsiteLoaded] = useState<boolean>(false);

  const getTextChunks = async (sites: string[]) => {
    const siteText = await scrapeSite(sites);

    console.log(siteText);

    const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });

    const docs = await splitter.createDocuments([siteText as string]);

    console.log(docs);

    setCogData({ ...cogData, docs: docs });

    setWebsiteLoaded(true);
  };

  async function createCog(cogData: Cogs) {
    await getTextChunks([website]);

    try {
      const response = await axios.post(`/api/cog/create`, cogData);

      console.log(response);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className="bg-zinc-50 p-5 rounded-lg flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        <div>
          <span className={`font-semibold text-xl text-zinc-800`}>Name 🏷️</span>
          <p className="text-zinc-500 font-light text-sm">
            This is the name of the cog
          </p>
        </div>
        <input
          className="bg-white border-none rounded-md py-2 px-3 ring-1 ring-zinc-200 focus:ring-zinc-300 hover:ring-2 focus:ring-2 transition duration-200 ease-in-out outline-none"
          type="text"
          placeholder="Name"
          onChange={(e) => {
            setCogData({ ...cogData, name: e.target.value });
          }}
        />
      </div>
      <div className="flex flex-col gap-3 pt-3">
        <div>
          <span className={`font-semibold text-xl text-zinc-800`}>
            Description 📝
          </span>
          <p className="text-zinc-500 font-light text-sm">
            This is the description of the cog
          </p>
        </div>
        <input
          className="bg-white border-none rounded-md py-2 px-3 ring-1 ring-zinc-200 focus:ring-zinc-300 hover:ring-2 focus:ring-2 transition duration-200 ease-in-out outline-none"
          type="text"
          placeholder="Description"
          onChange={(e) => {
            setCogData({ ...cogData, description: e.target.value });
          }}
        />
      </div>
      {/* Do one for website */}
      <div className="flex flex-col gap-3 pt-3">
        <div>
          <span className={`font-semibold text-xl text-zinc-800`}>
            Website 🌐
          </span>
          <p
            className={`text-zinc-500 font-light text-sm ${
              websiteLoaded ? "text-green-500" : ""
            }`}
          >
            This is the website to train the cognition on
          </p>
        </div>
        <input
          className="bg-white border-none rounded-md py-2 px-3 ring-1 ring-zinc-200 focus:ring-zinc-300 hover:ring-2 focus:ring-2 transition duration-200 ease-in-out outline-none"
          type="text"
          placeholder="Website URL"
          onChange={(e) => {
            setWebsite(e.target.value);
          }}
        />
      </div>
      <div className="flex flex-col gap-3 pt-3">
        <div>
          <span className={`font-semibold text-xl text-zinc-800`}>Slug 🔖</span>
          <p className="text-zinc-500 font-light text-sm">
            This is the slug of the cog (like /:cog-slug:)
          </p>
        </div>
        <input
          className="bg-white border-none rounded-md py-2 px-3 ring-1 ring-zinc-200 focus:ring-zinc-300 hover:ring-2 focus:ring-2 transition duration-200 ease-in-out outline-none"
          type="text"
          placeholder="Slug"
          onChange={(e) => {
            setCogData({ ...cogData, slug: e.target.value });
          }}
        />
      </div>
      <div className="flex flex-col gap-3 pt-3">
        <div>
          <span className={`font-semibold text-xl text-zinc-800`}>
            Image URL 🖼️
          </span>
          <p className="text-zinc-500 font-light text-sm">
            This is the image URL of the cog
          </p>
        </div>
        <input
          className="bg-white border-none rounded-md py-2 px-3 ring-1 ring-zinc-200 focus:ring-zinc-300 hover:ring-2 focus:ring-2 transition duration-200 ease-in-out outline-none"
          type="text"
          placeholder="Image URL"
          onChange={(e) => {
            setCogData({ ...cogData, imgUrl: e.target.value });
          }}
        />
      </div>

      <button
        onClick={() => {
          createCog(cogData);
        }}
        className="flex justify-center items-center bg-white text-zinc-800 mt-2 px-6 py-2 self-start rounded-md text-center font-semibold text-sm hover:bg-zinc-100/50 transition-all ring-1 duration-200 ring-zinc-200 hover:ring-zinc-300 active:scale-[0.98]"
      >
        Create
      </button>
    </div>
  );
};

export default Create;
