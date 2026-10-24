import { db } from "@/lib/db";
import type { Gallery as GalleryRow } from "@/lib/generated/prisma/client";
import { galleryLabel } from "@/lib/content/format";
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

// Title for a photo folder that has no meta.json
export const getGalleryTitle = async (folder: string) => {
  const row = await (
    await db()
  ).gallery.findFirst({
    where: { OR: [{ folder }, { id: folder, folder: null }], url: null },
  });
  return row ? galleryLabel(toGallery(row)) : undefined;
};
