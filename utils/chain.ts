import { CONDENSE_TEMPLATE, QA_TEMPLATE } from "@/lib/prompts";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import { BaseLanguageModel } from "langchain/dist/base_language";
import { Document } from "langchain/dist/document";
import { VectorStore } from "langchain/dist/vectorstores/base";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

export const createChain = async (
  vectorStore: any,
  model: BaseLanguageModel
) => {
  const conversationalChain = ConversationalRetrievalQAChain.fromLLM(
    model,
    vectorStore.asRetriever(),
    {
      questionGeneratorTemplate: CONDENSE_TEMPLATE,
      qaTemplate: QA_TEMPLATE,
    }
  );

  return conversationalChain;
};
