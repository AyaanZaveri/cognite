import { Prisma, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { withAccelerate } from "@prisma/extension-accelerate";

const prismaWithAccelerate = new PrismaClient().$extends(withAccelerate());

export async function POST(req: Request) {
  const session = await getAuthSession();
  if (!session?.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { id, username, bio } = await req.json();

  try {
    const user = await prismaWithAccelerate.user.update({
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
