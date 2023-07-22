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

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user, account, session }) {
      console.log("jwt callback", token, user, account, session);

      return token;
    },
    async session({ session, token, user }) {
      console.log("session callback", session, token, user);

      return session;
    }
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
