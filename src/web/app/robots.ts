import type { MetadataRoute } from "next";

// The sign-in page and the admin area are not for search engines
const robots = (): MetadataRoute.Robots => ({
  rules: { userAgent: "*", disallow: ["/admin", "/auth"] },
});

export default robots;
