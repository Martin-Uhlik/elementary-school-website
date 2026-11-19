// drizzle-kit settings: npm run generate writes a migration for the changes in schema.ts
import { defineConfig } from "drizzle-kit";
import "./env.ts";

export default defineConfig({
  dialect: "postgresql",
  schema: "./schema.ts",
  out: "./migrations",
  dbCredentials: { url: process.env.DATABASE_URL ?? "" },
});
