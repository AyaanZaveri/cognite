"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function Protected() {
  const { data: session } = useSession();

  const buttonClass =
    "px-8 py-2 hover:ring-zinc-200 hover:bg-zinc-100 text-zinc-800 hover:scale-105 transition-all duration-300 ease-in-out rounded-lg bg-zinc-50 ring-1 ring-zinc-100 active:bg-zinc-200 active:ring-zinc-200";

  console.log(session);

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

          <button onClick={() => signOut()} className={buttonClass}>
            Sign out
          </button>
        </div>
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
      <button onClick={() => signIn()} className={buttonClass}>
        Sign in
      </button>
    </div>
  );
}
