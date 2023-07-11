import { QA_TEMPLATE } from "@/lib/prompts";
import { Prisma, PrismaClient } from "@prisma/client";
import { OpenAI } from "langchain";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PrismaVectorStore } from "langchain/vectorstores/prisma";

const prisma = new PrismaClient();

export const makeChain = (
  vectorstore: PrismaVectorStore<any, any, any, any>
) => {
  const model = new OpenAI(
    {
      temperature: 0.5,
      modelName: "gpt-3.5-turbo",
      openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    },
    {
      basePath: process.env.NEXT_PUBLIC_OPENAI_ENDPOINT,
    }
  );

  const chain = ConversationalRetrievalQAChain.fromLLM(
    model,
    vectorstore.asRetriever(),
    {
      qaTemplate: QA_TEMPLATE,
      // questionGeneratorTemplate: CONDENSE_PROMPT,
      returnSourceDocuments: true, //The number of source documents returned is 4 by default
    }
  );
  return chain;
};

export const createVectorStore = () => {
  const embeddings = new OpenAIEmbeddings(
    {},
    {
      basePath: process.env.OPENAI_BASE_URL + "/v1",
    }
  );

  const vectorStore = PrismaVectorStore.withModel<any>(prisma).create(
    embeddings,
    {
      prisma: Prisma,
      tableName: "Cog",
      vectorColumnName: "embeddings",
      columns: {
        id: PrismaVectorStore.IdColumn,
        content: PrismaVectorStore.ContentColumn,
      },
    }
  );

  return vectorStore;
};
