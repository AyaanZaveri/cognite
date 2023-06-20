import { CONDENSE_TEMPLATE, QA_TEMPLATE } from "@/lib/prompts";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import { BaseLanguageModel } from "langchain/dist/base_language";
import { Document } from "langchain/dist/document";
import { VectorStore } from "langchain/dist/vectorstores/base";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { BufferMemory } from "langchain/memory";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

export const createChain = async (
  vectorStore: any,
  streamingModel: BaseLanguageModel,
  nonStreamingModel: BaseLanguageModel
) => {
  const chain = ConversationalRetrievalQAChain.fromLLM(
    streamingModel,
    vectorStore.asRetriever(),
    {
      questionGeneratorTemplate: CONDENSE_TEMPLATE,
      qaTemplate: QA_TEMPLATE,
      returnSourceDocuments: true,
      // @ts-ignore
      // memory: new BufferMemory({
      //   memoryKey: "chat_history",
      //   inputKey: "question", // The key for the input to the chain
      //   outputKey: "text", // The key for the final conversational output of the chain
      //   returnMessages: true, // If using with a chat model
      // }),
      questionGeneratorChainOptions: {
        llm: nonStreamingModel ? nonStreamingModel : streamingModel,
        template: CONDENSE_TEMPLATE,
      },
    }
  );

  return chain;
};
