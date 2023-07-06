"use client";

import { Space_Grotesk } from "next/font/google";
import React from "react";

const space_grotesk = Space_Grotesk({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const Logo = () => {
  return (
    <div className="items-center pt-12 pb-4 text-5xl select-none inline-flex gap-2 mt-6">
      <span
        className={
          space_grotesk.className +
          " font-semibold pb-2 animate-text bg-gradient-to-r from-orange-500 via-amber-500 to-red-500 bg-clip-text text-transparent"
        }
      >
        Cognition
      </span>
      <span className="pb-2">🔥</span>
    </div>
  );
};

export default Logo;
