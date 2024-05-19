import { mark } from 'regenerator-runtime';
import icons from 'url:../../img/icons.svg'; // parcel 2


export default class View {
    _data;
    /**
     * Render the received object to the dom
     * @param {Object | Object[]} data The to be renderd(e.g. recipe)
     * @param {boolean} [render=true] if false,, create markup string instead of rendering to the DOM
     * @returns {undefined | string} A markup string is returned if render=false
     * @this {Object} View instance
     * @author Rohan Amberkar
     */
    render(data, render = true) {
        if (data === '' || Array.isArray(data) && data.length === 0) return this.renderError();

        this._data = data;
        const markUp = this._generateMarkup();

        if (render === false) {
            return markUp;
        }

        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markUp);
    }

    update(data) {
        this._data = data;
        const newMarkUp = this._generateMarkup();

        const newDom = document.createRange().createContextualFragment(newMarkUp);
        const newElements = Array.from(newDom.querySelectorAll('*'));
        const curElements = Array.from(this._parentElement.querySelectorAll('*'));

        newElements.forEach((newEl, i) => {
            const curEl = curElements[i];

            // Update Change Text
            if (!newEl.isEqualNode(curEl) &&
                newEl.firstChild?.nodeValue.trim() !== '') {

                // console.log('testing', newEl.firstChild.nodeValue.trim());

                curEl.textContent = newEl.textContent;
            }

            // Update Change Attribute
            if (!newEl.isEqualNode(curEl)) {
                Array.from(newEl.attributes).forEach(attr => curEl.setAttribute(attr.name, attr.value))
            }
        });
    }

    _clear() {
        this._parentElement.innerHTML = '';
    }

    // Render Spiner
    renderSpiner() {
        const markup = `
        <div class="spinner">
            <svg>
            <use href="${icons}#icon-loader"></use>
            </svg>
        </div> `
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    };

    renderError(message = this._errorMessage) {
        const markUp = `
            <div class="error">
                <div>
                <svg>
                    <use href="${icons}#icon-alert-triangle"></use>
                </svg>
                </div>
                <p>${message}</p>
            </div>`
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markUp);
    }

    renderMessage(message = this._message) {
        const markUp = `
            <div class="message">
                <div>
                <svg>
                    <use href="${icons}#icon-smile"></use>
                </svg>
                </div>
                <p>${message}</p>
            </div>`
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markUp);
    }
}