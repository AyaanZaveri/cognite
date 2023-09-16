import Create from "@/components/forms/create-form";
import CoolBlur from "@/components/CoolBlur";
import { authOptions, getAuthSession } from "@/lib/auth";
import { Space_Grotesk } from "next/font/google";
import React from "react";
import { getUserSubscriptionPlan } from "@/lib/subscription";
import { SubscriptionPlan } from "@/types";

export const dynamic = "force-dynamic";

const space_grotesk = Space_Grotesk({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const Page = async () => {
  const session = await getAuthSession();
  const subscriptionPlan = await getUserSubscriptionPlan(
    session?.user.id as string
  );

  return (
    <div className="h-screen overflow-hidden pb-2 pr-2 pt-2 md:ml-[220px]">
      <div className="scrollbar-hide h-full bg-background bg-gradient-to-b bg-clip-border shadow-sm dark:from-orange-600/10 dark:to-black md:dark:border lg:rounded-lg">
        <div className="flex flex-col gap-4 px-8 py-10">
          <h1
            className={`${space_grotesk.className} animate-text bg-gradient-to-r from-orange-500 via-amber-500 to-red-500 bg-clip-text pb-2 text-4xl font-semibold text-transparent`}
          >
            Create
          </h1>
          <Create
            session={session}
            subscriptionPlan={subscriptionPlan as SubscriptionPlan}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
