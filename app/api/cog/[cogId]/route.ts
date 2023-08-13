import { getAuthSession } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import * as z from "zod";
import prisma from "@/lib/prisma-edge";
import { NextResponse } from "next/server";

const routeContextSchema = z.object({
  params: z.object({
    cogId: z.string(),
  }),
});

export async function DELETE(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate the route params.
    const { params } = routeContextSchema.parse(context);

    // Check if the user has access to this cog.
    if (!(await verifyCurrentUserHasAccessToCog(params.cogId))) {
      return NextResponse.json(null, {
        status: 403,
      });
    }

    await prisma.embeddings.deleteMany({
      where: {
        cog_id: params.cogId as string,
      },
    });

    // Delete the cog.
    await prisma.cog.delete({
      where: {
        id: params.cogId as string,
      },
    });

    return NextResponse.json(null, {
      status: 200,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log("error", error);

      return NextResponse.json(error.issues, {
        status: 422,
      });
    }

    return NextResponse.json(null, {
      status: 500,
    });
  }
}
async function verifyCurrentUserHasAccessToCog(cogId: string) {
  const session = await getAuthSession();
  const count = await prisma.cog.count({
    where: {
      id: cogId,
      userId: session?.user.id,
    },
  });

  console.log("count", count);

  return count > 0;
}
