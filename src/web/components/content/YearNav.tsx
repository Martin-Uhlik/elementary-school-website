"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { LuChevronDown, LuChevronLeft, LuChevronUp } from "react-icons/lu";
import { galleriesLabel, yearAnchor } from "@/lib/content/format";

type Props = { years: { year: number; count: number }[] };

// The one sticky bar of an archive page: a back arrow to Galerie, the year in view with its number of galleries, and a year
// select between arrows to the newer (up) and older (down) year. It stands in place of the first
// year's heading; the other headings look the same and slide under it. The year in view is kept in
// the URL hash, so coming back from a gallery lands on the same year.
const YearNav = ({ years }: Props) => {
  const bar = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(years[0].year);
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const update = () => {
      const nav = bar.current;
      if (!nav) return;
      const top = nav.getBoundingClientRect().top;
      // stuck = held under the header while the years have already scrolled above it
      setStuck((nav.parentElement?.getBoundingClientRect().top ?? top) < top - 1);
      // a year is in view once its heading has slid fully under the bar (the first one from the start)
      let inView = years[0].year;
      for (const { year } of years.slice(1)) {
        const section = document.getElementById(yearAnchor(year));
        if (section && section.getBoundingClientRect().top <= top + 4) inView = year;
      }
      setCurrent(inView);
      // the first year stays without a hash while the page is at its top, so a reload stays there
      const first = document.getElementById(yearAnchor(years[0].year));
      const atTop =
        inView === years[0].year && (first?.getBoundingClientRect().top ?? 0) > nav.getBoundingClientRect().bottom;
      const hash = atTop ? "" : `#${yearAnchor(inView)}`;
      if (location.hash !== hash)
        history.replaceState(history.state, "", `${location.pathname}${location.search}${hash}`);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [years]);

  // scrollIntoView instead of links: no history entry for every jump, smooth via the CSS scroll-behavior
  const go = (year: number | undefined) => {
    if (year) document.getElementById(yearAnchor(year))?.scrollIntoView();
  };

  const index = years.findIndex((y) => y.year === current);
  const newer = years[index - 1]?.year;
  const older = years[index + 1]?.year;

  return (
    <div className={`year-nav${stuck ? " is-stuck" : ""}`} ref={bar}>
      <Link href="/foto-video" className="year-nav__back" aria-label="Zpět na Galerii" title="Zpět na Galerii">
        <LuChevronLeft aria-hidden="true" />
        <span className="year-heading__year">{current}</span>
      </Link>
      <span className="year-heading__count" aria-hidden="true">
        {years[index] && galleriesLabel(years[index].count)}
      </span>
      <nav className="year-nav__controls" aria-label="Roky">
        <button
          type="button"
          className="year-nav__step"
          onClick={() => go(newer)}
          disabled={!newer}
          aria-label={newer ? `Novější rok ${newer}` : "Novější rok"}
        >
          <LuChevronUp aria-hidden="true" />
        </button>
        <select
          className="form-select year-nav__select"
          value={current}
          onChange={(e) => go(Number(e.target.value))}
          aria-label="Přejít na rok"
        >
          {years.map(({ year }) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <button
          type="button"
          className="year-nav__step"
          onClick={() => go(older)}
          disabled={!older}
          aria-label={older ? `Starší rok ${older}` : "Starší rok"}
        >
          <LuChevronDown aria-hidden="true" />
        </button>
      </nav>
    </div>
  );
};

export default YearNav;
