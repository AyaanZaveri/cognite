import { toast } from "@/components/ui/use-toast";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as z from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(
  price: number | string,
  currency: "USD" | "EUR" | "GBP" | "BDT" | "CAD" = "USD",
  notation: "compact" | "engineering" | "scientific" | "standard" = "standard"
) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    notation,
  }).format(Number(price));
}

export function formatDate(input: string | number | Date): string {
  const date = new Date(input);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function catchError(err: unknown) {
  if (err instanceof z.ZodError) {
    const errors = err.issues.map((issue) => {
      return issue.message;
    });
    return toast({
      title: "Error",
      description: errors.join("\n"),
      variant: "destructive",
    });
  } else if (err instanceof Error) {
    return toast({
      title: "Error",
      description: err.message,
      variant: "destructive",
    });
  } else {
    return toast({
      title: "Error",
      description: "Something went wrong, please try again later.",
      variant: "destructive",
    });
  }
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXTAUTH_URL}${path}`;
}
