import { User as NextAuthUser } from "next-auth";
import { User as PrismaUser } from "@prisma/client";

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
  user: NextAuthUser;
  userId: string;
  name: string;
  description: string;
  createdDate: Date;
  slug: string;
  imgUrl: string;
  content: string;
  embeddings: string;
  tags: string[];
  docs: Document[];
  isPrivate: boolean;
}

export interface Embeddings {
  id: string;
  content: string;
  content_title: string;
  content_url: string;
  content_tokens: number;
  cog_id: string;
}

export interface SubscriptionPlan {
  id: "basic" | "standard" | "pro";
  name: string;
  description: string;
  features: string[];
  stripePriceId: string;
  price: number;
  isCanceled?: boolean;
}
