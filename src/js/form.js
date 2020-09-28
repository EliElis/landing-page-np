import Popup from './popup';

const form = (formClass, inputClass) => {
    const successPopup = new Popup('.js-success-popup', '.js-close-popup');
    successPopup.init();

    const form = document.querySelector(formClass),
        inputs = [].slice.call(form.querySelectorAll(inputClass));

    const messages = {
        'required': 'Поле обязательно для заполнения.',
        'minlength': 'Слишком короткое название',
        'phone': 'Некорректно  введен номер телефона',
        'email': 'Некорректно  введен email'
    };

    function showErrorMessage(input, message) {
        let row = input.closest('div');
        let errorBlock = row.querySelector('.error-message');

        if (!errorBlock) {
            let error = document.createElement('span');
            error.classList.add('error-message');
            error.innerText = message;
            error.classList.add('visible');
            row.appendChild(error);
        } else {
            errorBlock.innerText = message;
            errorBlock.classList.add('visible');
        }
    }

    function removeErrorMessage(input) {
        let row = input.closest('div');
        let errorBlock = row.querySelector('.error-message');
        errorBlock.innerText = '';
        errorBlock.classList.remove('visible');
    }

    function inputValidation() {
        let errors = 0;
        inputs.forEach((el) => {
            let val = el.value.trim();

            if (el.required) {
                if (val === '') {
                    errors++;
                    showErrorMessage(el, messages.required)
                } else if (el.getAttribute('type') === 'tel') {
                    let phone = /^\+?3?8?(0\d{9})$/.test(val);
                    if (!phone) {
                        showErrorMessage(el, messages.phone);
                        errors++;
                    }
                } else if (el.getAttribute('type') === 'email') {
                    let email = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(val);
                    if (!email) {
                        showErrorMessage(el, messages.email);
                        errors++;
                    }
                } else {
                    if (el.value.trim().length < 3) {
                        errors++;
                        showErrorMessage(el, messages.minlength)
                    }
                }
            }
        });
        return errors === 0;
    }

    inputs.forEach(inp => {
        inp.addEventListener('change', function () {
            removeErrorMessage(inp)
        });
        inp.addEventListener('input', function () {
            removeErrorMessage(inp)
        });
    });

    form.addEventListener('submit', function (ev) {
        ev.preventDefault();
        let validation = inputValidation();
        if (validation) {
            successPopup.showPopup();
        }
    })
};

export default form;