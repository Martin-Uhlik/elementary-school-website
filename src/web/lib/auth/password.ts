import { randomBytes, scrypt, timingSafeEqual } from "node:crypto";

// scrypt from Node itself, no extra package; stored as "scrypt$<salt hex>$<hash hex>"
const KEY_LENGTH = 64;

const derive = (password: string, salt: Buffer) =>
  new Promise<Buffer>((resolve, reject) =>
    scrypt(password.normalize("NFC"), salt, KEY_LENGTH, (error, key) => (error ? reject(error) : resolve(key))),
  );

export const hashPassword = async (password: string) => {
  const salt = randomBytes(16);
  return `scrypt$${salt.toString("hex")}$${(await derive(password, salt)).toString("hex")}`;
};

export const verifyPassword = async (password: string, stored: string) => {
  const [scheme, salt, hash] = stored.split("$");
  if (scheme !== "scrypt" || !salt || !hash) return false;
  const expected = Buffer.from(hash, "hex");
  const actual = await derive(password, Buffer.from(salt, "hex"));
  return actual.length === expected.length && timingSafeEqual(actual, expected);
};
