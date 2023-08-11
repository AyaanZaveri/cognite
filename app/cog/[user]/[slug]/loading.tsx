import CoolBlur from "@/components/CoolBlur";
import Logo from "@/components/Logo";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

export default function Loading() {
  return (
    <div className="p-0 md:pl-[240px]">
      <CoolBlur />
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
          <Skeleton className="h-12 w-44 md:mr-[240px]" />
        </div>
      </div>
    </div>
  );
}
