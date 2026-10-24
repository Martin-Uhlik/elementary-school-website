"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { can, SECTIONS } from "@/lib/auth/sections";
import type { Permission } from "@/lib/generated/prisma/enums";

// Menu of the admin area: only the sections the user may open; the current one is highlighted
const AdminNav = ({ permissions }: { permissions: Permission[] }) => {
  const pathname = usePathname();
  const links = [{ href: "/auth", label: "Přehled" }, ...SECTIONS.filter((s) => can(permissions, s.permission))];
  return (
    <ul className="navbar-nav flex-row flex-wrap column-gap-3">
      {links.map(({ href, label }) => {
        const active = href === "/auth" ? pathname === href : pathname.startsWith(href);
        return (
          <li key={href} className="nav-item">
            <Link
              href={href}
              className={`nav-link${active ? " active" : ""}`}
              aria-current={active ? "page" : undefined}
            >
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default AdminNav;
