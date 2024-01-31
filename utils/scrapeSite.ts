import axios from "axios";

export const scrapeSite = async (urls: string[]) => {
  console.log("urls", urls);
  try {
    const response = await axios.post("/api/extract", { urls });
    console.log("response");
    return response.data.extracted_text;
  } catch (err) {
    console.log(err);
    if (err instanceof Error) {
      console.log(err.message);
    } else {
      console.log("Unexpected error", err);
    }
  }
};
