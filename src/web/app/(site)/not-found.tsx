import type { Metadata } from "next";
import NotFound from "@/components/content/NotFound";

export const metadata: Metadata = {
  title: "Stránka nenalezena",
};

// notFound() in a public page (an unknown gallery or Myšák exercise): the (site) layout already gives the header and footer
const SiteNotFound = () => <NotFound />;

export default SiteNotFound;
