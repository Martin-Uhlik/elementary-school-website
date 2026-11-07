import type { Metadata } from "next";
import GalleryArchive from "@/components/content/GalleryArchive";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "/archiv/zakladni-skola",
  "Archiv základní školy",
  "Fotogalerie základní školy v Moravském Písku podle školních let.",
);

const ArchivZakladniSkolaPage = () => {
  return <GalleryArchive unit="zs" title="Archiv základní školy" />;
};

export default ArchivZakladniSkolaPage;
