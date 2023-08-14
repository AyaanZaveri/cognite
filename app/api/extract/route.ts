import { NextResponse } from "next/server";
import axios from "axios";
import { getAuthSession } from "@/lib/auth";
const cheerio = require("cheerio");

type CheerioElement = {
  type: string;
  name: string;
  data?: string;
  children: CheerioElement[];
};

export async function POST(req: Request) {

  const session = await getAuthSession();
  
  if (!session?.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { urls } = await req.json();

  console.log("urls", urls)

  if (!urls || !Array.isArray(urls)) {
    console.log("URLs array is required in the request body");

    return NextResponse.json({
      error: "URLs array is required in the request body",
      status: 400,
    });
  }

  function extractText(element: CheerioElement): string {
    if (element.type === "text") {
      return element.data!.trim();
    }

    if (element.type === "tag" || element.type === "root") {
      return element.children.map((child) => extractText(child)).join(" ");
    }

    return "";
  }

  try {
    let combinedText = "";

    for (const url of urls) {
      // Fetch the HTML content of the URL
      const response = await axios.get(url as string);

      // Load the fetched HTML content with Cheerio
      const $ = cheerio.load(response.data);

      // Extract the title
      const title = $("title").text();

      // Extract the text content from the body
      let extractedText = extractText($("body")[0]);

      // Remove unnecessary white spaces, new line characters, and tab characters
      extractedText = extractedText
        .replace(/\s\s+/g, " ")
        .replace(/\n/g, "")
        .replace(/\t/g, "");

      combinedText += `${title}\n${extractedText}\n`;
    }

    return NextResponse.json({
      extracted_text: combinedText,
      status: 200,
    });
  } catch (error) {
    console.log("error is", error);

    return NextResponse.error()
  }
}
