import { SubscriptionPlan } from "@/types";

export const storeSubscriptionPlans: SubscriptionPlan[] = [
  {
    id: "basic",
    name: "Starter",
    description: "Great to get the feel of the app.",
    stripePriceId: "",
    features: [
      "Create upto 5 cogs",
      "Get upto 1 website per cog",
      "Upload files upto 10 MB",
    ],
    price: 0,
  },
  {
    id: "standard",
    name: "Plus",
    description: "Great for getting started.",
    stripePriceId: process.env.STRIPE_BASIC_MONTHLY_PLAN_ID || "",
    features: [
      "Create unlimited cogs",
      "Get upto 5 websites per cog",
      "Upload files upto 50 MB",
    ],
    price: 12,
  },
  {
    id: "pro",
    name: "PRO",
    description: "The best plan for professionals",
    stripePriceId: process.env.STRIPE_PRO_MONTHLY_PLAN_ID || "",
    features: [
      "Create unlimited cogs",
      "Get upto 50 websites per cog",
      "Upload files upto 100 MB",
    ],
    price: 18,
  },
];
