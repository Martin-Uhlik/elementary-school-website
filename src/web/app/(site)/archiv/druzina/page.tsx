import type { Metadata } from "next";
import GalleryArchive from "@/components/content/GalleryArchive";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "/archiv/druzina",
  "Archiv družiny",
  "Fotogalerie školní družiny v Moravském Písku podle školních let.",
);

const ArchivDruzinaPage = () => {
  return <GalleryArchive unit="druzina" title="Archiv družiny" />;
};

export default ArchivDruzinaPage;
