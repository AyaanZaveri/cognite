import { OpenAIEmbeddings } from "langchain/embeddings/openai";

export const createEmbeddings = async (docs: any) => {
  const embeddings = new OpenAIEmbeddings(
    {
      openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
      stripNewLines: true,
      verbose: true,
    },
    {
      basePath: process.env.NEXT_PUBLIC_OPENAI_ENDPOINT,
    }
  );

  const documentRes = await embeddings.embedDocuments(docs);

  return documentRes;
};
