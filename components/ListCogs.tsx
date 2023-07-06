import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./Cogs/Card";

const ListCogs = () => {
  const [cogs, setCogs] = useState<any[]>([]);

  const getCogs = async () => {
    axios.get("/api/list/cogs").then((res) => {
      setCogs(res.data.data);
    });
  };

  useEffect(() => {
    getCogs();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {cogs.length >= 1 ? (
          cogs.map((cog: any, idx: number) => (
            <>{cog.type == "web" ? <Card key={idx} cog={cog} /> : null}</>
          ))
        ) : (
          <div className="w-full h-36 bg-zinc-100 rounded-md animate-pulse"></div>
        )}
      </div>
    </div>
  );
};

export default ListCogs;
