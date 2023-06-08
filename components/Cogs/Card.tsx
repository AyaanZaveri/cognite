import { Space_Grotesk } from "next/font/google";
import Image from "next/image";
import React from "react";

interface CardProps {
  cog: {
    id: number;
    title: string;
    img: string;
    description: string;
  };
  fetchSite: (id: number) => void;
  isSiteFetching: number | null | undefined;
}

const space_grotesk = Space_Grotesk({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const Card = ({ cog, fetchSite, isSiteFetching }: CardProps) => {
  
  return (
    <div
      key={cog.id}
      className={`relative flex flex-col w-full bg-orange-50/75 rounded-xl p-5 hover:bg-orange-100 active:bg-orange-100 transition-all duration-300 cursor-pointer transform active:scale-[0.98] hover:ring-2 hover:ring-orange-200 active:ring-2 active:ring-orange-200 ${
        isSiteFetching == cog.id - 1 ? "bg-green-50" : ""
      }`}
      onClick={() => fetchSite(cog.id - 1)}
    >
      <div className="flex items-center mb-2">
        <div className="relative w-8 h-8 bg-white rounded-md ring-1 ring-stone-200">
          <Image
            src={cog.img}
            alt={cog.title}
            layout="fill"
            objectFit="contain"
            className="p-1"
          />
        </div>
        <h5 className={space_grotesk.className + " ml-3 font-semibold text-lg text-zinc-800"}>
          {cog.title}
        </h5>
      </div>
      <p className="text-sm font-light text-zinc-600">{cog.description}</p>
    </div>
  );
};

export default Card;
