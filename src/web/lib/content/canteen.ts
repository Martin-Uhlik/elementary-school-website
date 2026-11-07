import "server-only";
import { todayIso } from "@/lib/content/format";

// The school canteen's number on strava.cz
export const CANTEEN_ID = "2176";
export const CANTEEN_MENU_URL = `https://app.strava.cz/jidelnicky?jidelna=${CANTEEN_ID}`;

export type Allergen = { code: string; name: string };
export type Meal = { kind: string; name: string; allergens: Allergen[] };
export type MenuDay = { date: string; meals: Meal[] };
export type MenuWeek = { monday: string; days: MenuDay[] };

// One row of the menu as app.strava.cz sends it (only the fields used here)
type StravaMeal = { datum?: unknown; druh_popis?: unknown; nazev?: unknown; alergeny_text?: unknown };

const text = (value: unknown) => (typeof value === "string" ? value.trim() : "");

// "09.11.2026" → "2026-11-09"
const isoFromCzech = (value: string) => {
  const match = /^(\d{1,2})\.(\d{1,2})\.(\d{4})$/.exec(value);
  return match ? `${match[3]}-${match[2].padStart(2, "0")}-${match[1].padStart(2, "0")}` : undefined;
};

// "Alergeny:|---------|01 - Obiloviny obsahující lepek|07 - Mléko||" → [{ code: "1", ... }, { code: "7", ... }]
const parseAllergens = (value: string): Allergen[] =>
  value.split("|").flatMap((part) => {
    const match = /^(\d+)\s*-\s*(.+)$/.exec(part.trim());
    return match ? [{ code: String(Number(match[1])), name: match[2].trim() }] : [];
  });

// the canteen types "brambory,zel.obloha"; a space after the commas reads better and lets long names wrap
const tidyName = (name: string) => name.replace(/\s*,\s*/g, ", ").replace(/\s+/g, " ");

const toMeal = (row: StravaMeal): Meal | undefined => {
  const name = tidyName(text(row.nazev));
  return name ? { kind: text(row.druh_popis), name, allergens: parseAllergens(text(row.alergeny_text)) } : undefined;
};

const toDay = (rows: unknown): MenuDay | undefined => {
  if (!Array.isArray(rows) || rows.length === 0) return undefined;
  const date = isoFromCzech(text((rows[0] as StravaMeal).datum));
  const meals = rows.flatMap((row: StravaMeal) => toMeal(row) ?? []);
  return date && meals.length > 0 ? { date, meals } : undefined;
};

// Monday of the week a YYYY-MM-DD date falls in
const mondayOf = (date: string) => {
  const day = new Date(`${date}T00:00:00Z`);
  day.setUTCDate(day.getUTCDate() - ((day.getUTCDay() + 6) % 7));
  return day.toISOString().slice(0, 10);
};

const byWeek = (days: MenuDay[]) =>
  days.reduce<MenuWeek[]>((weeks, day) => {
    const monday = mondayOf(day.date);
    const last = weeks.at(-1);
    if (last?.monday === monday) last.days.push(day);
    else weeks.push({ monday, days: [day] });
    return weeks;
  }, []);

/* The menu from today on, by week; undefined when strava.cz can't be reached.
   It is the endpoint the public menu page on app.strava.cz loads (no login needed); the answer is cached for an hour,
   so the site asks strava.cz at most once an hour however many people open the page. */
export const getCanteenMenu = async (): Promise<MenuWeek[] | undefined> => {
  try {
    const response = await fetch("https://app.strava.cz/api/jidelnickyPage", {
      method: "POST",
      // their app sends the JSON as text/plain; with application/json the endpoint answers with an error
      headers: { "Content-Type": "text/plain;charset=UTF-8" },
      body: JSON.stringify({ cislo: CANTEEN_ID, lang: "CZ" }),
      cache: "force-cache",
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) return undefined;
    const data: unknown = await response.json();
    const meals = (data as { meals?: unknown }).meals;
    if (!meals || typeof meals !== "object") return undefined;
    const today = todayIso();
    const days = Object.values(meals)
      .flatMap((rows) => toDay(rows) ?? [])
      .filter((day) => day.date >= today)
      .sort((a, b) => a.date.localeCompare(b.date));
    return byWeek(days);
  } catch (error) {
    console.error("Jídelníček ze strava.cz se nepodařilo načíst", error);
    return undefined;
  }
};
