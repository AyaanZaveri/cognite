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
import { Space_Grotesk } from "next/font/google";
import axios from "axios";
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

const WikiSearch = () => {
  const [search, setSearch] = useState("");
  const [articles, setArticles] = useState<{ name: string; url: string }[]>([]);

  // create a function that gets autocomplete search results from wikipedia
  const getAutoComplete = async (search: string) => {
    const res = await axios.post(`/api/wiki/autocomplete`, {
      search,
    });

    const data = res.data;

    setArticles(data.data);
  };

  useEffect(() => {
    if (search.trim().length > 0) {
      getAutoComplete(search);
    } else {
      setArticles([]);
    }
  }, [search]);

  return (
    <div className="relative flex w-full flex-row space-x-2">
      <div className="w-full animate-gradient rounded-lg bg-gradient-to-r from-orange-500 via-amber-500 to-red-500 p-0.5 absolute">
        <Command
          className="h-full bg-background shadow-2xl shadow-orange-500/10 transition duration-300 ease-in-out hover:shadow-orange-500/20"
          loop
          shouldFilter={false}
        >
          <CommandInput
            className={`text-normal py-6 ${space_grotesk.className}`}
            placeholder="Search all of Wikipedia 🌐"
            value={search}
            onInput={(e) => setSearch(e.currentTarget.value)}
          />
          {search.trim().length !== 0 && articles.length >= 1 ? (
            <CommandList className="max-h-full">
              <CommandGroup heading="Suggestions">
                {articles.map((article, idx) => (
                  <Link
                    href={`/cog/wiki/${article?.name}`}
                    key={idx}
                    className="focus:outline-2 focus:outline-ring"
                  >
                    <CommandItem className="p-3" value={article?.name}>
                      <div className="flex flex-row gap-2">
                        {/* <Image
                          src={article.imgUrl as string}
                          alt={article.name}
                          width={32}
                          height={32}
                          draggable={false}
                          className="aspect-square self-start rounded-md border bg-background object-contain p-1"
                        /> */}
                        <div className="flex flex-col">
                          <span
                            className={`font-medium ${space_grotesk.className}`}
                          >
                            {article.name}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {article.url}
                          </span>
                        </div>
                      </div>
                    </CommandItem>
                  </Link>
                ))}
              </CommandGroup>
            </CommandList>
          ) : search.trim().length !== 0 && articles.length === 0 ? (
            <span className="py-6 text-center text-sm">
              No results found 🙃
            </span>
          ) : null}
        </Command>
      </div>
    </div>
  );
};

export default WikiSearch;
