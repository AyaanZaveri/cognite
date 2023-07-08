import { Space_Grotesk } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

interface CardProps {
  cog: {
    id: number;
    name: string;
    imgUrl: string;
    description: string;
    urls: string[];
  };
}

const space_grotesk = Space_Grotesk({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const Card = ({ cog }: CardProps) => {
  return (
    <Link
      href={`/cog/${cog.id}`}
      key={cog.id}
      className={`relative h-36 justify-center select-none flex flex-col w-full rounded-xl p-5 transition-all duration-300 cursor-pointer transform active:scale-[0.98] bg-zinc-50 hover:bg-zinc-100 hover:ring-1 hover:ring-zinc-200 hover:shadow-2xl hover:shadow-zinc-500/10`}
    >
      <div className="flex items-center mb-2">
        <div className="relative w-8 h-8 bg-white rounded-md ring-1 ring-zinc-200">
          <Image
            src={cog.imgUrl}
            alt={"Image of " + cog.name}
            fill={true}
            style={{
              objectFit: "contain",
            }}
            className="p-1.5 rounded-lg"
            draggable={false}
          />
        </div>
        <h5
          className={
            space_grotesk.className +
            " ml-3 font-semibold text-lg text-zinc-800"
          }
        >
          {cog.name}
        </h5>
      </div>
      <p className="text-sm font-light text-zinc-600">{cog.description}</p>
    </Link>
  );
};

export default Card;
