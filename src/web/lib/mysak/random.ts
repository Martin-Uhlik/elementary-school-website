// Fisher–Yates shuffle, returns a new array
export const shuffle = <T>(items: readonly T[]): T[] => {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
};

// Shuffles until the result differs from the input (when that is possible)
export const shuffleChanged = <T>(items: readonly T[], same = (a: T[]) => a.every((x, i) => x === items[i])) => {
  if (new Set(items).size < 2) return [...items];
  let out = shuffle(items);
  while (same(out)) out = shuffle(items);
  return out;
};

// 0 ≤ n < max
export const randomInt = (max: number) => Math.floor(Math.random() * max);

export const randomItem = <T>(items: readonly T[]) => items[randomInt(items.length)];

export const randomColor = () => "#" + Array.from({ length: 6 }, () => "0123456789ABCDEF"[randomInt(16)]).join("");

// Character groups of the original exercises
export const CHAR_SETS = [
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
  "žščřďťňľáéíóůúŽŠČŘĎŤŇĽÁÉÍÓŮÚ",
  "äëöüÄËÖÜ",
  "!\"#$%&()*+,-./:;<=>?@[\\]^_{|}~'",
  "ñÑãÃõÕàèìòùÀÈÌÒÙÁÉÍÓÚáéíóú",
  "0123456789",
  "abcdefghijklmnopqrstuvwxyz",
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
];

export const randomChars = (length: number, sets: number[]) => {
  const pool = Array.from(sets.map((i) => CHAR_SETS[i]).join(""));
  return Array.from({ length }, () => randomItem(pool)).join("");
};
