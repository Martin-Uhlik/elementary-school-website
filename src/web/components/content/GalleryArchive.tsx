import GalleryCard from "./GalleryCard";
import HeaderOffset from "./HeaderOffset";
import YearHeading from "./YearHeading";
import YearNav from "./YearNav";
import type { Unit } from "@/lib/content/types";
import { galleryDay, galleryFolder, galleryHref, yearAnchor } from "@/lib/content/format";
import { getGalleryArchive } from "@/lib/content/galleries";
import { getGalleryPreviews } from "@/lib/galleries";

// The archive page of one unit: a sticky year bar, a heading for each year and the galleries of each year as cards
const GalleryArchive = async ({ unit, title }: { unit: Unit; title: string }) => {
  const years = await getGalleryArchive(unit);
  const previews = await getGalleryPreviews(years.flatMap((y) => y.galleries.map((g) => galleryFolder(g))));
  return (
    <div className="page gallery-archive">
      <div className="article">
        <div className="article__section">
          <HeaderOffset />
          <h1 className="article__title">{title}</h1>
          <div className="gallery-years">
            {years.length > 0 && <YearNav years={years.map((y) => ({ year: y.year, count: y.galleries.length }))} />}
            {years.map(({ year, galleries }, i) => (
              <section
                key={year}
                id={yearAnchor(year)}
                className="gallery-year"
                aria-labelledby={`${yearAnchor(year)}-h`}
              >
                <YearHeading year={year} count={galleries.length} first={i === 0} />
                <ul className="gallery-cards">
                  {galleries.map((gallery) => (
                    <li key={gallery.id}>
                      <GalleryCard
                        gallery={gallery}
                        href={galleryHref(gallery)}
                        day={galleryDay(gallery)}
                        previews={gallery.url ? [] : (previews[galleryFolder(gallery)] ?? [])}
                      />
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryArchive;
