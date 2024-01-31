import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { storeSubscriptionPlans } from "@/config/subscriptions";
import { getUserSubscriptionPlan } from "@/lib/subscription";
import { cn, formatDate, formatPrice } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ManageStoreSubscriptionForm } from "@/components/forms/manage-store-subscription-form";
import { getCurrentUser } from "@/lib/session";
import { Space_Grotesk } from "next/font/google";
import CoolBlur from "@/components/CoolBlur";
import { Icons } from "@/components/Icons";
import Sidebar from "@/components/Sidebar";
import { getAuthSession } from "@/lib/auth";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL as string),
  title: "Billing",
  description: "Manage your billing and subscription",
};

const space_grotesk = Space_Grotesk({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export default async function BillingPage() {
  const session = await getAuthSession();

  if (!session?.user) {
    redirect("/auth/signin");
  }

  const email = session?.user.email as string;

  const subscriptionPlan = await getUserSubscriptionPlan(session?.user.id);

  console.log(session?.user)

  return (
    <div className="h-full">
      <div className="flex h-full min-h-[100vh] flex-row">
        <Sidebar session={session?.user ? session : null} />
        <div className="grow lg:pb-2 lg:pr-2 lg:pt-2">
          <div className="h-full bg-background bg-gradient-to-b bg-clip-border shadow-sm dark:from-orange-600/10 dark:to-black md:dark:border lg:rounded-lg">
            <div className="flex flex-col gap-4 px-8 py-10">
              <h1
                className={`${space_grotesk.className} animate-text bg-gradient-to-r from-sky-500 via-teal-500 to-emerald-500 bg-clip-text pb-2 text-4xl font-semibold text-transparent`}
              >
                Billing
              </h1>
              <section
                id="billing-info"
                aria-labelledby="billing-info-heading"
                className="space-y-5"
              >
                <h2 className="text-xl font-semibold sm:text-2xl">
                  Billing info
                </h2>
                <Card className="grid gap-2 p-6">
                  <h3 className="text-lg font-semibold sm:text-xl">
                    {subscriptionPlan?.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {!subscriptionPlan.isSubscribed
                      ? "Upgrade to create more cogs, and get other features."
                      : subscriptionPlan.isCanceled
                      ? "Your plan will be canceled on "
                      : "Your plan renews on "}
                    {subscriptionPlan?.stripeCurrentPeriodEnd
                      ? `${formatDate(
                          subscriptionPlan.stripeCurrentPeriodEnd
                        )}.`
                      : null}
                  </p>
                </Card>
              </section>
              <section
                id="subscription-plans"
                aria-labelledby="subscription-plans-heading"
                className="space-y-5 pb-2.5"
              >
                <h2 className="text-xl font-semibold sm:text-2xl">
                  Subscription plans
                </h2>
                <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
                  {storeSubscriptionPlans.map((plan, i) => (
                    <Card
                      key={plan.name}
                      className={cn(
                        "flex w-full flex-col",
                        i === storeSubscriptionPlans.length - 1 &&
                          "lg:col-span-2 xl:col-span-1"
                      )}
                    >
                      <CardHeader>
                        <CardTitle className="line-clamp-1">
                          {plan.name}
                        </CardTitle>
                        <CardDescription className="line-clamp-2">
                          {plan.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="grid flex-1 place-items-start gap-6">
                        <div className="text-3xl font-bold">
                          {formatPrice(plan.price, "USD", "compact")}
                          <span className="text-sm font-normal text-muted-foreground">
                            /month
                          </span>
                        </div>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          {plan.features.map((feature) => (
                            <div
                              key={feature}
                              className="flex items-center gap-2"
                            >
                              <Icons.check
                                className="h-4 w-4"
                                aria-hidden="true"
                              />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="pt-4">
                        {plan.id === "basic" ? (
                          <Link href="/create" className="w-full">
                            <div
                              className={cn(
                                buttonVariants({
                                  className: "w-full",
                                })
                              )}
                            >
                              Start Creating!
                              <span className="sr-only">Start Creating!</span>
                            </div>
                          </Link>
                        ) : (
                          <ManageStoreSubscriptionForm
                            userId={session?.user.id}
                            email={email}
                            stripePriceId={plan.stripePriceId}
                            stripeCustomerId={
                              subscriptionPlan?.stripeCustomerId
                            }
                            isSubscribed={!!subscriptionPlan.isSubscribed}
                            isCurrentPlan={subscriptionPlan?.name === plan.name}
                          />
                        )}
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
