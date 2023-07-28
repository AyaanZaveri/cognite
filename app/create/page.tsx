import Create from "@/components/Cogs/Create";
import { authOptions, getAuthSession } from "@/lib/auth";
import { Space_Grotesk } from "next/font/google";
import React from "react";

const space_grotesk = Space_Grotesk({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const Page = async () => {
  const session = await getAuthSession();

  return (
    <div
className="p-0 md:pl-[240px]"
    >
      <div className="flex flex-col gap-4 px-8 py-10">
        <h1
          className={`${space_grotesk.className} animate-text select-none bg-gradient-to-r from-orange-500 via-amber-500 to-red-500 bg-clip-text pb-2 text-4xl font-semibold text-transparent`}
        >
          Create
        </h1>
        <Create session={session!} />
      </div>
    </div>
  );
};

export default Page;
