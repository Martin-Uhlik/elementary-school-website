import "server-only";
import { authConfig } from "@/lib/auth/config";
import { requestInfo } from "@/lib/auth/request";
import { lt } from "drizzle-orm";
import { activities, loginEvents, type LoginEventKind, type Permission } from "@zsmp/db/schema";
import { database } from "@/lib/db";

type Who = { id: number; username: string } | { id: null; username: string };

// Sign-ins, sign-outs and account changes (Logy → Přihlášení, and the user's own list on /auth)
export const logLogin = async (user: Who, kind: LoginEventKind) => {
  await database
    .insert(loginEvents)
    .values({ userId: user.id, username: user.username, kind, ...(await requestInfo()) });
};

// What was changed in the admin (Logy → Činnost), e.g. logActivity(user, "aktuality", "Přidána aktualita „Zápis“")
export const logActivity = async (user: { id: number; username: string }, section: Permission, text: string) => {
  const { ip } = await requestInfo();
  await database.insert(activities).values({ userId: user.id, username: user.username, section, text, ip });
};

// Old log entries hold personal data (IP addresses, browsers), so they are deleted after LOG_RETENTION_DAYS;
// runs on each sign-in, like the clean-up of expired sessions
export const deleteOldLogs = async () => {
  const before = new Date(Date.now() - authConfig.logRetentionDays * 24 * 60 * 60 * 1000);
  await database.transaction(async (tx) => {
    await tx.delete(loginEvents).where(lt(loginEvents.createdAt, before));
    await tx.delete(activities).where(lt(activities.createdAt, before));
  });
};
