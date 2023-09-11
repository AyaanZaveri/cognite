import { Prisma, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/prisma-edge";

export async function POST(req: Request) {
  const session = await getAuthSession();
  if (!session?.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { id, username, bio } = await req.json();

  try {
    const user = await db.user.update({
      where: {
        id: String(id),
      },
      data: {
        username: String(username),
        bio: String(bio),
      },
    });

    return NextResponse.json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: error,
    });
  }
}
