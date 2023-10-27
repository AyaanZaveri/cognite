import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PrismaVectorStore } from "langchain/vectorstores/prisma";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { PromptTemplate } from "langchain/prompts";
import { NextResponse } from "next/server";
import { StreamingTextResponse, LangChainStream, Message } from "ai";
import { CallbackManager, ConsoleCallbackHandler } from "langchain/callbacks";
import { AIMessage, HumanMessage } from "langchain/schema";
import { prompts } from "@/lib/prompts";
import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { HuggingFaceInferenceEmbeddings } from "langchain/embeddings/hf";
import { StringOutputParser } from "langchain/schema/output_parser";
import { RunnableSequence } from "langchain/schema/runnable";
import { Document } from "langchain/document";

// const embeddingsModel = new OpenAIEmbeddings(
//   {
//     openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
//     stripNewLines: true,
//     verbose: true,
//   },
//   {
//     basePath: process.env.NEXT_PUBLIC_OPENAI_ENDPOINT,
//     // basePath: "https://openai-cf.ayaanzaveri08.workers.dev",
//     // basePath: "https://ayaanzaveri-bge-large-en-v1-5.hf.space/v1",
//   }
// );

const embeddingsModel = new HuggingFaceInferenceEmbeddings({
  apiKey: process.env.NEXT_PUBLIC_HUGGINGFACEHUB_API_KEY,
  model: "BAAI/bge-base-en-v1.5",
});

const serializeDocs = (docs: Array<Document>) =>
  docs.map((doc) => doc.pageContent).join("\n\n");

const runLLMChain = async (style: string, messages: any, id: string) => {
  const encoder = new TextEncoder();

  const transformStream = new TransformStream();
  const writer = transformStream.writable.getWriter();

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

  const streamingModel = new ChatOpenAI(
    {
      streaming: true,
      // verbose: true,
      callbacks: [
        {
          async handleLLMNewToken(token) {
            await writer.ready;
            await writer.write(encoder.encode(`${token}`));
          },
          async handleLLMEnd() {
            await writer.ready;
            await writer.close();
          },
        },
      ],
      temperature: 0.7,
      modelName: "gpt-3.5-turbo-16k",
      openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY_CHAT,
    },
    {
      basePath: process.env.NEXT_PUBLIC_OPENAI_ENDPOINT_CHAT,
    }
  );

  const nonStreamingModel = new ChatOpenAI(
    {
      verbose: true,
      temperature: 0.3,
      modelName: "gpt-3.5-turbo",
      openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY_CHAT,
    },
    {
      basePath: process.env.NEXT_PUBLIC_OPENAI_ENDPOINT_CHAT,
    }
  );

  console.log("Created models");

  const retriever = vectorStore.asRetriever();

  const chain = RunnableSequence.from([
    {
      question: (input: { question: string; chatHistory?: string }) =>
        input.question,
      chatHistory: (input: { question: string; chatHistory?: string }) =>
        input.chatHistory ?? "",
      context: async (input: { question: string; chatHistory?: string }) => {
        const relevantDocs = await retriever.getRelevantDocuments(
          input.question
        );
        const serialized = serializeDocs(relevantDocs);
        return serialized;
      },
      additionalContext: (input: {
        question: string;
        chatHistory?: string;
        additionalContext?: string;
      }) => input.additionalContext ?? "",
    },
    PromptTemplate.fromTemplate(prompts[style].qa),
    streamingModel,
    new StringOutputParser(),
  ]);

  // const chain = ConversationalRetrievalQAChain.fromLLM(
  //   streamingModel,
  //   vectorStore.asRetriever(),
  //   {
  //     verbose: true,
  //     returnSourceDocuments: true,
  //     qaChainOptions: {
  //       type: "stuff",
  //       prompt: PromptTemplate.fromTemplate(prompts[style].qa),
  //     },
  //     questionGeneratorChainOptions: {
  //       template: prompts[style].condense,
  //       llm: nonStreamingModel,
  //     },
  //   }
  // );

  const history = messages.map((m: any) => {
    return m.role === "user"
      ? new HumanMessage(m.content)
      : new AIMessage(m.content.split("\n__META_JSON__\n")[0]);
  });

  const prompt: string = history.pop().text.trim().replaceAll("\n", " ");

  chain.invoke({
    question: prompt,
    chatHistory: history,
    additionalContext: additionalContext ? additionalContext : "Go!",
  });

  return transformStream.readable;
};

export async function POST(req: Request) {
  try {
    const { id, messages, style } = await req.json();

    const { stream, handlers } = LangChainStream();

    console.log("Created vector store");

    // teach me more
    // what is this

    // add recipe books
    // add menus
    // make create button big at top so people click it

    // Create encoding to convert token (string) to Uint8Array

    console.log("Calling chain");

    const theStream = await runLLMChain(style, messages, id);

    console.log("Called chain");

    // return new StreamingTextResponse(stream);
    // return stream as readable stream

    return new Response(theStream);
  } catch (error) {
    // get the first 2000 characters of the error
    const errorString = error!.toString().substring(0, 2000);
    console.log(errorString);
    return NextResponse.json({
      error: errorString,
    });
  }

  // return NextResponse.json({
  //   response: response,
  // });
}
