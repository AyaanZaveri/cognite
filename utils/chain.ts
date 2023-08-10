import { PromptTemplate } from "langchain";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import { BaseLanguageModel } from "langchain/dist/base_language";
import { BufferMemory } from "langchain/memory";

export const createChain = async (
  vectorStore: any,
  streamingModel: BaseLanguageModel,
  nonStreamingModel: BaseLanguageModel
) => {
  const chain = ConversationalRetrievalQAChain.fromLLM(
    streamingModel,
    vectorStore.asRetriever()
    // {
    //   qaChainOptions: {
    //     type: "stuff",
    //   },
    //   questionGeneratorChainOptions: {
    //     llm: nonStreamingModel,
    //   },
    //   returnSourceDocuments: true,
    //   memory: new BufferMemory({
    //     memoryKey: "chat_history",
    //     inputKey: "question", // The key for the input to the chain
    //     outputKey: "text", // The key for the final conversational output of the chain
    //     returnMessages: true, // If using with a chat model
    //   }),
    // }
  );

  return chain;
};
