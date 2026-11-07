// Seasonal page backgrounds (table background_themes, edited in /auth/pozadi). Pure helpers, safe in client code.

export type ThemeDates = {
  startDay: number | null;
  startMonth: number | null;
  endDay: number | null;
  endMonth: number | null;
};

export const MONTHS = [
  "ledna",
  "února",
  "března",
  "dubna",
  "května",
  "června",
  "července",
  "srpna",
  "září",
  "října",
  "listopadu",
  "prosince",
];

// the longest month, February counted with 29 days so a range can end on 29.2.
export const DAYS_IN_MONTH = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// 1.12. → 1201, so days of the year compare as numbers
const dayKey = (day: number, month: number) => month * 100 + day;

// days in a range, for picking the shorter of two overlapping ones; a range past New Year wraps around
const rangeLength = (start: number, end: number) => {
  const toDays = (key: number) =>
    DAYS_IN_MONTH.slice(0, Math.floor(key / 100) - 1).reduce((a, b) => a + b, 0) + (key % 100);
  const length = toDays(end) - toDays(start);
  return length >= 0 ? length : length + 366;
};

const range = (theme: ThemeDates) =>
  theme.startDay && theme.startMonth && theme.endDay && theme.endMonth
    ? { start: dayKey(theme.startDay, theme.startMonth), end: dayKey(theme.endDay, theme.endMonth) }
    : null;

export const hasDates = (theme: ThemeDates) => range(theme) !== null;

// Does the theme's range (repeating every year) include this day? A theme without dates never matches.
export const coversDay = (theme: ThemeDates, day: number, month: number) => {
  const dates = range(theme);
  if (!dates) return false;
  const today = dayKey(day, month);
  return dates.start <= dates.end
    ? today >= dates.start && today <= dates.end
    : today >= dates.start || today <= dates.end;
};

// Today's day and month in Czech time, whatever time zone the server runs in
export const pragueToday = (now = new Date()) => {
  const [month, day] = new Intl.DateTimeFormat("en-US", { timeZone: "Europe/Prague", month: "numeric", day: "numeric" })
    .format(now)
    .split("/")
    .map(Number);
  return { day, month };
};

// The theme shown on a day: of those whose dates cover it the one with the shortest range, else the default
// (a theme without dates). Switched off themes are expected to be filtered out already.
export const pickTheme = <T extends ThemeDates>(themes: T[], day: number, month: number) => {
  const matching = themes
    .filter((theme) => coversDay(theme, day, month))
    .map((theme) => ({ theme, length: rangeLength(range(theme)!.start, range(theme)!.end) }))
    .sort((a, b) => a.length - b.length);
  return matching[0]?.theme ?? themes.find((theme) => !hasDates(theme)) ?? null;
};

// "1. prosince – 31. ledna", or "výchozí" for the theme shown outside all other ranges
export const formatThemeDates = (theme: ThemeDates) =>
  hasDates(theme)
    ? `${theme.startDay}. ${MONTHS[theme.startMonth! - 1]} – ${theme.endDay}. ${MONTHS[theme.endMonth! - 1]}`
    : "výchozí (mimo ostatní období)";
