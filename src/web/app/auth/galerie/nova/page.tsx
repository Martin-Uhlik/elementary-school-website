import Link from "next/link";
import { createGallery } from "../actions";
import GalleryForm from "@/components/admin/GalleryForm";
import { requireUser } from "@/lib/auth/session";

const NewGalleryPage = async ({ searchParams }: PageProps<"/auth/galerie/nova">) => {
  await requireUser();
  const unit = (await searchParams).jednotka;
  return (
    <>
      <Link href="/auth/galerie">← Galerie</Link>
      <h1>Nová galerie</h1>
      <p className="mb-0">Po vytvoření do ní nahrajete fotky.</p>
      <section className="admin-card">
        <GalleryForm action={createGallery} unit={typeof unit === "string" ? unit : undefined} />
      </section>
    </>
  );
};

export default NewGalleryPage;
