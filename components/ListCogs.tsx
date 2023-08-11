"use client";

import React from "react";
import { Cogs, Tag } from "@/types";
import Link from "next/link";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import UserHoverCard from "@/components/UserHoverCard";
import { Badge } from "@/components/ui/badge";
import { Space_Grotesk } from "next/font/google";

const space_grotesk = Space_Grotesk({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

interface ListCogsProps {
  cogs: Cogs[];
}

const ListCogs = ({ cogs }: ListCogsProps) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
      {cogs?.map((cog: any) => (
        <Card
          key={cog.id}
          className="duaration-300 relative h-44 transition duration-300 ease-in-out hover:cursor-pointer hover:bg-accent/25 active:scale-[0.98]"
        >
          <Link
            href={`/cog/${cog?.user?.username}/${cog.slug}`}
            className="px-6 pt-6"
          >
            <CardHeader className="relative p-0 px-6">
              <div className="flex flex-row items-center gap-x-3">
                <Avatar className="h-7 w-7 rounded-sm">
                  <AvatarImage src={cog.imgUrl} draggable={false} />
                  <AvatarFallback className="h-7 w-7 rounded-sm">
                    {cog.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <CardTitle
                  className={
                    space_grotesk.className + " truncate text-lg font-semibold"
                  }
                >
                  {cog.name}
                </CardTitle>
              </div>
              <CardDescription className="line-clamp-2">
                {cog.description}
              </CardDescription>
            </CardHeader>
          </Link>
          {cog?.tags?.length > 0 ? (
            <div className="flex flex-row flex-wrap gap-2 px-6 pb-6">
              {cog.tags?.map((tag: Tag) => (
                <Badge key={tag?.id}>{tag?.name}</Badge>
              ))}
            </div>
          ) : null}
          <CardFooter className="absolute bottom-0 right-0 p-3">
            <UserHoverCard
              user={cog?.user}
              nameClass="text-sm text-muted-foreground transition-colors duration-200 ease-in-out hover:cursor-pointer hover:text-accent-foreground"
            />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ListCogs;
