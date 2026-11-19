import { and, asc, desc, eq, isNull, or } from "drizzle-orm";
import { galleries, gallerySections, type Gallery as GalleryRow } from "@zsmp/db/schema";
import { db } from "@/lib/db";
import { galleryLabel, yearAnchor } from "@/lib/content/format";
import { isoDate } from "@/lib/content/misc";
import type { Gallery, GallerySection, Unit } from "@/lib/content/types";

export const toGallery = (row: GalleryRow): Gallery => ({
  id: row.id,
  folder: row.folder ?? undefined,
  unit: row.unit,
  year: row.year,
  title: row.title,
  date: isoDate(row.date),
  dateText: row.dateText ?? undefined,
  url: row.url ?? undefined,
});

// newest first; galleries of the same day keep the order of their folder names
export const galleryOrder = [desc(galleries.year), desc(galleries.date), asc(galleries.id)];

export const getGalleries = async (unit?: Unit) =>
  (
    await (
      await db()
    )
      .select()
      .from(galleries)
      .where(unit && eq(galleries.unit, unit))
      .orderBy(...galleryOrder)
  ).map(toGallery);

// The section tiles with how many galleries each has and which years they span
export const getGallerySections = async () => {
  const sections: GallerySection[] = await (
    await db()
  )
    .select()
    .from(gallerySections)
    .orderBy(asc(gallerySections.sortOrder));
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
  const [row] = await client
    .select()
    .from(galleries)
    .where(
      and(
        or(eq(galleries.folder, folder), and(eq(galleries.id, folder), isNull(galleries.folder))),
        isNull(galleries.url),
      ),
    )
    .limit(1);
  if (!row) return undefined;
  const [section] = await client.select().from(gallerySections).where(eq(gallerySections.unit, row.unit));
  return {
    title: galleryLabel(toGallery(row)),
    back: section ? `${section.href}#${yearAnchor(row.year)}` : undefined,
  };
};
