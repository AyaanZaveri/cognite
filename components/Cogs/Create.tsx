"use client";

import { Cogs } from "@/types";
import { scrapeSite } from "@/utils/scrapeSite";
import axios from "axios";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { Session, User } from "next-auth";
import { Space_Grotesk } from "next/font/google";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { InputFile } from "../InputFile";
import { Document } from "langchain/dist/document";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import slugify from "slugify";

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
    imgUrl: "",
    slug: "",
    docs: [],
    user: session?.session?.user?.name?.split(" ")[0] as string,
    userId: session?.session?.user?.id as any,
  });

  const [website, setWebsite] = useState<string>("");
  const [file, setFile] = useState<Blob>();

  const [buttonState, setButtonState] = useState<ButtonState>({
    text: "Create",
    loading: false,
  });

  const router = useRouter();

  const getSources = async (sources: {
    sites: string[];
    file: Blob | undefined;
  }) => {
    return new Promise(async (resolve, reject) => {
      try {
        setButtonState({
          text: "Getting sources 🌐",
          loading: true,
        });

        const docs: Document[] = [];

        if (sources?.sites && sources?.sites.length > 0) {
          const siteText = await scrapeSite(sources?.sites);

          const splitter = new RecursiveCharacterTextSplitter({
            chunkSize: 1000,
          });

          const siteDocs = await splitter.createDocuments([siteText as string]);

          docs.push(...siteDocs);
        }

        if (sources?.file) {
          if (sources.file.type === "application/pdf") {
            const loader = new PDFLoader(file as Blob);
            const pdfDocs = await loader.loadAndSplit();

            docs.push(...pdfDocs);
          }
        }

        setCogData((prevState) => {
          const updatedState = { ...prevState, docs };
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
      let sources: {
        sites: string[];
        file: Blob | undefined;
      };

      if (website && file) {
        // Both inputs provided
        sources = { sites: [website], file };
      } else if (website) {
        sources = { sites: [website], file: undefined };
      } else {
        sources = { sites: [], file };
      }

      const updatedData = await getSources(sources);
      setButtonState({
        text: "Creating cog 🧠",
        loading: true,
      });

      setCogData((prevState) => {
        const updatedState = {
          ...prevState,
          slug: slugify(prevState.name, { lower: true }),
        };
        return updatedState;
      });

      const response = await axios.post(`/api/cog/create`, {
        cog: updatedData,
      });

      if (response.status === 200) {
        setButtonState({
          text: "Cog created! 🎉",
          loading: false,
        });

        // router.push(`/cog/${response?.data?.cog?.slug}`);
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
        <InputFile setFile={setFile} />
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
