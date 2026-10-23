"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import type { Gallery } from "@/data/types";

type Props = { gallery: Gallery; href: string; day?: string; previews: string[] };

// One gallery in the archive: a photo (cycling through a few on hover) or, without photos, its date
const GalleryCard = ({ gallery, href, day, previews }: Props) => {
  const [active, setActive] = useState(false);
  const [shown, setShown] = useState(0);
  const video = Boolean(gallery.url);
  const external = gallery.url?.startsWith("http");

  useEffect(() => {
    if (!active || previews.length < 2 || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => setShown((i) => (i + 1) % previews.length), 900);
    return () => {
      clearInterval(timer);
      setShown(0);
    };
  }, [active, previews.length]);

  const props = {
    className: `gallery-card gallery-card--${gallery.unit}`,
    onMouseEnter: () => setActive(true),
    onMouseLeave: () => setActive(false),
    onFocus: () => setActive(true),
    onBlur: () => setActive(false),
  };
  const content: ReactNode = (
    <>
      <span className="gallery-card__preview">
        {previews.length > 0 ? (
          previews.map((src, i) => (
            <img key={src} src={src} alt="" loading="lazy" className={i === shown ? "is-shown" : undefined} />
          ))
        ) : (
          <span className="gallery-card__placeholder" aria-hidden="true">
            {video ? (
              "▶"
            ) : (
              <>
                <svg viewBox="0 0 16 16" fill="currentColor" focusable="false">
                  <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                  <path d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.17a2 2 0 0 1-1.42-.59l-.82-.82A2 2 0 0 0 9.17 2H6.83a2 2 0 0 0-1.42.59l-.82.82A2 2 0 0 1 3.17 4zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1m9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0" />
                </svg>
                {day ?? gallery.year}
              </>
            )}
          </span>
        )}
        {video && <span className="gallery-card__badge">{external ? "video ↗" : "video"}</span>}
      </span>
      <span className="gallery-card__title">{gallery.title}</span>
      {gallery.dateText && <span className="gallery-card__date">{gallery.dateText}</span>}
      {external && <span className="visually-hidden">(externí odkaz)</span>}
    </>
  );

  // videos open in a new tab, galleries are pages of this site
  return video ? (
    <a href={href} target="_blank" rel="noopener" {...props}>
      {content}
    </a>
  ) : (
    <Link href={href} {...props}>
      {content}
    </Link>
  );
};

export default GalleryCard;
