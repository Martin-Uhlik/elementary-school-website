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
