import { ConversationalRetrievalQAChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

export default async function handler(req: any, res: any) {
  const { prompt, docs } = req.body;

  const vectorStore = await MemoryVectorStore.fromDocuments(
    docs,
    new OpenAIEmbeddings(
      {
        openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
        stripNewLines: true,
        verbose: true,
      },
      {
        basePath: process.env.NEXT_PUBLIC_OPENAI_ENDPOINT,
      }
    )
  );

  console.log(vectorStore);

  const model = new ChatOpenAI(
    {
      openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
      streaming: true,
      callbacks: [
        {
          handleLLMNewToken(token: string) {
            res.write(token);
          },
        },
      ],
    },
    {
      basePath: process.env.NEXT_PUBLIC_OPENAI_ENDPOINT,
    }
  );

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
