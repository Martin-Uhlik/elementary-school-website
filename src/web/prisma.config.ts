// Prisma CLI settings: npx prisma migrate dev / migrate deploy / db seed
import { defineConfig } from "prisma/config";

// DATABASE_URL comes from the environment, or from .env on a dev machine
try {
  process.loadEnvFile();
} catch {}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "node --disable-warning=MODULE_TYPELESS_PACKAGE_JSON prisma/seed.ts",
  },
  datasource: {
    url: process.env.DATABASE_URL ?? "",
  },
});
