import type { NextConfig } from "next";

// old Myšák exercise numbers → the rewritten pages
const mysak: Record<string, string> = {
  "1": "skladanka",
  "2": "klik-a-dvojklik",
  "3": "rozhazene-barvy",
  "4": "skladani-slov",
  "6": "znaky-klavesnice",
  "10": "prehazene-letopocty",
  "11": "rozhazeny-text",
  "12": "jak-rychle-pises",
};

const nextConfig: NextConfig = {
  // a self-contained server in .next/standalone, used by the Docker image
  output: "standalone",
  // keep old links (bookmarks, search engines) working after dropping the .html suffix
  async redirects() {
    return [
      { source: "/galerie/:id/galerie.html", destination: "/galerie/:id", permanent: true },
      { source: "/index.html", destination: "/", permanent: true },
      ...Object.entries(mysak).map(([n, slug]) => ({
        source: `/informatika/mysak/cviceni/${n}.html`,
        destination: `/informatika/mysak/${slug}`,
        permanent: true,
      })),
      // exercises that were not ported and the old menu go to the Informatika page
      {
        source: "/informatika/mysak/:path(index\\.html|cviceni/.*|tabule/.*|core/.*)",
        destination: "/informatika",
        permanent: true,
      },
      // informatika/ holds real static .html files, so it is left alone
      { source: "/:path((?!informatika/).+)\\.html", destination: "/:path", permanent: true },
    ];
  },
};

export default nextConfig;
