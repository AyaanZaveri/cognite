import { NextApiRequest, NextApiResponse } from "next";
import { createEmbeddings } from "@/utils/embed";
import { createChain } from "@/utils/chain";

const embedding = async (req: NextApiRequest, res: NextApiResponse) => {
  const { model, docs } = req.body;

  const vectorStore = await createEmbeddings(docs);

  // const conversationalChain = await createChain(model, vectorStore);

  res.status(200).json({ vectorStore });
};

export default embedding;
