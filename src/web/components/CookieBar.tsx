"use client";

import { useEffect, useState } from "react";

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
      <span className="cookies-bar__text">
        Tento web používá pouze funkční cookies a úložiště prohlížeče nezbytné pro jeho provoz (např. uložení zvoleného
        barevného motivu). Analytické ani reklamní cookies nepoužíváme.
      </span>
      <div className="cookies-bar__buttons">
        <button type="button" className="cookies-bar__button btn btn-primary" onClick={confirm}>
          OK
        </button>
      </div>
    </aside>
  );
};

export default CookieBar;
