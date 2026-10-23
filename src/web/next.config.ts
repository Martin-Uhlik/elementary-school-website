import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // keep old links (bookmarks, search engines) working after dropping the .html suffix
  async redirects() {
    return [
      { source: "/galerie/:id/galerie.html", destination: "/galerie/:id", permanent: true },
      { source: "/index.html", destination: "/", permanent: true },
      // informatika/ holds real static .html files, so it is left alone
      { source: "/:path((?!informatika/).+)\\.html", destination: "/:path", permanent: true },
    ];
  },
};

export default nextConfig;
