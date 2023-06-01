"use client";

import React from "react";
import { RecoilRoot } from "recoil";

function RecoilRootWrapper({ children }: { children: React.ReactNode }) {
  return <RecoilRoot>{children}</RecoilRoot>;
}

export default RecoilRootWrapper;
