import type { DefaultUser } from "next-auth";

interface Document {
  pageContent: string;
  metadata?: Record<string, any>;
}

export interface Cogs {
  user: string;
  userId: number;
  name: string;
  description: string;
  imgUrl: string;
  slug: string;
  docs: Document[];
}

export interface Cog {
  id: number;
  user: string;
  userId: number;
  name: string;
  description: string;
  createdDate: Date;
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
      id: string;
    };
  }
}
