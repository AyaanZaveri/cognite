import Create from "@/components/forms/create-form";
import CoolBlur from "@/components/CoolBlur";
import { authOptions, getAuthSession } from "@/lib/auth";
import { Rubik, Space_Grotesk } from "next/font/google";
import React from "react";
import { getUserSubscriptionPlan } from "@/lib/subscription";
import { SubscriptionPlan } from "@/types";
import Sidebar from "@/components/Sidebar";
import { TbSquareRoundedPlus } from "react-icons/tb";
import { PlusSquare } from "lucide-react";

export const dynamic = "force-dynamic";

const space_grotesk = Space_Grotesk({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const rubik = Rubik({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const Page = async () => {
  const session = await getAuthSession();
  const subscriptionPlan = await getUserSubscriptionPlan(
    session?.user.id as string
  );

  return (
    <div className="h-full">
      <div className="flex h-full min-h-[100vh] flex-row">
        <Sidebar session={session?.user ? session : null} />
        <div className="grow lg:pb-2 lg:pr-2 lg:pt-2">
          <div className="h-full bg-background bg-gradient-to-b bg-clip-border shadow-sm dark:from-orange-600/10 dark:to-black md:dark:border lg:rounded-lg">
            <div className="flex flex-col gap-4 px-8 py-8">
              <div className="flex flex-col gap-1">
                <h1
                  className={`${space_grotesk.className} animate-text inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 via-amber-500 to-red-500 bg-clip-text text-4xl font-semibold text-transparent`}
                >
                  <PlusSquare className="h-8 w-8 text-primary" />
                  Create
                </h1>
                <span
                  className={`${rubik.className} text-secondary-foreground`}
                >
                  {"Let's create something new!"}
                </span>
              </div>
              <Create
                session={session}
                subscriptionPlan={subscriptionPlan as SubscriptionPlan}
              />
            </div>
          </div>
        </div>
        {/* <span>Hello</span> */}
      </div>
    </div>
  );
};

export default Page;
