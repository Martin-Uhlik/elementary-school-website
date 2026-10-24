"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { yearAnchor } from "@/lib/content/format";

// Sticky bar on an archive page: back to Galerie, the year in view, arrows to the neighbouring years and a year picker
const YearNav = ({ years }: { years: number[] }) => {
  const bar = useRef<HTMLElement>(null);
  const [current, setCurrent] = useState(years[0]);
  const [top, setTop] = useState(0);
  const [stuck, setStuck] = useState(false);

  // stick right under the fixed header, whose height changes on scroll and with the viewport;
  // the sections scroll to just below the bar (scroll-margin-top in styles.css)
  useEffect(() => {
    const header = document.querySelector<HTMLElement>(".header");
    if (!header || !bar.current) return;
    const nav = bar.current;
    const observer = new ResizeObserver(() => {
      setTop(header.offsetHeight);
      document.documentElement.style.setProperty("--year-nav-bottom", `${header.offsetHeight + nav.offsetHeight}px`);
    });
    observer.observe(header);
    observer.observe(nav);
    return () => observer.disconnect();
  }, []);

  // the year in view is the last section whose heading has scrolled up to the bar;
  // the bar is stuck once it has reached its sticky offset under the header
  useEffect(() => {
    const update = () => {
      const rect = bar.current?.getBoundingClientRect();
      const line = (rect?.bottom ?? 0) + 32;
      setStuck(!!bar.current && !!rect && rect.top <= parseFloat(getComputedStyle(bar.current).top) + 1);
      let inView = years[0];
      for (const year of years) {
        const section = document.getElementById(yearAnchor(year));
        if (section && section.getBoundingClientRect().top <= line) inView = year;
      }
      setCurrent(inView);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [years]);

  const index = years.indexOf(current);
  const older = years[index + 1];
  const newer = years[index - 1];

  return (
    <nav className={`year-nav${stuck ? " is-stuck" : ""}`} ref={bar} style={{ top }} aria-label="Roky">
      <Link href="/foto-video" className="year-nav__back">
        <span aria-hidden="true">←</span> <span className="year-nav__back-text">Galerie</span>
      </Link>
      <div className="year-nav__years">
        {older ? (
          <a href={`#${yearAnchor(older)}`} className="year-nav__step" aria-label={`Starší rok ${older}`}>
            <span aria-hidden="true">‹</span> {older}
          </a>
        ) : (
          <span className="year-nav__step year-nav__step--empty" />
        )}
        <div className="dropdown">
          <button
            type="button"
            className="year-nav__current dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            aria-label={`Vybrat rok, nyní ${current}`}
          >
            {current}
          </button>
          <ul className="dropdown-menu dropdown-menu-end year-nav__menu">
            {years.map((year) => (
              <li key={year}>
                <a
                  href={`#${yearAnchor(year)}`}
                  className={`dropdown-item${year === current ? " active" : ""}`}
                  aria-current={year === current ? "true" : undefined}
                >
                  {year}
                </a>
              </li>
            ))}
          </ul>
        </div>
        {newer ? (
          <a href={`#${yearAnchor(newer)}`} className="year-nav__step" aria-label={`Novější rok ${newer}`}>
            {newer} <span aria-hidden="true">›</span>
          </a>
        ) : (
          <span className="year-nav__step year-nav__step--empty" />
        )}
      </div>
    </nav>
  );
};

export default YearNav;
