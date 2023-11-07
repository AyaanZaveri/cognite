import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PrismaVectorStore } from "langchain/vectorstores/prisma";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { PromptTemplate } from "langchain/prompts";
import { NextResponse } from "next/server";
import {
  StreamingTextResponse,
  LangChainStream,
  Message as VercelChatMessage,
} from "ai";
import { CallbackManager, ConsoleCallbackHandler } from "langchain/callbacks";
import { AIMessage, HumanMessage } from "langchain/schema";
import { prompts } from "@/lib/prompts";
import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { HuggingFaceInferenceEmbeddings } from "langchain/embeddings/hf";
import {
  BytesOutputParser,
  StringOutputParser,
} from "langchain/schema/output_parser";
import {
  RunnablePassthrough,
  RunnableSequence,
} from "langchain/schema/runnable";
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
//     // basePath: "https://limcheekin-bge-small-en-v1-5.hf.space/v1",
//   }
// );

type ConversationalRetrievalQAChainInput = {
  question: string;
  chat_history: VercelChatMessage[];
};

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

  const model = new ChatOpenAI(
    {
      streaming: true,
      verbose: true,
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
      openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY_CHAT,
      // topP: 0.75,
      maxTokens: 4000,
      // modelName: "huggingfaceh4/zephyr-7b-beta",
      modelName: "gpt-3.5-turbo-16k",
    },
    {
      basePath: process.env.NEXT_PUBLIC_OPENAI_ENDPOINT_CHAT,
      defaultHeaders: {
        "HTTP-Referer": process.env.NEXTAUTH_URL,
      },
    }
  );

  const questionModel = new ChatOpenAI(
    {
      temperature: 0.5,
      openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY_CHAT,
      // topP: 0.75,
      maxTokens: 4000,
      // modelName: "huggingfaceh4/zephyr-7b-beta",
      modelName: "gpt-3.5-turbo",
    },
    {
      basePath: process.env.NEXT_PUBLIC_OPENAI_ENDPOINT_CHAT,
      defaultHeaders: {
        "HTTP-Referer": process.env.NEXTAUTH_URL,
      },
    }
  );

  console.log("Created models");

  const retriever = vectorStore.asRetriever();

  const standaloneQuestionChain = RunnableSequence.from([
    {
      question: (input: ConversationalRetrievalQAChainInput) => input.question,
      chat_history: (input: ConversationalRetrievalQAChainInput) =>
      formatVercelMessages(input.chat_history),
    },
    PromptTemplate.fromTemplate(prompts[style].condense),
    questionModel,
    new StringOutputParser(),
  ]);

  const answerChain = RunnableSequence.from([
    {
      question: new RunnablePassthrough(),
      context: retriever.pipe(combineDocumentsFn),
    },
    PromptTemplate.fromTemplate(prompts[style].qa),
    model,
    new BytesOutputParser(),
  ]);

  const chain = standaloneQuestionChain.pipe(answerChain);

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

  const currentMessageContent = messages[messages.length - 1].content;
  const previousMessages = messages.slice(0, -1);

  chain.invoke({
    question: currentMessageContent,
    chat_history: previousMessages,
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
