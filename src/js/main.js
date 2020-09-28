import touchDevice from './touchDevice';
import Slider from './slider';
import scrollToAnchor from './scrollToAnchor';
import headerEffect from './header';
import form from './form'

touchDevice();

const AdvSlider = new Slider('.js-slider', '.js-slide', '.js-next', '.js-prev', '.js-slider-bullet', '.js-slider-text');

headerEffect('.js-header', '.js-intro');
form('.js-form', '.form__input');
scrollToAnchor();
AdvSlider.init();