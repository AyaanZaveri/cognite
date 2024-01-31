"use client";

import React from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import WikiSearch from "./wiki-search";

const WikiModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          size={"sm"}
          className="inline-flex h-8 gap-2 text-xs"
        >
          <span>Wikipedia</span>
          <div className="relative grid h-4 w-4 place-items-center rounded bg-white p-0.5">
            <Image
              src={
                "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Wikipedia-W-visual-balanced.svg/1280px-Wikipedia-W-visual-balanced.svg.png"
              }
              alt="Wikipedia"
              height={16}
              width={16}
            />
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="fixed top-48">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2" asChild>
            <div>
              <span className="text-2xl">Wikipedia</span>
              <div className="relative grid h-6 w-6 place-items-center rounded-full bg-white p-1">
                <Image
                  src={
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Wikipedia-W-visual-balanced.svg/1280px-Wikipedia-W-visual-balanced.svg.png"
                  }
                  alt="Wikipedia"
                  height={20}
                  width={20}
                />
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4 pb-20">
          <WikiSearch />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WikiModal;
