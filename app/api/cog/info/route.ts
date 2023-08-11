import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import { NextResponse } from "next/server";

const prismaWithAccelerate = new PrismaClient().$extends(withAccelerate());

export async function POST(req: Request) {
  const { id } = await req.json();

  try {
    const cog = await prismaWithAccelerate.cog.findUnique({
      where: {
        id: String(id) || undefined,
      },
      include: {
        user: true,
      },
    });

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
