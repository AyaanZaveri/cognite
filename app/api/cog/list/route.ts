import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const cogs = await prisma!.cog.findMany({
      include: {
        user: true,
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
