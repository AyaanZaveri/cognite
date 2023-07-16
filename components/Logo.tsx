"use client";

import { Space_Grotesk } from "next/font/google";
import React from "react";

const space_grotesk = Space_Grotesk({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const Logo = ({ size }: { size: string }) => {
  return (
    <div className={`inline-flex select-none items-center gap-2 ${size}`}>
      <span
        className={
          space_grotesk.className +
          " animate-text bg-gradient-to-r from-orange-500 via-amber-500 to-red-500 bg-clip-text pb-2 font-semibold text-transparent"
        }
      >
        Cognition
      </span>
      <span className="pb-2">🔥</span>
    </div>
  );
};

export default Logo;
