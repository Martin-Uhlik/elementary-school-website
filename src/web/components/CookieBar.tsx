"use client";

import { LuCookie } from "react-icons/lu";
import { confirmCookies } from "@/lib/cookies";

// informs users that the site stores only functional data (theme, gallery layout, this notice); no analytics or ads.
// Hidden by CSS once confirmed: data-cookies on <html> is set before the first paint (lib/cookies.ts)
const CookieBar = () => (
  <aside className="cookies-bar" id="cookieBar" aria-label="Cookies">
    <LuCookie className="cookies-bar__icon" aria-hidden="true" />
    <div className="cookies-bar__text">
      <p className="cookies-bar__title">Používáme jen nezbytné cookies</p>
      <p className="cookies-bar__details">
        Web ukládá ve vašem prohlížeči pouze funkční údaje nezbytné pro svůj provoz (např. zvolený barevný motiv).
        Analytické ani reklamní cookies nepoužíváme.
      </p>
    </div>
    <button type="button" className="cookies-bar__button btn btn-primary" onClick={confirmCookies}>
      Rozumím
    </button>
  </aside>
);

export default CookieBar;
