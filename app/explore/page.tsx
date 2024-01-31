import Sidebar from "@/components/Sidebar";
import { ToastDemo } from "@/components/ToastButton";
import { getAuthSession } from "@/lib/auth";
import React from "react";

const Page = async () => {
  const session = await getAuthSession();

  return (
    <div className="h-full">
      <div className="flex h-full min-h-[100vh] flex-row">
        <Sidebar session={session?.user ? session : null} />
        <div className="grow lg:pb-2 lg:pr-2 lg:pt-2">
          <div className="h-full bg-background bg-gradient-to-b bg-clip-border shadow-sm dark:from-orange-600/10 dark:to-black md:dark:border lg:rounded-lg">
            Work in progress 🔨
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
