import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// /admin and /auth are not listed: outside the school network they answer 404 (proxy.ts),
// and naming them here would tell everyone where the admin is
const robots = (): MetadataRoute.Robots => ({
  rules: { userAgent: "*", allow: "/" },
  sitemap: `${SITE_URL}/sitemap.xml`,
});

export default robots;
