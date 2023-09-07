import { db } from "@/lib/prisma-edge";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { id } = await req.json();

  try {
    const cog = await db.cog.findUnique({
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
