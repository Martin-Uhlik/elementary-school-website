import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import BootstrapClient from "@/components/BootstrapClient";
import CookieBar from "@/components/CookieBar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PageBackground from "@/components/PageBackground";
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
    <html lang="cs" className={montserrat.variable} data-bs-theme="light" suppressHydrationWarning>
      <head>
        {/* sets data-bs-theme before the first paint so the page never flashes the wrong theme */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a className="visually-hidden-focusable skip-link" href="#obsah">
          Přeskočit na obsah
        </a>
        <PageBackground />
        <Header />
        <CookieBar />
        <main id="obsah">{children}</main>
        <Footer />
        <BootstrapClient />
      </body>
    </html>
  );
};

export default RootLayout;
