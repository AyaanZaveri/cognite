import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
const cheerio = require("cheerio");

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
      let extractedText = "";
      $("body").each((_i: any, elem: any) => {
        extractedText += $(elem).text();
      });

      combinedText += `${title}\n${extractedText}\n`;
    }

    res.status(200).json({ extracted_text: combinedText });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while extracting text" });
  }
}
