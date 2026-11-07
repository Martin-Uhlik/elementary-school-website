import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Gallery from "@/components/Gallery";
import { getGallery } from "@/lib/galleries";
import { pageMetadata } from "@/lib/seo";

export const generateMetadata = async ({ params }: PageProps<"/galerie/[id]">): Promise<Metadata> => {
  const gallery = await getGallery((await params).id);
  if (!gallery) return {};
  // the first photo is the preview picture of a shared link
  const [first] = gallery.images;
  return pageMetadata(
    `/galerie/${encodeURIComponent(gallery.id)}`,
    gallery.title,
    `Fotogalerie ZŠ a MŠ Moravský Písek: ${gallery.title}.`,
    first && { url: first.src, width: first.width, height: first.height, alt: gallery.title },
  );
};

const GalleryPage = async ({ params }: PageProps<"/galerie/[id]">) => {
  const gallery = await getGallery((await params).id);
  if (!gallery) notFound();
  return <Gallery title={gallery.title} back={gallery.back} images={gallery.images} />;
};

export default GalleryPage;
