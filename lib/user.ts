import { db } from "./db";

export async function updateUserImage(id: string, url: string) {
  console.log("updateUserImage", id, url);
  let res = await db.user.update({
    where: {
      id: id,
    },
    data: {
      image: url,
    },
  });

  return res;
}
