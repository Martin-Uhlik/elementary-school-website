import LinkItem from "./LinkItem";
import type { Gallery } from "@/data/types";
import { galleryHref, galleryLabel } from "@/lib/content/galleries";

// Galleries as the site's usual list of links
const GalleryList = ({ galleries }: { galleries: Gallery[] }) => {
  return (
    <ul className="documents">
      {galleries.map((gallery) => (
        <li key={gallery.id}>
          <LinkItem link={{ id: gallery.id, groupId: "", title: galleryLabel(gallery), href: galleryHref(gallery) }} />
        </li>
      ))}
    </ul>
  );
};

export default GalleryList;
