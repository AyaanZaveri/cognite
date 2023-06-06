import { NextApiRequest, NextApiResponse } from "next";
import puppeteer from "puppeteer";
const cheerio = require("cheerio");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = req.query.url;

  if (!url) {
    res.status(400).json({ error: "URL is required" });
    return;
  }

  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox"],
    });
    const page = await browser.newPage();
    await page.setRequestInterception(true);

    page.on("request", (request) => {
      if (request.resourceType() === "document") {
        request.continue();
      } else {
        request.abort();
      }
    });

    await page.goto(url as string);

    // Wait for the content to load
    await page.waitForSelector("body");

    const content = await page.evaluate(() => {
      const elements = Array.from(document.querySelectorAll("body *"));
      return elements
        .map((element) => element.textContent!.replace(/\s+/g, " "))
        .join(" ");
    });

    const $ = cheerio.load(content);

    // create empty result set, assume selectors will return same number of results
    let result: any = [];
    for (let i = 0; i < $("body").length; i++) {
      result.push({});
    }

    // fill result set by parsing the html for each property selector
    $("body").each((i: any, elem: any) => {
      result[i].body = $(elem).text();
    });

    await browser.close();
    res.status(200).json({ extracted_text: result[0].body });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while extracting text" });
  }
}
