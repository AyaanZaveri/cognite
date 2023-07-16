import { NextApiRequest, NextApiResponse } from "next";
import { Innertube } from "youtubei.js/web";
export const video = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const youtube = await Innertube.create();
   
    const result = await youtube.search("abcd");
   
    res.status(200).json({ result: "ok" });
  } catch (e) {
   
    res.status(400).json({ result: "error" });
  }
};
