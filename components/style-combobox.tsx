"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Style, { styles } from "@/lib/styles";

export function ComboboxPopover({
  selectedStyle,
  setSelectedStyle,
}: {
  selectedStyle: Style;
  setSelectedStyle: (style: Style) => void;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex items-center space-x-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="flex h-full w-[350px] flex-col items-start py-3 text-start"
          >
            {selectedStyle ? (
              <>
                <span>
                  {selectedStyle.name} {selectedStyle.emoji}
                </span>
                <span className="text-sm font-normal text-muted-foreground">
                  {selectedStyle.info}
                </span>
              </>
            ) : (
              <span>~</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="right" align="start">
          <Command>
            <CommandInput placeholder="Change style..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {styles.map((style, idx) => (
                  <CommandItem
                    value={style.value}
                    key={idx}
                    onSelect={(value) => {
                      setSelectedStyle(
                        styles.find((style) => style.value === value) ||
                          styles[0]
                      );
                      setOpen(false);
                    }}
                  >
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="w-full">
                          <span className="mr-2 h-4 w-4">{style.emoji}</span>
                          <span>{style.name}</span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="left">
                        <p className="w-[250px]">{style.info}</p>
                      </TooltipContent>
                    </Tooltip>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
