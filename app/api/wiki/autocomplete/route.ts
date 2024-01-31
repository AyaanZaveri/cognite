import axios from "axios";
import { NextResponse } from "next/server";

type WikiArticle = {
  name: string;
  url: string;
};

const convertToJSON = (data: [string, string[], string[], string[]]): WikiArticle[] => {
  const [mainName, aliases, urls] = data;

  const result: WikiArticle[] = aliases.map((alias, index) => {
    return {
      name: alias || mainName,
      url: data[3][index],
    };
  });

  return result;
};

export async function POST(req: Request) {
  const { search } = await req.json();

  const res = await axios.get(
    `https://en.wikipedia.org/w/api.php?action=opensearch&search=${search}&namespace=0&limit=5&format=json`
  );

  const data = res.data;

  return NextResponse.json({
    data: convertToJSON(data),
  });
}
