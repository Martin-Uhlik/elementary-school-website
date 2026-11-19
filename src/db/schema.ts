// The site's content and the admin users. Drizzle owns the tables: change this file, then
// npm run db:generate in src/   (writes a new SQL migration into migrations/)
// sort_order is the display order.
import { randomUUID } from "node:crypto";
import { relations, sql } from "drizzle-orm";
import {
  boolean,
  check,
  date,
  index,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  serial,
  smallint,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

const uuid = () => text("id").primaryKey().$defaultFn(randomUUID);
// the day of something, read as a Date at midnight UTC
const day = (name: string) => date(name, { mode: "date" });
const createdAt = () => timestamp("created_at", { precision: 3 }).notNull().defaultNow();

export const unit = pgEnum("unit", ["zs", "ms", "druzina"]);
export const phoneKind = pgEnum("phone_kind", ["internal", "landline", "mobile"]);

// The parts of /auth a user may open (kalendar = Průběh školního roku, pozadi = seasonal background pictures);
// admin also covers Uživatelé and Logy
export const permission = pgEnum("permission", [
  "aktuality",
  "lide",
  "dokumenty",
  "galerie",
  "kalendar",
  "pozadi",
  "admin",
]);

export const loginEventKind = pgEnum("login_event_kind", [
  "login",
  "failed",
  "locked",
  "logout",
  "timeout",
  "password",
  "username",
]);

// A heading with a list of links on a page, e.g. "Výroční zprávy" on /dokumenty
export const linkGroups = pgTable("link_groups", {
  id: text("id").primaryKey(),
  // route of the page that shows the group
  page: text("page").notNull(),
  title: text("title"),
  sortOrder: integer("sort_order").notNull(),
});

// A document, a web page or a page of this site; the type shown next to it comes from href
export const links = pgTable(
  "links",
  {
    id: uuid(),
    groupId: text("group_id")
      .notNull()
      .references(() => linkGroups.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    // missing for a plain text item
    href: text("href"),
    description: text("description").array().notNull().default([]),
    // longer note shown in a tooltip
    details: text("details"),
    sortOrder: integer("sort_order").notNull(),
  },
  (t) => [index("links_group_id_idx").on(t.groupId)],
);

// A photo gallery in galerie/<folder>/ of the media folder, or a link to a video
export const galleries = pgTable(
  "galleries",
  {
    id: text("id").primaryKey(),
    // photo folder when it differs from id
    folder: text("folder"),
    unit: unit("unit").notNull(),
    // the archive heading it is listed under
    year: integer("year").notNull(),
    title: text("title").notNull(),
    // the date as written on the site, e.g. "31.5.-1.6.2023"
    dateText: text("date_text"),
    // a video or another address instead of a photo gallery
    url: text("url"),
    // the day of the event; galleries are listed newest first by it
    date: day("date").notNull(),
  },
  (t) => [index("galleries_unit_date_idx").on(t.unit, t.date)],
);

// The three tiles on the Foto a video page
export const gallerySections = pgTable("gallery_sections", {
  unit: unit("unit").primaryKey(),
  title: text("title").notNull(),
  href: text("href").notNull(),
  cover: text("cover").notNull(),
  sortOrder: integer("sort_order").notNull(),
});

// A member of staff, a board member, or a contact without a person (label "Kontakt", e.g. the kitchen phone)
export const people = pgTable(
  "people",
  {
    id: uuid(),
    titleBefore: text("title_before"),
    firstName: text("first_name"),
    lastName: text("last_name"),
    titleAfter: text("title_after"),
    // what a contact without a person is, e.g. "Knihovna"
    name: text("name"),
    // where the entry is shown, e.g. section headings on /kontakty
    labels: text("labels").array().notNull().default([]),
    // short job title, e.g. "ředitelka"
    position: text("position"),
    email: text("email"),
    description: text("description").array().notNull().default([]),
    sortOrder: integer("sort_order").notNull(),
  },
  (t) => [index("people_labels_idx").using("gin", t.labels)],
);

export const phones = pgTable(
  "phones",
  {
    personId: text("person_id")
      .notNull()
      .references(() => people.id, { onDelete: "cascade" }),
    kind: phoneKind("kind").notNull(),
    number: text("number").notNull(),
    sortOrder: integer("sort_order").notNull(),
  },
  (t) => [primaryKey({ columns: [t.personId, t.sortOrder] })],
);

// One line of "Průběh školního roku"; **text** is shown in bold
export const calendarEvents = pgTable(
  "calendar_events",
  {
    id: uuid(),
    // e.g. "2023/2024"
    schoolYear: text("school_year").notNull(),
    // first day
    date: day("date").notNull(),
    // last day of an event longer than one day
    endDate: day("end_date"),
    holiday: boolean("holiday").notNull().default(false),
    text: text("text").notNull(),
  },
  (t) => [index("calendar_events_school_year_idx").on(t.schoolYear, t.date)],
);

export const sponsors = pgTable("sponsors", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  logo: text("logo").notNull(),
  sortOrder: integer("sort_order").notNull(),
});

// Photos of the school (home page carousel) and the Skládanka puzzle pictures; collection is 'school' or 'puzzle'
export const photos = pgTable(
  "photos",
  {
    id: text("id").primaryKey(),
    collection: text("collection").notNull(),
    src: text("src").notNull(),
    alt: text("alt").notNull(),
    sortOrder: integer("sort_order").notNull(),
  },
  (t) => [check("photos_collection_check", sql`${t.collection} IN ('school', 'puzzle')`)],
);

// A seasonal picture behind the top of every page except the home page, e.g. snowflakes in winter.
// The dates repeat every year and may wrap past New Year (1.12.-31.1.); a theme without dates is the default,
// shown when no other one matches. When ranges overlap, the shorter one wins (see lib/background.ts).
export const backgroundThemes = pgTable("background_themes", {
  id: uuid(),
  name: text("name").notNull(),
  // /pozadi/<file> for an upload in the media folder, or a picture in public/
  src: text("src").notNull(),
  startDay: smallint("start_day"),
  startMonth: smallint("start_month"),
  endDay: smallint("end_day"),
  endMonth: smallint("end_month"),
  // switched off themes stay in the admin but are never shown
  active: boolean("active").notNull().default(true),
  createdAt: createdAt(),
});

// A news item in "Aktuální informace" on the home page, newest first
export const news = pgTable(
  "news",
  {
    id: uuid(),
    title: text("title").notNull(),
    date: day("date").notNull(),
    text: text("text").notNull().default(""),
    // a document in dokument/ or another address, shown as a link under the text
    href: text("href"),
    // hidden items stay in the admin but not on the site
    published: boolean("published").notNull().default(true),
    createdAt: createdAt(),
  },
  (t) => [index("news_date_idx").on(t.date)],
);

// Someone who can sign in at /admin
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  // only admins see and edit it
  realName: text("real_name"),
  // scrypt, see lib/auth/password.ts
  passwordHash: text("password_hash").notNull(),
  // true for the seeded admin/zsmp and for new users until they pick their own password
  mustChangePassword: boolean("must_change_password").notNull().default(false),
  permissions: permission("permissions").array().notNull().default([]),
  // wrong passwords in a row; at the limit in lib/auth/config.ts the account is locked until lockedUntil
  failedLogins: integer("failed_logins").notNull().default(0),
  lockedUntil: timestamp("locked_until", { precision: 3 }),
  createdAt: createdAt(),
});

