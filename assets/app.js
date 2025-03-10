import './styles/app.scss';

import $ from "jquery";
import 'bootstrap';
import Tooltip from 'bootstrap/js/src/tooltip';
import './bootstrap';

global.$ = global.jQuery = $;

function applyTooltip() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    tooltipTriggerList.map((tooltipTriggerEl) => {
        return new Tooltip(tooltipTriggerEl)
    })
}

applyTooltip();

let formSubmitted = false;
document.addEventListener('turbo:load', () => applyTooltip());
document.addEventListener('turbo:submit-end', () => formSubmitted = true);
document.addEventListener('turbo:render', (e) => {
    if (formSubmitted) {
        setTimeout(() => {
            const formErrorMessage = document.querySelector('.form-error-message');
            if (formErrorMessage) {
                window.scroll({
                    top: formErrorMessage.getBoundingClientRect().top + window.scrollY,
                    behavior: 'auto'
                });
            }
            formSubmitted = false;
        }, 10);
    }
});

document.addEventListener('turbo:before-cache', () => document.querySelectorAll('.highlighted').forEach((e) => e.classList.remove('highlighted')));