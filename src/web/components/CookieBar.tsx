"use client";

import { useEffect, useState } from "react";
import { LuCookie } from "react-icons/lu";

const STORAGE_KEY = "cookiesConfirm";

// informs users that the site stores only functional data (theme, gallery layout, this notice); no analytics or ads
const CookieBar = () => {
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage is only readable after mount
      setHidden(Boolean(localStorage.getItem(STORAGE_KEY)));
    } catch {
      setHidden(false);
    }
  }, []);

  const confirm = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "True");
    } catch {}
    setHidden(true);
  };

  return (
    <aside className={`cookies-bar${hidden ? " cookie-bar--hidden" : ""}`} id="cookieBar" aria-label="Cookies">
      <LuCookie className="cookies-bar__icon" aria-hidden="true" />
      <div className="cookies-bar__text">
        <p className="cookies-bar__title">Používáme jen nezbytné cookies</p>
        <p className="cookies-bar__details">
          Web ukládá ve vašem prohlížeči pouze funkční údaje nezbytné pro svůj provoz (např. zvolený barevný motiv).
          Analytické ani reklamní cookies nepoužíváme.
        </p>
      </div>
      <button type="button" className="cookies-bar__button btn btn-primary" onClick={confirm}>
        Rozumím
      </button>
    </aside>
  );
};

export default CookieBar;
