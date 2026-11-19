import "server-only";
import { sql } from "drizzle-orm";
import { database } from "@/lib/db";

// Every section label in use, alphabetically (Czech order)
export const getLabels = async () => {
  const { rows } = await database.execute<{ label: string }>(
    sql`SELECT DISTINCT unnest(labels) AS label FROM people ORDER BY label`,
  );
  return rows.map((r) => r.label);
};
