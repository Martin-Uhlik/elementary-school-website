"use client";

import { useEffect, useRef, useState } from "react";

const slides = [
  { src: "/data/images/carousel_1.jpg", alt: "Fotografie školy" },
  { src: "/data/images/carousel_2.jpg", alt: "Chemická učebna" },
  { src: "/data/images/carousel_3.jpg", alt: "Jazyková učebna" },
  { src: "/data/images/carousel_4.jpg", alt: "Školní jídelna" },
  { src: "/data/images/carousel_5.jpg", alt: "Školní jídelna" },
  { src: "/data/images/carousel_6.jpg", alt: "Tělocvična" },
  { src: "/data/images/carousel_7.jpg", alt: "Šatny" },
];

export default function HomeCarousel() {
  const ref = useRef<HTMLDivElement>(null);
  // first slide is picked at random on every visit
  const [start, setStart] = useState<number | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- random pick must not run during SSR
    setStart(Math.floor(Math.random() * slides.length));
  }, []);

  useEffect(() => {
    if (start === null || !ref.current) return;
    let carousel: { dispose(): void } | undefined;
    import("bootstrap").then(({ Carousel }) => {
      if (ref.current) carousel = Carousel.getOrCreateInstance(ref.current, { ride: "carousel" });
    });
    return () => carousel?.dispose();
  }, [start]);

  return (
    <div id="mainCarousel" className="carousel slide main-carousel" ref={ref}>
      <div className="carousel-indicators">
        {slides.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            data-bs-target="#mainCarousel"
            data-bs-slide-to={i}
            className={i === start ? "active" : undefined}
            aria-current={i === start ? "true" : undefined}
            aria-label={`Slide ${i + 1}`}
          ></button>
        ))}
      </div>

      <div className="carousel-inner">
        {slides.map((slide, i) => (
          <div key={slide.src} className={`carousel-item${i === start ? " active" : ""}`} data-bs-interval="10000">
            <img src={slide.src} className="carousel__image" alt={slide.alt} />
          </div>
        ))}
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#mainCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#mainCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
      <div className="main-name">
        <span className="desktop-only">
          Základní škola a Mateřská škola,
          <br />
          Moravský Písek, příspěvková organizace
        </span>
        <span className="mobile-only main-name--mobile">
          Základní škola a Mateřská škola,
          <br />
          Moravský Písek,
          <br />
          příspěvková organizace
        </span>
        <img className="aspect-ratio-1-1 main-name__logo" src="/data/images/logo.png" alt="logo školy" />
      </div>
    </div>
  );
}
