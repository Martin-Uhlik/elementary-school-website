import Link from "next/link";
import FilterForm from "@/components/admin/FilterForm";
import LoginEventsTable from "@/components/admin/LoginEventsTable";
import { formatDateTime, startOfPragueDay } from "@/lib/admin/time";
import { authConfig } from "@/lib/auth/config";
import { PERMISSION_LABELS } from "@/lib/auth/sections";
import { requireUser } from "@/lib/auth/session";
import { prisma } from "@/lib/db";
import PageTitle from "@/components/admin/PageTitle";

const PAGE_SIZE = 100;
const DAY = /^\d{4}-\d{2}-\d{2}$/;
const KINDS = { prihlaseni: "Přihlášení", cinnost: "Činnost" } as const;

const param = (value: string | string[] | undefined) => (typeof value === "string" ? value : "");

// Only for admins: sign-ins (?druh=prihlaseni) or changes made in the admin (?druh=cinnost),
// filtered by user (&uzivatel=3) and Czech days (&od=2026-10-01&do=2026-10-24), 100 per page (&strana=2)
const LogsPage = async ({ searchParams }: PageProps<"/auth/logy">) => {
  await requireUser({ section: "admin" });
  const query = await searchParams;
  const kind = param(query.druh) === "cinnost" ? "cinnost" : "prihlaseni";
  const userId = Number(param(query.uzivatel)) || undefined;
  const from = DAY.test(param(query.od)) ? param(query.od) : "";
  const to = DAY.test(param(query.do)) ? param(query.do) : "";
  const page = Math.max(1, Number(param(query.strana)) || 1);

  const createdAt = {
    ...(from && { gte: startOfPragueDay(from) }),
    // "do" includes the whole day
    ...(to && { lt: startOfPragueDay(new Date(Date.parse(to) + 86400000).toISOString().slice(0, 10)) }),
  };
  const where = { userId, createdAt };
  const paging = { orderBy: { createdAt: "desc" as const }, skip: (page - 1) * PAGE_SIZE, take: PAGE_SIZE + 1 };
  const [users, events, activities] = await Promise.all([
    prisma.user.findMany({ orderBy: { username: "asc" }, select: { id: true, username: true, realName: true } }),
    kind === "prihlaseni" ? prisma.loginEvent.findMany({ where, ...paging }) : [],
    kind === "cinnost" ? prisma.activity.findMany({ where, ...paging }) : [],
  ]);
  const rows = kind === "prihlaseni" ? events.length : activities.length;
  const more = rows > PAGE_SIZE;

  const href = (changes: Record<string, string | number>) => {
    const params = new URLSearchParams(
      Object.entries({ druh: kind, uzivatel: userId ?? "", od: from, do: to, ...changes })
        .filter(([, value]) => value !== "" && value !== 1)
        .map(([key, value]) => [key, String(value)]),
    );
    return `/auth/logy?${params}`;
  };

  return (
    <>
      <PageTitle back="/auth" backLabel="Přehled">
        Logy
      </PageTitle>
      <p className="mb-0">Záznamy starší než {authConfig.logRetentionDays} dní se automaticky mažou.</p>
      <ul className="nav nav-tabs">
        {Object.entries(KINDS).map(([value, label]) => (
          <li key={value} className="nav-item">
            <Link
              href={href({ druh: value, strana: 1 })}
              className={`nav-link${value === kind ? " active" : ""}`}
              aria-current={value === kind ? "page" : undefined}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
      <FilterForm action="/auth/logy">
        <input type="hidden" name="druh" value={kind} />
        <div>
          <label htmlFor="uzivatel" className="form-label">
            Uživatel
          </label>
          <select id="uzivatel" name="uzivatel" className="form-select" defaultValue={userId ?? ""}>
            <option value="">Všichni</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.username}
                {user.realName ? ` (${user.realName})` : ""}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="od" className="form-label">
            Od
          </label>
          <input id="od" name="od" type="date" className="form-control" defaultValue={from} max={to || undefined} />
        </div>
        <div>
          <label htmlFor="do" className="form-label">
            Do
          </label>
          <input id="do" name="do" type="date" className="form-control" defaultValue={to} min={from || undefined} />
        </div>
        {(userId || from || to) && (
          <Link href={`/auth/logy?druh=${kind}`} className="btn btn-link px-0">
            Zrušit filtr
          </Link>
        )}
      </FilterForm>
      <section className="admin-card">
        {rows === 0 ? (
          <p className="mb-0">Nic nenalezeno.</p>
        ) : kind === "prihlaseni" ? (
          <LoginEventsTable events={events.slice(0, PAGE_SIZE)} caption="Přihlášení a změny účtů" showUser />
        ) : (
          <div className="table-responsive" role="region" aria-label="Změny ve správě webu" tabIndex={0}>
            <table className="table admin-table mb-0">
              <caption className="visually-hidden">Změny ve správě webu</caption>
              <thead>
                <tr>
                  <th scope="col">Čas</th>
                  <th scope="col">Uživatel</th>
                  <th scope="col">Část</th>
                  <th scope="col">Co se změnilo</th>
                  <th scope="col">IP adresa</th>
                </tr>
              </thead>
              <tbody>
                {activities.slice(0, PAGE_SIZE).map((activity) => (
                  <tr key={activity.id}>
                    <td className="text-nowrap">{formatDateTime(activity.createdAt)}</td>
                    <td>{activity.username}</td>
                    <td>{PERMISSION_LABELS[activity.section].replace(/ \(.*\)$/, "")}</td>
                    <td>{activity.text}</td>
                    <td>{activity.ip || "–"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
      {(page > 1 || more) && (
        <nav aria-label="Stránky logu" className="d-flex gap-3">
          {page > 1 && <Link href={href({ strana: page - 1 })}>← Novější</Link>}
          {more && (
            <Link href={href({ strana: page + 1 })} className="ms-auto">
              Starší →
            </Link>
          )}
        </nav>
      )}
    </>
  );
};

export default LogsPage;
