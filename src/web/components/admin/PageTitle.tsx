import Link from "next/link";
import type { ReactNode } from "react";
import { LuChevronLeft } from "react-icons/lu";

// The page heading; clicking it (the chevron or the text) goes one level up, e.g. from a gallery to Galerie
const PageTitle = ({ back, backLabel, children }: { back: string; backLabel: string; children: ReactNode }) => (
  <h1>
    <Link href={back} className="admin-back" title={`Zpět: ${backLabel}`}>
      <LuChevronLeft aria-hidden="true" className="admin-back__icon" />
      <span className="visually-hidden">Zpět na {backLabel}: </span>
      {children}
    </Link>
  </h1>
);

export default PageTitle;
