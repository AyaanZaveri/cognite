import { ConversationalRetrievalQAChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { HumanChatMessage } from "langchain/schema";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

export default async function handler(req: any, res: any) {
  const { prompt, docs } = req.body;

  const vectorStore = await MemoryVectorStore.fromDocuments(
    docs,
    new OpenAIEmbeddings({
      openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
      stripNewLines: true,
      verbose: true,
    })
  );

  console.log(vectorStore);

  const model = new ChatOpenAI({
    openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    streaming: true,
    modelName: "gpt-3.5-turbo",
    callbacks: [
      {
        handleLLMNewToken(token: string) {
          res.write(token);
        },
      },
    ],
  });

  const chain = ConversationalRetrievalQAChain.fromLLM(
    model,
    vectorStore.asRetriever(),
    {
      returnSourceDocuments: true,
    }
  );

  const chatHistory = "";

  await chain.call({
    question: `Answer the question in a friendly, detailed and concise way and please limit yourself to 1-3 sentences. Please use emojis: ${prompt}`,
    chat_history: chatHistory,
  });

  res.end();
}
