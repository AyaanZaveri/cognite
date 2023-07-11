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

async function createCog(cogData: Cogs) {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/cog/create`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(cogData),
    });

    if (!res.ok) {
      throw new Error("Network response was not ok: " + res.statusText);
    }

    const response = await res.json();
    console.log(response);
  } catch (error) {
    console.error("Error:", error);
  }
}

const Page = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div
      style={{
        paddingLeft: 240,
      }}
    >
      <div className="p-8 flex flex-col gap-3">
        <h1
          className={`${space_grotesk.className} select-none text-4xl font-semibold pb-2 animate-text bg-gradient-to-r from-orange-500 via-amber-500 to-red-500 bg-clip-text text-transparent`}
        >
          Create
        </h1>
        <Create session={session!} />
      </div>
    </div>
  );
};

export default Page;
