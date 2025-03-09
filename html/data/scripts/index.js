
// handles header visual for desktop variant
// if you are not on top of the page, then header should be 100vw and stick to the top of the page
const floatingHeader = () => {
    const header = $("#myHeader")
    const padding = 3 * parseFloat(getComputedStyle(document.documentElement).fontSize)
    if (document.documentElement.scrollTop > padding) {
        header.addClass("sticky");
    } else {
        header.removeClass("sticky");
    }
}


// handles visibility of arrow on main page
const hideArrow = () => {
    const arrow = $("#main-down");
    if (document.documentElement.scrollTop > 0) {
        arrow.addClass("main-down--hidden");
    } else {
        arrow.removeClass("main-down--hidden");
    }
}


// handles relative scroll when clicked to scroll arrow
const handleArrowScroll = () => {
    window.scrollBy(0, (window.innerHeight / 2));
}


// for button that inform users that there are no cookies
const confirmCookies = () => {
    localStorage.setItem("cookiesConfirm", "True");
    $("#cookieBar").addClass("cookie-bar--hidden");
}


// if there are no news on main page then insert placeholder that tells it to users
const handleNewsPlaceholder = () => {
    const newsElement = $('#main-page__news');
    const placeholder = "<li class='main-page__news'>V současné době zde nejsou žádné aktuality.</li>"

    // if element is empty
    if (newsElement.children().length === 0) {
        newsElement.append(placeholder);
    }
}


// handles buttons for changing gallery layout size
const setGalleryLayout = (size) => {
    const galleryDOM = $('#gallery');

    switch (size) {
        case "4":
            galleryDOM.removeClass('gallery--dense');
            localStorage.setItem("galleryLayout", "4");
            return;
        case "9":
            galleryDOM.addClass('gallery--dense');
            localStorage.setItem("galleryLayout", "9");
            return;
    }
}


// sets page background by current date
const setBackgroundByDate = () => {
    const date = new Date();
    const backgroundTarget = $('.page-background');

    if (date.getMonth() === 11 || date.getMonth() === 0) {
        backgroundTarget.html("<img class='background-elem-wide ' src='/data/images/background_elements/winter.svg\' alt='' />")
    } else if (date.getMonth() === 2) {
        backgroundTarget.html("<img class='background-elem-wide ' src='/data/images/background_elements/easter.svg\' alt='' />")
    } else {
        backgroundTarget.html("<img class='background-elem-wide ' src='/data/images/background_elements/boxes.svg\' alt='' />")
    }
}


// execute actions that depends on scroll position
window.onscroll = () => {
    floatingHeader();
    hideArrow();
}


// execute when page is ready
$(document).ready(() => {
    // load header component
    $("#header").load("/data/header.html", () => {
        $(selectedTab).addClass("active");

        floatingHeader();
        hideArrow();

        // const cookies = getCookies();
        const cookiesConfirm = localStorage.getItem("cookiesConfirm");
        if (!cookiesConfirm) {
            $("#cookieBar").removeClass("cookie-bar--hidden");
        }
    });

    // load footer component
    $("#footer").load("/data/footer.html");

    // set random first carousel image
    const randomSlide = Math.floor(Math.random() * 7);
    $('#mainCarousel').children(".carousel-inner").children("div").eq(randomSlide).addClass("active");

    // set placeholder for news section if there are no news
    handleNewsPlaceholder();

    // set page background
    setBackgroundByDate();
});