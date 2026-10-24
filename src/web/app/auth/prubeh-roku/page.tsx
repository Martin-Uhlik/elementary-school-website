import Link from "next/link";
import { LuPencil, LuSun, LuTrash2 } from "react-icons/lu";
import { createYear, deleteEvent, deleteYear } from "./actions";
import ActionForm from "@/components/admin/ActionForm";
import ConfirmButton from "@/components/admin/ConfirmButton";
import FilterForm from "@/components/admin/FilterForm";
import PageTitle from "@/components/admin/PageTitle";
import { requireUser } from "@/lib/auth/session";
import { calendarDateLabel } from "@/lib/content/format";
import { getSchoolYears } from "@/lib/content/misc";

// Průběh školního roku: one school year (?rok=2026/2027), the newest by default, events by date
const CalendarAdminPage = async ({ searchParams }: PageProps<"/auth/prubeh-roku">) => {
  await requireUser({ section: "kalendar" });
  const query = (await searchParams).rok;
  const years = (await getSchoolYears()).reverse();
  const current = years.find((y) => y.schoolYear === query) ?? years[0];
  // the year after the newest one, e.g. 2028/2029
  const newest = Number(years[0]?.schoolYear.slice(0, 4) ?? new Date().getFullYear());
  const suggested = `${newest + 1}/${newest + 2}`;

  return (
    <>
      <div className="admin-title">
        <PageTitle back="/auth" backLabel="Přehled">
          Průběh školního roku
        </PageTitle>
        <div className="d-flex gap-2">
          <a
            href="/organizace/prubeh-skolniho-roku"
            className="btn btn-outline-secondary"
            target="_blank"
            rel="noreferrer"
          >
            Zobrazit na webu
          </a>
          <a href="#new-year" className="btn btn-outline-primary">
            Nový školní rok
          </a>
          <Link
            href={`/auth/prubeh-roku/nova${current ? `?rok=${encodeURIComponent(current.schoolYear)}` : ""}`}
            className="btn btn-primary"
          >
            Nová událost
          </Link>
        </div>
      </div>
      <p className="mb-0">
        Na webu se zobrazí všechny školní roky, které tu jsou. Starý rok smažete tlačítkem vedle výběru roku.
      </p>
      {current && (
        <div className="d-flex flex-wrap align-items-end gap-3">
          <FilterForm action="/auth/prubeh-roku">
            <div>
              <label htmlFor="rok" className="form-label">
                Školní rok
              </label>
              <select id="rok" name="rok" className="form-select" defaultValue={current.schoolYear}>
                {years.map(({ schoolYear }) => (
                  <option key={schoolYear} value={schoolYear}>
                    {schoolYear}
                  </option>
                ))}
              </select>
            </div>
          </FilterForm>
          <ConfirmButton
            action={deleteYear.bind(null, current.schoolYear)}
            question={`Opravdu smazat celý školní rok ${current.schoolYear} (${current.events.length} událostí)? Nelze vrátit.`}
            className="btn btn-outline-danger"
          >
            Smazat rok {current.schoolYear}
          </ConfirmButton>
        </div>
      )}
      <section className="admin-card">
        {!current ? (
          <p className="mb-0">Zatím tu nejsou žádné události.</p>
        ) : (
          <table className="table admin-table mb-0">
            <caption className="visually-hidden">Průběh školního roku {current.schoolYear}</caption>
            <thead>
              <tr>
                <th scope="col">Datum</th>
                <th scope="col">Text</th>
                <th scope="col" className="admin-table__actions">
                  <span className="visually-hidden">Akce</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {current.events.map((event) => {
                const label = calendarDateLabel(event);
                return (
                  <tr key={event.id}>
                    <td className="text-nowrap">
                      {label}
                      {event.holiday && (
                        <span className="badge text-bg-warning ms-2">
                          <LuSun aria-hidden="true" /> Prázdniny
                        </span>
                      )}
                    </td>
                    <td>{event.text.replaceAll("**", "")}</td>
                    <td className="admin-table__actions">
                      <Link
                        href={`/auth/prubeh-roku/${event.id}`}
                        className="btn btn-sm btn-outline-primary me-1"
                        aria-label={`Upravit událost ${label}`}
                        title="Upravit"
                      >
                        <LuPencil aria-hidden="true" />
                      </Link>
                      <ConfirmButton
                        action={deleteEvent.bind(null, event.id)}
                        question={`Opravdu smazat událost ${label}?`}
                        label={`Smazat událost ${label}`}
                      >
                        <LuTrash2 aria-hidden="true" />
                      </ConfirmButton>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </section>
      <section className="admin-card" aria-labelledby="new-year">
        <h2 id="new-year" className="h5">
          Nový školní rok
        </h2>
        <ActionForm action={createYear} submitLabel="Přidat rok">
          <div className="row g-3 align-items-end">
            <div className="col-sm-4">
              <label htmlFor="newSchoolYear" className="form-label">
                Školní rok
              </label>
              <input
                id="newSchoolYear"
                name="schoolYear"
                className="form-control"
                pattern="\d{4}/\d{4}"
                defaultValue={suggested}
                required
              />
            </div>
            <div className="col-sm-8">
              <label htmlFor="copyFrom" className="form-label">
                Události
              </label>
              <select id="copyFrom" name="copyFrom" className="form-select" defaultValue={current?.schoolYear ?? ""}>
                <option value="">Začít prázdný (přidáte první událost)</option>
                {years.map(({ schoolYear, events }) => (
                  <option key={schoolYear} value={schoolYear}>
                    Zkopírovat z {schoolYear} ({events.length} událostí, data o rok později)
                  </option>
                ))}
              </select>
            </div>
          </div>
          <p className="form-text mb-0">
            Po zkopírování zkontrolujte data a texty: dny v týdnu a termíny prázdnin se každý rok liší.
          </p>
        </ActionForm>
      </section>
    </>
  );
};

export default CalendarAdminPage;
