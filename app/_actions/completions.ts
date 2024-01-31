"use server";

import { PrismaVectorStore } from "langchain/vectorstores/prisma";
import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { HuggingFaceInferenceEmbeddings } from "langchain/embeddings/hf";
import { Document } from "langchain/document";
import OpenAI from "openai";
import { Message, OpenAIStream, experimental_StreamingReactResponse } from "ai";

const togetherai = new OpenAI({
  apiKey: process.env.TOGETHER_AI_API_KEY || "",
  baseURL: process.env.TOGETHER_AI_ENDPOINT,
});

const combineDocumentsFn = (docs: Document[], separator = "\n\n") => {
  const serializedDocs = docs.map((doc) => doc.pageContent);
  return serializedDocs.join(separator);
};

const embeddingsModel = new HuggingFaceInferenceEmbeddings({
  apiKey: process.env.NEXT_PUBLIC_HUGGINGFACEHUB_API_KEY,
  model: "sentence-transformers/all-MiniLM-L6-v2",
});

const getStuff = async (currentMessageContent: string, id: string) => {
  const vectorStore = PrismaVectorStore.withModel<any>(db).create(
    embeddingsModel,
    {
      prisma: Prisma,
      tableName: "Embeddings",
      vectorColumnName: "embedding",
      columns: {
        id: PrismaVectorStore.IdColumn,
        content: PrismaVectorStore.ContentColumn,
      },
      filter: {
        cog_id: {
          equals: id,
        },
      },
    }
  );

  const additionalContext = await db?.cog
    .findUnique({
      where: {
        id,
      },
    })
    .then((cog) => {
      return cog?.additionalContext;
    });

  console.log(additionalContext);

  console.log("Created models");

  const similarDocs = await vectorStore.similaritySearch(
    `${currentMessageContent}`,
    79
  );

  return similarDocs;
};

export async function handler({
  messages,
  id,
}: {
  messages: Message[];
  id: string;
}) {
  console.log("the id", id);
  console.log("the messages", messages);

  const currentMessageContent = messages[messages.length - 1].content;

  const similarDocs = await getStuff(currentMessageContent, id);

  const context = combineDocumentsFn(similarDocs);

  const prompt = [
    {
      role: "user",
      content: `
          You are Cognite.
          Carefully heed the user's instructions.
          Respond using Markdown.
          ${context}
        `,
    },
    {
      role: "assistant",
      content: `
          Got it! I'll do my best to follow your instructions.
        `,
    },
  ];

  // Request the OpenAI API for the response based on the prompt
  const response = await togetherai.chat.completions.create({
    model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
    stream: true,
    max_tokens: 2000,
    // @ts-ignore
    messages: [...prompt, ...messages],
  });

  const stream = OpenAIStream(response);

  // Respond with the stream
  return new experimental_StreamingReactResponse(stream);
}
