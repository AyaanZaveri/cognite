import { PrismaClient, Prisma } from "@prisma/client/edge";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { BufferMemory } from "langchain/memory";
import { PrismaVectorStore } from "langchain/vectorstores/prisma";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { CONDENSE_TEMPLATE, QA_TEMPLATE } from "@/lib/prompts";
import { PromptTemplate } from "langchain/prompts";
import { NextResponse } from "next/server";
import { StreamingTextResponse, LangChainStream, Message } from "ai";
import { CallbackManager } from "langchain/callbacks";
import { AIMessage, HumanMessage } from "langchain/schema";
import prisma from "@/lib/prisma-edge";
import { Document } from "langchain/dist/document";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { id, messages } = await req.json();

    const { stream, handlers } = LangChainStream();

    const vectorStore = PrismaVectorStore.withModel<any>(prisma!).create(
      new OpenAIEmbeddings(
        {
          openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
          stripNewLines: true,
          verbose: true,
        },
        {
          basePath: process.env.NEXT_PUBLIC_OPENAI_ENDPOINT,
        }
      ),
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

    const streamingModel = new ChatOpenAI(
      {
        streaming: true,
        callbackManager: CallbackManager.fromHandlers(handlers),
        temperature: 0.5,
        modelName: "gpt-3.5-turbo",
        openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
      },
      {
        basePath: process.env.NEXT_PUBLIC_OPENAI_ENDPOINT,
      }
    );

    const nonStreamingModel = new ChatOpenAI(
      {
        temperature: 0.5,
        modelName: "gpt-3.5-turbo",
        openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
      },
      {
        basePath: process.env.NEXT_PUBLIC_OPENAI_ENDPOINT,
      }
    );

    console.log("Created model");

    const chain = ConversationalRetrievalQAChain.fromLLM(
      streamingModel,
      vectorStore.asRetriever(),
      {
        returnSourceDocuments: true,
        qaChainOptions: {
          type: "stuff",
          prompt: PromptTemplate.fromTemplate(QA_TEMPLATE),
        },
        questionGeneratorChainOptions: {
          template: CONDENSE_TEMPLATE,
          llm: nonStreamingModel,
        },
      }
    );

    const stringifySources = (docs: Document[] | undefined) => {
      if (docs) {
        const stringifiedSources = JSON.stringify(docs.map((x) => x.metadata));
        return stringifiedSources;
      }
      return "";
    };

    console.log("Created chain");

    console.log(id);

    const history = messages.map((m: any) => {
      return m.role === "user"
        ? new HumanMessage(m.content)
        : new AIMessage(m.content.split("\n__META_JSON__\n")[0]);
    });

    const prompt = history.pop().text.trim().replaceAll("\n", " ");

    chain
      .call({
        question: prompt,
        chat_history: history,
      })
      .then((response) => {
        console.log("Got response");
        const { sourceDocuments } = response;
        console.log(sourceDocuments);
      });

    console.log("Called chain");

    return new StreamingTextResponse(stream);
    // return stream as readable stream
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: error,
    });
  }

  // return NextResponse.json({
  //   response: response,
  // });
}
