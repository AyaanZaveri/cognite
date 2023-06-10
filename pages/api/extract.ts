import { NextApiRequest, NextApiResponse } from "next";
// const cheerio = require("cheerio");

let chrome: any = {};
let puppeteer: any;

if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
  // running on the Vercel platform.
  chrome = require("chrome-aws-lambda");
  puppeteer = require("puppeteer-core");
} else {
  // running locally.
  puppeteer = require("puppeteer");
}

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
    const options = process.env.AWS_REGION
      ? {
          args: chrome.args,
          executablePath: await chrome.executablePath,
          headless: chrome.headless,
        }
      : {
          args: [],
          executablePath:
            process.platform === "win32"
              ? "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"
              : process.platform === "linux"
              ? "/usr/bin/google-chrome"
              : "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
        };
    const browser = await puppeteer.launch(options);

    let combinedText = "";
    for (const url of urls) {
      const page = await browser.newPage();
      await page.setRequestInterception(true);

      page.on("request", (request: any) => {
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

      const title = await page.evaluate(() => document.title);

      // const $ = cheerio.load(content);

      // let extractedText = "";
      // $("body").each((_i: any, elem: any) => {
      //   extractedText += $(elem).text();
      // });

      // combinedText += `${title}\n${extractedText}\n`;
      await page.close();
    }

    await browser.close();
    res.status(200).json({ extracted_text: combinedText });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while extracting text" });
  }
}
