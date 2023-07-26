import {SignInSmaller } from "@/app/actions";
import { Session } from "next-auth";
import { Space_Grotesk } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { TbSquareRoundedPlus, TbTelescope, TbUserCircle } from "react-icons/tb";

const space_grotesk = Space_Grotesk({
  subsets: ["latin"],
});

const Sidebar = ({ session }: { session: Session | null }) => {
  return (
    <div
      className={`fixed z-20 h-full w-[240px] select-none border-r border-zinc-200 bg-zinc-50`}
    >
      <Link href={`/`} className="absolute top-0 mx-3 my-4">
        <div className="group relative transition-all duration-1000 ease-in-out">
          <Image
            src="/fire_3d.png"
            alt={"Cognition Logo"}
            width={42}
            height={42}
            className="block transition-all duration-1000 ease-in-out group-hover:hidden"
            draggable={false}
          />
          <Image
            src="/fire_animated.png"
            alt={"Cognition Logo"}
            width={42}
            height={42}
            className="hidden transition-all duration-1000 ease-in-out group-hover:block"
            draggable={false}
          />
        </div>
      </Link>
      <div
        className={`mt-8 flex flex-col items-center justify-center gap-1 px-2 pt-16`}
      >
        <Link
          href={"/create"}
          className="inline-flex w-full items-center gap-2 rounded-lg px-3 py-1.5 transition-all duration-200 ease-in-out hover:cursor-pointer hover:gap-2.5 hover:bg-zinc-100 hover:ring-1 hover:ring-zinc-200 active:scale-[0.98]"
        >
          <TbSquareRoundedPlus className="h-5 w-5" />
          <span className={`${space_grotesk.className} font-medium`}>
            Create
          </span>
        </Link>

        <Link
          href={"/explore"}
          className="inline-flex w-full items-center gap-2 rounded-lg px-3 py-1.5 transition-all duration-200 ease-in-out hover:cursor-pointer hover:gap-2.5 hover:bg-zinc-100 hover:ring-1 hover:ring-zinc-200 active:scale-[0.98]"
        >
          <TbTelescope className="h-5 w-5" />
          <span className={`${space_grotesk.className} font-medium`}>
            Explore
          </span>
        </Link>

        <Link
          href={"/me"}
          className="inline-flex w-full items-center gap-2 rounded-lg px-3 py-1.5 transition-all duration-200 ease-in-out hover:cursor-pointer hover:gap-2.5 hover:bg-zinc-100 hover:ring-1 hover:ring-zinc-200 active:scale-[0.98]"
        >
          <TbUserCircle className="h-5 w-5" />
          <span className={`${space_grotesk.className} font-medium`}>
            Me
          </span>
        </Link>
      </div>
      <div className="absolute bottom-0 w-full px-2 py-3">
        {session ? (
          <Link href={`/profile`}>
            <div className="h-full w-full gap-8 rounded-full p-2 px-3 transition-all duration-200 ease-in-out hover:cursor-pointer hover:bg-zinc-100 hover:ring-1 hover:ring-zinc-200 active:scale-[0.98]">
              <div className="flex w-full flex-row items-center gap-2 rounded-full">
                <div className="relative h-9 w-9">
                  <Image
                    src={session?.user?.image as string}
                    alt="user"
                    className="rounded-full"
                    fill={true}
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">
                    {"@" + session?.user?.username ?? session?.user?.email}
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
