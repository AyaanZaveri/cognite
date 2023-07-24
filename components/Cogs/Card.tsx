import { Cog } from "@/types";
import { Space_Grotesk } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import UserHoverCard from "../UserHoverCard";

const space_grotesk = Space_Grotesk({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const Card = ({ cog }: { cog: Cog }) => {
  return (
    <div key={cog.id} className="relative">
      <Link
        href={`/cog/${cog?.user?.username}/${cog.slug}`}
        className={`relative flex h-full w-full transform cursor-pointer select-none flex-col rounded-xl bg-zinc-50 p-5 transition-all duration-300 hover:bg-zinc-100 hover:shadow-2xl hover:shadow-zinc-500/10 hover:ring-1 hover:ring-zinc-200 active:scale-[0.98]`}
      >
        <div className="mb-2 flex flex-col gap-y-2">
          <div className="flex flex-row items-center">
            <div className="relative flex aspect-square h-8 w-8 flex-row rounded-md bg-white ring-1 ring-zinc-200">
              <Image
                src={cog.imgUrl}
                alt={"Image of " + cog.name}
                fill={true}
                style={{
                  objectFit: "contain",
                }}
                className="rounded-lg p-1.5"
                draggable={false}
              />
            </div>
            <h5
              className={
                space_grotesk.className +
                " ml-3 text-lg font-semibold text-zinc-800"
              }
            >
              {cog.name}
            </h5>
          </div>
          <p className="text-sm font-light text-zinc-600">{cog.description}</p>
        </div>
      </Link>
      <div className="absolute bottom-0 right-0 z-50 m-3">
        <UserHoverCard user={cog?.user} />
      </div>
    </div>
  );
};

export default Card;
