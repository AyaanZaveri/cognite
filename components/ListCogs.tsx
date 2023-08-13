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
      {/* {cogs?.map((cog: any) => (
        
      ))} */}
    </div>
  );
};

export default ListCogs;
