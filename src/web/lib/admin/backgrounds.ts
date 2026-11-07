import "server-only";
import fs from "node:fs/promises";
import path from "node:path";
import { BACKGROUND_DIR, freeFileName, resolveInside, safeFileName } from "@/lib/media";
import { prisma } from "@/lib/db";

const ALLOWED = /\.(svg|png|webp)$/i;

// Saves an uploaded background to pozadi/ under a URL-safe name that is not taken yet; returns its address.
// An empty file input gives undefined, anything but an SVG, PNG or WebP picture throws with a message for the form.
export const saveBackground = async (file: FormDataEntryValue | null) => {
  if (!(file instanceof File) || file.size === 0) return undefined;
  const name = safeFileName(file.name);
  if (!ALLOWED.test(name)) throw new Error("Nahrát lze jen obrázek SVG, PNG nebo WebP.");
  const content = Buffer.from(await file.arrayBuffer());
  if (name.toLowerCase().endsWith(".svg") && !/<svg[\s>]/i.test(content.subarray(0, 4096).toString("utf-8")))
    throw new Error(`${file.name} není obrázek SVG.`);
  await fs.mkdir(BACKGROUND_DIR, { recursive: true });
  const finalName = await freeFileName(BACKGROUND_DIR, name);
  await fs.writeFile(path.join(BACKGROUND_DIR, finalName), content);
  return `/pozadi/${finalName}`;
};

// Deletes an uploaded picture that no theme uses any more; pictures in public/ (the original three) stay
export const deleteUnusedBackground = async (src: string) => {
  if (!src.startsWith("/pozadi/") || (await prisma.backgroundTheme.count({ where: { src } })) > 0) return;
  const file = resolveInside(BACKGROUND_DIR, [src.slice("/pozadi/".length)]);
  if (file) await fs.rm(file, { force: true });
};
