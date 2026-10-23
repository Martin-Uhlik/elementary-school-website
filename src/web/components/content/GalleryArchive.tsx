import Link from "next/link";
import GalleryList from "./GalleryList";
import type { Unit } from "@/data/types";
import { getGalleryArchive } from "@/lib/content/galleries";

// The archive page of one unit: galleries grouped by year
const GalleryArchive = async ({ unit, title }: { unit: Unit; title: string }) => {
  const years = await getGalleryArchive(unit);
  return (
    <>
      <div className="gallery-navigation">
        <Link href="/foto-video" className="gallery-navigation__back-arrow">
          <img src="/data/images/icons/arrow-left.svg" alt="šipka zpět" className="gallery-navigation__icon" />
        </Link>
      </div>
      <div className="body gallery-body">
        <div className="article">
          <hr className="article__line" />
          <div className="article__section">
            <h1>{title}</h1>
            <div className="gallery-list">
              {years.map(({ year, galleries }) => (
                <div className="article__body" key={year}>
                  <h2>{year}</h2>
                  <GalleryList galleries={galleries} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GalleryArchive;
