import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { PineconeClient } from "@pinecone-database/pinecone";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import { CONDENSE_TEMPLATE, QA_TEMPLATE } from "@/lib/prompts";

export const createEmbeddings = async (docs: any) => {
  // console.log("docs", docs);

  // const client = new PineconeClient();
  // await client.init({
  //   apiKey: process.env.NEXT_PUBLIC_PINECONE_API_KEY as string,
  //   environment: process.env.NEXT_PUBLIC_PINECONE_ENVIRONMENT as string,
  // });
  // const pineconeIndex = client.Index(
  //   process.env.NEXT_PUBLIC_PINECONE_INDEX as string
  // );

  // console.log(await client.listIndexes());

  const vectorStore = await MemoryVectorStore.fromDocuments(
    docs,
    new OpenAIEmbeddings(
      {
        openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
        stripNewLines: true,
        verbose: true,
      },
      {
        basePath: process.env.NEXT_PUBLIC_OPENAI_ENDPOINT,
      }
    )
    // {
    //   pineconeIndex,
    // }
  );

  return vectorStore;
};
