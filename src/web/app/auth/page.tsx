import Link from "next/link";
import { LuCalendarDays, LuFileText, LuImages, LuKeyRound, LuLogs, LuNewspaper, LuUsers } from "react-icons/lu";
import LoginEventsTable from "@/components/admin/LoginEventsTable";
import { can } from "@/lib/auth/sections";
import { requireUser } from "@/lib/auth/session";
import { prisma } from "@/lib/db";

// The start of the admin area: a tile per section the user may open, and their own recent sign-ins
const DashboardPage = async ({ searchParams }: PageProps<"/auth">) => {
  const user = await requireUser();
  const denied = (await searchParams).pristup === "odepren";
  const [news, people, links, galleries, calendarEvents, events] = await Promise.all([
    prisma.news.count({ where: { published: true } }),
    prisma.person.count(),
    prisma.link.count(),
    prisma.gallery.count(),
    prisma.calendarEvent.count(),
    prisma.loginEvent.findMany({ where: { userId: user.id }, orderBy: { createdAt: "desc" }, take: 10 }),
  ]);
  const tiles = [
    {
      href: "/auth/aktuality",
      permission: "aktuality",
      title: "Aktuality",
      note: `${news} na hlavní stránce`,
      Icon: LuNewspaper,
    },
    {
      href: "/auth/lide",
      permission: "lide",
      title: "Lidé a kontakty",
      note: `${people} osob a kontaktů`,
      Icon: LuUsers,
    },
    {
      href: "/auth/dokumenty",
      permission: "dokumenty",
      title: "Dokumenty a odkazy",
      note: `${links} položek na stránkách`,
      Icon: LuFileText,
    },
    { href: "/auth/galerie", permission: "galerie", title: "Galerie", note: `${galleries} galerií`, Icon: LuImages },
    {
      href: "/auth/prubeh-roku",
      permission: "kalendar",
      title: "Průběh školního roku",
      note: `${calendarEvents} událostí`,
      Icon: LuCalendarDays,
    },
    { href: "/auth/uzivatele", permission: "admin", title: "Uživatelé", note: "přístupy do správy", Icon: LuKeyRound },
    { href: "/auth/logy", permission: "admin", title: "Logy", note: "přihlášení a změny", Icon: LuLogs },
  ] as const;
  const visible = tiles.filter((tile) => can(user.permissions, tile.permission));
  return (
    <>
      <h1 className="admin-main__title">Správa webu</h1>
      {denied && (
        <div className="alert alert-warning mb-0" role="alert">
          Do této části nemáte přístup. Požádejte správce webu.
        </div>
      )}
      {visible.length === 0 ? (
        <p className="mb-0">Zatím nemáte přístup do žádné části. Požádejte správce webu.</p>
      ) : (
        <ul className="admin-tiles list-unstyled mb-0">
          {visible.map(({ href, title, note, Icon }) => (
            <li key={href}>
              <Link href={href} className="admin-card admin-tile h-100">
                <Icon className="admin-tile__icon" aria-hidden="true" />
                <span className="fw-bold">{title}</span>
                <span className="small text-body-secondary">{note}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
      <section className="admin-card" aria-labelledby="my-logins">
        <h2 id="my-logins" className="h5">
          Moje poslední přihlášení
        </h2>
        <p className="small text-body-secondary">
          Když tu uvidíte přihlášení, které jste neudělali, změňte si v <Link href="/auth/ucet">Můj účet</Link> heslo.
        </p>
        <LoginEventsTable events={events} caption="Moje poslední přihlášení a změny účtu" />
      </section>
    </>
  );
};

export default DashboardPage;
