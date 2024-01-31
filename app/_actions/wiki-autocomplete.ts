"use server";

import axios from "axios";

export const getAutoComplete = async (search: string) => {
  const res = await axios.get(
    `https://en.wikipedia.org/w/api.php?action=opensearch&search=${search}&namespace=0&format=json`
  );

  const data = res.data;

  // const articles = data[1].map((article: string, index: number) => {
  //   return {
  //     name: article,
  //     url: data[3][index],
  //   };
  // });

  // return articles;

  return data;
};
