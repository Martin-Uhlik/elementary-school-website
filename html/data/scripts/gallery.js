import PhotoSwipeLightbox from 'https://cdnjs.cloudflare.com/ajax/libs/photoswipe/5.4.2/photoswipe-lightbox.esm.min.js';

// javascript for gallery to work
const lightbox = new PhotoSwipeLightbox({
    // may select multiple "galleries"
    gallery: '#gallery',

    // Elements within gallery (slides)
    children: 'a',

    // set padding for image
    paddingFn: (viewportSize, itemData, index) => {
        return {
            // check based on slide index
            top: viewportSize.x >= 992 ? viewportSize.x * 0.025 : 0,

            // check based on viewport size
            bottom: viewportSize.x >= 992 ? viewportSize.x * 0.025 : 0,

            // check based on image size
            left: viewportSize.y >= 992 ? viewportSize.y * 0.025 : 0,

            right: viewportSize.y >= 992 ? viewportSize.y * 0.025 : 0,
        };
    },
    wheelToZoom: true,

    // actions when clicked (anywhere)
    tapAction: (pt, evt) => {
        if (evt.target.classList.contains('pswp__img')) {
            // if clicked within picture
            // if it was not zoomed then zoom, else fit to screen
            let zoomLevel = pswp.currSlide.currZoomLevel === 1 ? 0 : 1;
            pswp.currSlide.zoomTo(
                zoomLevel, // slide zoom level, 1 - original image size
                { x: pswp.currSlide.panAreaSize.x / 2, y: pswp.currSlide.panAreaSize.y / 2 }, // zoom center point
                333, // transition duration, can be 0
                false // whether pan/zoom bounds should be ignored
            )
        } else {
            // if clicked to background
            pswp.close();
        }
    },

    // setup PhotoSwipe Core dynamic import
    pswpModule: () => import('https://cdnjs.cloudflare.com/ajax/libs/photoswipe/5.4.2/photoswipe.esm.min.js')
});


$(document).ready(() => {
    lightbox.init();

    // set gallery layout
    const storedLayout = localStorage.getItem("galleryLayout");
    if (storedLayout) {
        setGalleryLayout(storedLayout);
    }

    // when everything is set, show gallery
    $('#gallery').removeClass('gallery--loading');
});
