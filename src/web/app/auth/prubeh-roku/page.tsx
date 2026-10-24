import Link from "next/link";
import { LuPencil, LuSun, LuTrash2 } from "react-icons/lu";
import { deleteEvent } from "./actions";
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
          <Link href="/auth/prubeh-roku/nova" className="btn btn-primary">
            Nová událost
          </Link>
        </div>
      </div>
      <p className="mb-0">
        Na webu se zobrazí všechny školní roky, které tu jsou. Starý rok zmizí, když smažete jeho události.
      </p>
      {years.length > 0 && (
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
                <th scope="col" className="actions">
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
                    <td className="actions">
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
    </>
  );
};

export default CalendarAdminPage;
