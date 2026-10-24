// A simple brake on password guessing: after 5 wrong attempts for one name from one address,
// further attempts are refused for 15 minutes. Kept in memory, which is enough for one server.
const LIMIT = 5;
const WINDOW_MS = 15 * 60 * 1000;
const failures = new Map<string, { count: number; until: number }>();

export const isLocked = (key: string) => {
  const entry = failures.get(key);
  return Boolean(entry && entry.count >= LIMIT && entry.until > Date.now());
};

export const recordFailure = (key: string) => {
  const entry = failures.get(key);
  const fresh = !entry || entry.until < Date.now();
  failures.set(key, { count: fresh ? 1 : entry.count + 1, until: Date.now() + WINDOW_MS });
};

export const clearFailures = (key: string) => failures.delete(key);
