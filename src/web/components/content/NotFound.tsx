import Link from "next/link";
import { LuHouse } from "react-icons/lu";
import NotFoundBunny from "@/components/content/NotFoundBunny";

// The "page not found" card. Shown for every unknown address, for notFound() anywhere, and for /admin + /auth to visitors
// outside ADMIN_ALLOWED_IPS (see proxy.ts), so the text must stay general and never hint at the admin
const NotFound = () => (
  <div className="page">
    <div className="article">
      <div className="article__section not-found">
        <NotFoundBunny />
        <h1 className="not-found__title">Stránka nebyla nalezena</h1>
        <p className="not-found__text">
          Omlouváme se, požadovaná stránka neexistuje nebo byla přesunuta. Zkontrolujte prosím zadanou adresu, případně
          pokračujte na hlavní stránku.
        </p>
        <Link className="btn btn-primary btn-lg not-found__button" href="/">
          <LuHouse aria-hidden="true" focusable="false" />
          Zpět na hlavní stránku
        </Link>
      </div>
    </div>
  </div>
);

export default NotFound;
