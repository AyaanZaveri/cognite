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
import { Icons } from "@/components/icons";
import { getCurrentUser } from "@/lib/session";
import { Space_Grotesk } from "next/font/google";
import CoolBlur from "@/components/CoolBlur";
import { SignIn } from "../actions";

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
  const user = await getCurrentUser();

  if (!user) {
    redirect("/signin");
  }

  const email = user.email as string;

  const subscriptionPlan = await getUserSubscriptionPlan();

  return (
    <div className="p-0 md:pl-[240px]">
      <CoolBlur />
      <div className="flex flex-col gap-4 px-8 py-10">
        <h1
          className={`${space_grotesk.className} animate-text bg-gradient-to-r from-orange-500 via-amber-500 to-red-500 bg-clip-text pb-2 text-4xl font-semibold text-transparent`}
        >
          Billing
        </h1>
        <section
          id="billing-info"
          aria-labelledby="billing-info-heading"
          className="space-y-5"
        >
          <h2 className="text-xl font-semibold sm:text-2xl">Billing info</h2>
          <Card className="mb-2 p-6">
            <p className="text-lg font-semibold leading-none">
              {subscriptionPlan.name}
            </p>
            <p className="text-sm text-muted-foreground">
              {!subscriptionPlan.isSubscribed
                ? "You are not subscribed to any plan."
                : subscriptionPlan.isCanceled
                ? "Your plan will be canceled on "
                : "Your plan renews on "}
              {subscriptionPlan?.stripeCurrentPeriodEnd
                ? subscriptionPlan.stripeCurrentPeriodEnd.toLocaleDateString()
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
          <div className="flex flex-row gap-6">
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
                  <CardTitle className="line-clamp-1">{plan.name}</CardTitle>
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
                      <div key={feature} className="flex items-center gap-2">
                        <Icons.check className="h-4 w-4" aria-hidden="true" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="pt-4">
                  {user ? (
                    <ManageStoreSubscriptionForm
                      userId={user.id}
                      email={email}
                      stripePriceId={plan.stripePriceId}
                      stripeCustomerId={subscriptionPlan?.stripeCustomerId}
                      isSubscribed={!subscriptionPlan.isSubscribed}
                      isCurrentPlan={subscriptionPlan?.name === plan.name}
                    />
                  ) : (
                    <SignIn />
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
