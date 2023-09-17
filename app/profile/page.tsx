import Image from "next/image";
import { SignIn } from "../actions";
import { getAuthSession } from "@/lib/auth";
import ProfileForm from "@/components/forms/profile-form";
import { Inter } from "next/font/google";
import CoolBlur from "@/components/CoolBlur";
import Sidebar from "@/components/Sidebar";

export const dynamic = "force-dynamic";

const inter = Inter({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export default async function Page() {
  const session = await getAuthSession();

  if (session) {
    return (
      <div className="h-full">
        <div className="flex h-full min-h-[100vh] flex-row">
          <Sidebar session={session?.user ? session : null} />
          <div className="grow pb-2 pr-2 pt-2">
            <div className="h-full bg-background bg-gradient-to-b from-amber-300/10 to-white bg-clip-border shadow-sm dark:from-orange-600/10 dark:to-black md:dark:border lg:rounded-lg">
              <ProfileForm session={session} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full">
      <div className="flex h-full min-h-[100vh] flex-row">
        <Sidebar />
        <div className="grow pb-2 pr-2 pt-2">
          <div className="h-full bg-background bg-gradient-to-b from-amber-300/10 to-white bg-clip-border shadow-sm dark:from-orange-600/10 dark:to-black md:dark:border lg:rounded-lg">
            <SignIn />
          </div>
        </div>
      </div>
    </div>
  );
}
