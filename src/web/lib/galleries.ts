import fs from "node:fs/promises";
import path from "node:path";
import { connection } from "next/server";
import { imageSizeFromFile } from "image-size/fromFile";
import { getGalleryTitle } from "@/lib/content/galleries";

// Galleries live in public/galerie/<id>/: the photos plus an optional meta.json { "title": "..." }.
// The folders are read on every request, so pages using them render on request; in Docker the folder is mounted
// from the host. New photo files are served after a restart of the web container (Next lists public/ at start).
const GALLERY_ROOT = path.join(process.cwd(), "public", "galerie");
const IMAGE_EXT = /\.(jpe?g|png|webp)$/i;

export type GalleryImage = { src: string; width: number; height: number };
export type Gallery = { id: string; title: string; images: GalleryImage[] };

export const listGalleryIds = async (): Promise<string[]> => {
  // render on request, not at build time
  await connection();
  try {
    const entries = await fs.readdir(GALLERY_ROOT, { withFileTypes: true });
    return entries.filter((e) => e.isDirectory()).map((e) => e.name);
  } catch {
    return [];
  }
};

export const getGallery = async (id: string): Promise<Gallery | null> => {
  if (!(await listGalleryIds()).includes(id)) return null;
  const dir = path.join(GALLERY_ROOT, id);

  // meta.json wins, then the title from the gallery list in data/, then the folder name
  let title = (await getGalleryTitle(id)) ?? id;
  try {
    title = JSON.parse(await fs.readFile(path.join(dir, "meta.json"), "utf-8")).title ?? title;
  } catch {}

  const files = (await fs.readdir(dir)).filter((f) => IMAGE_EXT.test(f) && !f.startsWith("thn")).sort();
  const images = await Promise.all(
    files.map(async (file) => {
      const { width, height } = await imageSizeFromFile(path.join(dir, file));
      return { src: `/galerie/${encodeURIComponent(id)}/${encodeURIComponent(file)}`, width, height };
    }),
  );
  return { id, title, images };
};

// A few photos per folder for the hover preview on the archive cards; thumbnails (thn*) when the folder has them
export const getGalleryPreviews = async (folders: string[], count = 4): Promise<Record<string, string[]>> => {
  const present = new Set(await listGalleryIds());
  const entries = await Promise.all(
    folders
      .filter((folder) => present.has(folder))
      .map(async (folder) => {
        const files = (await fs.readdir(path.join(GALLERY_ROOT, folder))).filter((f) => IMAGE_EXT.test(f)).sort();
        const thumbs = files.filter((f) => f.startsWith("thn"));
        const picked = (thumbs.length > 0 ? thumbs : files).slice(0, count);
        return [folder, picked.map((f) => `/galerie/${encodeURIComponent(folder)}/${encodeURIComponent(f)}`)] as const;
      }),
  );
  return Object.fromEntries(entries);
};
