"use server";

import fs from "node:fs/promises";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { ActionState } from "@/components/admin/ActionForm";
import { optional, text } from "@/lib/admin/form";
import { deletePhoto, galleryDir } from "@/lib/admin/photos";
import { logActivity } from "@/lib/auth/log";
import { requireUser } from "@/lib/auth/session";
import { galleryFolder } from "@/lib/content/format";
import { toGallery } from "@/lib/content/galleries";
import { prisma } from "@/lib/db";
import type { Unit } from "@/lib/generated/prisma/client";

const UNITS: Unit[] = ["zs", "ms", "druzina"];

// The date orders the galleries and picks the year they are listed under
const readFields = (data: FormData) => {
  const unit = UNITS.find((u) => u === text(data, "unit"));
  const date = text(data, "date");
  const valid = /^\d{4}-\d{2}-\d{2}$/.test(date) && !Number.isNaN(new Date(date).getTime());
  return {
    unit,
    date: valid ? new Date(date) : null,
    year: Number(date.slice(0, 4)),
    title: text(data, "title"),
    dateText: optional(data, "dateText"),
    url: optional(data, "url"),
  };
};

const check = (fields: ReturnType<typeof readFields>) => {
  if (!fields.title) return "Vyplňte název.";
  if (!fields.unit) return "Vyberte, kam galerie patří.";
  if (!fields.date || fields.year < 1990 || fields.year > 2100) return "Vyplňte datum.";
};

// A new gallery: its folder is named after the date like the older ones (20260417, 20260417-2 ...)
export const createGallery = async (data: FormData): Promise<ActionState> => {
  const user = await requireUser({ section: "galerie" });
  const fields = readFields(data);
  const problem = check(fields);
  if (problem || !fields.unit || !fields.date) return { error: problem };

  const base = text(data, "date").replaceAll("-", "");
  const taken = new Set(
    (
      await prisma.gallery.findMany({ where: { id: { startsWith: base } }, select: { id: true, folder: true } })
    ).flatMap((g) => [g.id, g.folder]),
  );
  let id = base;
  for (let i = 2; taken.has(id) || (await fs.stat(galleryDir(id)).catch(() => null)); i++) id = `${base}-${i}`;

  // without a date text the site shows the date itself
  const [year, month, day] = text(data, "date").split("-").map(Number);
  const dateText = fields.dateText ?? `${day}. ${month}. ${year}`;
  await prisma.gallery.create({ data: { ...fields, unit: fields.unit, date: fields.date, dateText, id } });
  if (!fields.url) await fs.mkdir(galleryDir(id), { recursive: true });
  await logActivity(user, "galerie", `Vytvořena galerie „${fields.title}“ (${dateText})`);
  revalidatePath("/", "layout");
  redirect(`/auth/galerie/${id}`);
};

export const updateGallery = async (id: string, data: FormData): Promise<ActionState> => {
  const user = await requireUser({ section: "galerie" });
  const fields = readFields(data);
  const problem = check(fields);
  if (problem || !fields.unit || !fields.date) return { error: problem };
  await prisma.gallery.update({ where: { id }, data: { ...fields, unit: fields.unit, date: fields.date } });
  await logActivity(user, "galerie", `Upravena galerie „${fields.title}“`);
  revalidatePath("/", "layout");
  return { message: "Uloženo." };
};

// Deletes the gallery and its photos (unless another gallery shows the same folder)
export const deleteGallery = async (id: string) => {
  const user = await requireUser({ section: "galerie" });
  const row = await prisma.gallery.findUnique({ where: { id } });
  if (!row) return;
  const gallery = toGallery(row);
  const folder = galleryFolder(gallery);
  await prisma.gallery.delete({ where: { id } });
  const shared = await prisma.gallery.count({ where: { OR: [{ folder }, { id: folder, folder: null }] } });
  if (!gallery.url && shared === 0) await fs.rm(galleryDir(folder), { recursive: true, force: true });
  await logActivity(user, "galerie", `Smazána galerie „${gallery.title}“ (${gallery.dateText ?? gallery.year})`);
  revalidatePath("/", "layout");
  redirect(`/auth/galerie?jednotka=${gallery.unit}`);
};

export const removePhoto = async (id: string, file: string) => {
  const user = await requireUser({ section: "galerie" });
  const row = await prisma.gallery.findUnique({ where: { id } });
  if (!row) return;
  await deletePhoto(galleryFolder(toGallery(row)), file);
  await logActivity(user, "galerie", `Smazána fotka ${file} z galerie „${row.title}“`);
  revalidatePath("/", "layout");
};
