import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // you will be given an id, request the info for that id from the cog collection
  // return the info

  if (req.method === "GET") {
    try {
      const cog = await prisma.cog.findUnique({
        where: {
          id: Number(req.query.id) || undefined,
        },
      });
      return res.status(200).json({
        success: true,
        data: cog,
      });
    } catch (error) {
      let errorMessage = "An error occurred";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      return res.status(500).json({ error: errorMessage });
    }
  }
};

export default handler;
