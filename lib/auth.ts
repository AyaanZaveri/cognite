import { db } from "@/lib/db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import {
  NextAuthOptions,
  getServerSession,
} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord";
import GithubProvider from "next-auth/providers/github";
import { generateUsername } from "friendly-username-generator";
import { updateUserImage } from "./user";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
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
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
      });

      if (!dbUser) {
        token.id = user!.id;
        return token;
      }

      if (!dbUser.username) {
        await db.user.update({
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
    async signIn({ user, profile }) {
      let currentImage = user?.image;
      let profileImg = profile?.picture;

      console.log("signIn", currentImage, profileImg);

      if (currentImage !== profileImg) {
        console.log("soo soo");
        await updateUserImage(user.id, profileImg!);
        user.image = profileImg;
      }
      return true;
    },
  },
};

export const getAuthSession = () => getServerSession(authOptions);
