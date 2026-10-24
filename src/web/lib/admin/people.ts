import "server-only";
import { prisma } from "@/lib/db";

// Every section label in use, alphabetically (Czech order)
export const getLabels = async () => {
  const rows = await prisma.$queryRaw<{ label: string }[]>`
    SELECT DISTINCT unnest(labels) AS label FROM people ORDER BY label`;
  return rows.map((r) => r.label);
};
