import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import BootstrapClient from "@/components/BootstrapClient";
import { layoutScript } from "@/lib/layout";
import { themeScript } from "@/lib/theme";

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
        {/* set data-bs-theme and data-layout before the first paint so the page never flashes */}
        <script dangerouslySetInnerHTML={{ __html: themeScript + layoutScript }} />
      </head>
      <body>
        {children}
        <BootstrapClient />
      </body>
    </html>
  );
};

export default RootLayout;
