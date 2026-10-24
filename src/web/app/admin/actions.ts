"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { ActionState } from "@/components/admin/ActionForm";
import { clearFailures, isLocked, recordFailure } from "@/lib/auth/loginLimit";
import { verifyPassword } from "@/lib/auth/password";
import { createSession, deleteSession } from "@/lib/auth/session";
import { prisma } from "@/lib/db";

const WRONG = "Nesprávné jméno nebo heslo.";

export const login = async (data: FormData): Promise<ActionState> => {
  const username = String(data.get("username") ?? "").trim();
  const password = String(data.get("password") ?? "");
  const address = (await headers()).get("x-forwarded-for")?.split(",")[0].trim() ?? "";
  const key = `${address} ${username.toLowerCase()}`;
  if (isLocked(key)) return { error: "Příliš mnoho pokusů. Zkuste to znovu za 15 minut." };

  const user = username ? await prisma.user.findUnique({ where: { username } }) : null;
  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    recordFailure(key);
    return { error: WRONG };
  }
  clearFailures(key);
  await createSession(user.id);
  redirect(user.mustChangePassword ? "/auth/heslo" : "/auth");
};

export const logout = async () => {
  await deleteSession();
  redirect("/admin");
};
