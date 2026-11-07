import type { Metadata } from "next";

// What search engines and link previews (Facebook, WhatsApp, ...) get to see about the site
export const SITE_URL = "https://zsmp.cz";
export const SITE_NAME = "ZŠ a MŠ Moravský Písek";
export const SCHOOL_NAME = "Základní škola a Mateřská škola, Moravský Písek, příspěvková organizace";
export const SITE_DESCRIPTION =
  "Základní škola a mateřská škola v Moravském Písku: aktuality, kontakty, školní jídelna, družina, dokumenty a fotogalerie.";

// the preview picture of a shared link: a photo of the school
export const SHARE_IMAGE = { url: "/data/images/carousel_1.jpg", width: 1920, height: 1080, alt: "Budova školy" };

type ShareImage = { url: string; width: number; height: number; alt?: string };

// Title, description, canonical URL and link preview of one page; the title gets " | ZŠ a MŠ Moravský Písek"
// from the template in app/layout.tsx. openGraph is repeated here because a page's openGraph replaces the layout's.
export const pageMetadata = (path: string, title: string, description: string, image?: ShareImage): Metadata => ({
  title,
  description,
  alternates: { canonical: path },
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    siteName: SITE_NAME,
    url: path,
    title: `${title} | ${SITE_NAME}`,
    description,
    images: [image ?? SHARE_IMAGE],
  },
});

// Structured data about the school for search engines (name, address, contacts), shown on the home page
export const schoolJsonLd = {
  "@context": "https://schema.org",
  "@type": "ElementarySchool",
  name: SCHOOL_NAME,
  alternateName: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/data/images/logo.png`,
  image: `${SITE_URL}${SHARE_IMAGE.url}`,
  email: "zsmp@zsmp.cz",
  telephone: "+420 518 698 574",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Velkomoravská 168",
    postalCode: "696 85",
    addressLocality: "Moravský Písek",
    addressCountry: "CZ",
  },
};
