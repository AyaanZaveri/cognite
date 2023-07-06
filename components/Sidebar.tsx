"use client";

import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";

const Sidebar = ({ session }: { session: Session | null }) => {
  console.log(session);

  return (
    <div
      className={`h-full z-20 fixed select-none bg-zinc-50 w-[240px] border-r border-zinc-200`}
    >
      <span className="text-4xl p-3 top-0 absolute">🔥</span>
      {/* show the user image and username at the bottom */}
      <div className="bottom-0 absolute py-3 px-2 w-full">
        {session ? (
          <Link href={`/profile`}>
            <div className="gap-8 h-full p-2 px-3 hover:bg-zinc-100 hover:ring-1 hover:ring-zinc-200 w-full rounded-full transition-all duration-200 ease-in-out active:scale-[0.98] hover:cursor-pointer">
              <div className="flex flex-row gap-2 items-center w-full rounded-full">
                <div className="w-9 h-9 relative">
                  <Image
                    src={session?.user?.image as string}
                    alt="user"
                    className="rounded-full"
                    fill={true}
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">
                    {session?.user?.name ?? session?.user?.email}
                  </span>
                  <span className={`text-xs text-zinc-500`}>Profile</span>
                </div>
              </div>
            </div>
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default Sidebar;
