import type { MetadataRoute } from "next";
import { galleryFolder } from "@/lib/content/format";
import { getGalleries } from "@/lib/content/galleries";
import { exerciseComponents } from "@/components/mysak/exerciseComponents";
import { exercises } from "@/lib/mysak/exercises";
import { navigation } from "@/lib/navigation";
import { SITE_URL } from "@/lib/seo";

// /sitemap.xml: every public page for search engines; read from the database on each request, so new galleries show up
const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const menu = navigation.flatMap((item) => ("children" in item ? item.children : [item])).map((link) => link.href);
  const archives = ["/archiv/zakladni-skola", "/archiv/materska-skola", "/archiv/druzina"];
  const mysak = exercises.filter((e) => e.slug in exerciseComponents).map((e) => `/informatika/mysak/${e.slug}`);
  // galleries with a url are links to videos elsewhere, not pages of this site
  const galleries = (await getGalleries())
    .filter((g) => !g.url)
    .map((g) => ({ url: `${SITE_URL}/galerie/${encodeURIComponent(galleryFolder(g))}`, lastModified: g.date }));
  return [
    ...[...menu, ...archives, ...mysak].map((path) => ({ url: `${SITE_URL}${path === "/" ? "" : path}` })),
    ...galleries,
  ];
};

export default sitemap;
