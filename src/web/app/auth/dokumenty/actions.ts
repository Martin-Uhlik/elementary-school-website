"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { ActionState } from "@/components/admin/ActionForm";
import { saveDocument } from "@/lib/admin/documents";
import { errorMessage, lines, optional, text } from "@/lib/admin/form";
import { neighbour } from "@/lib/admin/order";
import { requireUser } from "@/lib/auth/session";
import { prisma } from "@/lib/db";

// Creates (id undefined) or updates a link in a group; an uploaded file replaces the address
export const saveLink = async (groupId: string, id: string | undefined, data: FormData): Promise<ActionState> => {
  await requireUser();
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
    await prisma.link.update({ where: { id }, data: fields });
  } else {
    // a new item goes to the top or to the end of the list
    const edge = await prisma.link.aggregate({
      where: { groupId },
      _min: { sortOrder: true },
      _max: { sortOrder: true },
    });
    const sortOrder = data.get("position") === "top" ? (edge._min.sortOrder ?? 0) - 1 : (edge._max.sortOrder ?? 0) + 1;
    await prisma.link.create({ data: { ...fields, groupId, sortOrder } });
  }
  revalidatePath("/", "layout");
  redirect(`/auth/dokumenty/${groupId}`);
};

export const deleteLink = async (id: string) => {
  await requireUser();
  await prisma.link.delete({ where: { id } });
  revalidatePath("/", "layout");
};

export const moveLink = async (groupId: string, id: string, direction: "up" | "down") => {
  await requireUser();
  const rows = await prisma.link.findMany({
    where: { groupId },
    orderBy: { sortOrder: "asc" },
    select: { id: true, sortOrder: true },
  });
  const pair = neighbour(rows, id, direction);
  if (!pair) return;
  const [a, b] = pair;
  await prisma.$transaction([
    prisma.link.update({ where: { id: a.id }, data: { sortOrder: b.sortOrder } }),
    prisma.link.update({ where: { id: b.id }, data: { sortOrder: a.sortOrder } }),
  ]);
  revalidatePath("/", "layout");
};

export const renameGroup = async (id: string, data: FormData): Promise<ActionState> => {
  await requireUser();
  await prisma.linkGroup.update({ where: { id }, data: { title: optional(data, "title") } });
  revalidatePath("/", "layout");
  return { message: "Nadpis byl uložen." };
};
