import { PrismaVectorStore } from "langchain/vectorstores/prisma";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { PromptTemplate } from "langchain/prompts";
import { NextResponse } from "next/server";
import {
  HuggingFaceStream,
  Message,
  OpenAIStream,
  StreamingTextResponse,
  Message as VercelChatMessage,
} from "ai";
import { prompts } from "@/lib/prompts";
import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { HuggingFaceInferenceEmbeddings } from "langchain/embeddings/hf";
import { StringOutputParser } from "langchain/schema/output_parser";
import { Document } from "langchain/document";
import { TogetherAI } from "@langchain/community/llms/togetherai";
import OpenAI from "openai";
import { HfInference } from "@huggingface/inference";
import { experimental_buildOpenAssistantPrompt } from "ai/prompts";

const fireworks = new OpenAI({
  apiKey: process.env.FIREWORKS_AI_API_KEY || "",
  baseURL: process.env.FIREWORKS_AI_ENDPOINT,
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
    7
  );

  return similarDocs;
};

export async function POST(req: Request) {
  try {
    const { id, messages } = await req.json();

    console.log("Created vector store");

    console.log("Calling chain");

    const previousMessages = messages.slice(0, -1);
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
      }, {
        role: "assistant",
        content: `
        Got it! I'll do my best to follow your instructions.
      `,
      }
    ];

    console.log(context);

    // // Ask OpenAI for a streaming chat completion given the prompt
    const response = await fireworks.chat.completions.create({
      model: "accounts/fireworks/models/mixtral-8x7b-instruct",
      stream: true,
      max_tokens: 2000,
      messages: [...prompt, ...messages],
    });

    const stream = OpenAIStream(response);

    return new StreamingTextResponse(stream);
  } catch (error) {
    const errorString = error!.toString().substring(0, 2000);
    console.log(errorString);
    return NextResponse.json({
      error: errorString,
    });
  }
}
