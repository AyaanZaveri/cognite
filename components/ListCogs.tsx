import { Cogs } from "@/types";
import Card from "./Cogs/Card";

const ListCogs = ({ cogs }: { cogs: Cogs[] }) => {
  console.log("cogs", cogs);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {cogs.length >= 1 ? (
          cogs.map((cog: any, idx: number) => <Card key={idx} cog={cog} />)
        ) : (
          <div className="w-full h-36 bg-zinc-100 rounded-md animate-pulse"></div>
        )}
      </div>
    </div>
  );
};

export default ListCogs;
