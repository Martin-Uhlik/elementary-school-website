import type { LoginEventKind } from "@/lib/generated/prisma/enums";

export const LOGIN_EVENT_LABELS: Record<LoginEventKind, string> = {
  login: "Přihlášení",
  failed: "Chybné heslo",
  locked: "Pokus o přihlášení zablokovaného účtu",
  logout: "Odhlášení",
  timeout: "Odhlášení po nečinnosti",
  password: "Změna hesla",
  username: "Změna přihlašovacího jména",
};
