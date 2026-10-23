import fs from "node:fs/promises";
import path from "node:path";
import { imageSizeFromFile } from "image-size/fromFile";
import { getGalleryTitle } from "@/lib/content/galleries";

// Galleries live in public/galerie/<id>/: the photos plus an optional meta.json { "title": "..." }.
// Only folders present at build time are served; this moves to the backend with uploads later.
const GALLERY_ROOT = path.join(process.cwd(), "public", "galerie");
const IMAGE_EXT = /\.(jpe?g|png|webp)$/i;

export type GalleryImage = { src: string; width: number; height: number };
export type Gallery = { id: string; title: string; images: GalleryImage[] };

export const listGalleryIds = async (): Promise<string[]> => {
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
