// Applies the migrations in migrations/ that the database does not have yet (npm run migrate, and the
// "migrate" container in docker-compose.yml). Drizzle remembers them in drizzle.__drizzle_migrations.
import "./env.ts";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";

const db = drizzle(process.env.DATABASE_URL ?? "");
await migrate(db, { migrationsFolder: new URL("migrations", import.meta.url).pathname });
await db.$client.end();
console.log("The database is up to date.");
