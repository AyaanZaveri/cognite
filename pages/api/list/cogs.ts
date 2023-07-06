import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { connectToMongoDB } from "@/lib/mongodb";
import Cog from "@/models/Cog";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  connectToMongoDB().catch((err: Error) => res.json(err));

  if (req.method === "GET") {
    Cog.find()
      .then((data) => {
        return res.status(200).json({
          success: true,
          data,
        });
      })
      .catch((error: Error) => {
        if (error && error instanceof mongoose.Error.ValidationError) {
          //mongo db will return array
          // but we only want to show one error at a time

          for (let field in error.errors) {
            const msg = error.errors[field].message;
            return res.status(409).json({ error: msg });
          }
        }
      });
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
};

export default handler;
