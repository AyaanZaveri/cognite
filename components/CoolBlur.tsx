"use client";

import { useTheme } from "next-themes";
import React from "react";

const CoolBlur = () => {
  const { theme, resolvedTheme } = useTheme();

  console.log(theme);

  return (
    <div className={`${resolvedTheme == "light" ? "hidden": "fixed"} fixed top-0 -z-50 h-16 w-full bg-gradient-to-r from-orange-500/75 via-amber-500/75 to-red-500/75 blur-[100px]`} />
  );
};

export default CoolBlur;
