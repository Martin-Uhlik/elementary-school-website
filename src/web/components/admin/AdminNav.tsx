"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/auth", label: "Přehled" },
  { href: "/auth/aktuality", label: "Aktuality" },
  { href: "/auth/lide", label: "Lidé" },
  { href: "/auth/dokumenty", label: "Dokumenty" },
  { href: "/auth/galerie", label: "Galerie" },
  { href: "/auth/uzivatele", label: "Uživatelé" },
];

// Menu of the admin area; the current section is underlined
const AdminNav = () => {
  const pathname = usePathname();
  return (
    <ul className="navbar-nav flex-row flex-wrap gap-3">
      {links.map(({ href, label }) => {
        const active = href === "/auth" ? pathname === href : pathname.startsWith(href);
        return (
          <li key={href} className="nav-item">
            <Link href={href} className="nav-link" aria-current={active ? "page" : undefined}>
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default AdminNav;
