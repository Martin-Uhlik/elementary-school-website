import Link from "next/link";
import { LuPencil, LuTrash2 } from "react-icons/lu";
import { deletePerson, movePerson } from "./actions";
import ConfirmButton from "@/components/admin/ConfirmButton";
import FilterForm from "@/components/admin/FilterForm";
import MoveButtons from "@/components/admin/MoveButtons";
import { getLabels } from "@/lib/admin/people";
import { requireUser } from "@/lib/auth/session";
import { personName } from "@/lib/content/format";
import { personInclude, toPerson } from "@/lib/content/people";
import { prisma } from "@/lib/db";
import PageTitle from "@/components/admin/PageTitle";

// Everyone, or one section (?sekce=Učitelé) in the order the site shows it
const PeopleAdminPage = async ({ searchParams }: PageProps<"/auth/lide">) => {
  await requireUser({ section: "lide" });
  const section = (await searchParams).sekce;
  const label = typeof section === "string" && section ? section : undefined;
  const labels = await getLabels();
  const people = (
    await prisma.person.findMany({
      where: label ? { labels: { has: label } } : undefined,
      orderBy: { sortOrder: "asc" },
      include: personInclude,
    })
  ).map(toPerson);

  return (
    <>
      <div className="admin-title">
        <PageTitle back="/auth" backLabel="Přehled">
          Lidé a kontakty
        </PageTitle>
        <Link href={`/auth/lide/novy${label ? `?sekce=${encodeURIComponent(label)}` : ""}`} className="btn btn-primary">
          Přidat osobu
        </Link>
      </div>
      <FilterForm action="/auth/lide">
        <div>
          <label htmlFor="sekce" className="form-label">
            Sekce
          </label>
          <select id="sekce" name="sekce" className="form-select" defaultValue={label ?? ""}>
            <option value="">Všichni</option>
            {labels.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div>
      </FilterForm>
      <section className="admin-card">
        <p className="small text-body-secondary">
          Šipkami změníte pořadí{label ? ` v sekci „${label}“` : ""}. Pořadí platí na všech stránkách.
        </p>
        <table className="table admin-table mb-0">
          <caption className="visually-hidden">Lidé{label ? ` v sekci ${label}` : ""}</caption>
          <thead>
            <tr>
              <th scope="col">Jméno</th>
              <th scope="col">Funkce</th>
              <th scope="col">Sekce</th>
              <th scope="col" className="actions">
                <span className="visually-hidden">Akce</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {people.map((person, i) => {
              const name = personName(person);
              return (
                <tr key={person.id}>
                  <td>{name}</td>
                  <td>{person.position}</td>
                  <td className="small">{person.labels.join(", ")}</td>
                  <td className="actions">
                    <MoveButtons
                      up={movePerson.bind(null, person.id, label, "up")}
                      down={movePerson.bind(null, person.id, label, "down")}
                      name={name}
                      first={i === 0}
                      last={i === people.length - 1}
                    />
                    <Link
                      href={`/auth/lide/${person.id}`}
                      className="btn btn-sm btn-outline-primary me-2"
                      aria-label={`Upravit ${name}`}
                      title="Upravit"
                    >
                      <LuPencil aria-hidden="true" />
                    </Link>
                    <ConfirmButton
                      action={deletePerson.bind(null, person.id)}
                      question={`Opravdu smazat ${name}?`}
                      label={`Smazat ${name}`}
                    >
                      <LuTrash2 aria-hidden="true" />
                    </ConfirmButton>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default PeopleAdminPage;
