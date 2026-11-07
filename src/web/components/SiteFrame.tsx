import type { ReactNode } from "react";
import CookieBar from "@/components/CookieBar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PageBackground from "@/components/PageBackground";

// The public site's frame: header with the menu, cookie bar and footer around the page.
// Used by app/(site)/layout.tsx and by app/not-found.tsx, which has only the root layout above it.
const SiteFrame = ({ children }: { children: ReactNode }) => (
  <>
    <a className="visually-hidden-focusable skip-link" href="#obsah">
      Přeskočit na obsah
    </a>
    <PageBackground />
    <Header />
    <CookieBar />
    <main id="obsah">{children}</main>
    <Footer />
  </>
);

export default SiteFrame;
