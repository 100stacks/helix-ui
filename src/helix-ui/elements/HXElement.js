import { KEYS } from '../util';

export class HXElement extends HTMLElement {
    static $define () {
        customElements.define(this.is, this);
    }

    static get observedAttributes () {
        return [ 'disabled' ];
    }

    constructor (tagName, template) {
        super();

        // Don't attach shadow DOM unless specified
        if (tagName && template) {
            this.attachShadow({ mode: 'open' });

            if (window.ShadyCSS) {
                ShadyCSS.prepareTemplate(template, tagName);
                ShadyCSS.styleElement(this);
            }

            this.shadowRoot.appendChild(template.content.cloneNode(true));
        }

        this.$relayEvent = this.$relayEvent.bind(this);
    }//constructor

    connectedCallback () {
        this._$tabIndex = this.getAttribute('tabindex') || 0;
        this.$upgradeProperty('disabled');
    }

    attributeChangedCallback (attr, oldVal, newVal) {
        const hasValue = (newVal !== null);

        switch (attr) {
            case 'disabled':
                if (hasValue) {
                    this.removeAttribute('tabindex');
                    this.setAttribute('aria-disabled', true);
                    this.blur();
                } else {
                    this.setAttribute('tabindex', this._$tabIndex);
                    this.removeAttribute('aria-disabled');
                }
                break;
        }
    }//attributeChangedCallback

    // See: https://goo.gl/MDp6j5
    $upgradeProperty (prop) {
        if (this.hasOwnProperty(prop)) {
            let value = this[prop];
            delete this[prop];
            this[prop] = value;
        }
    }

    // See: https://goo.gl/MUFHD8
    $defaultAttribute (name, val) {
        if (!this.hasAttribute(name)) {
            this.setAttribute(name, val);
        }
    }

    // Utility method to generate a unique ID
    $generateId () {
        return Math
            .random()     // 0.7093288430261266
            .toString(36) // "0.pjag2nwxb2o"
            .substr(2,8); // "pjag2nwx"
    }//$generateId()

    // 'keydown' event listener to prevent page scrolling
    $preventScroll (evt) {
        switch (evt.keyCode) {
            case KEYS.Down:
            case KEYS.Left:
            case KEYS.Right:
            case KEYS.Space:
            case KEYS.Up:
                evt.preventDefault();
                break;
        }
    }//$preventScroll()

    $emit (evtName, details) {
        let evt = new CustomEvent(evtName, {
            cancelable: true,
            bubbles: true,
            detail: details,
        });
        return this.dispatchEvent(evt);
    }//$emit

    $relayEvent (oldEvent) {
        // Emit new event of same name
        let newEvent = new CustomEvent(oldEvent.type, {
            bubbles: oldEvent.bubbles,
            cancelable: oldEvent.cancelable,
        });
        this.dispatchEvent(newEvent);
    }//$relayEvent()

    // TODO: may need a later update to add events based on element name/type
    $relayNonBubblingEvents (el) {
        el.addEventListener('focus', this.$relayEvent);
        el.addEventListener('blur', this.$relayEvent);
    }

    // Undo $relayNonBubblingEvents()
    $removeNonBubblingRelays (el) {
        el.removeEventListener('focus', this.$relayEvent);
        el.removeEventListener('blur', this.$relayEvent);
    }

    // Properties
    set disabled (value) {
        if (value) {
            this.setAttribute('disabled', '');
        } else {
            this.removeAttribute('disabled');
        }
    }

    get disabled () {
        return this.hasAttribute('disabled');
    }
}//HXElement
