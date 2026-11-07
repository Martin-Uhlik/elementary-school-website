"use client";

import { usePathname } from "next/navigation";

// seasonal background; /pozadi in styles/page.css redirects to today's picture (see app/(site)/pozadi/route.ts)
const PageBackground = () => {
  const pathname = usePathname();

  // the home page has its own carousel instead
  if (pathname === "/") return null;

  return (
    <div className="page-background" aria-hidden="true">
      <div className="page-background__picture" />
    </div>
  );
};

export default PageBackground;
