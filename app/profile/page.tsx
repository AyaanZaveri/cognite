import Image from "next/image";
import { SignIn } from "../actions";
import { getAuthSession } from "@/lib/auth";
import ProfileForm from "@/components/ProfileForm";
import { Inter } from "next/font/google";

const inter = Inter({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export default async function Page() {
  const session = await getAuthSession();

  if (session) {
    return (
      <div
        className={`flex h-full w-full flex-col items-center justify-center gap-8 ${inter.className}`}
        style={{
          paddingLeft: 240,
        }}
      >
        <ProfileForm session={session} />
      </div>
    );
  }

  return (
    <div
      className="flex h-full w-full flex-col items-center justify-center gap-8"
      style={{
        paddingLeft: 240,
      }}
    >
      <SignIn />
    </div>
  );
}
