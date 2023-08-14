import { SSTConfig } from "sst";
import { NextjsSite } from "sst/constructs";

export default {
  config(_input) {
    return {
      name: "cognition",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const site = new NextjsSite(stack, "site", {
        environment: {
          NEXT_PUBLIC_OPENAI_API_KEY: process.env
            .NEXT_PUBLIC_OPENAI_API_KEY as string,
          NEXT_PUBLIC_OPENAI_ENDPOINT: process.env
            .NEXT_PUBLIC_OPENAI_ENDPOINT as string,
          NEXT_PUBLIC_OPENAI_API_KEY_CHAT: process.env
            .NEXT_PUBLIC_OPENAI_API_KEY_CHAT as string,
          NEXT_PUBLIC_OPENAI_ENDPOINT_CHAT: process.env
            .NEXT_PUBLIC_OPENAI_ENDPOINT_CHAT as string,
          MY_GITHUB_CLIENT_ID: process.env.MY_GITHUB_CLIENT_ID as string,
          MY_GITHUB_CLIENT_SECRET: process.env.MY_GITHUB_CLIENT_SECRET as string,
          GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
          GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET as string,
          DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID as string,
          DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET as string,
          NEXTAUTH_URL: process.env.NEXTAUTH_URL as string,
          NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET as string,
          DATABASE_URL: process.env.DATABASE_URL as string,
          MIGRATE_DATABASE_URL: process.env.MIGRATE_DATABASE_URL as string,
          DIRECT_URL: process.env.DIRECT_URL as string,
        },
        edge: true,
      });

      stack.addOutputs({
        SiteUrl: site.url,
      });
    });
  },
} satisfies SSTConfig;
