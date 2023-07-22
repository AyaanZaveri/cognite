"use client";

import { signIn } from "next-auth/react";

import type { ClientSafeProvider } from "next-auth/react";

export default function LoginButton({ auth }: { auth?: ClientSafeProvider }) {
  return (
    <button
      type="button"
      className="flex w-full items-center justify-center rounded-md bg-zinc-50 py-3 text-center font-semibold text-zinc-800 transition-all duration-300 ease-in-out hover:bg-zinc-100 active:scale-[0.98]"
      onClick={() =>
        signIn(auth?.id)
      }
    >
      {auth ? `Sign In with ${auth.name}` : "Login"}
    </button>
  );
}
