export interface IUser {
  _id: string;
  email: string;
  name: string;
}

export interface Cogs {
  id: string;
  user: string;
  userId: string;
  name: string;
  description: string;
  embeddings: [];
  date: string;
  type: string;
  slug: string;
  imgUrl: string;
}
