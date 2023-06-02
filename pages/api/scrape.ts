import { NextApiRequest, NextApiResponse } from "next";
const cheerio = require("cheerio");

const fetchData = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }
  const htmlString = await response.text();
  return htmlString;
};

const extractData = (htmlString: string) => {
  const $ = cheerio.load(htmlString);
  const data = $("body").text();
  return data;
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { url } = req.body;
      const htmlString = await fetchData(url);
      const data = extractData(htmlString);
      res.status(200).json({ data });
    } catch (error: any) {
      console.error("Error occurred: ", error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(400).json({ error: "Wrong request method" });
  }
}

export default handler;
