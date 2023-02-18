$(function(){
    $("#header").load("header.html");
    $("#footer").load("footer.html");
});



window.onscroll = floatingHeader;

function floatingHeader() {
    const header = $("#myHeader")
    const padding = 3 * parseFloat(getComputedStyle(document.documentElement).fontSize)
    if (document.documentElement.scrollTop > padding) {
        header.addClass("sticky");
    } else {
        header.removeClass("sticky");
    }
}
