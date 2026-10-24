import "server-only";
import { createHash, randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { prisma } from "@/lib/db";

// Signed-in browsers: the cookie holds a random token, the sessions table only its SHA-256,
// so a leaked database does not let anyone sign in.
const COOKIE = "zsmp_session";
const MAX_AGE_DAYS = 7;

const hashToken = (token: string) => createHash("sha256").update(token).digest("hex");

// Behind IIS with HTTPS the cookie is https-only; COOKIE_SECURE=false allows testing over plain http
const secure = process.env.NODE_ENV === "production" && process.env.COOKIE_SECURE !== "false";

export const createSession = async (userId: number) => {
  const token = randomBytes(32).toString("base64url");
  const expiresAt = new Date(Date.now() + MAX_AGE_DAYS * 24 * 60 * 60 * 1000);
  await prisma.session.create({ data: { id: hashToken(token), userId, expiresAt } });
  // old sessions of everyone are cleaned up on each sign-in
  await prisma.session.deleteMany({ where: { expiresAt: { lt: new Date() } } });
  (await cookies()).set(COOKIE, token, { httpOnly: true, sameSite: "lax", secure, path: "/", expires: expiresAt });
};

export const deleteSession = async () => {
  const store = await cookies();
  const token = store.get(COOKIE)?.value;
  if (token) await prisma.session.deleteMany({ where: { id: hashToken(token) } });
  store.delete(COOKIE);
};

// The signed-in user, or null; read once per request
export const getCurrentUser = cache(async () => {
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return null;
  const session = await prisma.session.findUnique({ where: { id: hashToken(token) }, include: { user: true } });
  if (!session || session.expiresAt < new Date()) return null;
  return { id: session.user.id, username: session.user.username, mustChangePassword: session.user.mustChangePassword };
});

// Every /auth page and every admin action starts with this. Until the default password is changed,
// the only reachable page is the password form.
export const requireUser = async ({ passwordPage = false } = {}) => {
  const user = await getCurrentUser();
  if (!user) redirect("/admin");
  if (user.mustChangePassword && !passwordPage) redirect("/auth/heslo");
  return user;
};
