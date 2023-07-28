import { Cog, Embeddings } from "@/types";
import { Prisma } from "@prisma/client";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PrismaVectorStore } from "langchain/vectorstores/prisma";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const { data } = await req.json();

  const { userId, name, description, slug, imgUrl, docs }: Cog = data;

  const cog = await prisma?.cog
    .create({
      data: {
        userId,
        name,
        description,
        slug,
        imgUrl,
      },
    })
    .catch((err) => {
      console.log("Create Error", err, "Done!");
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

  return NextResponse.json({
    success: true,
    cog,
  });
}
