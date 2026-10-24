import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import BootstrapClient from "@/components/BootstrapClient";
import InlineScript from "@/components/InlineScript";
import { backgroundScript } from "@/lib/background";
import { layoutScript } from "@/lib/layout";
import { themeScript } from "@/lib/theme";
import { viewportScript } from "@/lib/viewport";

// joined with ";" so one script ending without a semicolon cannot break the next one
const prePaintScript = [themeScript, layoutScript, backgroundScript, viewportScript].join(";");

const montserrat = Montserrat({
  weight: "500",
  subsets: ["latin", "latin-ext"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Základní škola a Mateřská škola, Moravský písek",
};

const RootLayout = ({ children }: LayoutProps<"/">) => {
  return (
    <html lang="cs" className={montserrat.variable} data-bs-theme="light" data-layout="grid" suppressHydrationWarning>
      <head>
        {/* theme, list layout, seasonal background and viewport size, applied before the first paint so nothing flashes */}
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
