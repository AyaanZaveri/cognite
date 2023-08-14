import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { nanoid } from "nanoid";
import {
  Account,
  NextAuthOptions,
  Session,
  User,
  getServerSession,
} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord";
import GithubProvider from "next-auth/providers/github";
import { generateUsername } from "friendly-username-generator";
import { Github } from "lucide-react";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    GithubProvider({
      clientId: process.env.MY_GITHUB_CLIENT_ID!,
      clientSecret: process.env.MY_GITHUB_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
        session.user.username = token.username as string;
        session.user.bio = token.bio as string;
        session.user.createdDate = token.createdDate as string;
      }

      return session;
    },
    async jwt({ token, user }) {
      const dbUser = await prisma.user.findFirst({
        where: {
          email: token.email,
        },
      });

      if (!dbUser) {
        token.id = user!.id;
        return token;
      }

      if (!dbUser.username) {
        await prisma.user.update({
          where: {
            id: dbUser.id,
          },
          data: {
            username: generateUsername(),
          },
        });
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
        username: dbUser.username,
        bio: dbUser.bio,
        createdDate: dbUser.createdDate,
      };
    },
  },
};

async function updateUser(user: User, account: Account) {
  //
  // handle username so it is less than 15 chars for zod validation
  let username = (user.username as string).substring(0, 6);

  switch (account.provider) {
    case "google":
      username = `go_${username}`;
      break;
    case "facebook":
      username = `fb_${username}`;
      break;
  }

  const data = {
    provider: account.provider,
    username,
  } as any;

  if (!user.email) {
    data.email = `${data.username}@non-existing-facebook-email.com`;
  }

  await prisma.user.update({
    where: { id: user.id },
    data,
  });

  return data;
}

export const getAuthSession = () => getServerSession(authOptions);
