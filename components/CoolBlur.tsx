"use client";

import { getTheme } from "@/helpers/getTheme";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

const CoolBlur = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`${
        theme == "light" ? "hidden" : ""
      } top-0 h-24 w-full bg-gradient-to-r from-orange-500 via-amber-500 to-red-500 blur-[200px]`}
    />
  );
};

export default CoolBlur;
