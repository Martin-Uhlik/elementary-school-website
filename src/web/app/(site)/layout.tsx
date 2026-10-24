import CookieBar from "@/components/CookieBar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PageBackground from "@/components/PageBackground";

// The public site: header with the menu, cookie bar and footer around every page
const SiteLayout = ({ children }: LayoutProps<"/">) => (
  <>
    <a className="visually-hidden-focusable skip-link" href="#obsah">
      Přeskočit na obsah
    </a>
    <PageBackground />
    <Header />
    <CookieBar />
    <main id="obsah">{children}</main>
    <Footer />
  </>
);

export default SiteLayout;
