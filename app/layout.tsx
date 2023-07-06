import "./globals.css";
import { Barlow, Inter, Poppins } from "next/font/google";
import Sidebar from "../components/Sidebar";
import RecoilRootWrapper from "@/wrappers/RecoilRootWrapper";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

const inter = Inter({ subsets: ["latin"] });
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
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={poppins.className}>
        <Sidebar session={session?.user ? session : null} />
        {children}
      </body>
    </html>
  );
}
