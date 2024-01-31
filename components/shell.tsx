import * as React from "react";

import { cn } from "@/lib/utils";
import { getAuthSession } from "@/lib/auth";
import Sidebar from "./Sidebar";
import { Session } from "next-auth";

interface ShellProps extends React.HTMLAttributes<HTMLDivElement> {
  session: Session;
}

export function Shell({ children, className, session, ...props }: ShellProps) {
  return (
    <div className={cn("h-full", className)} {...props}>
      <div className="flex h-full min-h-[100vh] flex-row">
        <Sidebar session={session?.user ? session : null} />
        <div className="grow lg:pb-2 lg:pr-2 lg:pt-2">
          <div className="h-full bg-background bg-gradient-to-b bg-clip-border shadow-sm dark:from-orange-600/10 dark:to-black md:dark:border lg:rounded-lg"></div>
          {children}
        </div>
      </div>
    </div>
  );
}
