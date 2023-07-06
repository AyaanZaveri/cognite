"use client";

import { signIn, signOut } from "next-auth/react";
import { GitHubIcon } from "@/components/icons/GitHub";

export function SignOut() {
  return (
    <button
      className="flex justify-center items-center bg-zinc-50 text-zinc-800 px-4 py-3 rounded-md text-center font-semibold text-sm hover:bg-zinc-100 transition-all ring-1 duration-200 ring-zinc-200 hover:ring-zinc-300 active:scale-[0.98] shadow-sm"
      onClick={() => signOut()}
    >
      Sign out
    </button>
  );
}

export function SignIn({ label = "Sign in" }: { label?: string }) {
  return (
    <button
      className="flex justify-center items-center bg-zinc-50 text-zinc-800 px-4 py-3 rounded-md text-center font-semibold text-sm hover:bg-zinc-100 transition-all ring-1 duration-200 ring-zinc-200 hover:ring-zinc-300 active:scale-[0.98] shadow-sm"
      onClick={() => signIn("github")}
    >
      <GitHubIcon />
      <div className="ml-3">{label}</div>
    </button>
  );
}

export function SignInSmaller({ label = "Sign in" }: { label?: string }) {
  return (
    <button
      className="flex justify-center items-center bg-zinc-50 text-zinc-800 px-3 py-2 self-end rounded-md text-center font-semibold text-sm hover:bg-zinc-200/50 transition-all border duration-200 border-zinc-300/60 hover:border-zinc-500/60 shadow-sm"
      onClick={() => signIn("github")}
    >
      <GitHubIcon />
      <div className="ml-3">{label}</div>
    </button>
  );
}
