"use client";

import { useEffect } from "react";

// loads Bootstrap's JS (dropdowns, collapse, carousel) on the client
const BootstrapClient = () => {
  useEffect(() => {
    import("bootstrap");
    // iOS Safari applies :active (the touch replacement for hover effects in styles.css) only when a touch listener exists
    const noop = () => {};
    document.addEventListener("touchstart", noop, { passive: true });
    return () => document.removeEventListener("touchstart", noop);
  }, []);
  return null;
};

export default BootstrapClient;