// A signed-in browser; the cookie holds a random token, the table only its SHA-256
export const sessions = pgTable(
  "sessions",
  {
    id: text("id").primaryKey(),
    userId: integer("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }),
    // the latest request; after the inactivity limit the session ends
    lastSeenAt: timestamp("last_seen_at", { precision: 3 }).notNull().defaultNow(),
    expiresAt: timestamp("expires_at", { precision: 3 }).notNull(),
  },
  (t) => [index("sessions_user_id_idx").on(t.userId)],
);

// Sign-ins, sign-outs, wrong passwords and account changes, with the browser's address and user agent
export const loginEvents = pgTable(
  "login_events",
  {
    id: serial("id").primaryKey(),
    // null for an unknown name or a deleted user; username keeps what was typed or used
    userId: integer("user_id").references(() => users.id, { onDelete: "set null", onUpdate: "cascade" }),
    username: text("username").notNull(),
    kind: loginEventKind("kind").notNull(),
    ip: text("ip").notNull().default(""),
    userAgent: text("user_agent").notNull().default(""),
    createdAt: createdAt(),
  },
  (t) => [
    index("login_events_created_at_idx").on(t.createdAt),
    index("login_events_user_id_created_at_idx").on(t.userId, t.createdAt),
  ],
);

// What users changed in /auth, e.g. "Upravena aktualita Zápis do 1. třídy"
export const activities = pgTable(
  "activities",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id").references(() => users.id, { onDelete: "set null", onUpdate: "cascade" }),
    username: text("username").notNull(),
    section: permission("section").notNull(),
    text: text("text").notNull(),
    ip: text("ip").notNull().default(""),
    createdAt: createdAt(),
  },
  (t) => [
    index("activities_created_at_idx").on(t.createdAt),
    index("activities_user_id_created_at_idx").on(t.userId, t.createdAt),
  ],
);

// For db.query.*.findMany({ with: ... })
export const linkGroupsRelations = relations(linkGroups, ({ many }) => ({ links: many(links) }));
export const linksRelations = relations(links, ({ one }) => ({
  group: one(linkGroups, { fields: [links.groupId], references: [linkGroups.id] }),
}));
export const peopleRelations = relations(people, ({ many }) => ({ phones: many(phones) }));
export const phonesRelations = relations(phones, ({ one }) => ({
  person: one(people, { fields: [phones.personId], references: [people.id] }),
}));
export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export type Unit = (typeof unit.enumValues)[number];
export type PhoneKind = (typeof phoneKind.enumValues)[number];
export type Permission = (typeof permission.enumValues)[number];
export type LoginEventKind = (typeof loginEventKind.enumValues)[number];
export type Gallery = typeof galleries.$inferSelect;
export type Link = typeof links.$inferSelect;
export type LinkGroup = typeof linkGroups.$inferSelect;
export type Person = typeof people.$inferSelect;
export type Phone = typeof phones.$inferSelect;
export type LoginEvent = typeof loginEvents.$inferSelect;
