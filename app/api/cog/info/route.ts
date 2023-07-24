import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { id } = await req.json();

  try {
    const cog = await prisma.cog.findUnique({
      where: {
        id: String(id) || undefined,
      },
      include: {
        user: true,
      },
    });

    console.log("Cogoola", cog)

    return NextResponse.json({
      success: true,
      data: cog,
    });
  } catch (error) {
    let errorMessage = "An error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({
      error: errorMessage,
    });
  }
}
