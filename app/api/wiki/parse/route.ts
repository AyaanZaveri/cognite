import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { search } = await req.json();

  const res = await axios.get(
    `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&titles=${search}&redirects=true`
  );

  const image = await axios.get(
    `https://en.wikipedia.org/w/api.php?action=query&titles=${search}&prop=pageimages&format=json&pithumbsize=400`
  );

  const data = {
    content: res.data.query.pages[Object.keys(res.data.query.pages)[0]].extract,
    title: res.data.query.pages[Object.keys(res.data.query.pages)[0]].title,
    image: image.data.query.pages[Object.keys(image.data.query.pages)[0]]
      .thumbnail
      ? image.data.query.pages[Object.keys(image.data.query.pages)[0]].thumbnail
          .source
      : null,
  };

  return NextResponse.json({
    data: data,
  });
}
