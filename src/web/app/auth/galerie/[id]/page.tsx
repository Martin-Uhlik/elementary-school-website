import { notFound } from "next/navigation";
import { LuTrash2 } from "react-icons/lu";
import { deleteGallery, removePhoto, updateGallery } from "../actions";
import ConfirmButton from "@/components/admin/ConfirmButton";
import GalleryForm from "@/components/admin/GalleryForm";
import PhotoUploader from "@/components/admin/PhotoUploader";
import { requireUser } from "@/lib/auth/session";
import { galleryFolder, galleryHref } from "@/lib/content/format";
import { toGallery } from "@/lib/content/galleries";
import { prisma } from "@/lib/db";
import { getGallery } from "@/lib/galleries";
import PageTitle from "@/components/admin/PageTitle";

// One gallery: its details, the photos with their previews, upload and delete
const GalleryAdminPage = async ({ params }: PageProps<"/auth/galerie/[id]">) => {
  await requireUser({ section: "galerie" });
  const row = await prisma.gallery.findUnique({ where: { id: (await params).id } });
  if (!row) notFound();
  const gallery = toGallery(row);
  // a gallery whose folder is not on this server yet starts empty; the upload creates it
  const photos = gallery.url ? null : ((await getGallery(galleryFolder(gallery))) ?? { images: [] });
  const back = `/auth/galerie?jednotka=${gallery.unit}`;

  return (
    <>
      <div className="admin-title">
        <PageTitle back={back} backLabel="Galerie">
          {gallery.title}
        </PageTitle>
        <div className="d-flex gap-2">
          <a href={galleryHref(gallery)} className="btn btn-outline-secondary" target="_blank" rel="noreferrer">
            Zobrazit na webu
          </a>
          <ConfirmButton
            action={deleteGallery.bind(null, gallery.id)}
            question={`Opravdu smazat galerii „${gallery.title}“ i se všemi fotkami? Nelze vrátit.`}
            className="btn btn-outline-danger"
          >
            Smazat galerii
          </ConfirmButton>
        </div>
      </div>
      <section className="admin-card">
        <GalleryForm action={updateGallery.bind(null, gallery.id)} gallery={gallery} />
      </section>
      {photos && (
        <section className="admin-card d-flex flex-column gap-3" aria-labelledby="photos">
          <h2 id="photos" className="h5 mb-0">
            Fotky ({photos.images.length})
          </h2>
          <PhotoUploader galleryId={gallery.id} />
          <ul className="admin-photos">
            {photos.images.map((image) => {
              const file = decodeURIComponent(image.src.split("/").pop() ?? "");
              return (
                <li key={image.src}>
                  <a href={image.src} target="_blank" rel="noreferrer">
                    <img src={image.thumb} alt={file} loading="lazy" />
                  </a>
                  <ConfirmButton
                    action={removePhoto.bind(null, gallery.id, file)}
                    question={`Smazat fotku ${file}?`}
                    label={`Smazat fotku ${file}`}
                    className="btn btn-sm btn-danger"
                  >
                    <LuTrash2 aria-hidden="true" />
                  </ConfirmButton>
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </>
  );
};

export default GalleryAdminPage;
