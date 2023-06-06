import Image from "next/image";
import React from "react";

interface CardProps {
  cog: string;
  imgUrl: string;
}

const Card = ({ cog, imgUrl }: CardProps) => {
  return (
    <li className="flex flex-col bg-zinc-50 hover:bg-zinc-100 active:scale-[0.98] rounded-md p-3 transition duration-200 ease-in-out relative group">
      <div className="flex-grow ">
        <a className="h-full" href="/cog/twss">
          <div className="group select-none p-1 transition ease-in-out duration-200 h-full rounded-md">
            <div className="flex justify-between items-center gap-2 ">
              <div className="flex items-center gap-2 overflow-x-hidden">
                <div className="text-xl">
                  🏫
                </div>
                <div className="w-full">
                  <div className="text-zinc-700 font-medium line-clamp-1 transition ease-in-out duration-200">
                    The Woodlands
                  </div>
                </div>
              </div>
            </div>
            <div className="font-normal text-zinc-500 transition duration-200 ease-in-out text-[12px] leading-5 text line-clamp-3">
              This is a secondary school in Mississauga
            </div>
          </div>
        </a>
      </div>
      <div className="flex justify-between  gap-1">
        {" "}
        <div className="flex-grow">
          <a href="/user/cognition">
            <div className="mt-1 text-zinc-700 w-max select-none text-xs p-1 rounded-md transition ease-in-out duration-200 active:bg-zinc-300 hover:bg-zinc-200">
              ~ Cognition
            </div>
          </a>
        </div>
      </div>
    </li>
  );
};

export default Card;
