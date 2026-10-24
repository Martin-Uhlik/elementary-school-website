"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { ActionState } from "@/components/admin/ActionForm";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import { requireUser } from "@/lib/auth/session";
import { prisma } from "@/lib/db";

const MIN_LENGTH = 8;

const checkNewPassword = (password: string, again: string, username: string) => {
  if (password.length < MIN_LENGTH) return `Heslo musí mít aspoň ${MIN_LENGTH} znaků.`;
  if (password !== again) return "Hesla se neshodují.";
  if (password.toLowerCase() === username.toLowerCase() || password === "zsmp") return "Zvolte jiné heslo.";
};

export const changePassword = async (data: FormData): Promise<ActionState> => {
  const user = await requireUser({ passwordPage: true });
  const current = String(data.get("current") ?? "");
  const password = String(data.get("password") ?? "");
  const stored = await prisma.user.findUniqueOrThrow({ where: { id: user.id } });
  if (!(await verifyPassword(current, stored.passwordHash))) return { error: "Současné heslo není správné." };
  const problem = checkNewPassword(password, String(data.get("again") ?? ""), user.username);
  if (problem) return { error: problem };

  await prisma.user.update({
    where: { id: user.id },
    data: { passwordHash: await hashPassword(password), mustChangePassword: false },
  });
  if (user.mustChangePassword) redirect("/auth");
  return { message: "Heslo bylo změněno." };
};

export const createUser = async (data: FormData): Promise<ActionState> => {
  await requireUser();
  const username = String(data.get("username") ?? "").trim();
  const password = String(data.get("password") ?? "");
  if (!/^[A-Za-z0-9._-]{3,40}$/.test(username))
    return { error: "Jméno: 3–40 znaků, jen písmena bez diakritiky, číslice, tečka, pomlčka." };
  const problem = checkNewPassword(password, String(data.get("again") ?? ""), username);
  if (problem) return { error: problem };
  if (await prisma.user.findUnique({ where: { username } })) return { error: "Uživatel s tímto jménem už existuje." };

  // a new user picks their own password after the first sign-in
  await prisma.user.create({
    data: { username, passwordHash: await hashPassword(password), mustChangePassword: true },
  });
  revalidatePath("/auth/uzivatele");
  return { message: `Uživatel ${username} byl přidán. Při prvním přihlášení si nastaví vlastní heslo.` };
};

export const deleteUser = async (id: number) => {
  const user = await requireUser();
  if (id === user.id) return;
  await prisma.user.delete({ where: { id } });
  revalidatePath("/auth/uzivatele");
};
