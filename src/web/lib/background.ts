// Seasonal page background: winter in December and January, Easter in March, boxes otherwise.
// Runs inline in <head> like the theme script and sets data-background on <html>; styles.css picks the picture
// from it, so it is there from the first paint (the visitor's date, not the date the page was built).
export const backgroundScript = `(()=>{const m=new Date().getMonth();document.documentElement.setAttribute("data-background",m===11||m===0?"winter":m===2?"easter":"boxes")})()`;
