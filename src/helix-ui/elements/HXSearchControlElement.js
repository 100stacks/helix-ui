import { HXFormControlElement } from './HXFormControlElement';

/**
 * Defines behavior for the `<hx-select-control>` element.
 *
 * @extends HXFormControlElement
 * @hideconstructor
 * @since 0.16.0
 */
export class HXSearchControlElement extends HXFormControlElement {
    /** @override */
    static get is () {
        return 'hx-search-control';
    }

    /**
     * Fetch the first `<input type="search">` descendant
     *
     * @override
     * @readonly
     * @type {?HTMLInputElement}
     */
    get controlElement () {
        return this.querySelector('input[type="search"]');
    }
}
