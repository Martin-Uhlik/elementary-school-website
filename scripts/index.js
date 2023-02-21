$(function(){
    $("#header").load("./header.html", () => {$(selectedTab).addClass('active')});
    $("#footer").load("./footer.html");
});

const floatingHeader = () => {
    const header = $("#myHeader")
    const padding = 3 * parseFloat(getComputedStyle(document.documentElement).fontSize)
    if (document.documentElement.scrollTop > padding) {
        header.addClass("sticky");
    } else {
        header.removeClass("sticky");
    }
}

const hideArrow = () => {
    const arrow = $("#main-down")
    if (document.documentElement.scrollTop > 0) {
        arrow.addClass("main-down--hidden");
    } else {
        arrow.removeClass("main-down--hidden");
    }
}

window.onscroll = () => {
    floatingHeader()
    hideArrow()
}