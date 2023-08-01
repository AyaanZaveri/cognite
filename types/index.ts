import { User } from "next-auth";

interface Document {
  pageContent: string;
  metadata?: Record<string, any>;
}

export interface Cogs {
  userId: string;
  name: string;
  description: string;
  slug: string;
}

export interface CogDocs {
  userId: string;
  name: string;
  description: string;
  imgUrl: string;
  slug: string;
  docs: Document[];
}

export interface Tag {
  id: string;
  name: string;
}

export interface Cog {
  id: string;
  user: User;
  userId: string;
  name: string;
  description: string;
  createdDate: Date;
  slug: string;
  imgUrl: string;
  content: string;
  embeddings: string;
  tags: Tag[];
  docs: Document[];
}

export interface Embeddings {
  id: string;
  content: string;
  content_title: string;
  content_url: string;
  content_tokens: number;
  cog_id: string;
}
