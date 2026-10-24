// Sets --VH on <html> to the height that is actually visible on phones (without the browser's address bar).
// It is only re-measured when the width changes (rotation, window resize): phones also fire resize while the address
// bar slides away during scrolling, and following that would make full-height sections jump.
// --VW stays 100vw from styles.css: that is already the full window width including the scrollbar, and measuring it
// in JS made phones widen the page in a loop once anything overflowed. Runs inline in <head> before the first paint.
export const viewportScript = `(()=>{let w=0;const u=()=>{if(innerWidth===w)return;w=innerWidth;document.documentElement.style.setProperty("--VH",innerHeight+"px")};u();addEventListener("resize",u)})()`;
