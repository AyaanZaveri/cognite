export const scrapeSite = async (urls: string[]) => {
  const res = await fetch(`/api/extract`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ urls }),
  });

  const data = await res.json();

  console.log(data);

  return data.extracted_text;
};