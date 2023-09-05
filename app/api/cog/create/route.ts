import { Cog, Embeddings } from "@/types";
import { Prisma, PrismaClient } from "@prisma/client";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PrismaVectorStore } from "langchain/vectorstores/prisma";
import { NextResponse } from "next/server";
import { withAccelerate } from "@prisma/extension-accelerate";
import { getAuthSession } from "@/lib/auth";

const prismaWithAccelerate = new PrismaClient().$extends(withAccelerate());

export async function POST(req: Request) {
  const session = await getAuthSession();

  if (!session?.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { data } = await req.json();

  const {
    userId,
    name,
    description,
    slug,
    imgUrl,
    docs,
    tags,
    isPrivate,
  }: Cog = data;

  if (!userId || !name || !slug || !docs) {
    return NextResponse.error();
  }

  const cog = await prismaWithAccelerate?.cog
    .create({
      data: {
        userId,
        name,
        description,
        slug,
        imgUrl,
        tags: {
          connectOrCreate: tags.map((tag: string) => ({
            where: { name: tag },
            create: { name: tag },
          })),
        },
        private: isPrivate,
      },
    })
    .catch((err: Error) => {
      console.log("Create Error", err, "Done!");
    });

  try {
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

    console.log("Initalized Embeddings Model");

    const vectorStore = PrismaVectorStore.withModel<any>(
      prismaWithAccelerate!
    ).create(embeddingsModel, {
      prisma: Prisma,
      tableName: "Embeddings",
      vectorColumnName: "embedding",
      columns: {
        id: PrismaVectorStore.IdColumn,
        content: PrismaVectorStore.ContentColumn,
      },
    });

    console.log("Initalized Vector Store");

    if (docs) {
      await vectorStore.addModels(
        await prismaWithAccelerate!.$transaction(
          docs.map((content) =>
            prismaWithAccelerate!.embeddings.create({
              data: {
                content: content?.pageContent,
                cog_id: cog?.id,
              } as Embeddings,
            })
          )
        )
      );
    }

    console.log("Added Models");

    return NextResponse.json({
      success: true,
      cog,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: error,
    });
  }
}
