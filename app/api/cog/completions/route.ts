import { Prisma, PrismaClient } from "@prisma/client/edge";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PrismaVectorStore } from "langchain/vectorstores/prisma";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { PromptTemplate } from "langchain/prompts";
import { NextResponse } from "next/server";
import { StreamingTextResponse, LangChainStream, Message } from "ai";
import { CallbackManager, ConsoleCallbackHandler } from "langchain/callbacks";
import { AIMessage, HumanMessage } from "langchain/schema";
import { Document } from "langchain/dist/document";
import { prompts } from "@/lib/prompts";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { id, messages, style } = await req.json();

    const { stream, handlers } = LangChainStream();

    const embeddingsModel = new OpenAIEmbeddings(
      {
        openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
        stripNewLines: true,
        verbose: true,
      },
      {
        basePath: process.env.NEXT_PUBLIC_OPENAI_ENDPOINT,
      }
    );

    const vectorStore = PrismaVectorStore.withModel<any>(prisma).create(
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

    console.log("Created vector store");

    // teach me more
    // what is this

    // add recipe books
    // add menus
    // make create button big at top so people click it

    const streamingModel = new ChatOpenAI(
      {
        streaming: true,
        callbackManager: CallbackManager.fromHandlers(handlers),
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
        temperature: 0.3,
        modelName: "gpt-3.5-turbo",
        openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY_CHAT,
      },
      {
        basePath: process.env.NEXT_PUBLIC_OPENAI_ENDPOINT_CHAT,
      }
    );

    console.log("Created models");

    const chain = ConversationalRetrievalQAChain.fromLLM(
      streamingModel,
      vectorStore.asRetriever(),
      {
        returnSourceDocuments: true,
        qaChainOptions: {
          type: "stuff",
          prompt: PromptTemplate.fromTemplate(prompts[style].qa),
        },
        questionGeneratorChainOptions: {
          template: prompts[style].condense,
          llm: nonStreamingModel,
        },
      }
    );

    console.log("Created chain");

    const history = messages.map((m: any) => {
      return m.role === "user"
        ? new HumanMessage(m.content)
        : new AIMessage(m.content.split("\n__META_JSON__\n")[0]);
    });

    const prompt = history.pop().text.trim().replaceAll("\n", " ");

    console.log("Calling chain");

    chain.stream({
      question: prompt,
      chat_history: history,
    });

    console.log("Called chain");

    return new StreamingTextResponse(stream);
    // return stream as readable stream
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
