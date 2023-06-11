import { PrismaVectorStore } from "langchain/vectorstores/prisma";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { Prisma, Document, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const vectorStore = PrismaVectorStore.withModel<Document>(prisma).create(
  new OpenAIEmbeddings(
    {
      openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    },
    {
      basePath: process.env.NEXT_PUBLIC_OPENAI_ENDPOINT,
    }
  ),
  {
    prisma: Prisma,
    tableName: "Document",
    vectorColumnName: "embedding",
    columns: {
      id: PrismaVectorStore.IdColumn,
      content: PrismaVectorStore.ContentColumn,
    },
  }
);

export const addModels = async (docs: any, cogName: string) => {
  // Create documents with the provided docName or "Default Title"
  const createdDocuments = await prisma.$transaction(
    docs.map((content: any) =>
      prisma.document.create({
        data: {
          content: content?.pageContent || "",
        },
      })
    )
  );

  // Create a new Cogs record
  const cogs = await prisma.cogs.create({
    data: {
      name: cogName, // Replace with the desired name for the Cogs collection
      documents: {
        connect: createdDocuments.map((doc) => ({ id: doc.id })),
      },
    },
  });

  // Add models to the vector store
  await vectorStore.addModels(createdDocuments);

  console.log("Added models to vector store ✅");
};
