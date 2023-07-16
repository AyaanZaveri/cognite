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

interface ButtonState {
  text: string;
  loading: boolean;
}

const Create = (session: { session: Session | null }) => {
  const [cogData, setCogData] = useState<Cogs>({
    name: "",
    description: "",
    type: "web",
    slug: "",
    imgUrl: "",
    docs: [],
    user: session?.session?.user?.name?.split(" ")[0] as string,
    userId: session?.session?.user?.id as any,
  });

  const [website, setWebsite] = useState<string>("");
  const [buttonState, setButtonState] = useState<ButtonState>({
    text: "Create",
    loading: false,
  });

  const router = useRouter();

  const getTextChunks = async (sites: string[]) => {
    return new Promise(async (resolve, reject) => {
      try {
        setButtonState({
          text: "Getting website 🌐",
          loading: true,
        });

        const siteText = await scrapeSite(sites);

        const splitter = new RecursiveCharacterTextSplitter({
          chunkSize: 1000,
        });
        const docs = await splitter.createDocuments([siteText as string]);

        setCogData((prevState) => {
          const updatedState = { ...prevState, docs: docs };
          resolve(updatedState);
          return updatedState;
        });
      } catch (error) {
        reject(error);
      }
    });
  };

  async function createCog() {
    try {
      const updatedCogData = await getTextChunks([website]);
      setButtonState({
        text: "Creating cog 🧠",
        loading: true,
      });
      const response = await axios.post(`/api/cog/create`, updatedCogData);

      if (response.status === 200) {
        setButtonState({
          text: "Cog created! 🎉",
          loading: false,
        });

        router.push(`/cog/${response.data.slug}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className="flex flex-col gap-4 rounded-lg">
      <div className="flex flex-col gap-3">
        <div>
          <span className={`text-xl font-semibold text-zinc-800`}>Name 🏷️</span>
          <p className="text-sm font-light text-zinc-500">
            This is the name of the cog
          </p>
        </div>
        <input
          className="rounded-md border-none bg-white px-3 py-2 outline-none ring-1 ring-zinc-200 transition duration-200 ease-in-out hover:ring-2 focus:ring-2 focus:ring-zinc-300"
          type="text"
          placeholder="Name"
          value={cogData.name}
          onChange={(e) => {
            setCogData({ ...cogData, name: e.target.value });
          }}
        />
      </div>
      <div className="flex flex-col gap-3 pt-3">
        <div>
          <span className={`text-xl font-semibold text-zinc-800`}>
            Description 📝
          </span>
          <p className="text-sm font-light text-zinc-500">
            This is the description of the cog
          </p>
        </div>
        <input
          className="rounded-md border-none bg-white px-3 py-2 outline-none ring-1 ring-zinc-200 transition duration-200 ease-in-out hover:ring-2 focus:ring-2 focus:ring-zinc-300"
          type="text"
          placeholder="Description"
          value={cogData.description}
          onChange={(e) => {
            setCogData({ ...cogData, description: e.target.value });
          }}
        />
      </div>
      {/* Do one for website */}
      <div className="flex flex-col gap-3 pt-3">
        <div>
          <span className={`text-xl font-semibold text-zinc-800`}>
            Website 🌐
          </span>
          <p className={`text-sm font-light text-zinc-500`}>
            This is the website you want to train the cog on
          </p>
        </div>
        <input
          className="rounded-md border-none bg-white px-3 py-2 outline-none ring-1 ring-zinc-200 transition duration-200 ease-in-out hover:ring-2 focus:ring-2 focus:ring-zinc-300"
          type="text"
          placeholder="Website URL"
          value={website}
          onChange={(e) => {
            setWebsite(e.target.value);
          }}
        />
      </div>
      <div className="flex flex-col gap-3 pt-3">
        <div>
          <span className={`text-xl font-semibold text-zinc-800`}>Slug 🔖</span>
          <p className="text-sm font-light text-zinc-500">
            {"This is the slug of the cog (like /slug)"}
          </p>
        </div>
        <input
          className="rounded-md border-none bg-white px-3 py-2 outline-none ring-1 ring-zinc-200 transition duration-200 ease-in-out hover:ring-2 focus:ring-2 focus:ring-zinc-300"
          type="text"
          placeholder="Slug"
          value={cogData.slug}
          onChange={(e) => {
            setCogData({ ...cogData, slug: e.target.value });
          }}
        />
      </div>
      <div className="flex flex-col gap-3 pt-3">
        <div>
          <span className={`text-xl font-semibold text-zinc-800`}>
            Image URL 🖼️
          </span>
          <p className="text-sm font-light text-zinc-500">
            This is the image URL of the cog
          </p>
        </div>
        <input
          className="rounded-md border-none bg-white px-3 py-2 outline-none ring-1 ring-zinc-200 transition duration-200 ease-in-out hover:ring-2 focus:ring-2 focus:ring-zinc-300"
          type="text"
          placeholder="Image URL"
          value={cogData.imgUrl}
          onChange={(e) => {
            setCogData({ ...cogData, imgUrl: e.target.value });
          }}
        />
      </div>

      <button
        onClick={() => {
          createCog();
        }}
        className={`mt-2 flex items-center justify-center self-start rounded-md bg-zinc-50 px-6 py-2 text-center text-sm font-semibold text-zinc-800 ring-1 ring-zinc-200 transition-all duration-200 hover:bg-zinc-100 hover:ring-zinc-300 active:scale-[0.98] ${
          buttonState.loading
            ? "animate-pulse cursor-not-allowed"
            : "cursor-pointer"
        }`}
      >
        {buttonState.text}
      </button>
    </div>
  );
};

export default Create;
