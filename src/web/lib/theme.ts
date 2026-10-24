export type ThemePreference = "system" | "light" | "dark";

const THEME_STORAGE_KEY = "theme";
export const THEME_CHANGE_EVENT = "themechange";

// Runs inline in <head> before the first paint, so the stored or system theme is applied without a flash.
// Keep in sync with applyTheme below.
export const themeScript = `(function(){try{var p=localStorage.getItem("${THEME_STORAGE_KEY}");var d=p==="dark"||(p!=="light"&&matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.setAttribute("data-bs-theme",d?"dark":"light")}catch(e){}})()`;

export const getThemePreference = (): ThemePreference => {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return stored === "light" || stored === "dark" ? stored : "system";
  } catch {
    return "system";
  }
};

export const applyTheme = (preference: ThemePreference) => {
  const dark = preference === "dark" || (preference === "system" && matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.setAttribute("data-bs-theme", dark ? "dark" : "light");
};

export const setThemePreference = (preference: ThemePreference) => {
  try {
    if (preference === "system") localStorage.removeItem(THEME_STORAGE_KEY);
    else localStorage.setItem(THEME_STORAGE_KEY, preference);
  } catch {}
  applyTheme(preference);
  window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
};
