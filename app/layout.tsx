import "./globals.css";
import { Poppins } from "next/font/google";
import Sidebar from "../components/Sidebar";
import { getAuthSession } from "@/lib/auth";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Cognition",
  description: "Chat with any website",
  icons: {
    icon: "/icon.png",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAuthSession();

  return (
    <html lang="en">
      <body>
        <Sidebar session={session?.user ? session : null} />
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
