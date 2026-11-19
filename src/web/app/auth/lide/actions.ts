"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { ActionState } from "@/components/admin/ActionForm";
import { lines, optional } from "@/lib/admin/form";
import { neighbour } from "@/lib/admin/order";
import { logActivity } from "@/lib/auth/log";
import { requireUser } from "@/lib/auth/session";
import { personName } from "@/lib/content/format";
import { asc, arrayContains, eq, max } from "drizzle-orm";
import { people, phones as phonesTable, type PhoneKind } from "@zsmp/db/schema";
import { toPerson, withPhones } from "@/lib/content/people";
import { database } from "@/lib/db";

const KINDS: PhoneKind[] = ["internal", "landline", "mobile"];

// Creates (id undefined) or updates a person with their phones and sections
export const savePerson = async (id: string | undefined, data: FormData): Promise<ActionState> => {
  const user = await requireUser({ section: "lide" });
  const labels = [...new Set(data.getAll("labels").map(String))];
  const fields = {
    titleBefore: optional(data, "titleBefore"),
    firstName: optional(data, "firstName"),
    lastName: optional(data, "lastName"),
    titleAfter: optional(data, "titleAfter"),
    name: optional(data, "name"),
    position: optional(data, "position"),
    email: optional(data, "email"),
    description: lines(data, "description"),
    labels,
  };
  if (!fields.lastName && !fields.name) return { error: "Vyplňte příjmení, nebo u kontaktu bez osoby jeho název." };
  if (labels.length === 0) return { error: "Vyberte aspoň jednu sekci, kde se má zobrazit." };

  const numbers = data.getAll("phoneNumber").map((n) => String(n).trim());
  const kinds = data.getAll("phoneKind").map(String);
  const phones = numbers
    .map((number, i) => ({ number, kind: KINDS.find((k) => k === kinds[i]) ?? "landline" }))
    .filter((p) => p.number)
    .map((p, sortOrder) => ({ ...p, sortOrder }));

  await database.transaction(async (tx) => {
    let personId = id;
    if (personId) {
      await tx.update(people).set(fields).where(eq(people.id, personId));
      await tx.delete(phonesTable).where(eq(phonesTable.personId, personId));
    } else {
      const [last] = await tx.select({ sortOrder: max(people.sortOrder) }).from(people);
      [{ id: personId }] = await tx
        .insert(people)
        .values({ ...fields, sortOrder: (last.sortOrder ?? 0) + 1 })
        .returning({ id: people.id });
    }
    if (phones.length > 0) await tx.insert(phonesTable).values(phones.map((p) => ({ ...p, personId: personId! })));
  });
  const name = fields.lastName ? [fields.firstName, fields.lastName].filter(Boolean).join(" ") : fields.name;
  await logActivity(user, "lide", `${id ? "Upravena" : "Přidána"} osoba „${name}“`);
  revalidatePath("/", "layout");
  redirect(`/auth/lide${labels.length === 1 ? `?sekce=${encodeURIComponent(labels[0])}` : ""}`);
};

export const deletePerson = async (id: string) => {
  const user = await requireUser({ section: "lide" });
  const row = await database.query.people.findFirst({ where: eq(people.id, id), with: withPhones });
  if (!row) return;
  await database.delete(people).where(eq(people.id, id));
  const person = toPerson(row);
  await logActivity(user, "lide", `Smazána osoba „${personName(person)}“`);
  revalidatePath("/", "layout");
};

// Moves a person within the list shown (one section, or everyone)
export const movePerson = async (id: string, label: string | undefined, direction: "up" | "down") => {
  const user = await requireUser({ section: "lide" });
  const rows = await database
    .select({ id: people.id, sortOrder: people.sortOrder })
    .from(people)
    .where(label ? arrayContains(people.labels, [label]) : undefined)
    .orderBy(asc(people.sortOrder));
  const pair = neighbour(rows, id, direction);
  if (!pair) return;
  const [a, b] = pair;
  await database.transaction(async (tx) => {
    await tx.update(people).set({ sortOrder: b.sortOrder }).where(eq(people.id, a.id));
    await tx.update(people).set({ sortOrder: a.sortOrder }).where(eq(people.id, b.id));
  });
  const row = await database.query.people.findFirst({ where: eq(people.id, id), with: withPhones });
  if (!row) return;
  const person = toPerson(row);
  await logActivity(user, "lide", `Posunuta ${direction === "up" ? "nahoru" : "dolů"} osoba „${personName(person)}“`);
  revalidatePath("/", "layout");
};
