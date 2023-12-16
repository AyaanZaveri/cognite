import { Certificate } from "aws-cdk-lib/aws-certificatemanager";
import { SSTConfig } from "sst";
import { NextjsSite as SSTNextjsSite } from "sst/constructs";

class NextjsSite extends SSTNextjsSite {
  protected supportsStreaming(): boolean {
    return true;
  }
}

export default {
  config(_input) {
    return {
      name: "cognite",
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
          MY_GITHUB_CLIENT_SECRET: process.env
            .MY_GITHUB_CLIENT_SECRET as string,
          GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
          GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET as string,
          DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID as string,
          DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET as string,
          NEXTAUTH_URL: process.env.NEXTAUTH_URL as string,
          NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET as string,
          DATABASE_URL: process.env.DATABASE_URL as string,
          MIGRATE_DATABASE_URL: process.env.MIGRATE_DATABASE_URL as string,
          DIRECT_URL: process.env.DIRECT_URL as string,
          STRIPE_API_KEY: process.env.STRIPE_API_KEY as string,
          STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET as string,
          STRIPE_STANDARD_MONTHLY_PLAN_ID: process.env
            .STRIPE_STANDARD_MONTHLY_PLAN_ID as string,
          STRIPE_PRO_MONTHLY_PLAN_ID: process.env
            .STRIPE_PRO_MONTHLY_PLAN_ID as string,
          AWS_CERT_ARN: process.env.AWS_CERT_ARN as string,
        },
        customDomain: {
          isExternalDomain: true,
          domainName: "cognite.app",
          cdk: {
            // @ts-ignore
            certificate: Certificate.fromCertificateArn(
              stack,
              "cert",
              process.env.AWS_CERT_ARN!
            ),
          },
        },
        buildCommand: "npx open-next@3.0.0-rc.2 build --streaming",
        timeout: 30,
      });

      stack.addOutputs({
        siteUrl: site.customDomainUrl || site.url,
        siteId: site.id,
      });
    });

    app.setDefaultFunctionProps({
      timeout: 30,
      runtime: "nodejs18.x",
      architecture: "arm_64",
    });
  },
} satisfies SSTConfig;
