"use client";

import { type manageSubscriptionSchema } from "@/lib/validations/stripe";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { manageSubscriptionAction } from "@/app/_actions/stripe";
import { useToast } from "../ui/use-toast";
import { z } from "zod";
import { useTransition } from "react";
import { catchError } from "@/lib/utils";

type ManageStoreSubscriptionFormProps = z.infer<
  typeof manageSubscriptionSchema
> & {
  isCurrentPlan: boolean;
};

export function ManageStoreSubscriptionForm({
  userId,
  email,
  isCurrentPlan,
  isSubscribed,
  stripeCustomerId,
  stripePriceId,
}: ManageStoreSubscriptionFormProps) {
  const [isPending, startTransition] = useTransition();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    startTransition(async () => {
      try {
        const session = await manageSubscriptionAction({
          email,
          userId,
          isSubscribed,
          isCurrentPlan,
          stripeCustomerId,
          stripePriceId,
        });
        if (session) {
          window.location.href = session.url ?? "/billing";
        }
      } catch (err) {
        catchError(err);
      }
    });
  }

  console.log(userId, email, isSubscribed, isCurrentPlan, stripeCustomerId, stripePriceId)

  return (
    <form className="w-full" onSubmit={(e) => onSubmit(e)}>
      <Button className="w-full" disabled={isPending}>
        {isPending && (
          <Icons.spinner
            className="mr-2 h-4 w-4 animate-spin"
            aria-hidden="true"
          />
        )}
        {isCurrentPlan ? "Manage Subscription" : "Subscribe"}
      </Button>
    </form>
  );
}
