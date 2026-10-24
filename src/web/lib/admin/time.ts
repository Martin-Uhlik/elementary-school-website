// Times in the admin are shown and filtered in Czech time, whatever time zone the server runs in
const ZONE = "Europe/Prague";

const dateTime = new Intl.DateTimeFormat("cs-CZ", { timeZone: ZONE, dateStyle: "medium", timeStyle: "medium" });
const time = new Intl.DateTimeFormat("cs-CZ", { timeZone: ZONE, hour: "numeric", minute: "2-digit" });

export const formatDateTime = (date: Date) => dateTime.format(date);
export const formatTime = (date: Date) => time.format(date);

// "2026-10-24" (Czech day) → the moment that day starts, for filtering stored times
export const startOfPragueDay = (day: string) => {
  const guess = new Date(`${day}T00:00:00Z`);
  const local = new Date(guess.toLocaleString("sv-SE", { timeZone: ZONE }).replace(" ", "T") + "Z");
  return new Date(guess.getTime() - (local.getTime() - guess.getTime()));
};

// Today's date in Czech time as YYYY-MM-DD
export const pragueToday = () => new Date().toLocaleDateString("sv-SE", { timeZone: ZONE });
