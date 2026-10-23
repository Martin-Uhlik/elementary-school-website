"use client";

import { useLayoutEffect, useSyncExternalStore } from "react";
import {
  applyTheme,
  getThemePreference,
  setThemePreference,
  THEME_CHANGE_EVENT,
  type ThemePreference,
} from "@/lib/theme";

const options: { value: ThemePreference; label: string; icon: string }[] = [
  {
    value: "system",
    label: "Podle systému",
    icon: "M8 15A7 7 0 1 0 8 1zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16",
  },
  {
    value: "light",
    label: "Světlý",
    icon: "M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708",
  },
  {
    value: "dark",
    label: "Tmavý",
    icon: "M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278",
  },
];

const Icon = ({ path }: { path: string }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" focusable="false">
    <path d={path} />
  </svg>
);

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

  // re-apply after React resets <html> attributes (dev Strict Mode remount) or a change in another tab
  useLayoutEffect(() => {
    applyTheme(preference);
  }, [preference]);

  return (
    <ul className="navbar-nav theme-switch">
      <li className="nav-item dropdown">
        <button
          type="button"
          className="nav-link dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          aria-label={`Barevný motiv: ${current.label}`}
        >
          <Icon path={current.icon} />
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
                <Icon path={option.icon} />
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
