import { Space_Grotesk } from "next/font/google";
import Image from "next/image";
import React from "react";

const space_grotesk = Space_Grotesk({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const Logo = ({ size }: { size: string }) => {
  return (
    <div
      className={`inline-flex select-none items-center gap-2 ${
        size == "5xl" ? "text-5xl" : size == "3xl" ? "text-3xl" : null
      }`}
    >
      <span
        className={
          space_grotesk.className +
          " animate-text bg-gradient-to-r from-orange-500 via-amber-500 to-red-500 bg-clip-text pb-2 font-semibold text-transparent"
        }
      >
        Cognite
      </span>
      <div className="pb-2">
        <Image
          src="/fire_animated.png"
          alt={"Cognite Logo"}
          draggable={false}
          unoptimized={true}
          width={size == "5xl" ? 54 : size == "3xl" ? 36 : 0}
          height={size == "5xl" ? 54 : size == "3xl" ? 36 : 0}
        />
      </div>
    </div>
  );
};

export default Logo;
