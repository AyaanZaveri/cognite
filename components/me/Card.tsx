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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import { TbFidgetSpinner, TbTrash } from "react-icons/tb";
import { CircleEllipsis, MoreVertical, Trash2 } from "lucide-react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Icons } from "../Icons";

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

const MeCard = ({ cog, session }: { cog: Cog; session: Session | null }) => {
  const router = useRouter();
  const [showDeleteAlert, setShowDeleteAlert] = React.useState<boolean>(false);
  const [isDeleteLoading, setIsDeleteLoading] = React.useState<boolean>(false);

  const deleteCog = async (cogId: string) => {
    const response = await fetch(`/api/cog/${cogId}`, {
      method: "DELETE",
    });

    if (response?.ok) {
      toast({
        title: "Cog deleted.",
        description: "Your cog was successfully deleted.",
        variant: "default",
      });
    }

    if (!response?.ok) {
      toast({
        title: "Something went wrong.",
        description: "Your cog was not deleted. Please try again.",
        variant: "destructive",
      });
    }

    return true;
  };

  return (
    <div className="relative">
      <ContextMenu>
        <ContextMenuTrigger>
          <Link href={`/cog/${session?.user?.username}/${cog.slug}`}>
            <Card
              key={cog.id}
              className="duaration-300 relative h-44 p-6 transition duration-300 ease-in-out hover:cursor-pointer hover:bg-accent/25 active:scale-[0.98]"
            >
              <CardHeader className="relative p-0">
                <div className="flex flex-row items-center gap-x-3">
                  <Avatar className="flex h-7 w-7 items-center rounded-sm">
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
                      space_grotesk.className +
                      " truncate text-lg font-semibold "
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
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>
            <Link href={`/editor/${cog.id}`} className="flex w-full">
              Edit
            </Link>
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem
            className="flex cursor-pointer items-center text-destructive focus:text-destructive"
            onSelect={() => setShowDeleteAlert(true)}
          >
            Delete
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <div className="absolute bottom-0 right-0 z-50 m-3">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-md border transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
            <MoreVertical className="h-4 w-4" />
            <span className="sr-only">Open</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Link href={`/editor/${cog.id}`} className="flex w-full">
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="flex cursor-pointer items-center text-destructive focus:text-destructive"
              onSelect={() => setShowDeleteAlert(true)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this cog?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async (event) => {
                event.preventDefault();
                setIsDeleteLoading(true);

                const deleted = await deleteCog(cog.id);

                if (deleted) {
                  setIsDeleteLoading(false);
                  setShowDeleteAlert(false);
                  router.refresh();
                }
              }}
              className="bg-red-600 focus:ring-red-600"
            >
              {isDeleteLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="mr-2 h-4 w-4" />
              )}
              <span>Delete</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default MeCard;
