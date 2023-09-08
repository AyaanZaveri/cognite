import { db } from "@/lib/prisma-edge";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cogs = await db!.cog.findMany({
      include: {
        user: true,
        tags: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: cogs,
    });
  } catch (error) {
    let errorMessage = "An error occurred";
    console.error("Error happened here!", error);
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({
      error: errorMessage,
    });
  }
}
