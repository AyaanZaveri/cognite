import { NextApiRequest, NextApiResponse } from "next";

const cheerio = require("cheerio");

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { url } = req.body;
      const response = await fetch(url);
      const htmlString = await response.text();
      const $ = cheerio.load(htmlString);
      const data = $("body").text();
      res.status(200).json({ data });
    } catch (error) {
      res.status(500).json({ error });
    }
  } else {
    res.status(400).json({ error: "Wrong request method" });
  }
}

export default handler;