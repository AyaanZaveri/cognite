import Image from "next/image";
import { SignIn } from "../actions";
import { getAuthSession } from "@/lib/auth";
import ProfileForm from "@/components/forms/profile-form";
import { Inter } from "next/font/google";
import CoolBlur from "@/components/CoolBlur";

export const dynamic = "force-dynamic";

const inter = Inter({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export default async function Page() {
  const session = await getAuthSession();

  if (session) {
    return (
      <div
        className={`flex h-full w-full flex-col items-center justify-center gap-8 ${inter.className} p-0 md:pl-[240px]`}
      >
        <ProfileForm session={session} />
      </div>
    );
  }

  return (
    <div
      className="flex h-full w-full flex-col items-center justify-center gap-8 p-0 md:pl-[240px]"
      style={{
        paddingLeft: 240,
      }}
    >
      <CoolBlur />
      <SignIn />
    </div>
  );
}
