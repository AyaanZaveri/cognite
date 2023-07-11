"use client";

import { SignIn, SignInSmaller } from "@/app/actions";
import { Session } from "next-auth";
import { Space_Grotesk } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { TbSquareRoundedPlus, TbTelescope } from "react-icons/tb";

const space_grotesk = Space_Grotesk({
  subsets: ["latin"],
});

const Sidebar = ({ session }: { session: Session | null }) => {

  console.log("session", session)

  return (
    <div
      className={`h-full z-20 fixed select-none bg-zinc-50 w-[240px] border-r border-zinc-200`}
    >
      <Link
        href={`/`}
        className="text-4xl mx-3 my-4 top-0 absolute hover:opacity-80 transition-all duration-300"
      >
        🔥
      </Link>
      <div
        className={`flex flex-col gap-1 items-center justify-center pt-16 px-2 mt-8`}
      >
        <div className="w-full px-3 py-1.5 rounded-lg inline-flex gap-2 hover:gap-2.5 items-center hover:cursor-pointer hover:bg-zinc-100 hover:ring-1 hover:ring-zinc-200 active:scale-[0.98] transition-all duration-200 ease-in-out">
          <TbTelescope className="w-5 h-5" />
          <span className={`${space_grotesk.className} font-medium`}>
            Explore
          </span>
        </div>

        <div className="w-full px-3 py-1.5 rounded-lg inline-flex gap-2 hover:gap-2.5 items-center hover:cursor-pointer hover:bg-zinc-100 hover:ring-1 hover:ring-zinc-200 active:scale-[0.98] transition-all duration-200 ease-in-out">
          <TbSquareRoundedPlus className="w-5 h-5" />
          <span className={`${space_grotesk.className} font-medium`}>
            Create
          </span>
        </div>
      </div>
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
        ) : (
          <div className="p-2">
            <SignInSmaller />
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
