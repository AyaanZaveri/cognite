import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { createEmbeddings } from "@/utils/embed";
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaVectorStore } from "langchain/vectorstores/prisma";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { Cog, Embeddings } from "@/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    // Not Signed in
    res.status(401).json({ error: "Unauthorized" });
    return; // This will stop further execution if the user is not authenticated
  }

  const { user, userId, name, description, slug, imgUrl, docs }: Cog =
    req.body.data;

  console.log("boiody", req.body.data);

  const cog = await prisma?.cog.create({
    data: {
      user,
      userId,
      name,
      description,
      slug,
      imgUrl,
    },
  });

  const embeddingsModel = new OpenAIEmbeddings(
    {
      openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
      stripNewLines: true,
      verbose: true,
    },
    {
      basePath: process.env.NEXT_PUBLIC_OPENAI_ENDPOINT,
    }
  );

  const vectorStore = PrismaVectorStore.withModel<any>(prisma!).create(
    embeddingsModel,
    {
      prisma: Prisma,
      tableName: "Embeddings",
      vectorColumnName: "embedding",
      columns: {
        id: PrismaVectorStore.IdColumn,
        content: PrismaVectorStore.ContentColumn,
      },
    }
  );

  if (docs) {
    await vectorStore.addModels(
      await prisma!.$transaction(
        docs.map((content) =>
          prisma!.embeddings.create({
            data: {
              content: content?.pageContent,
              cog_id: cog?.id,
            } as Embeddings,
          })
        )
      )
    );
  }

  res.status(200).json({
    cog,
  });
}

// Name: iOS 17
// Description: iOS 17 is the latest version of iOS
// Website: https://www.apple.com/ca/ios/ios-17-preview/
// Slug: ios17
// Image URL: https://upload.wikimedia.org/wikipedia/commons/9/96/IOS_17_logo.png
