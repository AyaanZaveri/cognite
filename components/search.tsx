"use client";

import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CommandLoading } from "cmdk";
import { Icons } from "./Icons";
import { searchCogs } from "@/app/_actions/search";
import { Space_Grotesk } from "next/font/google";
import { Session } from "next-auth";
import QuickCreate from "./QuickCreate";

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

const space_grotesk = Space_Grotesk({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const Search = ({ session }: { session: Session | null }) => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  console.log(cogs);

  return (
    <div className="relative flex w-full flex-row space-x-2">
      <div className="w-full animate-gradient rounded-lg bg-gradient-to-r from-orange-500 via-amber-500 to-red-500 p-0.5">
        <Command
          className="h-full bg-background shadow-2xl shadow-orange-500/10 transition duration-300 ease-in-out hover:shadow-orange-500/20"
          filter={(value, search) => {
            if (value.includes(search.toLowerCase())) return 1;
            return 0;
          }}
          loop
        >
          <CommandInput
            className={`text-normal py-6 ${space_grotesk.className}`}
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
                          <span
                            className={`font-medium ${space_grotesk.className}`}
                          >
                            {cog.name}
                          </span>
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
            <span className="py-6 text-center text-sm">
              No results found 🙃
            </span>
          ) : null}
        </Command>
      </div>
      <QuickCreate session={session} />
    </div>
  );
};

export default Search;
