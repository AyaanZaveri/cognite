import React from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import UserHoverCard from "../UserHoverCard";
import Link from "next/link";
import { Tag } from "@/types";
import { User } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Space_Grotesk } from "next/font/google";
import { Badge } from "../ui/badge";
import { redirect } from "next/navigation";

interface Cog {
  id: string;
  name: string;
  description: string;
  imgUrl: string;
  slug: string;
  tags: Tag[];
  user: User;
}

const space_grotesk = Space_Grotesk({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});
``;

const CogCard = ({ cog }: { cog: Cog }) => {
  return (
    <div className="relative">
      <Link href={`/cog/${cog?.user?.username}/${cog.slug}`}>
        <Card
          key={cog.id}
          className="relative h-44 space-y-4 transition duration-300 ease-in-out hover:cursor-pointer hover:bg-accent/25 p-6"
        >
          <CardHeader className="relative p-0">
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
          {cog?.tags?.length > 0 ? (
            <div className="z-50 flex flex-row flex-wrap gap-2">
              {cog.tags?.map((tag: Tag) => (
                <Badge key={tag?.id}>{tag?.name}</Badge>
              ))}
            </div>
          ) : null}
        </Card>
      </Link>

      <div className="absolute bottom-0 right-0 z-50 m-3">
        <UserHoverCard
          user={cog?.user}
          nameClass="text-sm text-muted-foreground transition-colors duration-200 ease-in-out hover:cursor-pointer hover:text-accent-foreground"
        />
      </div>
    </div>
  );
};

export default CogCard;
