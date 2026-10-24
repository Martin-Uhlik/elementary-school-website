import Link from "next/link";
import { notFound } from "next/navigation";
import { LuPencil, LuTrash2 } from "react-icons/lu";
import { deleteLink, moveLink, renameGroup } from "../actions";
import ActionForm from "@/components/admin/ActionForm";
import ConfirmButton from "@/components/admin/ConfirmButton";
import MoveButtons from "@/components/admin/MoveButtons";
import { pageName } from "@/lib/admin/pages";
import { requireUser } from "@/lib/auth/session";
import { prisma } from "@/lib/db";
import PageTitle from "@/components/admin/PageTitle";

// One list of documents: its heading, its items in order, and buttons to add, edit, move and delete
const GroupAdminPage = async ({ params }: PageProps<"/auth/dokumenty/[group]">) => {
  await requireUser({ section: "dokumenty" });
  const group = await prisma.linkGroup.findUnique({
    where: { id: (await params).group },
    include: { links: { orderBy: { sortOrder: "asc" } } },
  });
  if (!group) notFound();
  return (
    <>
      <div className="admin-title">
        <PageTitle back="/auth/dokumenty" backLabel="Dokumenty a odkazy">
          {pageName(group.page)}
          {group.title && `: ${group.title}`}
        </PageTitle>
        <div className="d-flex gap-2">
          <a href={group.page} className="btn btn-outline-secondary" target="_blank" rel="noreferrer">
            Zobrazit stránku
          </a>
          <Link href={`/auth/dokumenty/${group.id}/novy`} className="btn btn-primary">
            Přidat dokument
          </Link>
        </div>
      </div>
      <section className="admin-card">
        {group.links.length === 0 ? (
          <p className="mb-0">Seznam je prázdný.</p>
        ) : (
          <table className="table admin-table mb-0">
            <caption className="visually-hidden">Položky seznamu</caption>
            <thead>
              <tr>
                <th scope="col">Název</th>
                <th scope="col">Soubor nebo adresa</th>
                <th scope="col" className="admin-table__actions">
                  <span className="visually-hidden">Akce</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {group.links.map((link, i) => (
                <tr key={link.id}>
                  <td>{link.title}</td>
                  <td className="small text-break">
                    {link.href && (
                      <a href={link.href} target="_blank" rel="noreferrer">
                        {link.href}
                      </a>
                    )}
                  </td>
                  <td className="admin-table__actions">
                    <MoveButtons
                      up={moveLink.bind(null, group.id, link.id, "up")}
                      down={moveLink.bind(null, group.id, link.id, "down")}
                      name={link.title}
                      first={i === 0}
                      last={i === group.links.length - 1}
                    />
                    <Link
                      href={`/auth/dokumenty/${group.id}/${link.id}`}
                      className="btn btn-sm btn-outline-primary me-2"
                      aria-label={`Upravit ${link.title}`}
                      title="Upravit"
                    >
                      <LuPencil aria-hidden="true" />
                    </Link>
                    <ConfirmButton
                      action={deleteLink.bind(null, link.id)}
                      question={`Opravdu odebrat „${link.title}“ ze seznamu?`}
                      label={`Smazat ${link.title}`}
                    >
                      <LuTrash2 aria-hidden="true" />
                    </ConfirmButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
      <section className="admin-card" aria-labelledby="group-title">
        <h2 id="group-title" className="h5">
          Nadpis seznamu
        </h2>
        <ActionForm action={renameGroup.bind(null, group.id)} submitLabel="Uložit nadpis">
          <div>
            <label htmlFor="title" className="form-label visually-hidden">
              Nadpis seznamu
            </label>
            <input id="title" name="title" className="form-control" defaultValue={group.title ?? ""} />
          </div>
        </ActionForm>
      </section>
    </>
  );
};

export default GroupAdminPage;
