import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Gallery from "@/components/Gallery";
import { getGallery, listGalleryIds } from "@/lib/galleries";

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await listGalleryIds()).map((id) => ({ id }));
}

export async function generateMetadata({ params }: PageProps<"/galerie/[id]">): Promise<Metadata> {
  const gallery = await getGallery((await params).id);
  return gallery ? { title: `${gallery.title} | ZŠ a MŠ Moravský Písek` } : {};
}

export default async function GalleryPage({ params }: PageProps<"/galerie/[id]">) {
  const gallery = await getGallery((await params).id);
  if (!gallery) notFound();
  return <Gallery title={gallery.title} images={gallery.images} />;
}
