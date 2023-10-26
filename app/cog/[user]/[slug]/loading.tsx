import CoolBlur from "@/components/CoolBlur";
import Logo from "@/components/Logo";
import Sidebar from "@/components/Sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { getAuthSession } from "@/lib/auth";
import Link from "next/link";

export default async function Loading() {
  const session = await getAuthSession();

  return (
    <div className="h-full">
      <div className="flex h-full min-h-[100vh] flex-row">
        <Sidebar session={session?.user ? session : null} />
        <div className="grow lg:pb-2 lg:pr-2 lg:pt-2">
          <div className="h-full bg-background bg-gradient-to-b from-amber-300/10 to-white bg-clip-border shadow-sm dark:from-orange-600/10 dark:to-black md:border lg:rounded-lg">
            <div className="p-5">
              <Link href={"/"}>
                <Logo size="3xl" />
              </Link>
            </div>
            <div className="flex flex-col items-center justify-center gap-6 p-5">
              <Skeleton className="animate-pulse-[3s] h-28 w-28 rounded-lg" />
              <div className="flex w-full flex-col items-center gap-4">
                <Skeleton className={`h-10 w-3/4`} />
                <div className="flex w-full flex-col items-center">
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="mt-4 h-4 w-36" />
                </div>
              </div>
            </div>
            <div className="fixed bottom-6 w-full">
              <div className="flex w-full flex-row gap-3 px-8">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-44 md:mr-[220px]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
