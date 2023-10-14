import { Cog, Embeddings } from "@/types";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PrismaVectorStore } from "langchain/vectorstores/prisma";
import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { HuggingFaceInferenceEmbeddings } from "langchain/embeddings/hf";

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

  console.log(name);

  if (!userId || !name || !slug || !docs) {
    return NextResponse.error();
  }

  const cog = await db?.cog
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
    // const embeddingsModel = new OpenAIEmbeddings(
    //   {
    //     openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    //     stripNewLines: true,
    //     verbose: true,
    //   },
    //   {
    //     basePath: process.env.NEXT_PUBLIC_OPENAI_ENDPOINT,
    //   }
    // );

    const embeddingsModel = new HuggingFaceInferenceEmbeddings({
      apiKey: process.env.NEXT_PUBLIC_HUGGINGFACEHUB_API_KEY,
      model: "BAAI/bge-small-en-v1.5",
    });

    console.log("Initalized Embeddings Model");

    const vectorStore = PrismaVectorStore.withModel<any>(db!).create(
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
        await db!.$transaction(
          docs.map((content) =>
            db!.embeddings.create({
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
    if (cog) {
      await db?.cog.delete({ where: { id: cog.id } });
      console.log("Deleted cog due to error");
    }

    console.log(error);
    return NextResponse.json({
      error: error,
    });
  }
}
