import { createChain } from "./chain";
import { createEmbeddings } from "./embed";
import { getTextChunks } from "./getChunks";

export const getConversationChain = async (
  setGettingCog: any,
  model: any,
  cogs: any,
  cogId: number
) => {
  setGettingCog(cogId);

  const docs = await getTextChunks(cogs, cogId);

  const vectorStore: any = await createEmbeddings(docs);

  const conversationalChain = await createChain(model, vectorStore);

  setGettingCog(null);

  return conversationalChain;
};
