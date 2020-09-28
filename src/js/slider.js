export default class Slider {
    constructor(selector, slide, next, prev, bullets, text) {
        this.slider = document.querySelector(selector);
        this.slides = [].slice.call(this.slider.querySelectorAll(slide));
        this.next = [].slice.call(this.slider.querySelectorAll(next));
        this.prev = [].slice.call(this.slider.querySelectorAll(prev));
        this.bullets = [].slice.call(this.slider.querySelectorAll(bullets));
        this.texts = [].slice.call(this.slider.querySelectorAll(text));
        this.active = 'active';
    }

    goToSlide(index) {
        let prevSlide = this.slides.find(element => element.classList.contains(this.active)),
            prevText = this.texts.find(element => element.classList.contains(this.active)),
            prevIndex = -1;

        if (prevSlide) {
            prevIndex = parseInt(prevSlide.getAttribute('data-index'));
            if (prevIndex !== index) {
                prevText.classList.add('prev-text');
                prevSlide.classList.add('prev-slide');
                setTimeout(function () {
                    prevSlide.classList.remove('prev-slide');
                    prevText.classList.remove('prev-text');
                }, 800)
            }
        }

        if (prevIndex !== index) {
            this.slides.forEach(slide => {
                if (+slide.getAttribute('data-index') === index) {
                    slide.classList.add(this.active);
                } else {
                    slide.classList.remove(this.active);
                }
            });

            this.bullets.forEach(bullet => {
                if (+bullet.getAttribute('data-index') === index) {
                    bullet.classList.add(this.active);
                } else {
                    bullet.classList.remove(this.active);
                }
            });

            this.texts.forEach(text => {
                if (+text.getAttribute('data-index') === index) {
                    setTimeout(() => {
                        text.classList.add(this.active);
                    }, 400)
                } else {
                    text.classList.remove(this.active);
                }
            })
        }
    }

    goToNext() {
        let currentSlide = this.slides.find(element => element.classList.contains(this.active));
        let lastIndex = this.slides.reduce((index, current) => {
            return current.getAttribute('data-index') > index ? current.getAttribute('data-index') : index;
        }, 0);

        let nextIndex = +currentSlide.getAttribute('data-index') + 1;
        nextIndex = nextIndex <= +lastIndex ? nextIndex : 0;
        this.goToSlide(nextIndex);
    }

    goToPrev() {
        let currentSlide = this.slides.find(element => element.classList.contains(this.active));
        let lastIndex = this.slides.reduce((index, current) => {
            return current.getAttribute('data-index') > index ? current.getAttribute('data-index') : index;
        }, 0);
        let prevIndex = currentSlide.getAttribute('data-index') - 1;
        prevIndex = prevIndex < 0 ? +lastIndex : prevIndex;
        this.goToSlide(prevIndex);
    }

    autoplay() {
        return setInterval(() => {
            this.goToNext();
        }, 5000)
    }

    init() {
        this.goToSlide(0);
        this.next.forEach((next) => {
            next.addEventListener('click', (ev) => {
                this.goToNext()
            });
        });
        this.prev.forEach((prev) => {
            prev.addEventListener('click', (ev) => {
                this.goToPrev();
            });
        });

        this.bullets.forEach(bullet => {
            bullet.addEventListener('click', (ev) => {
                let index = bullet.getAttribute('data-index');
                this.goToSlide(+index)
            });
        });

        let touchObj = {};

        this.slider.addEventListener('touchstart', (ev) => {
            touchObj.startX = ev.changedTouches[0].pageX;
            touchObj.startY = ev.changedTouches[0].pageY;
        });
        this.slider.addEventListener('touchend', (ev) => {
            touchObj.endX = ev.changedTouches[0].pageX;
            touchObj.endY = ev.changedTouches[0].pageY;
            let distX = touchObj.endX - touchObj.startX;
            let distY = touchObj.endY - touchObj.startY;
            if (Math.abs(distX) > Math.abs(distY)) {
                if (distX > 0) {
                    this.goToPrev();
                } else {
                    this.goToNext()
                }
            }
        });
        this.autoplay();
    }
}
