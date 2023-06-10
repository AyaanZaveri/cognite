import puppeteer from "puppeteer-core";
const cheerio = require("cheerio");

export async function scrape(urls: string[]) {
  try {
    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox"],
    });

    let combinedText = "";
    for (const url of urls) {
      const page = await browser.newPage();
      await page.setRequestInterception(true);

      page.on("request", (request) => {
        if (request.resourceType() === "document") {
          request.continue();
        } else {
          request.abort();
        }
      });

      await page.goto(url);

      // Wait for the content to load
      await page.waitForSelector("body");

      const content = await page.evaluate(() => {
        const elements = Array.from(document.querySelectorAll("body *"));
        return elements
          .map((element) => element.textContent!.replace(/\s+/g, " "))
          .join(" ");
      });

      const title = await page.evaluate(() => document.title);

      const $ = cheerio.load(content);

      let extractedText = "";
      $("body").each((_i: any, elem: any) => {
        extractedText += $(elem).text();
      });

      combinedText += `${title}\n${extractedText}\n`;
      await page.close();
    }

    await browser.close();
    return combinedText;
  } catch (error) {
    throw new Error("An error occurred while extracting text");
  }
}
