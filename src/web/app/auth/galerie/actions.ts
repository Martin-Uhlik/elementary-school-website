"use server";

import fs from "node:fs/promises";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { ActionState } from "@/components/admin/ActionForm";
import { optional, text } from "@/lib/admin/form";
import { neighbour } from "@/lib/admin/order";
import { deletePhoto, galleryDir } from "@/lib/admin/photos";
import { requireUser } from "@/lib/auth/session";
import { galleryFolder } from "@/lib/content/format";
import { toGallery } from "@/lib/content/galleries";
import { prisma } from "@/lib/db";
import type { Unit } from "@/lib/generated/prisma/client";

const UNITS: Unit[] = ["zs", "ms", "druzina"];

const readFields = (data: FormData) => {
  const unit = UNITS.find((u) => u === text(data, "unit"));
  const year = Number(text(data, "year"));
  return { unit, year, title: text(data, "title"), dateText: optional(data, "dateText"), url: optional(data, "url") };
};

// A new gallery: its folder is named after the date like the older ones (20260417, 20260417-2 ...)
export const createGallery = async (data: FormData): Promise<ActionState> => {
  await requireUser();
  const date = text(data, "date");
  const fields = readFields(data);
  if (!fields.title) return { error: "Vyplňte název." };
  if (!fields.unit) return { error: "Vyberte, kam galerie patří." };
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return { error: "Vyplňte datum." };

  const [year, month, day] = date.split("-").map(Number);
  const base = date.replaceAll("-", "");
  const taken = new Set(
    (
      await prisma.gallery.findMany({ where: { id: { startsWith: base } }, select: { id: true, folder: true } })
    ).flatMap((g) => [g.id, g.folder]),
  );
  let id = base;
  for (let i = 2; taken.has(id) || (await fs.stat(galleryDir(id)).catch(() => null)); i++) id = `${base}-${i}`;

  // newest first: a new gallery goes to the top of its year
  const first = await prisma.gallery.aggregate({ _min: { sortOrder: true } });
  await prisma.gallery.create({
    data: {
      ...fields,
      unit: fields.unit,
      id,
      year,
      dateText: fields.dateText ?? `${day}. ${month}. ${year}`,
      sortOrder: (first._min.sortOrder ?? 0) - 1,
    },
  });
  if (!fields.url) await fs.mkdir(galleryDir(id), { recursive: true });
  revalidatePath("/", "layout");
  redirect(`/auth/galerie/${id}`);
};

export const updateGallery = async (id: string, data: FormData): Promise<ActionState> => {
  await requireUser();
  const fields = readFields(data);
  if (!fields.title) return { error: "Vyplňte název." };
  if (!fields.unit) return { error: "Vyberte, kam galerie patří." };
  if (!Number.isInteger(fields.year) || fields.year < 1990 || fields.year > 2100) return { error: "Zadejte rok." };
  await prisma.gallery.update({ where: { id }, data: { ...fields, unit: fields.unit } });
  revalidatePath("/", "layout");
  return { message: "Uloženo." };
};

// Deletes the gallery and its photos (unless another gallery shows the same folder)
export const deleteGallery = async (id: string) => {
  await requireUser();
  const row = await prisma.gallery.findUnique({ where: { id } });
  if (!row) return;
  const gallery = toGallery(row);
  const folder = galleryFolder(gallery);
  await prisma.gallery.delete({ where: { id } });
  const shared = await prisma.gallery.count({ where: { OR: [{ folder }, { id: folder, folder: null }] } });
  if (!gallery.url && shared === 0) await fs.rm(galleryDir(folder), { recursive: true, force: true });
  revalidatePath("/", "layout");
  redirect(`/auth/galerie?jednotka=${gallery.unit}&rok=${gallery.year}`);
};

export const removePhoto = async (id: string, file: string) => {
  await requireUser();
  const row = await prisma.gallery.findUnique({ where: { id } });
  if (!row) return;
  await deletePhoto(galleryFolder(toGallery(row)), file);
  revalidatePath("/", "layout");
};

// Moves a gallery within its unit and year
export const moveGallery = async (id: string, direction: "up" | "down") => {
  await requireUser();
  const row = await prisma.gallery.findUnique({ where: { id } });
  if (!row) return;
  const rows = await prisma.gallery.findMany({
    where: { unit: row.unit, year: row.year },
    orderBy: { sortOrder: "asc" },
    select: { id: true, sortOrder: true },
  });
  const pair = neighbour(rows, id, direction);
  if (!pair) return;
  const [a, b] = pair;
  await prisma.$transaction([
    prisma.gallery.update({ where: { id: a.id }, data: { sortOrder: b.sortOrder } }),
    prisma.gallery.update({ where: { id: b.id }, data: { sortOrder: a.sortOrder } }),
  ]);
  revalidatePath("/", "layout");
};
