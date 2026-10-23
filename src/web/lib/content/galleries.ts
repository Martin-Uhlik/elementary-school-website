import { galleries } from "@/data/galleries";
import type { Gallery, Unit } from "@/data/types";

export const galleryHref = (gallery: Gallery) => gallery.url ?? `/galerie/${gallery.folder ?? gallery.id}`;

export const galleryLabel = (gallery: Gallery) =>
  gallery.dateText ? `${gallery.title} ${gallery.dateText}` : gallery.title;

// Newest galleries of one unit, for the Foto a video page
export const getLatestGalleries = async (unit: Unit, count: number) =>
  galleries.filter((g) => g.unit === unit && !g.url).slice(0, count);

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
