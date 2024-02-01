"use client";

import { SignInSmaller } from "@/app/actions";
import { Session } from "next-auth";
import { Space_Grotesk } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { MapPin, PlusSquare, UserCircle } from "lucide-react";

const space_grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const Sidebar = ({ session }: { session?: Session | null }) => {
  return (
    <div className="z-50 hidden md:block">
      <div className="w-[220px] transition-all duration-300 ease-in-out">
        <div className="fixed z-20 h-full w-[220px] select-none">
          <Link
            href={`/`}
            className="absolute top-0 mx-3 my-4 rounded-lg ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            draggable={false}
          >
            <div className="group relative transition-all duration-1000 ease-in-out">
              <Image
                src="/fire_3d.png"
                alt={"Cognite Logo"}
                width={42}
                height={42}
                unoptimized={true}
                className="block transition-all duration-1000 ease-in-out group-hover:hidden"
                draggable={false}
              />
              <Image
                src="/fire_animated.png"
                alt={"Cognite Logo"}
                unoptimized={true}
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
              draggable={false}
              className="inline-flex w-full items-center gap-2 rounded-lg px-3 py-1.5 ring-offset-background duration-200 ease-in-out hover:cursor-pointer hover:gap-2.5 hover:bg-muted hover:tracking-wide hover:ring-1 hover:ring-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98]"
            >
              <PlusSquare className="h-5 w-5" />
              <span className={`${space_grotesk.className} font-medium`}>
                Create
              </span>
            </Link>

            <Link
              href={"/explore"}
              draggable={false}
              className="inline-flex w-full items-center gap-2 rounded-lg px-3 py-1.5 ring-offset-background duration-200 ease-in-out hover:cursor-pointer hover:gap-2.5 hover:bg-muted hover:tracking-wide hover:ring-1 hover:ring-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98]"
            >
              <MapPin className="h-5 w-5" />
              <span className={`${space_grotesk.className} font-medium`}>
                Explore
              </span>
            </Link>

            <Link
              href={"/me"}
              draggable={false}
              className="inline-flex w-full items-center gap-2 rounded-lg px-3 py-1.5 ring-offset-background duration-200 ease-in-out hover:cursor-pointer hover:gap-2.5 hover:bg-muted hover:tracking-wide hover:ring-1 hover:ring-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98]"
            >
              <UserCircle className="h-5 w-5" />
              <span className={`${space_grotesk.className} font-medium`}>
                Me
              </span>
            </Link>
          </div>
          <div className="absolute bottom-0 w-full px-2 py-3">
            {session ? (
              <Button
                variant={"outline"}
                className="w-full rounded-full border-none hover:border-input hover:bg-muted"
                asChild
              >
                <Link
                  href={`/profile`}
                  className="self-start bg-transparent py-7"
                >
                  <div className="flex w-full flex-row items-center gap-2 rounded-full">
                    <div className="relative h-9 w-9">
                      <Image
                        src={session?.user?.image as string}
                        alt="user"
                        className="rounded-full"
                        unoptimized={true}
                        fill={true}
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">
                        {"@" + session?.user?.username ?? session?.user?.email}
                      </span>
                      <span className={`text-xs text-muted-foreground`}>
                        Profile
                      </span>
                    </div>
                  </div>
                </Link>
              </Button>
            ) : (
              <div className="p-2">
                <SignInSmaller />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
