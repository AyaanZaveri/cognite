"use client";

import { signIn } from "next-auth/react";

import type { ClientSafeProvider } from "next-auth/react";
import { Button } from "../ui/button";

export default function LoginButton({ auth }: { auth?: ClientSafeProvider }) {
  return (
    <Button
      type="button"
      onClick={() => signIn(auth?.id)}
      variant={"outline"}
      className="text-base w-full py-6"
    >
      {auth ? `Sign In with ${auth.name}` : "Login"}
    </Button>
  );
}
