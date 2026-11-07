import { pickTheme, pragueToday } from "@/lib/background";
import { db } from "@/lib/db";

// /pozadi is today's background picture (see .page-background__picture): a short-lived redirect to the theme's
// file, so the pages themselves can stay static and a change in /auth/pozadi shows up within minutes
export const GET = async () => {
  const themes = await (
    await db()
  ).backgroundTheme.findMany({ where: { active: true }, orderBy: { createdAt: "asc" } });
  const { day, month } = pragueToday();
  const theme = pickTheme(themes, day, month);
  const cache = { "Cache-Control": "public, max-age=300" };
  if (!theme) return new Response(null, { status: 404, headers: cache });
  return new Response(null, { status: 307, headers: { ...cache, Location: encodeURI(theme.src) } });
};
