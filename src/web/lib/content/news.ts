import { desc, eq } from "drizzle-orm";
import { news } from "@zsmp/db/schema";
import { db } from "@/lib/db";
import { isoDate } from "@/lib/content/misc";
import type { NewsItem } from "@/lib/content/types";

// Published news for the home page, newest first
export const getNews = async (): Promise<NewsItem[]> =>
  (
    await (
      await db()
    )
      .select()
      .from(news)
      .where(eq(news.published, true))
      .orderBy(desc(news.date), desc(news.createdAt))
  ).map((n) => ({ id: n.id, title: n.title, date: isoDate(n.date), text: n.text, href: n.href ?? undefined }));
