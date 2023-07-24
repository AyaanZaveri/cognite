"use client";

import { User } from "next-auth";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { CalendarDays } from "lucide-react";
import timestampDate from "@/utils/timestampDate";
import Link from "next/link";

const UserHoverCard = ({ user }: { user: User }) => {
  console.log(user);

  const date = timestampDate(user?.createdDate);

  return (
    <HoverCard>
      <HoverCardTrigger className="text-sm text-zinc-400 transition-colors duration-200 ease-in-out hover:cursor-pointer hover:text-zinc-500" asChild>
        <Link href={`/user/${user?.username}`}>
          @{user?.username}
        </Link>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex space-x-4">
          <Avatar>
            <AvatarImage src={user?.image as string} />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
          <div className="space-y-1 self-start">
            <h4 className="text-sm font-semibold">@{user?.username}</h4>
            <p className="text-sm">{user?.bio ?? "Cognition bio"}</p>
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
