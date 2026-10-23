import { galleries } from "@/data/galleries";
import { gallerySections } from "@/data/gallerySections";
import type { Gallery, Unit } from "@/data/types";

export const galleryHref = (gallery: Gallery) => gallery.url ?? `/galerie/${gallery.folder ?? gallery.id}`;

export const galleryLabel = (gallery: Gallery) =>
  gallery.dateText ? `${gallery.title} ${gallery.dateText}` : gallery.title;

// id of a year's section on an archive page, the target of the year bar
export const yearAnchor = (year: number) => `rok-${year}`;

// Day and month for the card placeholder: from dateText ("5.12.2023"), else from a YYYYMMDD id
export const galleryDay = (gallery: Gallery) => {
  const text = gallery.dateText?.match(/^(\d{1,2})\.\s?(\d{1,2})\./);
  if (text) return `${text[1]}. ${text[2]}.`;
  const id = (gallery.folder ?? gallery.id).match(/^\d{4}(\d{2})(\d{2})/);
  return id ? `${Number(id[2])}. ${Number(id[1])}.` : undefined;
};

// The section tiles with how many galleries each has and which years they span
export const getGallerySections = async () =>
  gallerySections.map((section) => {
    const items = galleries.filter((g) => g.unit === section.unit);
    const years = items.map((g) => g.year);
    return { ...section, count: items.length, from: Math.min(...years), to: Math.max(...years) };
  });

// The whole archive of one unit grouped by year, newest year first
export const getGalleryArchive = async (unit: Unit) => {
  const years = new Map<number, Gallery[]>();
  for (const gallery of galleries.filter((g) => g.unit === unit)) {
    years.set(gallery.year, [...(years.get(gallery.year) ?? []), gallery]);
  }
  return [...years].map(([year, items]) => ({ year, galleries: items }));
};

// Title for a photo folder that has no meta.json
export const getGalleryTitle = async (folder: string) => {
  const gallery = galleries.find((g) => (g.folder ?? g.id) === folder && !g.url);
  return gallery ? galleryLabel(gallery) : undefined;
};
