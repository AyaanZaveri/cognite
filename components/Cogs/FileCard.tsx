import { Space_Grotesk } from "next/font/google";
import Image from "next/image";
import React from "react";

interface FileCardProps {
  cog: {
    id: number;
    title: string;
    img: string;
    description: string;
  };
  fileCogLoading: number | null | undefined;
  handleFileCog: (file: number) => void;
}

const space_grotesk = Space_Grotesk({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const FileCard = ({ cog, fileCogLoading, handleFileCog }: FileCardProps) => {
  return (
    <div
      key={cog.id}
      className={`relative flex flex-col w-full rounded-xl p-5 transition-all duration-300 cursor-pointer transform active:scale-[0.98] ${
        fileCogLoading == cog.id - 1
          ? "bg-green-50 hover:bg-green-100 active:bg-green-100 animate-pulse"
          : "bg-orange-50 hover:bg-orange-100 active:bg-orange-100"
      }`}
      onClick={() => handleFileCog(cog.id - 1)}
    >
      <div className="flex items-center mb-2">
        <div className="relative w-8 h-8 bg-white rounded-md ring-1 ring-zinc-200">
          <Image
            src={cog.img}
            alt={cog.title}
            layout="fill"
            objectFit="contain"
            className="p-1.5 rounded-lg"
          />
        </div>
        <h5
          className={
            space_grotesk.className +
            " ml-3 font-semibold text-lg text-zinc-800"
          }
        >
          {cog.title}
        </h5>
      </div>
      <p className="text-sm font-light text-zinc-600">{cog.description}</p>
    </div>
  );
};

export default FileCard;
