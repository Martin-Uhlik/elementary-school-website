import "server-only";
import { drizzle } from "drizzle-orm/node-postgres";
import { connection } from "next/server";
import { Pool } from "pg";
import * as schema from "@zsmp/db/schema";

// One connection pool for the whole server; in development it survives hot reloads on globalThis
const globalForDb = globalThis as unknown as { pool?: Pool };

const pool = globalForDb.pool ?? new Pool({ connectionString: process.env.DATABASE_URL });

if (process.env.NODE_ENV !== "production") globalForDb.pool = pool;

export const database = drizzle({ client: pool, schema });

// The database is read on every request (never at build time), so changes from /auth show up right away
export const db = async () => {
  await connection();
  return database;
};
