import CoolBlur from "@/components/CoolBlur";
import Logo from "@/components/Logo";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

export default function Loading() {
  return (
    <div className="h-screen overflow-hidden pb-2 pr-2 pt-2 md:ml-[220px]">
      <div className="scrollbar-hide h-full bg-background bg-gradient-to-b bg-clip-border shadow-sm dark:from-orange-600/10 dark:to-black md:dark:border lg:rounded-lg">
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
  );
}
