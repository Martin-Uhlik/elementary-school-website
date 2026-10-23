import Link from "next/link";
import { getGallerySections } from "@/lib/content/galleries";

// 1–4 galerie, 5+ galerií
const galleryCount = (count: number) => (count > 0 && count < 5 ? "galerie" : "galerií");

const FotoVideoPage = async () => {
  const sections = await getGallerySections();
  return (
    <div className="body">
      <div className="article">
        <hr className="article__line" />
        <div className="article__section">
          <h1>Foto a video</h1>
          <ul className="gallery-sections">
            {sections.map((section) => (
              <li key={section.unit}>
                <Link href={section.href} className="gallery-section">
                  <img className="gallery-section__cover" src={section.cover} alt="" />
                  <span className="gallery-section__text">
                    <span className="gallery-section__title">{section.title}</span>
                    <span className="gallery-section__meta">
                      {section.count} {galleryCount(section.count)} · {section.from}–{section.to}
                    </span>
                  </span>
                  <span className="gallery-section__arrow" aria-hidden="true">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FotoVideoPage;
