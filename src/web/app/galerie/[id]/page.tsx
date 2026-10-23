import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Gallery from "@/components/Gallery";
import { getGallery, listGalleryIds } from "@/lib/galleries";

export const dynamicParams = false;

export const generateStaticParams = async () => {
  return (await listGalleryIds()).map((id) => ({ id }));
};

export const generateMetadata = async ({ params }: PageProps<"/galerie/[id]">): Promise<Metadata> => {
  const gallery = await getGallery((await params).id);
  return gallery ? { title: `${gallery.title} | ZŠ a MŠ Moravský Písek` } : {};
};

const GalleryPage = async ({ params }: PageProps<"/galerie/[id]">) => {
  const gallery = await getGallery((await params).id);
  if (!gallery) notFound();
  return <Gallery title={gallery.title} images={gallery.images} />;
};

export default GalleryPage;
