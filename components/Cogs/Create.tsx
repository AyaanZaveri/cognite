"use client";

import { CogDocs, Cogs } from "@/types";
import { scrapeSite } from "@/utils/scrapeSite";
import axios from "axios";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { Session } from "next-auth";
import { Space_Grotesk } from "next/font/google";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { InputFile } from "../InputFile";
import { Document } from "langchain/dist/document";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const space_grotesk = Space_Grotesk({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

interface ButtonState {
  text: string;
  loading: boolean;
}

const Create = (session: { session: Session | null }) => {
  const [cogData, setCogData] = useState<CogDocs>({
    name: "",
    description: "",
    imgUrl: "",
    slug: "",
    docs: [],
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
            const splitter = new RecursiveCharacterTextSplitter({
              chunkSize: 700,
              chunkOverlap: 0,
              // separators: ["\n## ", "\n###", "\n\n", "\n", " "],
            });

            const loader = new PDFLoader(file as Blob);
            const pdfDocs = await loader.loadAndSplit(splitter);

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

      // setCogData((prevState) => {
      //   const updatedState = {
      //     ...prevState,
      //     slug: slugify(prevState.name, { lower: true }),
      //   };
      //   return updatedState;
      // });

      const response = await axios.post(`/api/cog/create`, {
        data: updatedData,
      });

      if (response.status === 200) {
        setButtonState({
          text: "Cog created! 🎉",
          loading: false,
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className="flex flex-col gap-4 rounded-lg">
      <div className="flex flex-col gap-3">
        <div>
          <span className={`text-xl font-semibold text-accent-foreground`}>Name 🏷️</span>
          <p className="text-sm font-light text-muted-foreground">
            This is the name of the cog
          </p>
        </div>
        <Input
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
          <span className={`text-xl font-semibold text-accent-foreground`}>
            Description 📝
          </span>
          <p className="text-sm font-light text-muted-foreground">
            This is the description of the cog
          </p>
        </div>
        <Input
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
          <span className={`text-xl font-semibold text-accent-foreground`}>
            Website 🌐
          </span>
          <p className={`text-sm font-light text-muted-foreground`}>
            This is the website you want to train the cog on
          </p>
        </div>
        <Input
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
          <span className={`text-xl font-semibold text-accent-foreground`}>Slug</span>
          <p className="text-sm font-light text-muted-foreground">
            This is the slug of the cog
          </p>
        </div>
        <Input
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
          <span className={`text-xl font-semibold text-accent-foreground`}>
            Image URL 🖼️
          </span>
          <p className="text-sm font-light text-muted-foreground">
            This is the image URL of the cog
          </p>
        </div>
        <Input
          type="text"
          placeholder="Image URL"
          value={cogData.imgUrl}
          onChange={(e) => {
            setCogData({ ...cogData, imgUrl: e.target.value });
          }}
        />
      </div>

      <Button
        onClick={() => {
          createCog();
        }}
        className="self-start"
      >
        {buttonState.text}
      </Button>
    </div>
  );
};

export default Create;
