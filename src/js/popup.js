export default class Popup {
    constructor(popupClass, crossClass) {
        this.popup = document.querySelector(popupClass);
        this.cross = this.popup.querySelector(crossClass);
    }

    showPopup() {
        this.popup.classList.add('visible');
    }

    hidePopup() {
        this.popup.classList.remove('visible');
    }

    init() {
        this.cross.addEventListener('click', ev => {
            this.hidePopup();
        })
    }

};
