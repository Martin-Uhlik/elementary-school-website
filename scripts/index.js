
// directory_root = "http://localhost:9000/"
$(() => {
    $("#header").load("/header.html", () => {
        $(selectedTab).addClass("active");
        // $("a").each(function(){
        //     var currentHref = $(this).attr("href");
        //     $(this).attr("href", directory_root + currentHref);
        // });
        floatingHeader();
        hideArrow();
    });
    $("#footer").load("/footer.html");
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
    floatingHeader();
    hideArrow();
}
