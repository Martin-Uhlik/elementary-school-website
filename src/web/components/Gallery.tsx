"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";
import type { GalleryImage } from "@/lib/galleries";

const LAYOUT_KEY = "galleryLayout";

const Gallery = ({ title, images }: { title: string; images: GalleryImage[] }) => {
  const router = useRouter();
  const [dense, setDense] = useState(false);

  // restore the layout (4 or 9 per screen) the visitor picked last time
  useEffect(() => {
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage is only readable after mount
      setDense(localStorage.getItem(LAYOUT_KEY) === "9");
    } catch {}
  }, []);

  const setLayout = (size: "4" | "9") => {
    setDense(size === "9");
    try {
      localStorage.setItem(LAYOUT_KEY, size);
    } catch {}
  };

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
    <>
      <div className="gallery-navigation">
        <button
          type="button"
          className="gallery-navigation__back-arrow gallery-navigation__button"
          aria-label="Zpět"
          onClick={() => router.back()}
        >
          <img src="/data/images/icons/arrow-left.svg" alt="" className="gallery-navigation__icon" />
        </button>
        <div className="gallery-navigation__layout-switch" role="group" aria-label="Rozložení galerie">
          <button
            type="button"
            className="gallery-navigation__button"
            aria-label="Velké náhledy"
            aria-pressed={!dense}
            onClick={() => setLayout("4")}
          >
            <img src="/data/images/icons/view-grid-4.svg" alt="" className="gallery-navigation__icon" />
          </button>
          <button
            type="button"
            className="gallery-navigation__button"
            aria-label="Malé náhledy"
            aria-pressed={dense}
            onClick={() => setLayout("9")}
          >
            <img src="/data/images/icons/view-grid-9.svg" alt="" className="gallery-navigation__icon" />
          </button>
        </div>
      </div>
      <div className="body gallery-body">
        <div className="article">
          <div className="article__section article__section--plain">
            <h1>{title}</h1>
            <div className={`article__body gallery${dense ? " gallery--dense" : ""}`} id="gallery">
              {images.map((image, i) => (
                <a
                  key={image.src}
                  className="gallery__image-wrapper"
                  href={image.src}
                  data-pswp-width={image.width}
                  data-pswp-height={image.height}
                  target="_blank"
                >
                  <Image
                    className="gallery__image"
                    src={image.src}
                    width={image.width}
                    height={image.height}
                    sizes="(min-width: 992px) 33vw, 100vw"
                    alt={`Fotografie ${i + 1} z ${images.length}`}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Gallery;
