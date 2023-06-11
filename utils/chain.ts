import { CONDENSE_TEMPLATE, QA_TEMPLATE } from "@/lib/prompts";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import { BaseLanguageModel } from "langchain/dist/base_language";
import { VectorStore } from "langchain/dist/vectorstores/base";

export const createChain = async (
  model: BaseLanguageModel,
  vectorStore: VectorStore
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
