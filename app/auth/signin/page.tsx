import CoolBlur from "@/components/CoolBlur";
import Logo from "@/components/Logo";
import { ModeToggle } from "@/components/ModeToggle";
import LoginButton from "@/components/buttons/LoginButton";
import { getAuthSession } from "@/lib/auth";
import { Rubik, Space_Grotesk } from "next/font/google";
import { redirect } from "next/navigation";

const space_grotesk = Space_Grotesk({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

async function getProviders() {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/providers`);

  if (!res.ok) {
    throw new Error("Failed to fetch providers");
  }

  return res.json();
}

export default async function SignIn() {
  const resp: ReturnType<typeof getProviders> = (await getProviders()) || {};

  const session = await getAuthSession();

  if (session?.user) {
    return redirect("/");
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-background bg-gradient-to-b from-amber-300/10 to-white bg-clip-border p-24 shadow-sm dark:from-orange-600/10 dark:to-black">
      <div className="mb-8">
        <Logo size={"5xl"} />
      </div>
      {Object.values(resp).map((provider) => {
        return (
          <div
            key={provider.id}
            className="w-full md:w-1/2 [&:not(:first-child)]:mt-4"
          >
            <LoginButton auth={provider} />
          </div>
        );
      })}
      <span className={`mt-8 text-xl ${space_grotesk.className}`}>
        Sign in to start your journey to <Logo />
      </span>
      <div className="absolute top-0 right-0 p-5">
        <ModeToggle />
      </div>
    </div>
  );
}
