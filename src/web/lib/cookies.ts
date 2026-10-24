const COOKIES_STORAGE_KEY = "cookiesConfirm";

// Runs inline in <head> like the theme script, so a confirmed cookie notice is hidden from the first paint.
export const cookiesScript = `(function(){try{if(localStorage.getItem("${COOKIES_STORAGE_KEY}"))document.documentElement.setAttribute("data-cookies","confirmed")}catch(e){}})()`;

export const confirmCookies = () => {
  try {
    localStorage.setItem(COOKIES_STORAGE_KEY, "True");
  } catch {}
  document.documentElement.setAttribute("data-cookies", "confirmed");
};
