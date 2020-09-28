const headerEffect = (headerClass, introClass) => {
    const header = document.querySelector(headerClass),
        intro = document.querySelector(introClass);

    function sectionScroll() {
        const offsetScroll = window.navigator.userAgent.indexOf('Trident') > -1 ? document.body.scrollTop : window.pageYOffset || document.documentElement.scrollTop,
            firstScreen = offsetScroll >= intro.offsetTop && offsetScroll <= intro.offsetTop + intro.offsetHeight;

        if (!firstScreen) {
            if (!header.classList.contains('fixed')) {
                header.classList.add('opacity');

                setTimeout(() => {
                    header.classList.add('fixed');
                    header.classList.remove('opacity');
                }, 100)
            }
        } else {
            if (header.classList.contains('fixed')) {
                header.classList.add('opacity');
                setTimeout(() => {
                    header.classList.remove('fixed');
                    header.classList.remove('opacity');

                }, 400)
            }
        }
    }

    sectionScroll();

    window.addEventListener('scroll', function () {
        sectionScroll();
    })
};
export default headerEffect;