import "./globals.css";
import { Barlow, Inter, Poppins } from "next/font/google";
import Sidebar from "../components/Sidebar";
import RecoilRootWrapper from "@/wrappers/RecoilRootWrapper";
import { Analytics } from "@vercel/analytics/react";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <RecoilRootWrapper>
          <Sidebar />
          {children}
        </RecoilRootWrapper>
        <Analytics />
      </body>
    </html>
  );
}
