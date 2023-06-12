import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { scrapeSite } from "./scrapeSite";

export const getTextChunks = async (cogs: any, cogId: number) => {
  const siteText = await scrapeSite(cogs[cogId].urls);

  console.log(siteText);

  const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });

  const docs = await splitter.createDocuments([siteText as string]);

  console.log(docs);

  return docs;
};
