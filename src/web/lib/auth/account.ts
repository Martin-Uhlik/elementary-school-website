import "server-only";
import { PERMISSIONS } from "@/lib/auth/sections";
import { prisma } from "@/lib/db";

const MIN_LENGTH = 8;

// The rules for sign-in names and passwords; each returns an error message, or undefined when all is fine
export const checkUsername = async (username: string, userId?: number) => {
  if (!/^[A-Za-z0-9._-]{3,40}$/.test(username))
    return "Jméno: 3–40 znaků, jen písmena bez diakritiky, číslice, tečka, pomlčka.";
  const other = await prisma.user.findUnique({ where: { username } });
  if (other && other.id !== userId) return "Uživatel s tímto jménem už existuje.";
};

export const checkNewPassword = (password: string, again: string, username: string) => {
  if (password.length < MIN_LENGTH) return `Heslo musí mít aspoň ${MIN_LENGTH} znaků.`;
  if (password !== again) return "Hesla se neshodují.";
  if (password.toLowerCase() === username.toLowerCase() || password === "zsmp") return "Zvolte jiné heslo.";
};

// The ticked boxes of the access form
export const readPermissions = (data: FormData) => PERMISSIONS.filter((p) => data.getAll("permissions").includes(p));
