import Logo from "@/components/Logo";
import LoginButton from "@/components/buttons/LoginButton";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

async function getProviders() {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/providers`);

  if (!res.ok) {
    throw new Error("Failed to fetch providers");
  }

  return res.json();
}

export default async function SignIn() {
  const resp: ReturnType<typeof getProviders> = (await getProviders()) || {};

  const session = await getAuthSession()

  if (session?.user) {
    return redirect("/");
  }

  return (
    <div className="flex min-h-screen flex-col items-center p-24">
      <div className="mb-8">
        <Logo size={"text-5xl"} />
      </div>
      {Object.values(resp).map((provider) => {
        return (
          <div key={provider.id} className="w-1/4 [&:not(:first-child)]:mt-4">
            <LoginButton auth={provider} />
          </div>
        );
      })}
    </div>
  );
}
