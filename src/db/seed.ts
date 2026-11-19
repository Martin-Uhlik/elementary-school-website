// Fills an empty database: the site's content (seed/content.sql) and the first admin user.
// Runs with: npm run seed (after npm run migrate). Rows that already exist are left alone.
import { readFileSync } from "node:fs";
import pg from "pg";
import "./env.ts";

// scrypt of "zsmp" in the format of web/lib/auth/password.ts; it is public and has to be changed at the first sign-in
const ADMIN_PASSWORD_HASH =
  "scrypt$a458d2d7095467115159bf32d22da71d$bee96766b8915e6626bf9ab2d161a967a49f9cd0d2fbc7296645752a522749f154f31728eeff98d37421bfb9414a29e9e3a2b2e415af18f44dd88966d0e01634";

const client = new pg.Client({ connectionString: process.env.DATABASE_URL });
await client.connect();

const count = async (table: string) => Number((await client.query(`SELECT count(*) FROM ${table}`)).rows[0].count);

if ((await count("link_groups")) === 0) {
  await client.query(readFileSync(new URL("seed/content.sql", import.meta.url), "utf-8"));
  console.log("Seeded the site content.");
}

// admin / zsmp with access to everything; the admin has to pick a new password after the first sign-in
if ((await count("users")) === 0) {
  await client.query(
    "INSERT INTO users (username, password_hash, must_change_password, permissions) VALUES ($1, $2, true, $3)",
    ["admin", ADMIN_PASSWORD_HASH, "{aktuality,lide,dokumenty,galerie,kalendar,pozadi,admin}"],
  );
  console.log("Created the user admin (password zsmp, must be changed at first sign-in).");
}

await client.end();
