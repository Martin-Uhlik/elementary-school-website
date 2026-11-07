import type { Permission } from "@/lib/generated/prisma/enums";

// The parts of the admin area and who may open them. Admin can open everything, Uživatelé and Logy only admin.
export const PERMISSION_LABELS: Record<Permission, string> = {
  aktuality: "Aktuality",
  lide: "Lidé",
  dokumenty: "Dokumenty",
  galerie: "Galerie",
  kalendar: "Průběh roku",
  pozadi: "Pozadí",
  admin: "Správce (uživatelé a logy)",
};

export const PERMISSIONS = Object.keys(PERMISSION_LABELS) as Permission[];

export const SECTIONS: { href: string; label: string; permission: Permission }[] = [
  { href: "/auth/aktuality", label: "Aktuality", permission: "aktuality" },
  { href: "/auth/lide", label: "Lidé", permission: "lide" },
  { href: "/auth/dokumenty", label: "Dokumenty", permission: "dokumenty" },
  { href: "/auth/galerie", label: "Galerie", permission: "galerie" },
  { href: "/auth/prubeh-roku", label: "Průběh roku", permission: "kalendar" },
  { href: "/auth/pozadi", label: "Pozadí", permission: "pozadi" },
  { href: "/auth/uzivatele", label: "Uživatelé", permission: "admin" },
  { href: "/auth/logy", label: "Logy", permission: "admin" },
];

export const can = (permissions: Permission[], permission: Permission) =>
  permissions.includes("admin") || permissions.includes(permission);
