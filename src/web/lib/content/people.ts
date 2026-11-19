import { arrayContains, asc } from "drizzle-orm";
import { people, phones, type Person as PersonRow, type Phone as PhoneRow } from "@zsmp/db/schema";
import { db } from "@/lib/db";
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

export const withPhones = { phones: { orderBy: asc(phones.sortOrder) } };

// Everyone with a label, in display order
export const getPeople = async (label: string) =>
  (
    await (
      await db()
    ).query.people.findMany({
      where: arrayContains(people.labels, [label]),
      orderBy: [asc(people.sortOrder)],
      with: withPhones,
    })
  ).map(toPerson);
