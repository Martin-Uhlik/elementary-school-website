import fs from "node:fs/promises";
import path from "node:path";
import { connection } from "next/server";
import { imageSizeFromFile } from "image-size/fromFile";
import { getGalleryEntry } from "@/lib/content/galleries";
import { GALLERY_DIR, THUMBNAIL_FOLDER } from "@/lib/media";

// Galleries live in galerie/<folder>/ of the media folder: the photos, their previews in thumbnails/ and an optional
// meta.json { "title": "..." }. Older galleries may have thn* previews next to the photos instead.
const IMAGE_EXT = /\.(jpe?g|png|webp)$/i;

// src = the full photo, thumb = its preview (the full photo when there is none)
export type GalleryImage = { src: string; thumb: string; width: number; height: number };
// back = the archive page (and year) the gallery is listed on
export type Gallery = { id: string; title: string; back: string; images: GalleryImage[] };

const url = (folder: string, ...parts: string[]) => `/galerie/${[folder, ...parts].map(encodeURIComponent).join("/")}`;

const readDir = async (dir: string) => {
  try {
    return await fs.readdir(dir);
  } catch {
    return [];
  }
};

// The full photos of a folder, sorted by name
export const listPhotos = async (folder: string) =>
  (await readDir(path.join(GALLERY_DIR, folder))).filter((f) => IMAGE_EXT.test(f) && !f.startsWith("thn")).sort();

const isFolder = async (folder: string) => {
  // render on request, not at build time
  await connection();
  if (folder.includes("/") || folder.includes("\\") || folder.startsWith(".")) return false;
  return (await fs.stat(path.join(GALLERY_DIR, folder)).catch(() => null))?.isDirectory() ?? false;
};

export const getGallery = async (id: string): Promise<Gallery | null> => {
  if (!(await isFolder(id))) return null;
  const dir = path.join(GALLERY_DIR, id);

  // meta.json wins, then the title from the database, then the folder name
  const entry = await getGalleryEntry(id);
  let title = entry?.title ?? id;
  try {
    title = JSON.parse(await fs.readFile(path.join(dir, "meta.json"), "utf-8")).title ?? title;
  } catch {}

  const thumbs = new Set(await readDir(path.join(dir, THUMBNAIL_FOLDER)));
  const images = await Promise.all(
    (await listPhotos(id)).map(async (file) => {
      const { width, height } = await imageSizeFromFile(path.join(dir, file));
      const src = url(id, file);
      return { src, thumb: thumbs.has(file) ? url(id, THUMBNAIL_FOLDER, file) : src, width, height };
    }),
  );
  return { id, title, back: entry?.back ?? "/foto-video", images };
};

// A few previews per folder for the hover effect on the archive cards
export const getGalleryPreviews = async (folders: string[], count = 4): Promise<Record<string, string[]>> => {
  await connection();
  const entries = await Promise.all(
    folders.map(async (folder) => {
      const thumbs = (await readDir(path.join(GALLERY_DIR, folder, THUMBNAIL_FOLDER))).filter((f) => IMAGE_EXT.test(f));
      if (thumbs.length > 0)
        return [
          folder,
          thumbs
            .sort()
            .slice(0, count)
            .map((f) => url(folder, THUMBNAIL_FOLDER, f)),
        ];
      const files = (await readDir(path.join(GALLERY_DIR, folder))).filter((f) => IMAGE_EXT.test(f)).sort();
      const old = files.filter((f) => f.startsWith("thn"));
      return [folder, (old.length > 0 ? old : files).slice(0, count).map((f) => url(folder, f))];
    }),
  );
  return Object.fromEntries(entries.filter(([, list]) => list.length > 0));
};
