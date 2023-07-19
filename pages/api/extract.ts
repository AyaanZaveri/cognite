import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
const cheerio = require("cheerio");

type CheerioElement = {
  type: string;
  name: string;
  data?: string;
  children: CheerioElement[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const urls = req.body.urls;

  if (!urls || !Array.isArray(urls)) {
    res
      .status(400)
      .json({ error: "URLs array is required in the request body" });
    return;
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

    res.status(200).json({ extracted_text: combinedText });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while extracting text" });
  }
}
