"use client";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { User } from "@prisma/client";
import Image from "next/image";
import { Tag } from "@/types";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CommandLoading } from "cmdk";
import { Icons } from "./Icons";
import { searchCogs } from "@/app/_actions/search";

interface Cog {
  name: string;
  description: string;
  imgUrl: string | null;
  private: boolean;
  slug: string;
  user: {
    username: string | null;
  };
  id: string;
}

const Search = () => {
  const [search, setSearch] = useState("");
  const [cogs, setCogs] = useState<Cog[]>([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const searchForCogs = async () => {
    setLoading(true);
    const cogs = await searchCogs(search);
    setCogs(cogs as Cog[]);
    setLoading(false);
  };

  useEffect(() => {
    searchForCogs();
  }, [search]);

  console.log(cogs)

  return (
    <Command
      className="h-full w-full border shadow-2xl shadow-orange-500/10 transition duration-300 ease-in-out hover:shadow-orange-500/20"
      filter={(value, search) => {
        if (value.includes(search.toLowerCase())) return 1;
        return 0;
      }}
      loop
    >
      <CommandInput
        className="text-normal py-6"
        placeholder="Let's find something to cognite ⚡️"
        value={search}
        onInput={(e) => setSearch(e.currentTarget.value)}
      />
      {search.trim().length !== 0 && cogs.length >= 1 ? (
        <CommandList className="max-h-full">
          {loading && (
            <CommandLoading>
              <div className="fill-muted-foreground px-3 pt-1 font-medium">
                <Icons.gooeyBalls className="h-3 w-3" />
              </div>
            </CommandLoading>
          )}
          <CommandGroup heading="Suggestions">
            {cogs.map((cog) => (
              <Link
                href={`/cog/${cog?.user?.username}/${cog.slug}`}
                key={cog?.id}
                className="focus:outline-2 focus:outline-ring"
              >
                <CommandItem
                  className="p-3"
                  value={cog?.name}
                  onSelect={() => {
                    router.push(
                      `/cog/${cog?.user?.username}/${cog.slug}` as string
                    );
                  }}
                >
                  <div className="flex flex-row gap-2">
                    <Image
                      src={cog.imgUrl as string}
                      alt={cog.name}
                      width={32}
                      height={32}
                      draggable={false}
                      className="aspect-square self-start rounded-md border bg-background object-contain p-1"
                    />
                    <div className="flex flex-col">
                      <span className="font-medium">{cog.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {cog.description}
                      </span>
                    </div>
                  </div>
                </CommandItem>
              </Link>
            ))}
          </CommandGroup>
        </CommandList>
      ) : search.trim().length !== 0 && cogs.length === 0 ? (
        <span className="py-6 text-center text-sm">No results found 🙃</span>
      ) : null}
    </Command>
  );
};

export default Search;
