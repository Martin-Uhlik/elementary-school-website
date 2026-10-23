"use client";

import { useEffect, useState } from "react";

// arrow on the home page that scrolls half a screen down and hides once the page is scrolled
const ScrollArrow = () => {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onScroll = () => setHidden(document.documentElement.scrollTop > 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      id="main-down"
      className={`main-down desktop-only${hidden ? " main-down--hidden" : ""}`}
      aria-label="Posunout dolů"
      onClick={() => window.scrollBy(0, window.innerHeight / 2)}
    >
      <img src="/data/images/icons/chevron-double-down.svg" alt="" />
    </button>
  );
};

export default ScrollArrow;
