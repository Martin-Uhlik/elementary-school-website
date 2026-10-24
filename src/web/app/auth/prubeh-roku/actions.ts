"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { ActionState } from "@/components/admin/ActionForm";
import { optional, text } from "@/lib/admin/form";
import { logActivity } from "@/lib/auth/log";
import { requireUser } from "@/lib/auth/session";
import { calendarDateLabel } from "@/lib/content/format";
import { prisma } from "@/lib/db";

const DAY = /^\d{4}-\d{2}-\d{2}$/;

// Creates (id undefined) or updates an event of Průběh školního roku
export const saveEvent = async (id: string | undefined, data: FormData): Promise<ActionState> => {
  const user = await requireUser({ section: "kalendar" });
  const schoolYear = text(data, "schoolYear");
  const date = text(data, "date");
  const endDate = optional(data, "endDate");
  const eventText = text(data, "text");
  if (!/^\d{4}\/\d{4}$/.test(schoolYear)) return { error: "Školní rok zadejte jako 2026/2027." };
  if (!DAY.test(date)) return { error: "Vyplňte datum." };
  if (endDate && (!DAY.test(endDate) || endDate <= date)) return { error: "Konec musí být po začátku." };
  if (!eventText) return { error: "Vyplňte text." };

  const fields = {
    schoolYear,
    date: new Date(date),
    endDate: endDate ? new Date(endDate) : null,
    holiday: data.get("holiday") === "on",
    text: eventText,
  };
  if (id) await prisma.calendarEvent.update({ where: { id }, data: fields });
  else await prisma.calendarEvent.create({ data: fields });
  const label = calendarDateLabel({ date, endDate: endDate ?? undefined });
  await logActivity(user, "kalendar", `${id ? "Upravena" : "Přidána"} událost ${label} (${schoolYear})`);
  revalidatePath("/", "layout");
  redirect(`/auth/prubeh-roku?rok=${encodeURIComponent(schoolYear)}`);
};

export const deleteEvent = async (id: string) => {
  const user = await requireUser({ section: "kalendar" });
  const event = await prisma.calendarEvent.delete({ where: { id } });
  const label = calendarDateLabel({
    date: event.date.toISOString().slice(0, 10),
    endDate: event.endDate?.toISOString().slice(0, 10),
  });
  await logActivity(user, "kalendar", `Smazána událost ${label} (${event.schoolYear})`);
  revalidatePath("/", "layout");
};

const nextYear = (iso: string) => {
  const [year, month, day] = iso.split("-").map(Number);
  // 29 February becomes 28 February
  return new Date(Date.UTC(year + 1, month - 1, Math.min(day, month === 2 ? 28 : 31)));
};

// A new school year: empty (then the first event is added), or a copy of another year with every date a year later
export const createYear = async (data: FormData): Promise<ActionState> => {
  const user = await requireUser({ section: "kalendar" });
  const schoolYear = text(data, "schoolYear");
  const copyFrom = optional(data, "copyFrom");
  const [first, second] = schoolYear.split("/").map(Number);
  if (!/^\d{4}\/\d{4}$/.test(schoolYear) || second !== first + 1)
    return { error: "Školní rok zadejte jako 2026/2027." };
  if (await prisma.calendarEvent.count({ where: { schoolYear } })) return { error: `Rok ${schoolYear} už existuje.` };
  if (!copyFrom) redirect(`/auth/prubeh-roku/nova?rok=${encodeURIComponent(schoolYear)}`);

  const events = await prisma.calendarEvent.findMany({ where: { schoolYear: copyFrom } });
  const shift = first - Number(copyFrom.slice(0, 4));
  const move = (date: Date) => {
    let moved = date;
    for (let i = 0; i < shift; i++) moved = nextYear(moved.toISOString().slice(0, 10));
    return moved;
  };
  await prisma.calendarEvent.createMany({
    data: events.map(({ date, endDate, holiday, text: eventText }) => ({
      schoolYear,
      date: move(date),
      endDate: endDate ? move(endDate) : null,
      holiday,
      text: eventText,
    })),
  });
  await logActivity(user, "kalendar", `Přidán školní rok ${schoolYear} (kopie ${copyFrom}, ${events.length} událostí)`);
  revalidatePath("/", "layout");
  redirect(`/auth/prubeh-roku?rok=${encodeURIComponent(schoolYear)}`);
};

export const deleteYear = async (schoolYear: string) => {
  const user = await requireUser({ section: "kalendar" });
  const { count } = await prisma.calendarEvent.deleteMany({ where: { schoolYear } });
  await logActivity(user, "kalendar", `Smazán školní rok ${schoolYear} (${count} událostí)`);
  revalidatePath("/", "layout");
  redirect("/auth/prubeh-roku");
};
