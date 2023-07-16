import { PrismaClient as PrismaClientDev } from "@prisma/client/edge";
/**
 * Prisma client with production/development mode.
 * @returns {PrismaClientDev}
 */
let prisma: PrismaClientDev;

if (process.env.NODE_ENV === "development") {
  prisma = new PrismaClientDev();
} else {
  let globalWithPrisma = global as typeof globalThis & {
    prisma: PrismaClientDev;
  };
  if (!globalWithPrisma.prisma) {
    globalWithPrisma.prisma = new PrismaClientDev();
  }
  prisma = globalWithPrisma.prisma;
}

export default prisma;
