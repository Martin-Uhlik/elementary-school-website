"use client";

import { usePathname } from "next/navigation";

// seasonal background; the picture is chosen in styles.css from data-background on <html> (see lib/background.ts)
const PageBackground = () => {
  const pathname = usePathname();

  // the home page has its own carousel instead
  if (pathname === "/") return null;

  return (
    <div className="page-background" aria-hidden="true">
      <div className="background-elem-wide" />
    </div>
  );
};

export default PageBackground;
