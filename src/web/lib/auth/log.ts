import "server-only";
import { authConfig } from "@/lib/auth/config";
import { requestInfo } from "@/lib/auth/request";
import { prisma } from "@/lib/db";
import type { LoginEventKind, Permission } from "@/lib/generated/prisma/client";

type Who = { id: number; username: string } | { id: null; username: string };

// Sign-ins, sign-outs and account changes (Logy → Přihlášení, and the user's own list on /auth)
export const logLogin = async (user: Who, kind: LoginEventKind) => {
  await prisma.loginEvent.create({
    data: { userId: user.id, username: user.username, kind, ...(await requestInfo()) },
  });
};

// What was changed in the admin (Logy → Činnost), e.g. logActivity(user, "aktuality", "Přidána aktualita „Zápis“")
export const logActivity = async (user: { id: number; username: string }, section: Permission, text: string) => {
  const { ip } = await requestInfo();
  await prisma.activity.create({ data: { userId: user.id, username: user.username, section, text, ip } });
};

// Old log entries hold personal data (IP addresses, browsers), so they are deleted after LOG_RETENTION_DAYS;
// runs on each sign-in, like the clean-up of expired sessions
export const deleteOldLogs = async () => {
  const before = new Date(Date.now() - authConfig.logRetentionDays * 24 * 60 * 60 * 1000);
  await prisma.$transaction([
    prisma.loginEvent.deleteMany({ where: { createdAt: { lt: before } } }),
    prisma.activity.deleteMany({ where: { createdAt: { lt: before } } }),
  ]);
};
