// Pure helpers for showing content; no database access, so client components can use them too.
import type { CalendarEvent, Gallery, Person, Phone } from "@/lib/content/types";

// marks an entry that is a phone number of a place, not a person
const CONTACT_LABEL = "Kontakt";

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

const toDate = (iso: string) => new Date(`${iso}T12:00:00`);
const dateFormat = new Intl.DateTimeFormat("cs", { day: "numeric", month: "long", year: "numeric" });
const dayMonthFormat = new Intl.DateTimeFormat("cs", { day: "numeric", month: "long" });

// Dates of a Průběh školního roku event: "4. září 2023", "26.–27. října 2023" or "23. prosince 2023 – 2. ledna 2024"
export const calendarDateLabel = ({ date, endDate }: Pick<CalendarEvent, "date" | "endDate">) => {
  const start = toDate(date);
  if (!endDate) return dateFormat.format(start);
  const end = toDate(endDate);
  if (start.getFullYear() !== end.getFullYear()) return `${dateFormat.format(start)} – ${dateFormat.format(end)}`;
  if (start.getMonth() !== end.getMonth()) return `${dayMonthFormat.format(start)} – ${dateFormat.format(end)}`;
  return `${start.getDate()}.–${dateFormat.format(end)}`;
};

// Today in the school's time zone as YYYY-MM-DD (the server may run in UTC, so not new Date() alone)
export const todayIso = () => new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Prague" }).format(new Date());

// "4. září 2023" for a YYYY-MM-DD day
export const dayLabel = (iso: string) => dateFormat.format(toDate(iso));

// The school year a day belongs to: from September on the year starts, e.g. 2026-10-29 → "2026/2027"
export const schoolYearOf = (iso: string) => {
  const [year, month] = iso.split("-").map(Number);
  return month >= 9 ? `${year}/${year + 1}` : `${year - 1}/${year}`;
};
