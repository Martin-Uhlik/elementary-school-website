import { asc, eq } from "drizzle-orm";
import { calendarEvents, photos, sponsors } from "@zsmp/db/schema";
import { db } from "@/lib/db";
import type { CalendarEvent, Photo } from "@/lib/content/types";

// a DATE column as YYYY-MM-DD
export const isoDate = (date: Date) => date.toISOString().slice(0, 10);

export const getSponsors = async () =>
  (await (await db()).select().from(sponsors).orderBy(asc(sponsors.sortOrder))).map(({ id, name, logo }) => ({
    id,
    name,
    logo,
  }));

const getPhotoCollection = async (collection: "school" | "puzzle"): Promise<Photo[]> =>
  (
    await (await db()).select().from(photos).where(eq(photos.collection, collection)).orderBy(asc(photos.sortOrder))
  ).map(({ id, src, alt }) => ({ id, src, alt }));

export const getPhotos = async () => getPhotoCollection("school");

export const getPuzzlePictures = async () => getPhotoCollection("puzzle");

// Every school year with its events by date, oldest first
export const getSchoolYears = async () => {
  const rows = await (
    await db()
  )
    .select()
    .from(calendarEvents)
    .orderBy(asc(calendarEvents.schoolYear), asc(calendarEvents.date));
  const events: CalendarEvent[] = rows.map((e) => ({
    id: e.id,
    schoolYear: e.schoolYear,
    date: isoDate(e.date),
    endDate: e.endDate ? isoDate(e.endDate) : undefined,
    holiday: e.holiday,
    text: e.text,
  }));
  return [...new Set(events.map((e) => e.schoolYear))].map((schoolYear) => ({
    schoolYear,
    events: events.filter((e) => e.schoolYear === schoolYear),
  }));
};
