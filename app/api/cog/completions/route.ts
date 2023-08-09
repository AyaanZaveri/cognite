import { Prisma } from "@prisma/client/edge";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PrismaVectorStore } from "langchain/vectorstores/prisma";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { PromptTemplate } from "langchain/prompts";
import { NextResponse } from "next/server";
import { StreamingTextResponse, LangChainStream, Message } from "ai";
import { CallbackManager } from "langchain/callbacks";
import { AIMessage, HumanMessage } from "langchain/schema";
import prisma from "@/lib/prisma-edge";
import { Document } from "langchain/dist/document";

export const runtime = "edge";

const CONDENSE_PROMPT = `Your task as an AI language model is to create a clear and concise standalone question based on the given conversation history and a related follow-up question. Ensure that your rephrased question captures the essence of the follow-up question without relying on the context of the conversation.
System message: You are Cognition, a large language model trained by OpenAI. Carefully heed the user's instructions. Respond using Markdown.
Conversation history:
{chat_history}
Related follow-up question: {question}
Rephrased standalone question:`;

const QA_PROMPT = `As a highly advanced AI language model, your task is to provide a comprehensive and accurate response in a conversational manner, based on the context provided below. The following excerpt from a document is given, along with a question related to it. Please ensure that your answer is well-structured and directly addresses the question.
Guidelines:
- Use information from the provided context to support your answer. Do not include information from external sources.
- If the question is exactly "tl;dr" try your hardest to summarize the document in 100 words or less.
- If the question is unrelated to the context, kindly inform that your responses are limited to the information provided in the given context.


Question: {question}
=========
{context}
=========
Answer in Markdown format:`;

export async function POST(req: Request) {
  try {
    const { id, messages } = await req.json();

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

    const vectorStore = PrismaVectorStore.withModel<any>(prisma!).create(
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
          prompt: PromptTemplate.fromTemplate(QA_PROMPT),
        },
        questionGeneratorChainOptions: {
          template: CONDENSE_PROMPT,
          llm: nonStreamingModel,
        },
      }
    );

    console.log("Created chain");

    const stringifySources = (docs: Document[] | undefined) => {
      if (docs) {
        const stringifiedSources = JSON.stringify(docs.map((x) => x.metadata));
        return stringifiedSources;
      }
      return "";
    };

    const history = messages.map((m: any) => {
      return m.role === "user"
        ? new HumanMessage(m.content)
        : new AIMessage(m.content.split("\n__META_JSON__\n")[0]);
    });

    const prompt = history.pop().text.trim().replaceAll("\n", " ");

    console.log("Calling chain");

    chain
      .call({
        question: prompt,
        chat_history: history,
      })
      .then((response) => {
        const { sourceDocuments } = response;
        console.log(sourceDocuments);
      });

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
