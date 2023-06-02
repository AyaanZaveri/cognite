import "./globals.css";
import { Inter, Poppins } from "next/font/google";
import Sidebar from "../components/Sidebar";
import RecoilRootWrapper from "@/wrappers/RecoilRootWrapper";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

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
      <body className={poppins.className}>
        <RecoilRootWrapper>
          <Sidebar />
          {children}
        </RecoilRootWrapper>
      </body>
    </html>
  );
}
