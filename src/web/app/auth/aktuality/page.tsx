import Link from "next/link";
import { LuPencil, LuTrash2 } from "react-icons/lu";
import { deleteNews } from "./actions";
import ConfirmButton from "@/components/admin/ConfirmButton";
import { formatDate } from "@/components/content/NewsList";
import { isoDate } from "@/lib/content/misc";
import { requireUser } from "@/lib/auth/session";
import { prisma } from "@/lib/db";
import PageTitle from "@/components/admin/PageTitle";

const NewsAdminPage = async () => {
  await requireUser({ section: "aktuality" });
  const news = await prisma.news.findMany({ orderBy: [{ date: "desc" }, { createdAt: "desc" }] });
  return (
    <>
      <div className="admin-title">
        <PageTitle back="/auth" backLabel="Přehled">
          Aktuality
        </PageTitle>
        <Link href="/auth/aktuality/nova" className="btn btn-primary">
          Nová aktualita
        </Link>
      </div>
      <p className="mb-0">Zobrazují se na hlavní stránce v části „Aktuální informace“, nejnovější nahoře.</p>
      <section className="admin-card">
        {news.length === 0 ? (
          <p className="mb-0">Zatím tu nejsou žádné aktuality.</p>
        ) : (
          <table className="table admin-table mb-0">
            <caption className="visually-hidden">Aktuality</caption>
            <thead>
              <tr>
                <th scope="col">Datum</th>
                <th scope="col">Nadpis</th>
                <th scope="col">Na webu</th>
                <th scope="col" className="admin-table__actions">
                  <span className="visually-hidden">Akce</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {news.map((item) => (
                <tr key={item.id}>
                  <td>{formatDate(isoDate(item.date))}</td>
                  <td>{item.title}</td>
                  <td>{item.published ? "ano" : "skrytá"}</td>
                  <td className="admin-table__actions">
                    <Link
                      href={`/auth/aktuality/${item.id}`}
                      className="btn btn-sm btn-outline-primary me-2"
                      aria-label={`Upravit ${item.title}`}
                      title="Upravit"
                    >
                      <LuPencil aria-hidden="true" />
                    </Link>
                    <ConfirmButton
                      action={deleteNews.bind(null, item.id)}
                      question={`Opravdu smazat aktualitu „${item.title}“?`}
                      label={`Smazat ${item.title}`}
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
    </>
  );
};

export default NewsAdminPage;
