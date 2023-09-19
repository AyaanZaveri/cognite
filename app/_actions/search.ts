"use server";
import { db } from "@/lib/db";

export const searchCogs = async (query: string) => {
  const cogs = await db.cog.findMany({
    select: {
      name: true,
      description: true,
      imgUrl: true,
      private: true,
      slug: true,
      user: {
        select: {
          username: true,
        },
      },
    },
    where: {
      private: false,
      name: {
        contains: query,
        mode: "insensitive",
      },
    },
    orderBy: {
      createdDate: "desc",
    },
  });

  console.log(cogs);

  return cogs;
};
