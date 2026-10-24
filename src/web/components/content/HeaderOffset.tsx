"use client";

import { useEffect } from "react";

// Keeps --sticky-top on <html> equal to the fixed header's height (it changes on scroll and with
// the viewport), so sticky elements and scroll targets sit right under the header
const HeaderOffset = () => {
  useEffect(() => {
    const header = document.querySelector<HTMLElement>(".header");
    if (!header) return;
    const root = document.documentElement;
    const observer = new ResizeObserver(() => root.style.setProperty("--sticky-top", `${header.offsetHeight}px`));
    observer.observe(header);
    return () => {
      observer.disconnect();
      root.style.removeProperty("--sticky-top");
    };
  }, []);
  return null;
};

export default HeaderOffset;
