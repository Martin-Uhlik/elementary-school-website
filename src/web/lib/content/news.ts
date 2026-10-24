import { db } from "@/lib/db";
import { isoDate } from "@/lib/content/misc";
import type { NewsItem } from "@/lib/content/types";

// Published news for the home page, newest first
export const getNews = async (): Promise<NewsItem[]> =>
  (
    await (await db()).news.findMany({ where: { published: true }, orderBy: [{ date: "desc" }, { createdAt: "desc" }] })
  ).map((n) => ({ id: n.id, title: n.title, date: isoDate(n.date), text: n.text, href: n.href ?? undefined }));
