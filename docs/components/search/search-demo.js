import Util from '../../_util';

if (document.getElementById('vue-searchDemo')) {
    new Vue({
        el: '#vue-searchDemo',
        data: {
            isDisabled: false,
            isRequired: false,
            placeholder: '',
            searchValue: '',
        },
        methods: {
            // fires on 'input' and 'clear' events
            onSearchUpdate: function (evt) {
                this.searchValue = evt.target.value;
            },
            onChkChange: function (evt, datum) {
                this[datum] = evt.currentTarget.checked;
            },
        },
        computed: {
            attrDisabled: function () {
                return (this.isDisabled ? 'disabled' : '');
            },
            attrRequired: function () {
                return (this.isRequired ? 'required' : '');
            },
            hasPlaceholder: function () {
                return (this.placeholder !== '');
            },
            hasValue: function () {
                return (this.searchValue && this.searchValue !== '');
            },
            snippet: function () {
                return Util.snippet(`
                  <hx-search-control>
                    <input 
                      id="demoSearch" 
                      type="search" 
                      ${this.attrDisabled}
                      ${this.attrRequired}
                      ${this.hasPlaceholder ? `placeholder="${this.placeholder}"` : ''}
                      ${this.hasValue ? `value="${this.searchValue}"` : ''}
                    />
                    <button type="button" class="hxClear" hidden aria-label="Clear search">
                      <hx-icon type="times"></hx-icon>
                    </button>
                    <hx-search</hx-search>
                    <label for="demoSearch">
                      Search for stuff...
                    </label>
                  </hx-search-control>
                `);
            },
        },
    });
}//vue-searchDemo

if (document.getElementById('vue-searchAssistanceDemo')) {
    new Vue({
        el: '#vue-searchAssistanceDemo',
        data: {
            searchValue: '',
        },
        methods: {
            // fires on 'input' and 'clear' events
            onUpdate: function (evt) {
                this.searchValue = evt.target.value;
            },
            onFocus: function () {
                this.$refs.search.open = true;
            },
            onBlur: function () {
                this.$refs.search.open = false;
            },
        },
        computed: {
            hasValue: function () {
                return (this.searchValue && this.searchValue !== '');
            },
        },
    });
}
