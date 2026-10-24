"use client";

import { useLayoutEffect, useSyncExternalStore } from "react";
import type { IconType } from "react-icons";
import { LuMoon, LuSun, LuSunMoon } from "react-icons/lu";
import {
  applyTheme,
  getThemePreference,
  setThemePreference,
  THEME_CHANGE_EVENT,
  type ThemePreference,
} from "@/lib/theme";

const options: { value: ThemePreference; label: string; Icon: IconType }[] = [
  { value: "system", label: "Podle systému", Icon: LuSunMoon },
  { value: "light", label: "Světlý", Icon: LuSun },
  { value: "dark", label: "Tmavý", Icon: LuMoon },
];

const subscribe = (onChange: () => void) => {
  const media = matchMedia("(prefers-color-scheme: dark)");
  // follow the system while no explicit choice is stored
  const onSystemChange = () => {
    if (getThemePreference() === "system") applyTheme("system");
  };
  window.addEventListener(THEME_CHANGE_EVENT, onChange);
  window.addEventListener("storage", onChange);
  media.addEventListener("change", onSystemChange);
  return () => {
    window.removeEventListener(THEME_CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
    media.removeEventListener("change", onSystemChange);
  };
};

// light / dark / system switch in the header; the theme itself is applied by the inline script in the root layout
const ThemeSwitch = () => {
  const preference = useSyncExternalStore(subscribe, getThemePreference, () => "system" as ThemePreference);
  const current = options.find((o) => o.value === preference)!;

  // re-apply after React resets <html> attributes (dev Strict Mode remount) or a change in another tab;
  // reads localStorage itself, because during hydration `preference` is still the server's "system"
  // and applying that would flash the system theme before the stored one
  useLayoutEffect(() => {
    applyTheme(getThemePreference());
  }, [preference]);

  return (
    <ul className="navbar-nav header-switch">
      <li className="nav-item dropdown">
        <button
          type="button"
          className="nav-link dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          aria-label={`Barevný motiv: ${current.label}`}
        >
          <current.Icon aria-hidden="true" focusable="false" size={18} />
          <span className="d-lg-none ms-2">Barevný motiv</span>
        </button>
        <ul className="dropdown-menu dropdown-menu-lg-end">
          {options.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                className={`dropdown-item d-flex align-items-center gap-2${option.value === preference ? " active" : ""}`}
                aria-pressed={option.value === preference}
                onClick={() => setThemePreference(option.value)}
              >
                <option.Icon aria-hidden="true" focusable="false" size={16} />
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      </li>
    </ul>
  );
};

export default ThemeSwitch;
