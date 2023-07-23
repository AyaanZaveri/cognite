import Image from "next/image";
import { SignIn, SignOut } from "../actions";
import { getAuthSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
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
        <h1 className="mt-12">Protected</h1>
        <p>
          This page is protected. You can view this page because you are signed
          up.
        </p>

        <ProfileForm session={session} />

        <div className="flex flex-col gap-5">
          <div className="flex flex-row items-center justify-center gap-3">
            <Image
              src={session.user?.image as string}
              className="rounded-full"
              width={44}
              height={44}
              alt=""
            />
            <span>
              Signed in as <p className="font-semibold">{session.user?.name}</p>
            </span>
          </div>
        </div>
        <SignOut />
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
      <h1 className="mt-12">Protected</h1>
      <p>You need to be signed in to view this page.</p>
      <SignIn />
    </div>
  );
}
