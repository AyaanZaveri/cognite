import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const cogs = await prisma!.cog.findMany({
        include: {
          user: true,
        },
      });
      return res.status(200).json({
        success: true,
        data: cogs,
      });
    } catch (error) {
      let errorMessage = "An error occurred";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      return res.status(500).json({ error: errorMessage });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
};

export default handler;
