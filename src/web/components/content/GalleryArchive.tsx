import GalleryCard from "./GalleryCard";
import YearNav from "./YearNav";
import type { Unit } from "@/data/types";
import { galleryDay, galleryHref, getGalleryArchive, yearAnchor } from "@/lib/content/galleries";
import { getGalleryPreviews } from "@/lib/galleries";

// The archive page of one unit: a sticky year bar and the galleries of each year as cards
const GalleryArchive = async ({ unit, title }: { unit: Unit; title: string }) => {
  const years = await getGalleryArchive(unit);
  const previews = await getGalleryPreviews(years.flatMap((y) => y.galleries.map((g) => g.folder ?? g.id)));
  return (
    <div className="body gallery-archive">
      <div className="article">
        <div className="article__section article__section--plain">
          <h1>{title}</h1>
          <YearNav years={years.map((y) => y.year)} />
          {years.map(({ year, galleries }) => (
            <section
              key={year}
              id={yearAnchor(year)}
              className="gallery-year"
              aria-labelledby={`${yearAnchor(year)}-h`}
            >
              <h2 id={`${yearAnchor(year)}-h`}>{year}</h2>
              <ul className="gallery-cards">
                {galleries.map((gallery) => (
                  <li key={gallery.id}>
                    <GalleryCard
                      gallery={gallery}
                      href={galleryHref(gallery)}
                      day={galleryDay(gallery)}
                      previews={gallery.url ? [] : (previews[gallery.folder ?? gallery.id] ?? [])}
                    />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GalleryArchive;
