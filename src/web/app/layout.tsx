import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import BootstrapClient from "@/components/BootstrapClient";
import InlineScript from "@/components/InlineScript";
import { cookiesScript } from "@/lib/cookies";
import { layoutScript } from "@/lib/layout";
import { SHARE_IMAGE, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/seo";
import { themeScript } from "@/lib/theme";
import { viewportScript } from "@/lib/viewport";

// joined with ";" so one script ending without a semicolon cannot break the next one
const prePaintScript = [themeScript, layoutScript, viewportScript, cookiesScript].join(";");

const montserrat = Montserrat({
  weight: "500",
  subsets: ["latin", "latin-ext"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  // relative URLs in metadata (canonical, og:image, ...) become https://zsmp.cz/...
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Základní škola a Mateřská škola, Moravský Písek",
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    siteName: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [SHARE_IMAGE],
  },
  // tells Dark Reader the site has its own dark mode, so it does not darken it a second time
  other: { "darkreader-lock": "true" },
};

// <meta name="color-scheme" content="light dark">: the site supports both themes. The one actually shown
// follows the manual switch, because Bootstrap sets the CSS color-scheme on [data-bs-theme], which wins over the meta.
export const viewport: Viewport = {
  colorScheme: "light dark",
};

const RootLayout = ({ children }: LayoutProps<"/">) => {
  return (
    <html lang="cs" className={montserrat.variable} data-bs-theme="light" data-layout="grid" suppressHydrationWarning>
      <head>
        {/* theme, list layout, viewport size and the cookie notice, applied before the first paint so nothing flashes */}
        <InlineScript code={prePaintScript} />
      </head>
      <body>
        {children}
        <BootstrapClient />
      </body>
    </html>
  );
};

export default RootLayout;
