"use client";

import { signIn, signOut } from "next-auth/react";

export function SignOut() {
  return (
    <button
      className="flex justify-center items-center bg-zinc-50 text-zinc-800 px-8 py-3 rounded-md text-center font-semibold text-sm hover:bg-zinc-100 transition-all ring-1 duration-200 ring-zinc-200 hover:ring-zinc-300 active:scale-[0.98] shadow-sm"
      onClick={() => signOut()}
    >
      Sign out
    </button>
  );
}

export function SignIn({ label = "Sign in" }: { label?: string }) {
  return (
    <button
      className="flex justify-center items-center bg-zinc-50 text-zinc-800 px-8 py-3 rounded-md text-center font-semibold text-sm hover:bg-zinc-100 transition-all ring-1 duration-200 ring-zinc-200 hover:ring-zinc-300 active:scale-[0.98] shadow-sm"
      onClick={() => signIn()}
    >
      <div>{label}</div>
    </button>
  );
}

export function SignInSmaller({ label = "Sign in" }: { label?: string }) {
  return (
    <button
      className="flex justify-center items-center bg-white text-zinc-800 px-6 py-2 self-end rounded-md text-center font-semibold text-sm hover:bg-zinc-100/50 transition-all ring-1 duration-200 ring-zinc-200 hover:ring-zinc-300 active:scale-[0.98]"
      onClick={() => signIn()}
    >
      <div>{label}</div>
    </button>
  );
}
