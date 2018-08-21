const HXElement = require('./HXElement');
const shadowMarkup = require('./HXCheckboxElement.html');
const shadowStyles = require('./HXCheckboxElement.less');

/**
 * Fires when the element's `checked` state changes
 *
 * @event Checkbox:change
 * @since 0.1.8
 * @type {CustomEvent}
 */

/**
 * Defines behavior for the `<hx-checkbox>` element.
 *
 * @emits Checkbox:change
 * @extends HXElement
 * @hideconstructor
 * @since 0.1.8
 */
class HXCheckboxElement extends HXElement {
    static get is () {
        return 'hx-checkbox';
    }

    static get template () {
        return `<style>${shadowStyles}</style>${shadowMarkup}`;
    }

    $onCreate () {
        this._onChange = this._onChange.bind(this);
    }

    $onConnect () {
        this.$upgradeProperty('checked');
        this.$upgradeProperty('disabled');
        this.$upgradeProperty('indeterminate');
        this._chkInput.addEventListener('change', this._onChange);
    }

    $onDisconnect () {
        this._chkInput.removeEventListener('change', this._onChange);
    }

    static get $observedAttributes () {
        return [
            'checked',
            'disabled',
            'indeterminate',
        ];
    }

    $onAttributeChange (attr, oldVal, newVal) {
        const hasValue = (newVal !== null);
        switch (attr) {
            case 'indeterminate':
                this._chkInput.indeterminate = hasValue;
                break;
            case 'checked':
                if (this._chkInput.checked !== hasValue) {
                    this._chkInput.checked = hasValue;
                }
                break;
            case 'disabled':
                this._chkInput.disabled = hasValue;
                break;
        }
    }

    /**
     * @default false
     * @type {Boolean}
     */
    get checked () {
        return this.hasAttribute('checked');
    }
    set checked (value) {
        if (value) {
            this.setAttribute('checked', '');
        } else {
            this.removeAttribute('checked');
        }
    }

    /**
     * Indicates if the state of the element cannot be determined.
     *
     * @default false
     * @type {Boolean}
     */
    get indeterminate () {
        return this.hasAttribute('indeterminate');
    }
    set indeterminate (value) {
        if (value) {
            this.setAttribute('indeterminate', '');
        } else {
            this.removeAttribute('indeterminate');
        }
    }

    /**
     * Pass-through function to native input.
     */
    click () {
        this._chkInput.click();
    }

    /** @private */
    _onChange (evt) {
        // Update internal state
        this.checked = evt.target.checked;

        // Prevent 'change' listeners from firing twice in polyfilled browsers.
        evt.stopImmediatePropagation();

        // Emit a new 'change' event from the custom element
        this.$emit('change');
    }

    /** @private */
    get _chkInput () {
        return this.shadowRoot.getElementById('hxNativeControl');
    }
}

module.exports = HXCheckboxElement;
