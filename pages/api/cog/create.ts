import { PrismaClient, Prisma } from "@prisma/client";
import { createEmbeddings } from "@/utils/embed";
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaVectorStore } from "langchain/vectorstores/prisma";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { Cog, Embeddings } from "@/types";

const db = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  console.log("session", session);

  if (!session) {
    // Not Signed in
    res.status(401).json({ error: "Unauthorized" });
    return; // This will stop further execution if the user is not authenticated
  }

  const { user, userId, name, description, type, slug, imgUrl, docs }: Cog =
    req.body;

  console.log("Working on Cog");

  const cog = await db?.cog.create({
    data: {
      user,
      userId,
      name,
      description,
      type,
      slug,
      imgUrl,
    },
  });

  console.log("Created Cog");

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

  console.log("Create Embeddings Model");

  const vectorStore = PrismaVectorStore.withModel<any>(db).create(
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

  console.log("Created Vector Store");

  const addEmbeddings = async (docs: any[]) => {
    await vectorStore.addModels(
      await db.$transaction(
        docs.map((content) =>
          db.embeddings.create({
            data: {
              content: content.pageContent,
              content_title: "title",
              content_url: "url",
              content_tokens: 200,
              cog_id: cog?.id,
            } as Embeddings,
          })
        )
      )
    );
  };

  console.log("Add Embeddings");

  await addEmbeddings(docs);

  console.log("Added Embeddings");

  res.status(200).json({
    cog,
  });
}

// Name: iOS 17
// Description: iOS 17 is the latest version of iOS
// Website: https://www.apple.com/ca/ios/ios-17-preview/
// Slug: ios17
// Image URL: https://upload.wikimedia.org/wikipedia/commons/9/96/IOS_17_logo.png
