import "./globals.css";
import { Inter } from "next/font/google";
import Sidebar from "../components/Sidebar";
import RecoilRootWrapper from "@/wrappers/RecoilRootWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Cognition",
  description: "Cognition - Get answers about the school",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RecoilRootWrapper>
          <Sidebar />
          {children}
        </RecoilRootWrapper>
      </body>
    </html>
  );
}
