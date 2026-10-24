// Fills an empty database: the site's content (seed/content.sql) and the first admin user.
// Runs with: npx prisma db seed (also after "prisma migrate reset"). Rows that already exist are left alone.
import { readFileSync } from "node:fs";
import pg from "pg";
import { hashPassword } from "../lib/auth/password.ts";

try {
  process.loadEnvFile();
} catch {}

const client = new pg.Client({ connectionString: process.env.DATABASE_URL });
await client.connect();

const count = async (table: string) => Number((await client.query(`SELECT count(*) FROM ${table}`)).rows[0].count);

if ((await count("link_groups")) === 0) {
  await client.query(readFileSync(new URL("seed/content.sql", import.meta.url), "utf-8"));
  console.log("Seeded the site content.");
}

// admin / zsmp; the admin has to pick a new password after the first sign-in
if ((await count("users")) === 0) {
  await client.query("INSERT INTO users (username, password_hash, must_change_password) VALUES ($1, $2, true)", [
    "admin",
    await hashPassword("zsmp"),
  ]);
  console.log("Created the user admin (password zsmp, must be changed at first sign-in).");
}

await client.end();
