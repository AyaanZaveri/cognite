"use client";

import React from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { Space_Grotesk } from "next/font/google";

interface Cog {
  id: string;
  name: string;
  description: string;
  imgUrl: string | null;
  slug: string;
}

const space_grotesk = Space_Grotesk({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const HomeCard = ({ cog }: { cog: Cog }) => {
  return (
    <div className="w-full rounded-lg transition duration-200 ease-in-out hover:cursor-pointer hover:ring-2 hover:ring-amber-500 hover:ring-offset-4 hover:ring-offset-background active:scale-[0.98] active:brightness-90">
      <Link href={`/cog/ion/${cog.slug}`} draggable={false}>
        <Card key={cog.id} className="relative h-36 p-6">
          <CardHeader className="relative p-0">
            <div className="flex flex-row items-center gap-x-3">
              <Avatar className="flex aspect-square h-7 w-7 items-center rounded-sm">
                <AvatarImage
                  src={cog.imgUrl as string}
                  draggable={false}
                  className="h-min w-7 object-contain"
                />
                <AvatarFallback className="h-7 w-7 rounded-sm">
                  {cog.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <CardTitle
                className={
                  space_grotesk.className + " truncate text-lg font-semibold "
                }
              >
                {cog.name}
              </CardTitle>
            </div>
            <CardDescription className="line-clamp-2">
              {cog.description}
            </CardDescription>
          </CardHeader>
        </Card>
      </Link>
    </div>
  );
};

export default HomeCard;
