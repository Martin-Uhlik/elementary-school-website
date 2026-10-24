import Link from "next/link";
import { pageName } from "@/lib/admin/pages";
import { requireUser } from "@/lib/auth/session";
import { prisma } from "@/lib/db";
import PageTitle from "@/components/admin/PageTitle";

// Every page of the site with its lists of documents and links
const DocumentsAdminPage = async () => {
  await requireUser({ section: "dokumenty" });
  const groups = await prisma.linkGroup.findMany({
    orderBy: { sortOrder: "asc" },
    include: { _count: { select: { links: true } } },
  });
  const pages = [...new Set(groups.map((g) => g.page))];
  return (
    <>
      <PageTitle back="/auth" backLabel="Přehled">
        Dokumenty a odkazy
      </PageTitle>
      <p className="mb-0">Vyberte seznam, ve kterém chcete přidat, upravit nebo nahradit dokument.</p>
      <div className="admin-tiles">
        {pages.map((page) => (
          <section key={page} className="admin-card" aria-labelledby={`page-${page}`}>
            <h2 id={`page-${page}`} className="h5">
              {pageName(page)}
            </h2>
            <ul className="list-unstyled mb-0 d-flex flex-column gap-1">
              {groups
                .filter((g) => g.page === page)
                .map((group) => (
                  <li key={group.id}>
                    <Link href={`/auth/dokumenty/${group.id}`}>{group.title ?? pageName(page)}</Link>{" "}
                    <span className="text-body-secondary small">({group._count.links})</span>
                  </li>
                ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
};

export default DocumentsAdminPage;
