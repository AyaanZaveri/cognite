import Create from "@/components/Cogs/Create";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Cogs } from "@/types";
import { Session, getServerSession } from "next-auth";
import { headers } from "next/dist/client/components/headers";
import { Space_Grotesk } from "next/font/google";
import React from "react";

const space_grotesk = Space_Grotesk({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const Page = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div
      style={{
        paddingLeft: 240,
      }}
    >
      <div className="flex flex-col gap-6 px-8 py-10">
        <div className="flex flex-col">
          <h1
            className={`${space_grotesk.className} animate-text select-none bg-gradient-to-r from-orange-500 via-amber-500 to-red-500 bg-clip-text pb-2 text-4xl font-semibold text-transparent`}
          >
            Create
          </h1>
          <span className="ml-0.5 text-sm text-zinc-500">
            Create your own Cog and share it with the world.
          </span>
        </div>
        <Create session={session!} />
      </div>
    </div>
  );
};

export default Page;
