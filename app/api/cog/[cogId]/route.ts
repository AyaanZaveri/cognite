import { getAuthSession } from "@/lib/auth";
import * as z from "zod";
import { NextResponse } from "next/server";
import { db } from "@/lib/prisma-edge";

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

    await db.embeddings.deleteMany({
      where: {
        cog_id: params.cogId as string,
      },
    });

    // Delete the cog.
    await db.cog.delete({
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
  const count = await db.cog.count({
    where: {
      id: cogId,
      userId: session?.user.id,
    },
  });

  console.log("count", count);

  return count > 0;
}
