import type { Metadata } from "next";
import GalleryArchive from "@/components/content/GalleryArchive";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "/archiv/materska-skola",
  "Archiv mateřské školy",
  "Fotogalerie mateřské školy v Moravském Písku podle školních let.",
);

const ArchivMaterskaSkolaPage = () => {
  return <GalleryArchive unit="ms" title="Archiv mateřské školy" />;
};

export default ArchivMaterskaSkolaPage;
