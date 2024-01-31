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
import { styles } from "@/lib/styles";
import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { HuggingFaceInferenceEmbeddings } from "langchain/embeddings/hf";
import { StringOutputParser } from "langchain/schema/output_parser";
import { Document } from "langchain/document";
import { TogetherAI } from "@langchain/community/llms/togetherai";
import OpenAI from "openai";
import { HfInference } from "@huggingface/inference";
import { experimental_buildOpenAssistantPrompt } from "ai/prompts";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

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

const getStuff = async (currentMessageContent: string, article: string) => {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/wiki/parse`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      search: article,
    }),
  });

  const { data } = await response.json();

  const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 3000 });

  const text = data.content;

  // console.log(text);

  const docs = await splitter.createDocuments([text as string]);

  const vectorStore = await MemoryVectorStore.fromDocuments(
    docs,
    embeddingsModel
  );

  console.log("Created models");

  const similarDocs = await vectorStore.similaritySearch(
    `${currentMessageContent}`,
    7
  );

  return similarDocs;
};

export async function POST(req: Request) {
  try {
    const {
      article,
      messages,
      style,
    }: {
      article: string;
      messages: any[];
      style: keyof typeof styles;
    } = await req.json();

    console.log("Created vector store");

    console.log("Calling chain");

    const currentMessageContent = messages[messages.length - 1].content;

    const similarDocs = await getStuff(currentMessageContent, article);

    const context = combineDocumentsFn(similarDocs);

    const prompt = [
      {
        role: "system",
        content: `
        Carefully heed the user's instructions.
        Respond using Markdown.

        ${String(style)}`,
      },
      {
        role: "user",
        content: `
        You are Cognite.

        ${context}

        ${String(style)}
      `,
      },
      {
        role: "assistant",
        content: `
        Got it! I'll do my best to follow your instructions.
      `,
      },
    ];

    console.log({ prompt });

    const response = await togetherai.chat.completions.create({
      model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
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
