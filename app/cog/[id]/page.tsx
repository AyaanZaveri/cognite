"use client"

import { sidebarWidthState } from "@/atoms/sidebar";
import { useRecoilState } from "recoil";

export default async function Page() {
  const [sidebarWidth, setSidebarWidth] = useRecoilState(sidebarWidthState);

  const res = await fetch("https://api.github.com/repos/vercel/next.js");
  const data = await res.json();

  return (
    <div
      style={{
        paddingLeft: sidebarWidth,
      }}
    >
      Next stars: {data.stargazers_count}
    </div>
  );
}
