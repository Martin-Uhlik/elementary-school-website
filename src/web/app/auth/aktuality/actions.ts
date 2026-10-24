"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { ActionState } from "@/components/admin/ActionForm";
import { saveDocument } from "@/lib/admin/documents";
import { errorMessage, optional, text } from "@/lib/admin/form";
import { logActivity } from "@/lib/auth/log";
import { requireUser } from "@/lib/auth/session";
import { prisma } from "@/lib/db";

// Creates (id undefined) or updates a news item; an uploaded file replaces the link
export const saveNews = async (id: string | undefined, data: FormData): Promise<ActionState> => {
  const user = await requireUser({ section: "aktuality" });
  const title = text(data, "title");
  const date = text(data, "date");
  if (!title) return { error: "Vyplňte nadpis." };
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return { error: "Vyplňte datum." };

  let href = optional(data, "href");
  try {
    href = (await saveDocument(data.get("file"))) ?? href;
  } catch (error) {
    return { error: errorMessage(error) };
  }
  const fields = {
    title,
    date: new Date(date),
    text: text(data, "text"),
    href,
    published: data.get("published") === "on",
  };
  if (id) await prisma.news.update({ where: { id }, data: fields });
  else await prisma.news.create({ data: fields });
  await logActivity(user, "aktuality", `${id ? "Upravena" : "Přidána"} aktualita „${title}“`);
  revalidatePath("/", "layout");
  redirect("/auth/aktuality");
};

export const deleteNews = async (id: string) => {
  const user = await requireUser({ section: "aktuality" });
  const news = await prisma.news.delete({ where: { id } });
  await logActivity(user, "aktuality", `Smazána aktualita „${news.title}“`);
  revalidatePath("/", "layout");
};
