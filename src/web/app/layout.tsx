import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import BootstrapClient from "@/components/BootstrapClient";
import CookieBar from "@/components/CookieBar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PageBackground from "@/components/PageBackground";

const montserrat = Montserrat({
  weight: "500",
  subsets: ["latin", "latin-ext"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Základní škola a Mateřská škola, Moravský písek",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="cs" className={montserrat.variable}>
      <body>
        <PageBackground />
        <Header />
        <CookieBar />
        <main>{children}</main>
        <Footer />
        <BootstrapClient />
      </body>
    </html>
  );
}
