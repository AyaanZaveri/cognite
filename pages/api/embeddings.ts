// import { prisma } from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from "next";
import { addModels } from "@/lib/makeVector";

const embedding = async (req: NextApiRequest, res: NextApiResponse) => {
  const { docs } = req.body;

  return new Promise((resolve, reject) => {
    addModels(docs, "docusoar")
      .then((result) => {
        res.status(200).json(result);
        resolve(result);
      })
      .catch((err) => {
        res.status(500).json(err);
        reject(err);
      });
  });
};

export default embedding;
