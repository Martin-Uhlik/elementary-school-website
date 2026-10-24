"use server";

import { redirect } from "next/navigation";
import type { ActionState } from "@/components/admin/ActionForm";
import { formatTime } from "@/lib/admin/time";
import { authConfig } from "@/lib/auth/config";
import { deleteOldLogs, logLogin } from "@/lib/auth/log";
import { verifyPassword } from "@/lib/auth/password";
import { createSession, deleteSession, getCurrentUser } from "@/lib/auth/session";
import { prisma } from "@/lib/db";

const WRONG = "Nesprávné jméno nebo heslo.";

const lockedMessage = (until: Date) => {
  const minutes = Math.max(1, Math.ceil((until.getTime() - Date.now()) / 60000));
  return `Účet je po ${authConfig.lockoutAttempts} chybných pokusech zablokovaný do ${formatTime(until)} (ještě ${minutes} min). Zkuste to potom znovu.`;
};

// Wrong passwords are counted per account; at the limit the account is locked for a while (lib/auth/config.ts)
export const login = async (data: FormData): Promise<ActionState> => {
  const username = String(data.get("username") ?? "")
    .trim()
    .slice(0, 100);
  const password = String(data.get("password") ?? "");
  const user = username ? await prisma.user.findUnique({ where: { username } }) : null;

  if (user?.lockedUntil && user.lockedUntil > new Date()) {
    await logLogin(user, "locked");
    return { error: lockedMessage(user.lockedUntil) };
  }
  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    if (!user) {
      await logLogin({ id: null, username }, "failed");
      return { error: WRONG };
    }
    const failed = user.failedLogins + 1;
    const lockedUntil =
      failed >= authConfig.lockoutAttempts ? new Date(Date.now() + authConfig.lockoutMinutes * 60000) : null;
    // after a lockout the count starts again from zero
    await prisma.user.update({ where: { id: user.id }, data: { failedLogins: lockedUntil ? 0 : failed, lockedUntil } });
    await logLogin(user, "failed");
    return { error: lockedUntil ? lockedMessage(lockedUntil) : WRONG };
  }

  await prisma.user.update({ where: { id: user.id }, data: { failedLogins: 0, lockedUntil: null } });
  await createSession(user.id);
  await logLogin(user, "login");
  await deleteOldLogs();
  redirect(user.mustChangePassword ? "/auth/ucet" : "/auth");
};

export const logout = async () => {
  await deleteSession();
  redirect("/admin");
};

// Called by the header timer: activity in the page keeps the session alive; false = already signed out
export const keepAlive = async () => Boolean(await getCurrentUser());

// Called by the header timer when it runs out; the page then goes to the sign-in page itself
export const timeoutLogout = async () => {
  await deleteSession("timeout");
};
