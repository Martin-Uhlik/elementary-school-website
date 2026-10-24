import { createGallery } from "../actions";
import GalleryForm from "@/components/admin/GalleryForm";
import { requireUser } from "@/lib/auth/session";
import PageTitle from "@/components/admin/PageTitle";

const NewGalleryPage = async ({ searchParams }: PageProps<"/auth/galerie/nova">) => {
  await requireUser({ section: "galerie" });
  const unit = (await searchParams).jednotka;
  return (
    <>
      <PageTitle back="/auth/galerie" backLabel="Galerie">
        Nová galerie
      </PageTitle>
      <p className="mb-0">Po vytvoření do ní nahrajete fotky.</p>
      <section className="admin-card">
        <GalleryForm action={createGallery} unit={typeof unit === "string" ? unit : undefined} />
      </section>
    </>
  );
};

export default NewGalleryPage;
