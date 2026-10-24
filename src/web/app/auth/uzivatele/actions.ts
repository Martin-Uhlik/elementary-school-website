"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { ActionState } from "@/components/admin/ActionForm";
import { optional, text } from "@/lib/admin/form";
import { checkNewPassword, checkUsername, readPermissions } from "@/lib/auth/account";
import { logActivity } from "@/lib/auth/log";
import { hashPassword } from "@/lib/auth/password";
import { PERMISSION_LABELS } from "@/lib/auth/sections";
import { requireUser } from "@/lib/auth/session";
import { prisma } from "@/lib/db";
import type { Permission } from "@/lib/generated/prisma/client";

const describe = (permissions: Permission[]) =>
  permissions.length ? permissions.map((p) => PERMISSION_LABELS[p]).join(", ") : "bez přístupu";

// Only admins manage users. A new user picks their own password after the first sign-in.
export const createUser = async (data: FormData): Promise<ActionState> => {
  const me = await requireUser({ section: "admin" });
  const username = text(data, "username");
  const password = String(data.get("password") ?? "");
  const permissions = readPermissions(data);
  const problem =
    (await checkUsername(username)) ?? checkNewPassword(password, String(data.get("again") ?? ""), username);
  if (problem) return { error: problem };

  await prisma.user.create({
    data: {
      username,
      realName: optional(data, "realName"),
      permissions,
      passwordHash: await hashPassword(password),
      mustChangePassword: true,
    },
  });
  await logActivity(me, "admin", `Přidán uživatel ${username} (${describe(permissions)})`);
  revalidatePath("/auth/uzivatele");
  return { message: `Uživatel ${username} byl přidán. Při prvním přihlášení si nastaví vlastní heslo.` };
};

// Name, real name, access and optionally a new temporary password. Nobody removes their own admin,
// so there is always at least one admin left.
export const updateUser = async (id: number, data: FormData): Promise<ActionState> => {
  const me = await requireUser({ section: "admin" });
  const user = await prisma.user.findUniqueOrThrow({ where: { id } });
  const username = text(data, "username");
  const permissions = readPermissions(data);
  const password = String(data.get("password") ?? "");
  const problem =
    (await checkUsername(username, id)) ??
    (password ? checkNewPassword(password, String(data.get("again") ?? ""), username) : undefined);
  if (problem) return { error: problem };
  if (id === me.id && !permissions.includes("admin")) return { error: "Sami sobě nemůžete odebrat správce." };

  await prisma.user.update({
    where: { id },
    data: {
      username,
      realName: optional(data, "realName"),
      permissions,
      ...(password && { passwordHash: await hashPassword(password), mustChangePassword: true }),
    },
  });
  // a new password or less access ends the user's open sessions
  if (password || user.permissions.some((p) => !permissions.includes(p)))
    await prisma.session.deleteMany({ where: { userId: id } });
  const changes = [
    username !== user.username && `jméno ${user.username} → ${username}`,
    `přístup: ${describe(permissions)}`,
    password && "nové dočasné heslo",
  ].filter(Boolean);
  await logActivity(me, "admin", `Upraven uživatel ${username} (${changes.join(", ")})`);
  revalidatePath("/auth", "layout");
  redirect("/auth/uzivatele");
};

// Lets a user locked after too many wrong passwords sign in again right away
export const unlockUser = async (id: number) => {
  const me = await requireUser({ section: "admin" });
  const user = await prisma.user.update({ where: { id }, data: { failedLogins: 0, lockedUntil: null } });
  await logActivity(me, "admin", `Odblokován uživatel ${user.username}`);
  revalidatePath("/auth/uzivatele");
};

export const deleteUser = async (id: number) => {
  const me = await requireUser({ section: "admin" });
  if (id === me.id) return;
  const user = await prisma.user.delete({ where: { id } });
  await logActivity(me, "admin", `Smazán uživatel ${user.username}`);
  revalidatePath("/auth/uzivatele");
};
