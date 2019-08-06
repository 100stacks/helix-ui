import { HXElement } from './HXElement';
import shadowMarkup from './HXSearchElement.html';
import shadowStyles from './HXSearchElement.less';

/**
 * Defines behavior for the `<hx-search>` element.
 *
 * @extends HXElement
 * @hideconstructor
 * @see HXSearchAssistanceElement
 * @since 0.4.0
 */
export class HXSearchElement extends HXElement {
    static get is () {
        return 'hx-search';
    }

    static get template () {
        return `<style>${shadowStyles}</style>${shadowMarkup}`;
    }
}
