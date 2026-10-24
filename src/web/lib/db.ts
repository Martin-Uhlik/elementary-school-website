import "server-only";
import { PrismaPg } from "@prisma/adapter-pg";
import { connection } from "next/server";
import { PrismaClient } from "@/lib/generated/prisma/client";

// One client for the whole server; in development it survives hot reloads on globalThis
const globalForPrisma = globalThis as unknown as { prisma?: InstanceType<typeof PrismaClient> };

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }) });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// The database is read on every request (never at build time), so changes from /auth show up right away
export const db = async () => {
  await connection();
  return prisma;
};
