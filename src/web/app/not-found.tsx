import type { Metadata } from "next";
import NotFound from "@/components/content/NotFound";
import SiteFrame from "@/components/SiteFrame";

// Next adds <meta name="robots" content="noindex"> to every 404 by itself, so search engines never list this page
export const metadata: Metadata = {
  title: "Stránka nenalezena",
};

// Unknown addresses, and /admin + /auth for visitors outside the school (proxy.ts rewrites them to /_404).
// Only the root layout is above this page, so it adds the site's header and footer itself.
// notFound() in a public page is handled by app/(site)/not-found.tsx, in the admin by app/auth/not-found.tsx.
const NotFoundPage = () => (
  <SiteFrame>
    <NotFound />
  </SiteFrame>
);

export default NotFoundPage;
