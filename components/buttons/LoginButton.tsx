"use client";

import { signIn } from "next-auth/react";

import type { ClientSafeProvider } from "next-auth/react";

export default function LoginButton({ auth }: { auth?: ClientSafeProvider }) {
  return (
    <button
      type="button"
      className="flex justify-center items-center bg-zinc-50 text-zinc-800 w-full py-3 rounded-md text-center font-semibold hover:bg-zinc-100 transition-all duration-300 ease-in-out active:scale-[0.98]"
      onClick={() => signIn(auth?.id || "")}
    >
      {auth ? `Sign In with ${auth.name}` : "Login"}
    </button>
  );
}
