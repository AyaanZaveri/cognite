import { Cog, Embeddings } from "@/types";
import { Prisma } from "@prisma/client";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PrismaVectorStore } from "langchain/vectorstores/prisma";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface Tag {
  name: string;
}

export async function POST(req: Request) {
  const { data } = await req.json();

  const { userId, name, description, slug, imgUrl, docs, tags }: Cog = data;

  console.log(data);

  const cog = await prisma?.cog
    .create({
      data: {
        userId,
        name,
        description,
        slug,
        imgUrl,
        tags: {
          connectOrCreate: tags.map((tag: Tag) => ({
            where: { name: tag.name },
            create: { name: tag.name },
          })),
        },
      },
    })
    .catch((err) => {
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

    console.log("Initalized Vector Store");

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
