"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { ActionState } from "@/components/admin/ActionForm";
import { deleteUnusedBackground, saveBackground } from "@/lib/admin/backgrounds";
import { errorMessage, text } from "@/lib/admin/form";
import { logActivity } from "@/lib/auth/log";
import { requireUser } from "@/lib/auth/session";
import { DAYS_IN_MONTH, formatThemeDates, hasDates, type ThemeDates } from "@/lib/background";
import { prisma } from "@/lib/db";

const number = (data: FormData, name: string) => Number(text(data, name)) || null;

// The four selects of the form; all empty means the default theme
const readDates = (data: FormData): ThemeDates | string => {
  const dates = {
    startDay: number(data, "startDay"),
    startMonth: number(data, "startMonth"),
    endDay: number(data, "endDay"),
    endMonth: number(data, "endMonth"),
  };
  const filled = Object.values(dates).filter((value) => value !== null).length;
  if (filled === 0) return dates;
  if (filled < 4)
    return "Vyplňte celé období (den a měsíc od i do), nebo nechte všechna pole prázdná pro výchozí pozadí.";
  if (dates.startDay! > DAYS_IN_MONTH[dates.startMonth! - 1] || dates.endDay! > DAYS_IN_MONTH[dates.endMonth! - 1])
    return "Takový den v měsíci není.";
  return dates;
};

// Creates (id undefined) or updates a theme; a new theme needs a picture, an edited one keeps its own without upload
export const saveTheme = async (id: string | undefined, data: FormData): Promise<ActionState> => {
  const user = await requireUser({ section: "pozadi" });
  const name = text(data, "name");
  if (!name) return { error: "Vyplňte název." };
  const dates = readDates(data);
  if (typeof dates === "string") return { error: dates };
  const active = data.get("active") === "on";

  if (!hasDates(dates) && active) {
    const otherDefault = (
      await prisma.backgroundTheme.findMany({ where: { active: true, id: id ? { not: id } : undefined } })
    ).find((theme) => !hasDates(theme));
    if (otherDefault)
      return { error: `Výchozí pozadí už je „${otherDefault.name}“. Vyplňte období, nebo to druhé nejdřív vypněte.` };
  }

  const previous = id ? await prisma.backgroundTheme.findUnique({ where: { id } }) : null;
  let src: string | undefined;
  try {
    src = await saveBackground(data.get("file"));
  } catch (error) {
    return { error: errorMessage(error) };
  }
  if (!src && !previous) return { error: "Nahrajte obrázek pozadí." };

  const fields = { name, ...dates, active, ...(src && { src }) };
  if (id) await prisma.backgroundTheme.update({ where: { id }, data: fields });
  else await prisma.backgroundTheme.create({ data: { ...fields, src: src! } });
  if (previous && src) await deleteUnusedBackground(previous.src);
  await logActivity(
    user,
    "pozadi",
    `${id ? "Upraveno" : "Přidáno"} pozadí „${name}“ (${formatThemeDates(dates)}${active ? "" : ", vypnuté"})`,
  );
  revalidatePath("/auth/pozadi");
  redirect("/auth/pozadi");
};

export const deleteTheme = async (id: string) => {
  const user = await requireUser({ section: "pozadi" });
  const theme = await prisma.backgroundTheme.delete({ where: { id } });
  await deleteUnusedBackground(theme.src);
  await logActivity(user, "pozadi", `Smazáno pozadí „${theme.name}“`);
  revalidatePath("/auth/pozadi");
};
