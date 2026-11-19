"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { ActionState } from "@/components/admin/ActionForm";
import { text } from "@/lib/admin/form";
import { checkNewPassword, checkUsername } from "@/lib/auth/account";
import { logLogin } from "@/lib/auth/log";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import { requireUser } from "@/lib/auth/session";
import { eq } from "drizzle-orm";
import { users } from "@zsmp/db/schema";
import { database } from "@/lib/db";

// Both changes need the current password, so a browser left signed in cannot take over the account
const checkCurrent = async (userId: number, data: FormData) => {
  const [stored] = await database.select().from(users).where(eq(users.id, userId));
  return stored ? verifyPassword(String(data.get("current") ?? ""), stored.passwordHash) : false;
};

export const changePassword = async (data: FormData): Promise<ActionState> => {
  const user = await requireUser({ passwordPage: true });
  if (!(await checkCurrent(user.id, data))) return { error: "Současné heslo není správné." };
  const password = String(data.get("password") ?? "");
  const problem = checkNewPassword(password, String(data.get("again") ?? ""), user.username);
  if (problem) return { error: problem };

  await database
    .update(users)
    .set({ passwordHash: await hashPassword(password), mustChangePassword: false })
    .where(eq(users.id, user.id));
  await logLogin(user, "password");
  // the header shows the full menu again
  revalidatePath("/auth", "layout");
  if (user.mustChangePassword) redirect("/auth");
  return { message: "Heslo bylo změněno." };
};

export const changeUsername = async (data: FormData): Promise<ActionState> => {
  const user = await requireUser();
  if (!(await checkCurrent(user.id, data))) return { error: "Současné heslo není správné." };
  const username = text(data, "username");
  if (username === user.username) return { error: "Toto jméno už máte." };
  const problem = await checkUsername(username, user.id);
  if (problem) return { error: problem };

  await database.update(users).set({ username }).where(eq(users.id, user.id));
  await logLogin({ id: user.id, username: `${user.username} → ${username}` }, "username");
  revalidatePath("/auth", "layout");
  return { message: `Přihlašovací jméno je teď ${username}.` };
};
