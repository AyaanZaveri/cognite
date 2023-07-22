import Image from "next/image";
import { SignIn, SignOut } from "../actions";
import { getAuthSession } from "@/lib/auth";

export default async function Page() {
  const session = await getAuthSession()

  if (session) {
    return (
      <div
        className="flex flex-col w-full items-center justify-center gap-8 h-full"
        style={{
          paddingLeft: 240,
        }}
      >
        <h1 className="mt-12">Protected</h1>
        <p>
          This page is protected. You can view this page because you are signed
          up.
        </p>

        <div className="flex flex-col gap-5">
          <div className="flex flex-row gap-3 items-center justify-center">
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
      className="flex flex-col w-full items-center justify-center gap-8 h-full"
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
