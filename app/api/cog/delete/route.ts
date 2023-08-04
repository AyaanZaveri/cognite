import { getAuthSession } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
) {
  try {
    const currentUser = await getAuthSession();

    if (!currentUser) {
      return new Response("Not authenticated", {
        status: 401,
      });
    }

    const { id } = await req.json();

    console.log(id);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
