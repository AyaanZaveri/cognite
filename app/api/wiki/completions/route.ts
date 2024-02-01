import { NextResponse } from "next/server";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { styles } from "@/lib/styles";
import { HuggingFaceInferenceEmbeddings } from "langchain/embeddings/hf";
import { Document } from "langchain/document";
import OpenAI from "openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

const togetherai = new OpenAI({
  apiKey: process.env.TOGETHER_AI_API_KEY || "",
  baseURL: process.env.TOGETHER_AI_ENDPOINT,
});

let cachedArticleName: string | null = null;
let cachedVectorStore: any = null;

const combineDocumentsFn = (docs: Document[], separator = "\n\n") => {
  const serializedDocs = docs.map((doc) => doc.pageContent);
  return serializedDocs.join(separator);
};

const embeddingsModel = new HuggingFaceInferenceEmbeddings({
  apiKey: process.env.NEXT_PUBLIC_HUGGINGFACEHUB_API_KEY,
  model: "sentence-transformers/all-MiniLM-L6-v2",
});

const cacheVectorStore = async (article: string) => {
  if (cachedArticleName !== article) {
    cachedArticleName = article;
    cachedVectorStore = null;
  }

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

  const docs = await splitter.createDocuments([text as string]);

  const vectorStore = await MemoryVectorStore.fromDocuments(
    docs,
    embeddingsModel
  );

  cachedVectorStore = vectorStore;

  if (cachedVectorStore === null) {
    throw new Error("Failed to create vector store");
  } else {
    console.log("Cached vector store");
    return true;
  }
};

const getStuff = async (currentMessageContent: string, article: string) => {
  console.log("Created models");

  // if (cachedVectorStore === null) {
  //   await cacheVectorStore(article);
  // }

  const similarDocs = await cachedVectorStore.similaritySearch(
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
      init,
      style,
    }: {
      article: string;
      messages: any[];
      init: boolean;
      style: keyof typeof styles;
    } = await req.json();

    if (init) {
      const initialized = cacheVectorStore(article);

      console.log("Created vector store");

      if (!initialized) {
        return NextResponse.json({
          message: "Failed to initialize",
          status: 500,
        });
      }

      return NextResponse.json({
        message: "Initialized",
        status: 200,
      });
    } else {
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

      const response = await togetherai.chat.completions.create({
        model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
        stream: true,
        max_tokens: 2000,
        messages: [...prompt, ...messages],
      });

      const stream = OpenAIStream(response);

      return new StreamingTextResponse(stream);
    }
  } catch (error) {
    const errorString = error!.toString().substring(0, 2000);
    console.log(errorString);
    return NextResponse.json({
      error: errorString,
    });
  }
}
