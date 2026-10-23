// Shapes of the site's content. Each list in data/ is one future database table;
// rows point to each other by id and their order in the array is the display order.

// A heading with a list of links on a page, e.g. "Výroční zprávy" on /dokumenty
export type LinkGroup = {
  id: string;
  // route of the page that shows the group
  page: string;
  title?: string;
};

// A document, a web page or a page of this site; the type shown next to it comes from href
export type Link = {
  id: string;
  groupId: string;
  title: string;
  // missing for a plain text item
  href?: string;
  description?: string[];
  // a longer note shown in a tooltip next to the link
  details?: string;
};

// Part of the school a gallery or a person belongs to
export type Unit = "zs" | "ms" | "druzina";

// A photo gallery in public/galerie/<folder>/, or a link to a video
export type Gallery = {
  id: string;
  // photo folder when it differs from id (one folder was linked by two events)
  folder?: string;
  unit: Unit;
  // the archive heading it is listed under
  year: number;
  title: string;
  // the date as written on the site, e.g. "31.5.-1.6.2023"
  dateText?: string;
  // a video or another address instead of a photo gallery
  url?: string;
};

export type Phone = { kind: "internal" | "landline" | "mobile"; number: string };

// A member of staff, a board member, or a contact without a person (label "Kontakt", e.g. the kitchen phone)
export type Person = {
  id: string;
  titleBefore?: string;
  firstName?: string;
  lastName?: string;
  titleAfter?: string;
  // what a contact without a person is, e.g. "Knihovna"
  name?: string;
  // where the entry is shown: the section headings on /kontakty, "Základní informace" on the home page, ...
  labels: string[];
  // short job title, e.g. "ředitelka"
  position?: string;
  email?: string;
  phones?: Phone[];
  // longer lines on /kontakty: subjects taught, qualification
  description?: string[];
};

// One line of "Průběh školního roku"; **text** is shown in bold
export type CalendarEvent = {
  id: string;
  // e.g. "2023/2024"
  schoolYear: string;
  text: string;
};

export type Sponsor = { id: string; name: string; logo: string };

// A photo of the school, used by the home page carousel and the Skládanka puzzle (all 1920×1080)
export type Photo = { id: string; src: string; alt: string };
export type GallerySection = { unit: Unit; title: string; href: string; cover: string };
