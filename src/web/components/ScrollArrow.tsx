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
    <img
      id="main-down"
      className={`main-down desktop-only${hidden ? " main-down--hidden" : ""}`}
      src="/data/images/icons/chevron-double-down.svg"
      alt="šipka dolů"
      onClick={() => window.scrollBy(0, window.innerHeight / 2)}
    />
  );
};

export default ScrollArrow;
