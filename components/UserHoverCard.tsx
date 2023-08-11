"use client";

import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import timestampDate from "@/utils/timestampDate";
import Link from "next/link";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { CalendarDays } from "lucide-react";
import { User } from "@prisma/client";

const UserHoverCard = ({
  user,
  nameClass,
}: {
  user: User | undefined;
  nameClass: string;
}) => {
  const date = timestampDate(user?.createdDate);

  return (
    <HoverCard>
      <HoverCardTrigger className={nameClass} asChild>
        <Link href={`/user/${user?.username}`}>@{user?.username}</Link>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 bg-background/75 backdrop-blur-md">
        <div className="flex space-x-4">
          <Avatar>
            <AvatarImage src={user?.image as string} />
            <AvatarFallback>
              {user?.username?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1 self-start">
            <h4 className="text-sm font-semibold">@{user?.username}</h4>
            <p className="text-sm">
              {<ReactMarkdown>{user?.bio as string}</ReactMarkdown> ??
                "Cognition bio"}
            </p>
            <div className="flex items-center pt-2">
              <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">
                Joined {date}
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default UserHoverCard;
