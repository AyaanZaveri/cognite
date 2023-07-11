import { PrismaClient, Prisma } from "@prisma/client";
import { createEmbeddings } from "@/utils/embed";
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaVectorStore } from "langchain/vectorstores/prisma";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

interface Document {
  pageContent: string;
  metadata: Record<string, any>;
}

interface Cog {
  id: number;
  user: string;
  userId: number;
  name: string;
  description: string;
  createdDate: Date;
  type: string;
  slug: string;
  imgUrl: string;
  content: string;
  embeddings: string;
  docs: Document[];
}

interface Embeddings {
  id: number;
  content: string;
  content_title: string;
  content_url: string;
  content_tokens: number;
  cog_id: number;
}

const db = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({
      error: "Unauthorized",
    });
  }

  const { user, userId, name, description, type, slug, imgUrl, docs }: Cog =
    req.body;

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

  const embeddings = await vectorStore.addModels(
    await db.$transaction(
      docs.map((content) =>
        db.embeddings.create({
          data: {
            content: content.pageContent,
            content_title: "hello",
            content_url: "yep",
            content_tokens: 0,
            cog_id: cog?.id,
          } as Embeddings,
        })
      )
    )
  );

  res.status(200).json({ cog: cog, embeddings: embeddings });

  res.end();
}
