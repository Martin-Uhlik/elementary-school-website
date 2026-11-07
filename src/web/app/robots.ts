import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// The sign-in page and the admin area are not for search engines
const robots = (): MetadataRoute.Robots => ({
  rules: { userAgent: "*", disallow: ["/admin", "/auth"] },
  sitemap: `${SITE_URL}/sitemap.xml`,
});

export default robots;
