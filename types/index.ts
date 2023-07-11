import type { DefaultUser } from "next-auth";

export interface IUser {
  _id: string;
  email: string;
  name: string;
}

interface Document {
  pageContent: string;
  metadata?: Record<string, any>;
}

export interface Cogs {
  user: string;
  userId: number;
  name: string;
  description: string;
  type: string;
  slug: string;
  imgUrl: string;
  docs: Document[];
}

export interface Cog {
  id: number;
  user: string;
  userId: number;
  name: string;
  description: string;
  createdDate: Date;
  type: string;
  slug: string;
  imgUrl: string;
  content: string;
  embeddings: string;
  docs: Document[];
}

export interface Embeddings {
  id: number;
  content: string;
  content_title: string;
  content_url: string;
  content_tokens: number;
  cog_id: number;
}

declare module "next-auth" {
  interface Session {
    user?: DefaultUser & {
      id: number;
    };
  }
}
