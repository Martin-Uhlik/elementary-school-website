import { db } from "@/lib/db";
import type { Gallery as GalleryRow } from "@/lib/generated/prisma/client";
import { galleryLabel, yearAnchor } from "@/lib/content/format";
import type { Gallery, GallerySection, Unit } from "@/lib/content/types";

export const toGallery = (row: GalleryRow): Gallery => ({
  id: row.id,
  folder: row.folder ?? undefined,
  unit: row.unit,
  year: row.year,
  title: row.title,
  dateText: row.dateText ?? undefined,
  url: row.url ?? undefined,
});

const getGalleries = async (unit?: Unit) =>
  (await (await db()).gallery.findMany({ where: { unit }, orderBy: [{ year: "desc" }, { sortOrder: "asc" }] })).map(
    toGallery,
  );

// The section tiles with how many galleries each has and which years they span
export const getGallerySections = async () => {
  const sections: GallerySection[] = await (await db()).gallerySection.findMany({ orderBy: { sortOrder: "asc" } });
  const galleries = await getGalleries();
  return sections.map(({ unit, title, href, cover }) => {
    const items = galleries.filter((g) => g.unit === unit);
    const years = items.map((g) => g.year);
    return { unit, title, href, cover, count: items.length, from: Math.min(...years), to: Math.max(...years) };
  });
};

// The whole archive of one unit grouped by year, newest year first
export const getGalleryArchive = async (unit: Unit) => {
  const years = new Map<number, Gallery[]>();
  for (const gallery of await getGalleries(unit)) {
    years.set(gallery.year, [...(years.get(gallery.year) ?? []), gallery]);
  }
  return [...years].map(([year, items]) => ({ year, galleries: items }));
};

// Title of a photo folder (when it has no meta.json) and the year of its archive page to go back to
export const getGalleryEntry = async (folder: string) => {
  const client = await db();
  const row = await client.gallery.findFirst({
    where: { OR: [{ folder }, { id: folder, folder: null }], url: null },
  });
  if (!row) return undefined;
  const section = await client.gallerySection.findUnique({ where: { unit: row.unit } });
  return {
    title: galleryLabel(toGallery(row)),
    back: section ? `${section.href}#${yearAnchor(row.year)}` : undefined,
  };
};
