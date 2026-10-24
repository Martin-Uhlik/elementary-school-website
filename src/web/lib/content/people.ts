import { db } from "@/lib/db";
import type { Person as PersonRow, Phone as PhoneRow } from "@/lib/generated/prisma/client";
import type { Person } from "@/lib/content/types";

export const toPerson = (row: PersonRow & { phones: PhoneRow[] }): Person => ({
  id: row.id,
  titleBefore: row.titleBefore ?? undefined,
  firstName: row.firstName ?? undefined,
  lastName: row.lastName ?? undefined,
  titleAfter: row.titleAfter ?? undefined,
  name: row.name ?? undefined,
  labels: row.labels,
  position: row.position ?? undefined,
  email: row.email ?? undefined,
  phones: row.phones.map((p) => ({ kind: p.kind, number: p.number })),
  description: row.description,
});

export const personInclude = { phones: { orderBy: { sortOrder: "asc" } } } as const;

// Everyone with a label, in display order
export const getPeople = async (label: string) =>
  (
    await (
      await db()
    ).person.findMany({
      where: { labels: { has: label } },
      orderBy: { sortOrder: "asc" },
      include: personInclude,
    })
  ).map(toPerson);
