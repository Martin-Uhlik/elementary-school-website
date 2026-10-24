import Link from "next/link";
import { LuPencil } from "react-icons/lu";
import { moveGallery } from "./actions";
import { UNIT_LABELS } from "@/components/admin/GalleryForm";
import MoveButtons from "@/components/admin/MoveButtons";
import { requireUser } from "@/lib/auth/session";
import { galleryFolder } from "@/lib/content/format";
import { toGallery } from "@/lib/content/galleries";
import { prisma } from "@/lib/db";
import { listPhotos } from "@/lib/galleries";
import type { Unit } from "@/lib/generated/prisma/client";

// Galleries of one unit and year (?jednotka=zs&rok=2026), newest year by default
const GalleriesAdminPage = async ({ searchParams }: PageProps<"/auth/galerie">) => {
  await requireUser();
  const query = await searchParams;
  const unit: Unit = (Object.keys(UNIT_LABELS).find((u) => u === query.jednotka) as Unit | undefined) ?? "zs";
  const years = (
    await prisma.gallery.findMany({
      where: { unit },
      distinct: ["year"],
      select: { year: true },
      orderBy: { year: "desc" },
    })
  ).map((g) => g.year);
  const year = years.find((y) => String(y) === query.rok) ?? years[0];
  const galleries = (await prisma.gallery.findMany({ where: { unit, year }, orderBy: { sortOrder: "asc" } })).map(
    toGallery,
  );
  const counts = await Promise.all(
    galleries.map(async (g) => (g.url ? null : (await listPhotos(galleryFolder(g))).length)),
  );

  return (
    <>
      <div className="admin-title">
        <h1>Galerie</h1>
        <Link href={`/auth/galerie/nova?jednotka=${unit}`} className="btn btn-primary">
          Nová galerie
        </Link>
      </div>
      <form className="d-flex gap-2 align-items-end flex-wrap">
        <div>
          <label htmlFor="jednotka" className="form-label">
            Část školy
          </label>
          <select id="jednotka" name="jednotka" className="form-select" defaultValue={unit}>
            {Object.entries(UNIT_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="rok" className="form-label">
            Rok
          </label>
          <select id="rok" name="rok" className="form-select" defaultValue={year}>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-outline-primary">
          Zobrazit
        </button>
      </form>
      <section className="admin-card">
        {galleries.length === 0 ? (
          <p className="mb-0">Žádné galerie.</p>
        ) : (
          <table className="table admin-table mb-0">
            <caption className="visually-hidden">
              Galerie: {UNIT_LABELS[unit]} {year}
            </caption>
            <thead>
              <tr>
                <th scope="col">Datum</th>
                <th scope="col">Název</th>
                <th scope="col">Fotek</th>
                <th scope="col" className="actions">
                  <span className="visually-hidden">Akce</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {galleries.map((gallery, i) => (
                <tr key={gallery.id}>
                  <td>{gallery.dateText}</td>
                  <td>{gallery.title}</td>
                  <td>{counts[i] ?? "video"}</td>
                  <td className="actions">
                    <MoveButtons
                      up={moveGallery.bind(null, gallery.id, "up")}
                      down={moveGallery.bind(null, gallery.id, "down")}
                      name={gallery.title}
                      first={i === 0}
                      last={i === galleries.length - 1}
                    />
                    <Link
                      href={`/auth/galerie/${gallery.id}`}
                      className="btn btn-sm btn-outline-primary"
                      aria-label={`Upravit ${gallery.title}`}
                      title="Upravit a nahrát fotky"
                    >
                      <LuPencil aria-hidden="true" />
                    </Link>
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

export default GalleriesAdminPage;
