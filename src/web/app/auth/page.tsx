import Link from "next/link";
import { LuFileText, LuImages, LuKeyRound, LuNewspaper, LuUsers } from "react-icons/lu";
import { requireUser } from "@/lib/auth/session";
import { prisma } from "@/lib/db";

// The start of the admin area: one tile per kind of content
const DashboardPage = async () => {
  await requireUser();
  const [news, people, links, galleries] = await Promise.all([
    prisma.news.count({ where: { published: true } }),
    prisma.person.count(),
    prisma.link.count(),
    prisma.gallery.count(),
  ]);
  const tiles = [
    { href: "/auth/aktuality", title: "Aktuality", note: `${news} na hlavní stránce`, Icon: LuNewspaper },
    { href: "/auth/lide", title: "Lidé a kontakty", note: `${people} osob a kontaktů`, Icon: LuUsers },
    { href: "/auth/dokumenty", title: "Dokumenty a odkazy", note: `${links} položek na stránkách`, Icon: LuFileText },
    { href: "/auth/galerie", title: "Galerie", note: `${galleries} galerií`, Icon: LuImages },
    { href: "/auth/uzivatele", title: "Uživatelé", note: "přístupy do správy, změna hesla", Icon: LuKeyRound },
  ];
  return (
    <>
      <h1>Správa webu</h1>
      <ul className="admin-tiles list-unstyled mb-0">
        {tiles.map(({ href, title, note, Icon }) => (
          <li key={href}>
            <Link href={href} className="admin-card admin-tile h-100">
              <Icon className="admin-tile__icon" aria-hidden="true" />
              <span className="fw-bold">{title}</span>
              <span className="small text-body-secondary">{note}</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default DashboardPage;
