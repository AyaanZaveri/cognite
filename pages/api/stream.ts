import { CONDENSE_TEMPLATE, QA_TEMPLATE } from "@/lib/prompts";
import { StreamingTextResponse, LangChainStream, Message } from "ai";
import axios from "axios";
import { PromptTemplate } from "langchain";
const cheerio = require("cheerio");
import { CallbackManager } from "langchain/callbacks";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { BufferMemory } from "langchain/memory";
import { AIChatMessage, HumanChatMessage } from "langchain/schema";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

export const runtime = "edge";

export default async function POST(req: Request) {
  const { messages, combinedText } = await req.json();

  const { stream, handlers } = LangChainStream();

  const question = messages[messages.length - 1].content;

  const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });

  const docs = await splitter.createDocuments([combinedText as string]);

  const model = new ChatOpenAI(
    {
      streaming: true,
      callbackManager: CallbackManager.fromHandlers(handlers),
      openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
      modelName: "gpt-4",
      temperature: 0.7,
      topP: 1,
    },
    {
      basePath: process.env.NEXT_PUBLIC_OPENAI_ENDPOINT,
    }
  );

  const vectorStore = await MemoryVectorStore.fromDocuments(
    docs,
    new OpenAIEmbeddings(
      {
        openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
      },
      {
        basePath: process.env.NEXT_PUBLIC_OPENAI_ENDPOINT,
      }
    )
  );

  const nonStreamingModel = new ChatOpenAI(
    {
      openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
      modelName: "gpt-3.5-turbo",
      temperature: 0.7,
      topP: 1,
    },
    {}
  );

  const chain = ConversationalRetrievalQAChain.fromLLM(
    model,
    vectorStore.asRetriever(),
    {
      returnSourceDocuments: true,
      questionGeneratorTemplate: CONDENSE_TEMPLATE,
      qaTemplate: QA_TEMPLATE,
    }
  );

  chain
    .call({
      question,
      chat_history: messages?.map(
        (m: { role: string; content: string }) => m.content
      ),
    })
    .catch(console.error);

  return new StreamingTextResponse(stream);
}
