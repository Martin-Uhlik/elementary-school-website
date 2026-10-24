"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { LuCamera } from "react-icons/lu";
import type { Gallery } from "@/lib/content/types";

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
                <LuCamera focusable="false" />
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
