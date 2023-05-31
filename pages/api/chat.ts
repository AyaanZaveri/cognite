import { ConversationalRetrievalQAChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { PineconeClient } from "@pinecone-database/pinecone";
import { PineconeStore } from "langchain/vectorstores/pinecone";

const {
  NEXT_PUBLIC_OPENAI_API_KEY,
  NEXT_PUBLIC_OPENAI_ENDPOINT,
  NEXT_PUBLIC_PINECONE_API_KEY,
  NEXT_PUBLIC_PINECONE_ENDPOINT,
} = process.env;

async function handler(req: any, res: any) {
  const { prompt, docs, chatHistory } = req.body;

  const vectorStore = await MemoryVectorStore.fromDocuments(
    docs,
    new OpenAIEmbeddings(
      {
        openAIApiKey: NEXT_PUBLIC_OPENAI_API_KEY,
        stripNewLines: true,
        verbose: true,
      },
      {
        basePath: NEXT_PUBLIC_OPENAI_ENDPOINT,
      }
    )
  );

  console.log(vectorStore);

  const model = new ChatOpenAI(
    {
      openAIApiKey: NEXT_PUBLIC_OPENAI_API_KEY,
      streaming: true,
      modelName: "gpt-3.5-turbo",
      callbacks: [
        {
          handleLLMNewToken(token: string) {
            res.write(token);
          },
        },
      ],
    },
    {
      basePath: NEXT_PUBLIC_OPENAI_ENDPOINT,
    }
  );

  const chain = ConversationalRetrievalQAChain.fromLLM(
    model,
    vectorStore.asRetriever(),
    {
      returnSourceDocuments: true,
    }
  );

  await chain.call({
    question: prompt,
    chat_history: chatHistory,
  });

  res.end();
}

export default handler;
