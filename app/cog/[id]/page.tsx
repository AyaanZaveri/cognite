"use client";

export default async function Page() {
  const res = await fetch("https://api.github.com/repos/vercel/next.js");
  const data = await res.json();

  return (
    <div
      style={{
        paddingLeft: 240,
      }}
    >
      Next stars: {data.stargazers_count}
    </div>
  );
}
