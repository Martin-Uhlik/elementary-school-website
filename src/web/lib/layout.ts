export type LayoutPreference = "grid" | "rows";

const LAYOUT_STORAGE_KEY = "layout";
export const LAYOUT_CHANGE_EVENT = "layoutchange";

// Runs inline in <head> like the theme script, so lists render in the stored layout from the first paint.
// Keep in sync with applyLayout below.
export const layoutScript = `(function(){try{var l=localStorage.getItem("${LAYOUT_STORAGE_KEY}");document.documentElement.setAttribute("data-layout",l==="rows"?"rows":"grid")}catch(e){}})()`;

export const getLayoutPreference = (): LayoutPreference => {
  try {
    return localStorage.getItem(LAYOUT_STORAGE_KEY) === "rows" ? "rows" : "grid";
  } catch {
    return "grid";
  }
};

export const applyLayout = (layout: LayoutPreference) => {
  document.documentElement.setAttribute("data-layout", layout);
};

// grid is the default, so only "rows" is stored
export const setLayoutPreference = (layout: LayoutPreference) => {
  try {
    if (layout === "grid") localStorage.removeItem(LAYOUT_STORAGE_KEY);
    else localStorage.setItem(LAYOUT_STORAGE_KEY, layout);
  } catch {}
  applyLayout(layout);
  window.dispatchEvent(new Event(LAYOUT_CHANGE_EVENT));
};
