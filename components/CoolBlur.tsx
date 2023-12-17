"use client";

import React from "react";

const CoolBlur = () => {
  return (
    <div
      className={`absolute top-0 z-10 h-72 w-full bg-gradient-to-r from-sky-500/[0.10] via-blue-500/[0.10] to-violet-500/[0.10] blur-[50px] dark:from-orange-500/50 dark:via-yellow-500/50 dark:to-red-500/50`}
    />
  );
};

export default CoolBlur;
