"use server";
import { db } from "@/lib/db";

export const searchCogs = async (query: string) => {
  const before = Date.now();

  // const cogs = await db.cog.findMany({
  //   select: {
  //     name: true,
  //     description: true,
  //     imgUrl: true,
  //     private: true,
  //     slug: true,
  //     user: {
  //       select: {
  //         username: true,
  //       },
  //     },
  //   },
  //   where: {
  //     private: false,
  //     name: {
  //       contains: query,
  //       mode: "insensitive",
  //     },
  //   },
  //   take: 5,
  // });

  const cogs = await db.$queryRaw`
   SELECT
       "cog"."name",
       "cog"."description",
       "cog"."imgUrl",
       "cog"."private",
       "cog"."slug",
       json_build_object(
         'username', "user"."username"
       ) AS "user"
   FROM
       "Cog" AS "cog"
   JOIN
       "User" AS "user" ON "cog"."userId" = "user"."id"
   WHERE
       "cog"."private" = false
       AND "cog"."name" ILIKE '%' || ${query} || '%'
   LIMIT 5;
`;

  const after = Date.now();

  console.log(after - before + "ms");

  return cogs;
};
