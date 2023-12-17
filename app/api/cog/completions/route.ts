import { PrismaVectorStore } from "langchain/vectorstores/prisma";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { PromptTemplate } from "langchain/prompts";
import { NextResponse } from "next/server";
import { StreamingTextResponse, Message as VercelChatMessage } from "ai";
import { prompts } from "@/lib/prompts";
import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { HuggingFaceInferenceEmbeddings } from "langchain/embeddings/hf";
import { StringOutputParser } from "langchain/schema/output_parser";
import { Document } from "langchain/document";
import { TogetherAI } from "@langchain/community/llms/togetherai";

const combineDocumentsFn = (docs: Document[], separator = "\n\n") => {
  const serializedDocs = docs.map((doc) => doc.pageContent);
  return serializedDocs.join(separator);
};

const formatVercelMessages = (chatHistory: VercelChatMessage[]) => {
  const formattedDialogueTurns = chatHistory.map((message) => {
    if (message.role === "user") {
      return `Human: ${message.content}`;
    } else if (message.role === "assistant") {
      return `Assistant: ${message.content}`;
    } else {
      return `${message.role}: ${message.content}`;
    }
  });
  return formattedDialogueTurns.join("\n");
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
    10
  );

  return similarDocs;
};

export async function POST(req: Request) {
  try {
    const { id, messages, style } = await req.json();

    console.log("Created vector store");

    console.log("Calling chain");

    const previousMessages = messages.slice(0, -1);
    const currentMessageContent = messages[messages.length - 1].content;

    const similarDocs = await getStuff(currentMessageContent, id);

    // const model = new ChatOpenAI(
    //   {
    //     streaming: true,
    //     verbose: true,
    //     temperature: 1,
    //     openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY_CHAT,
    //     modelName: "mistralai/mixtral-8x7b-instruct",
    //   },
    //   {
    //     basePath: process.env.NEXT_PUBLIC_OPENAI_ENDPOINT_CHAT,
    //     defaultHeaders: {
    //       "HTTP-Referer": process.env.NEXTAUTH_URL,
    //     },
    //   }
    // );

    const model = new TogetherAI(
      {
        streaming: true,
        verbose: true,
        temperature: 0.6,
        topP: 0.95,
        repetitionPenalty: 1.2,
        topK: 0.5,
        apiKey: process.env.NEXT_PUBLIC_TOGETHERAI_API_KEY,
        modelName: "mistralai/Mixtral-8x7B-Instruct-v0.1",
      },
    );

    const proompt = `
    Here is some context from a document, along with a question related to it.
    <context>
    {docs}
    </context>
    
    Chat history:
    {previousMessages}

    Question: {message}

    {style}
    
    Bold important words using **bold**.
    
    Answer:
  `;

    const prompt = PromptTemplate.fromTemplate(proompt);

    const outputParser = new StringOutputParser();

    // @ts-ignore
    const chain = prompt.pipe(model).pipe(outputParser);

    console.log("Called chain");

    const stream = await chain.stream({
      message: currentMessageContent,
      previousMessages: formatVercelMessages(previousMessages),
      docs: combineDocumentsFn(similarDocs),
      style: prompts[style].qa,
    });

    return new StreamingTextResponse(stream);
  } catch (error) {
    const errorString = error!.toString().substring(0, 2000);
    console.log(errorString);
    return NextResponse.json({
      error: errorString,
    });
  }
}
