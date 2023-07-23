"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export function SignIn() {
  return (
    <Button className="mt-12" size={"lg"} onClick={() => signIn()}>
      Sign In
    </Button>
  );
}

export function SignInSmaller() {
  return (
    <Button variant={"outline"} onClick={() => signIn()}>
      Sign In
    </Button>
  );
}
