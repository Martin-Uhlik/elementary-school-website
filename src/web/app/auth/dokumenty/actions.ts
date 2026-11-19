"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { ActionState } from "@/components/admin/ActionForm";
import { saveDocument } from "@/lib/admin/documents";
import { errorMessage, lines, optional, text } from "@/lib/admin/form";
import { neighbour } from "@/lib/admin/order";
import { logActivity } from "@/lib/auth/log";
import { requireUser } from "@/lib/auth/session";
import { asc, eq, max, min } from "drizzle-orm";
import { linkGroups, links } from "@zsmp/db/schema";
import { database } from "@/lib/db";

// Creates (id undefined) or updates a link in a group; an uploaded file replaces the address
export const saveLink = async (groupId: string, id: string | undefined, data: FormData): Promise<ActionState> => {
  const user = await requireUser({ section: "dokumenty" });
  const title = text(data, "title");
  if (!title) return { error: "Vyplňte název." };
  let href = optional(data, "href");
  try {
    href = (await saveDocument(data.get("file"))) ?? href;
  } catch (error) {
    return { error: errorMessage(error) };
  }
  const fields = { title, href, description: lines(data, "description"), details: optional(data, "details") };

  if (id) {
    await database.update(links).set(fields).where(eq(links.id, id));
  } else {
    // a new item goes to the top or to the end of the list
    const [edge] = await database
      .select({ first: min(links.sortOrder), last: max(links.sortOrder) })
      .from(links)
      .where(eq(links.groupId, groupId));
    const sortOrder = data.get("position") === "top" ? (edge.first ?? 0) - 1 : (edge.last ?? 0) + 1;
    await database.insert(links).values({ ...fields, groupId, sortOrder });
  }
  await logActivity(user, "dokumenty", `${id ? "Upravena" : "Přidána"} položka „${title}“ (${groupId})`);
  revalidatePath("/", "layout");
  redirect(`/auth/dokumenty/${groupId}`);
};

export const deleteLink = async (id: string) => {
  const user = await requireUser({ section: "dokumenty" });
  const [link] = await database.delete(links).where(eq(links.id, id)).returning();
  if (!link) return;
  await logActivity(user, "dokumenty", `Smazána položka „${link.title}“ (${link.groupId})`);
  revalidatePath("/", "layout");
};

export const moveLink = async (groupId: string, id: string, direction: "up" | "down") => {
  const user = await requireUser({ section: "dokumenty" });
  const rows = await database
    .select({ id: links.id, sortOrder: links.sortOrder, title: links.title })
    .from(links)
    .where(eq(links.groupId, groupId))
    .orderBy(asc(links.sortOrder));
  const pair = neighbour(rows, id, direction);
  if (!pair) return;
  const [a, b] = pair;
  await database.transaction(async (tx) => {
    await tx.update(links).set({ sortOrder: b.sortOrder }).where(eq(links.id, a.id));
    await tx.update(links).set({ sortOrder: a.sortOrder }).where(eq(links.id, b.id));
  });
  await logActivity(
    user,
    "dokumenty",
    `Posunuta ${direction === "up" ? "nahoru" : "dolů"} položka „${a.title}“ (${groupId})`,
  );
  revalidatePath("/", "layout");
};

export const renameGroup = async (id: string, data: FormData): Promise<ActionState> => {
  const user = await requireUser({ section: "dokumenty" });
  const title = optional(data, "title");
  await database.update(linkGroups).set({ title }).where(eq(linkGroups.id, id));
  await logActivity(user, "dokumenty", `Změněn nadpis skupiny ${id} na „${title ?? ""}“`);
  revalidatePath("/", "layout");
  return { message: "Nadpis byl uložen." };
};
