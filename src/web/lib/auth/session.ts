import "server-only";
import { createHash, randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { authConfig } from "@/lib/auth/config";
import { logLogin } from "@/lib/auth/log";
import { can } from "@/lib/auth/sections";
import { eq, lt, or } from "drizzle-orm";
import { sessions, type Permission } from "@zsmp/db/schema";
import { database } from "@/lib/db";

// Signed-in browsers: the cookie holds a random token, the sessions table only its SHA-256,
// so a leaked database does not let anyone sign in.
const COOKIE = "zsmp_session";
const MINUTE = 60 * 1000;
// the header timer tells the server about activity at most every 30 s, so the server waits a minute longer
const GRACE = MINUTE;

const hashToken = (token: string) => createHash("sha256").update(token).digest("hex");

const findSession = (token: string) =>
  database.query.sessions.findFirst({ where: eq(sessions.id, hashToken(token)), with: { user: true } });

// Behind Caddy with HTTPS the cookie is https-only; COOKIE_SECURE=false allows testing over plain http
const secure = process.env.NODE_ENV === "production" && process.env.COOKIE_SECURE !== "false";

const isExpired = (session: { expiresAt: Date; lastSeenAt: Date }, now = Date.now()) =>
  session.expiresAt.getTime() < now ||
  session.lastSeenAt.getTime() + authConfig.inactivityMinutes * MINUTE + GRACE < now;

export const createSession = async (userId: number) => {
  const token = randomBytes(32).toString("base64url");
  const expiresAt = new Date(Date.now() + authConfig.sessionMaxMinutes * MINUTE);
  await database.insert(sessions).values({ id: hashToken(token), userId, expiresAt });
  // sessions of everyone that ran out are cleaned up on each sign-in
  await database
    .delete(sessions)
    .where(
      or(
        lt(sessions.expiresAt, new Date()),
        lt(sessions.lastSeenAt, new Date(Date.now() - authConfig.inactivityMinutes * MINUTE - GRACE)),
      ),
    );
  (await cookies()).set(COOKIE, token, { httpOnly: true, sameSite: "lax", secure, path: "/", expires: expiresAt });
};

// Signs the browser out; kind "timeout" when the header timer ran out
export const deleteSession = async (kind: "logout" | "timeout" = "logout") => {
  const store = await cookies();
  const token = store.get(COOKIE)?.value;
  if (token) {
    const session = await findSession(token);
    if (session) {
      await database.delete(sessions).where(eq(sessions.id, session.id));
      await logLogin(session.user, kind);
    }
  }
  store.delete(COOKIE);
};

// The signed-in user, or null; read once per request. Every request counts as activity, a session left
// alone for longer than the inactivity limit (or older than the maximum) ends here even with the tab closed.
export const getCurrentUser = cache(async () => {
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return null;
  const session = await findSession(token);
  if (!session) return null;
  if (isExpired(session)) {
    // only the request that really deletes it logs the timeout
    const deleted = await database.delete(sessions).where(eq(sessions.id, session.id)).returning({ id: sessions.id });
    if (deleted.length > 0) await logLogin(session.user, "timeout");
    return null;
  }
  await database.update(sessions).set({ lastSeenAt: new Date() }).where(eq(sessions.id, session.id));
  const { id, username, mustChangePassword, permissions } = session.user;
  return { id, username, mustChangePassword, permissions, isAdmin: permissions.includes("admin") };
});

// Every /auth page and every admin action starts with this. Until the default password is changed,
// the only reachable page is Můj účet; a section the user has no access to sends them to the start page.
export const requireUser = async ({
  section,
  passwordPage = false,
}: { section?: Permission; passwordPage?: boolean } = {}) => {
  const user = await getCurrentUser();
  if (!user) redirect("/admin");
  if (user.mustChangePassword && !passwordPage) redirect("/auth/ucet");
  if (section && !can(user.permissions, section)) redirect("/auth?pristup=odepren");
  return user;
};
