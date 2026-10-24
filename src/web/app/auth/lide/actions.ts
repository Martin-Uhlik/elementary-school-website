"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { ActionState } from "@/components/admin/ActionForm";
import { lines, optional } from "@/lib/admin/form";
import { neighbour } from "@/lib/admin/order";
import { requireUser } from "@/lib/auth/session";
import { prisma } from "@/lib/db";
import type { PhoneKind } from "@/lib/generated/prisma/client";

const KINDS: PhoneKind[] = ["internal", "landline", "mobile"];

// Creates (id undefined) or updates a person with their phones and sections
export const savePerson = async (id: string | undefined, data: FormData): Promise<ActionState> => {
  await requireUser();
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

  if (id) {
    await prisma.$transaction([
      prisma.phone.deleteMany({ where: { personId: id } }),
      prisma.person.update({ where: { id }, data: { ...fields, phones: { create: phones } } }),
    ]);
  } else {
    const last = await prisma.person.aggregate({ _max: { sortOrder: true } });
    await prisma.person.create({
      data: { ...fields, sortOrder: (last._max.sortOrder ?? 0) + 1, phones: { create: phones } },
    });
  }
  revalidatePath("/", "layout");
  redirect(`/auth/lide${labels.length === 1 ? `?sekce=${encodeURIComponent(labels[0])}` : ""}`);
};

export const deletePerson = async (id: string) => {
  await requireUser();
  await prisma.person.delete({ where: { id } });
  revalidatePath("/", "layout");
};

// Moves a person within the list shown (one section, or everyone)
export const movePerson = async (id: string, label: string | undefined, direction: "up" | "down") => {
  await requireUser();
  const rows = await prisma.person.findMany({
    where: label ? { labels: { has: label } } : undefined,
    orderBy: { sortOrder: "asc" },
    select: { id: true, sortOrder: true },
  });
  const pair = neighbour(rows, id, direction);
  if (!pair) return;
  const [a, b] = pair;
  await prisma.$transaction([
    prisma.person.update({ where: { id: a.id }, data: { sortOrder: b.sortOrder } }),
    prisma.person.update({ where: { id: b.id }, data: { sortOrder: a.sortOrder } }),
  ]);
  revalidatePath("/", "layout");
};
