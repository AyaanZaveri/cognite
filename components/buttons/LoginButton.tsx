"use client";

import { signIn } from "next-auth/react";

import type { ClientSafeProvider } from "next-auth/react";
import { Button } from "../ui/button";
import { Icons } from "../Icons";

interface ProviderButtons {
  [key: string]: {
    id: string;
    icon: JSX.Element;
  };
}

const providerButtons: ProviderButtons = {
  google: {
    id: "google",
    icon: <Icons.google className="mr-2 h-6 w-6" />,
  },
  github: {
    id: "github",
    icon: <Icons.gitHub className="mr-2 h-6 w-6 dark:fill-white" />,
  },
  discord: {
    id: "discord",
    icon: <Icons.discord className="mr-2 h-6 w-6" />,
  },
};

export default function LoginButton({ auth }: { auth?: ClientSafeProvider }) {
  return (
    <Button
      type="button"
      onClick={() => signIn(auth?.id)}
      variant={"outline"}
      className="w-full py-6 text-base"
    >
      {auth && providerButtons[auth.id].icon}
      {auth ? `Sign In with ${auth.name}` : "Login"}
    </Button>
  );
}
