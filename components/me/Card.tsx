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
import { Session } from "next-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HiOutlineDotsVertical } from "react-icons/hi";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import Image from "next/image";
import axios from "axios";

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

const deleteCog = async (id: string) => {
  const res = await axios.delete(`/api/cog/delete`, {
    data: {
      id: id
    }
  });

  return res.data;
};

const MeCard = ({ cog, session }: { cog: Cog; session: Session | null }) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Card
          key={cog.id}
          className="duaration-300 relative h-full transition duration-300 ease-in-out hover:cursor-pointer hover:bg-accent active:scale-[0.98]"
        >
          <Link
            href={`/cog/${session?.user?.username}/${cog.slug}`}
            className="p-6"
          >
            <CardHeader className="relative p-0 px-6">
              <div className="flex flex-row items-center gap-x-3">
                <Avatar className="h-7 w-7 rounded-sm">
                  <AvatarImage src={cog.imgUrl as string} draggable={false} />
                  <AvatarFallback className="h-7 w-7 rounded-sm">
                    {cog.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <CardTitle
                  className={
                    space_grotesk.className + " text-lg font-semibold "
                  }
                >
                  {cog.name}
                </CardTitle>
              </div>
              <CardDescription>{cog.description}</CardDescription>
            </CardHeader>
          </Link>
          <CardFooter className="absolute bottom-0 right-0 p-3">
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none">
                <HiOutlineDotsVertical className="text-accent-foreground outline-none" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>{cog?.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link
                    href={`/cog/${session?.user?.username}/${cog.slug}/edit`}
                    className="inline-flex w-full items-center gap-x-1"
                  >
                    Edit
                    <Image
                      src="/pencil.webp"
                      alt="Delete"
                      width={12}
                      height={12}
                    />
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div
                    className="inline-flex w-full items-center gap-x-1 cursor-pointer"
                    onClick={(event) => {
                      deleteCog(cog?.id)
                        .then((deletedCog) => {
                          console.log(deletedCog)
                        })
                        .catch((error) => {
                          console.error(error);
                        });
                    }}
                  >
                    Delete
                    <Image
                      src="/multiply.webp"
                      alt="Delete"
                      width={12}
                      height={12}
                    />
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardFooter>
        </Card>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Profile</ContextMenuItem>
        <ContextMenuItem>Billing</ContextMenuItem>
        <ContextMenuItem>Team</ContextMenuItem>
        <ContextMenuItem>Subscription</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default MeCard;
