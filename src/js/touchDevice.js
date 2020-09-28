const touchDevice = () => {

    function is_touch_device() {
        return (('ontouchstart' in window) || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0);
    }

    if (is_touch_device()) {
        document.body.classList.add('touch')
    } else {
        document.body.classList.add('no-touch');
    }
};

export default touchDevice;