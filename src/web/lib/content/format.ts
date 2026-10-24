// Pure helpers for showing content; no database access, so client components can use them too.
import type { Gallery, Person, Phone } from "@/lib/content/types";

// marks an entry that is a phone number of a place, not a person
export const CONTACT_LABEL = "Kontakt";

export const isContact = (person: Person) => person.labels.includes(CONTACT_LABEL);

export const personName = (person: Person) => {
  if (person.name) return person.name;
  const name = [person.titleBefore, person.firstName, person.lastName].filter(Boolean).join(" ");
  return person.titleAfter ? `${name}, ${person.titleAfter}` : name;
};

export const PHONE_KIND_LABELS: Record<Phone["kind"], string> = {
  internal: "vnitřní",
  landline: "vnitrostátní",
  mobile: "mobilní",
};

// the photo folder of a gallery in galerie/
export const galleryFolder = (gallery: Gallery) => gallery.folder ?? gallery.id;

export const galleryHref = (gallery: Gallery) => gallery.url ?? `/galerie/${galleryFolder(gallery)}`;

export const galleryLabel = (gallery: Gallery) =>
  gallery.dateText ? `${gallery.title} ${gallery.dateText}` : gallery.title;

// id of a year's section on an archive page, the target of the year bar
export const yearAnchor = (year: number) => `rok-${year}`;

// Day and month for the card placeholder: from dateText ("5.12.2023"), else from a YYYYMMDD id
export const galleryDay = (gallery: Gallery) => {
  const text = gallery.dateText?.match(/^(\d{1,2})\.\s?(\d{1,2})\./);
  if (text) return `${text[1]}. ${text[2]}.`;
  const id = galleryFolder(gallery).match(/^\d{4}(\d{2})(\d{2})/);
  return id ? `${Number(id[2])}. ${Number(id[1])}.` : undefined;
};

// 1 galerie, 2–4 galerie, 5+ galerií
export const galleriesLabel = (count: number) => `${count} ${count >= 1 && count <= 4 ? "galerie" : "galerií"}`;
