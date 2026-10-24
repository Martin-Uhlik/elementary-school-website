"use client";

import Link from "next/link";
import { useEffect, type CSSProperties } from "react";
import { LuChevronLeft } from "react-icons/lu";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";
import type { GalleryImage } from "@/lib/galleries";

type Props = { title: string; back: string; images: GalleryImage[] };

// Photos of one gallery: square previews or whole photos in rows (the grid / rows switch in the header),
// a click opens them full size in PhotoSwipe
const Gallery = ({ title, back, images }: Props) => {
  useEffect(() => {
    const lightbox = new PhotoSwipeLightbox({
      gallery: "#gallery",
      children: "a",
      paddingFn: (viewportSize) => ({
        top: viewportSize.x >= 992 ? viewportSize.x * 0.025 : 0,
        bottom: viewportSize.x >= 992 ? viewportSize.x * 0.025 : 0,
        left: viewportSize.y >= 992 ? viewportSize.y * 0.025 : 0,
        right: viewportSize.y >= 992 ? viewportSize.y * 0.025 : 0,
      }),
      wheelToZoom: true,
      // clicking the photo toggles zoom, clicking the background closes
      tapAction: (_pt, evt) => {
        const pswp = lightbox.pswp;
        if (!pswp?.currSlide) return;
        if ((evt.target as HTMLElement).classList.contains("pswp__img")) {
          const slide = pswp.currSlide;
          slide.zoomTo(
            slide.currZoomLevel === 1 ? 0 : 1,
            { x: slide.panAreaSize.x / 2, y: slide.panAreaSize.y / 2 },
            333,
            false,
          );
        } else {
          pswp.close();
        }
      },
      pswpModule: () => import("photoswipe"),
    });
    lightbox.init();
    return () => lightbox.destroy();
  }, []);

  return (
    <div className="body">
      <div className="article">
        <div className="article__section">
          {/* the whole heading leads back to the archive */}
          <Link href={back} className="gallery-heading" title="Zpět na archiv">
            <LuChevronLeft className="gallery-heading__chevron" aria-hidden="true" />
            <h1>{title}</h1>
            <span className="visually-hidden">(zpět na archiv)</span>
          </Link>
          <div className="gallery" id="gallery">
            {images.map((image, i) => (
              <a
                key={image.src}
                className="gallery__image-wrapper"
                href={image.src}
                data-pswp-width={image.width}
                data-pswp-height={image.height}
                target="_blank"
                style={{ "--ratio": (image.width / image.height).toFixed(4) } as CSSProperties}
              >
                <img
                  className="gallery__image"
                  src={image.thumb}
                  loading="lazy"
                  alt={`Fotografie ${i + 1} z ${images.length}`}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
