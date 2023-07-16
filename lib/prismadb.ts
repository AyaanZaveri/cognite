import { PrismaClient } from "@prisma/client/edge";

declare global {
  var prisma: PrismaClient | undefined;
}

let prisma: PrismaClient =
  process.env.NODE_ENV === "production"
    ? new PrismaClient()
    : global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export default prisma;
