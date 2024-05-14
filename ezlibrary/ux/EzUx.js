import {
    EzObject,
    EzBoolean,
    EzNumber,
    EzString,
    EzArray,
    EzHtml,
    EzJson
} from '/ezlibrary/helpers/EzHelpers.js';

/**
 * @class
 * @description
 * EzClocker UX Helper Class
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Import with:
 *  import { EzUx } from '/ezlibrary/ux/EzUx.js';
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Do not create new instances of this class!
 * Access is via static methods and properties only
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
export class EzUx {
    /**
     * @public @constructor
     * DOES NOT CREATE A NEW INSTANCE
     * Throws exception, only class static method and properties.
     */
    constructor() {
        throw new EzException(
            'Do not create a new instance of EzUx. Access via static method and properties only.');
    }

    /**
     * @public @method
     * Finds an HTML element by id, name, tag name, or class name.
     * Replaces:
     *  ezApi.ezclocker.ezUi.ezFindByElementOrId(elementOrId)
     *  ezApi.ezclocker.ezElement(elementId)
     *  ezApi.ezclocker.ezUi.ezId(id)
     *  ezApi.ezclocker.ezUi.ezId$(selector)
     *  ezApi.ezclocker.ezRef(elementRef)
     * @param {string} elementIdNameTagNameClassNameOrSelector
     * @returns {null|object}
     */
    static findElement(elementIdNameTagNameClassNameOrSelector) {
        if (!EzString.hasLength(elementIdNameTagNameClassNameOrSelector)) {
            return null;
        }

        if (globalThis.window === elementIdNameTagNameClassNameOrSelector) {
            return globalThis.window;
        }

        if (globalThis.window.document.html === elementIdNameTagNameClassNameOrSelector) {
            return globalThis.window.document.html;
        }

        if (globalThis.window.document === elementIdNameTagNameClassNameOrSelector) {
            return globalThis.window.document;
        }

        if (globalThis.window.document.body === elementIdNameTagNameClassNameOrSelector) {
            return globalThis.window.document.body;
        }

        if (globalThis.window.document.head === elementIdNameTagNameClassNameOrSelector) {
            return globalThis.window.document.head;
        }

        if (globalThis.window.document.title === elementIdNameTagNameClassNameOrSelector) {
            return globalThis.window.document.title;
        }

        let element = EzUx.findById(elementIdNameTagNameClassNameOrSelector);

        if (!element) {
            let elementsByTagName = EzUx.findAllByTagName(elementIdNameTagNameClassNameOrSelector);

            if (0 !== elementsByTagName.length) {
                return elementsByTagName.item(0);
            }

            let elementsByClassName = EzUx.findAllByClassName(elementIdNameTagNameClassNameOrSelector);

            if (0 !== elementsByClassName.length) {
                return elementsByClassName[0];
            }

            let elementsByName = EzUx.findAllByName(elementIdNameTagNameClassNameOrSelector);

            if (0 !== elementsByName.length) {
                return elementsByName.item(0);
            }

            return EzUx.findElement$(elementIdNameTagNameClassNameOrSelector);
        }

        return element;
    }

    /**
     * @public @method
     * Finds an element by JQuery selectr
     * Replaces:
     *  ezApi.ezclocker.ezUi.ezId$(selector)
     *  ezApi.ezclocker.ezRef(elementRef)
     *  ezApi.ezclocker.ezId$(selector)
     * @returns {null|object}
     */
    static findElement$(jQuerySelector) {
        if (!EzObject.isValid(jQuerySelector)) {
            return null;
        }

        let element = $(jQuerySelector);

        if (!EzObject.isValid(element) && 0 != element?.length) {
            EzUx.id$(jQuerySelector);
        }

        return EzObject.isValid(element) && 0 != element?.length
            ? element
            : null;
    }

    /**
     * @static
     * @public @method
     * Finds an element by JQuery selectr
     * Replaces:
     *  ezApi.ezclocker.ezUi.ezId$(selector)
     *  ezApi.ezclocker.ezRef(elementRef)
     *  ezApi.ezclocker.ezId$(selector)
     *  ezApi.ez$(jQuerySelector)
     * Short-hand alternative to EzUx.findElement$(...)
     * @param {*} jQuerySelector
     * A valid jQuery selector value
     */
    static $(jQuerySelector) {
        let element =  $(jQuerySelector);

        return EzObject.isValid(element) && 0 != element?.length
            ? element
            : null;
    }

    /**
     * @static
     * @public @method
     * Finds an element by JQuery id selector
     * Replaces:
     *  ezApi.ezclocker.ezUi.ezId(id)
     *  ezApi.ezclocker.ezUi.ezId$(selector)
     *  ezApi.ezclocker.ezRef(elementRef)
     *  ezApi.ezclocker.ezId$(selector)
     *  ezApi.ez$(jQuerySelector)
     * Short-hand alternative to EzUx.findElement$(...)
     * @param {string} elementId
     * A valid jQuery selector value
     */
    static id$(elementId) {
        let element = $(`#${elementId}`);

        return EzObject.isValid(element) && 0 != element?.length
            ? element
            : null;
    }

    /**
     * @public @method
     * Finds the HTML element with the provided elementId
     * All HTML IDs should be unique inside a document.
     * If two or more elements in a document have the same ID, this method returns the first element found.
     * If no element is found, returns null
     * Replaces:
     *  ezApi.ezclocker.ezUi.ezId(id)
     *  ezApi.ezclocker.ezElement(elementId)
     * @param {string} elementId
     * @returns {null|object}
     */
    static findById(elementId) {
        if (!EzString.hasLength(elementId)) {
            return null;
        }

        switch (elementId.toLowerCase()) {
            case 'window':
                return globalThis.window;
            case 'html':
                return globalThis.window.document.html;
            case 'document':
                return globalThis.window.document;
            case 'body':
                return globalThis.window.document.body;
            case 'head':
                return globalThis.window.document.head;
            case 'title':
                return globalThis.window.document.title;
        }

        // If the elementOrId is an object, assume it is an HTML element and return it.
        // Otherwise, look up the HTML element by id and return it.
        let element = globalThis.document.getElementById(elementId);

        return EzObject.isValid(element)
            ? element
            : EzUx.findElement$(elementId);
    }

    /**
     * @static
     * @public @method
     * Gets the element assocaited with the provided elementId
     * Short-hand alternative to EzUx.findById
     * Replaces:
     *  ezApi.ezclocker.ezUi.ezId(id)
     *  ezApi.ezclocker.ezElement(elementId)
     *  ezApi.ezId(id)
     *  ezApi.ezId$(id)
     * @param {string} elementId
     */
    static id(elementId) {
        return EzUx.findById(elementId);
    }

    /**
     * @static
     * @public @method
     * Returns an array of all elements which have all of the given class name(s).
     * @param {string} classNames
     * A string representing the class name(s) to match; multiple class names are separated by whitespace.
     * @returns {array}
     */
    static findAllByClassName(classNames) {
        if (!EzString.hasLength(classNames)) {
            return [];
        }

        return globalThis.document.getElementsByClassName(classNames);
    }

    /**
     * @static
     * @public @method
     * Returns A live HTMLCollection of found elements in the order they appear in the tree.
     * @param {string} elementTagName
     * The value of the name attribute of the element(s) to find
     * @returns {HTMLCollection}
     */
    static findAllByTagName(elementTagName) {
        if (!EzString.hasLength(elementTagName)) {
            return new HTMLCollection();
        }

        return globalThis.document.getElementsByTagName(elementTagName);
    }

    /**
     * @public @static
     * Returns a NodeList Collection of elements with a given name attribute in the document
     * @param {string} elementName
     * @returns {NodeList}
     */
    static findAllByName(elementName) {
        if (!EzString.hasLength(elementName)) {
            return new NodeList();
        }

        return globalThis.document.getElementsByName(elementName);
    }

    /**
     * @static
     * @public @method
     * Shows the element or element associated by the provided id
     * Replaces:
     *  ezApi.ezclocker.ezUi.ezShowElement(elementOrId, optionalDisplayStyle)
     *  ezApi.ezclocker.ezUi.ezShow(elementOrId)
     *  ezApi.ezclocker.ezUi.ezShow$(selector)
     * @param {string} elementRef
     * @param {undefined|null|string} optionalDisplayStyle
     * Defaults:
     *  If element is a div then default is 'block'
     *  If element is a table then default is 'table'
     *  Otherwise, the default is 'initial'
     */
    static show(elementRef, optionalDisplayStyle = 'initial') {
        let element = EzUx.findElement(elementRef);

        if (!element) {
            globalThis.console.error(`Cannot show element ${elementRef}: Element does not exist.`);

            return;
        }

        if ('none' !== element.style.display) {
            return; // already visible
        }

        if (element.classList.contains('ezHiddenByDefault')) {
            element.style.display = 'none';

            element.classList.remove('ezHiddenByDefault');
        }
        if (element.classList.contains('ezHidden')) {
            element.style.display = 'none';

            element.classList.remove('ezHidden');
        }
        if (element.classList.contains('ezHiddenDefault')) {
            element.style.display = 'none';

            element.classList.remove('ezHiddenDefault');
        }

        if (EzString.hasLength(optionalDisplayStyle) && 'initial' !== optionalDisplayStyle) {
            element.style.display = optionalDisplayStyle;
        } else if (EzObject.hasProperty(element, 'ezDisplay') && EzString.hasLength(element.ezDisplay)) {
            element.style.display = element.ezDisplay;
        } else if ('DIV' === element.tagName.toUpperCase()) {
            element.style.display = 'block';
        } else if ('TABLE' === element.tagName.toUpperCase()) {
            element.style.display = 'table';
        } else {
            element.style.display = 'unset';
        }
    }

    /**
     * @static
     * @public @method
     * Hides the element or associated by the provided id
     * Replaces:
     *  ezApi.ezclocker.ezUi.ezHideElement(elementOrId)
     *  ezApi.ezclocker.ezUi.ezHide$(selector)
     * @param {string} elementRef
     */
    static hide(elementRef) {
        let element = EzUx.findElement(elementRef);

        if (!EzObject.isValid(element)) {
            globalThis.console.error(`Cannot hide element ${elementRef}: Element does not exist.`);

            return null;
        }

        // getComputerStyle(...) is a global Javascript function available on globalThis
        let displayStyle = globalThis.getComputedStyle(element, null).display;

        if ('none' === displayStyle) {
            // Already hidden
            return;
        }

        element.ezDisplay = displayStyle;

        element.style.display = 'none';
    }

    /**
     * @static
     * @public @method
     * Gets the innerHtml content for the element associated with the provided elementRef
     * Replaces:
     *  ezApi.ezclocker.ezUi.ezGetElementContent(elementOrId)
     * @param {string} elementRef
     * @returns {string}
     */
    static getContent(elementRef) {
        let element = EzUx.findElement(elementRef);

        if (!EzObject.isValid(element)) {
            globalThis.console.error(`Cannot get element content for ${elementRef}: Element does not exist.`);

            return null;
        }

        return element.innerHTML;
    }

    /**
     * @static
     * @public @method
     * Sets the element's innerHtml
     * Replaces:
     *  ezApi.ezclocker.ezUi.ezSetContent(id, innerHtmlContent)
     *  ezApi.ezclocker.ezUi.ezContent(elementOrId, html)
     * @param {string} elementRef
     * @param {undefined|null|string} innerHTMLContent
     * Default: EzString.EMPTY
     */
    static setContent(elementRef, innerHTMLContent = EzString.EMPTY) {
        let element = EzUx.findElement(elementRef);

        if (!EzObject.isValid(element)) {
            globalThis.console.error(`Cannot get element content for ${elementRef}: Element does not exist.`);

            return null;
        }

        element.innerHTML = EzString.stringOrEmpty(innerHTMLContent);
    }

    /**
     * @static
     * @public @method
     * Prepends the provided prependHtmlContent to the beginning of the
     * content of the innerHTML
     * Replaces:
     *  ezApi.ezclocker.ezUi.ezPrependContent(elementOrId, appendHtml)
     * @param {string} elementRef
     * @param {undefined|null|string} prependHtmlContent
     */
    static prependContent(elementRef, prependHtmlContent) {
        if (!EzString.hasLength(prependHtmlContent)) {
            return;
        }

        let element = EzUx.findElement(elementRef);

        if (!EzObject.isValid(element)) {
            globalThis.console.error(`Cannot prepend content to element ${elementRef}: Element does not exist.`);

            return null;
        }

        element.innerHTML = EzHtml.build`
            ${prependHtmlContent}
            ${element.innerHTML}`;
    }

    /**
     * @static
     * @public @method
     * Appends the provided appendHtml to the innerHTML property of the provided element or element associated with the
     * provided id.
     * Replaces:
     *  ezApi.ezclocker.ezUi.ezAppendContent(elementOrId, appendHtml)
     *  ezApi.ezclocker.ezUi.ezAppend(id, html)
     *  ezApi.ezclocker.ezUi.ezAppendHtml(elementOrId, appendHtml)
     * @param {string} elementOrId
     * @param {undefined|null|string} appendHtmlContent
     */
    static appendContent(elementRef, appendHtmlContent = EzString.EMPTY) {
        if (!EzString.hasLength(appendHtmlContent)) {
            return;
        }

        let element = EzUx.findElement(elementRef);

        if (!EzObject.isValid(element)) {
            globalThis.console.error(`Cannot append content to element ${elementRef}: Element does not exist.`);

            return null;
        }

        element.innerHTML = EzHtml.build`
            ${EzString.stringOrEmpty(element?.innerHtml)}
            ${appendHtmlContent}`;
    }

    /**
     * @static
     * @public @method
     * Appends the provided appendHtmlContent to innerHtml property of the element identified by the jquerySelector.
     * Replaces:
     *  ezApi.ezclocker.ezUi.ezAppendContent$
     *  ezApi.ezclocker.ezUi.ezAppend$(selector, appendHtml)
     *  ezApi.ezclocker.ezUi.ezAppendHtml$(selector, appendHtml)
     * @param {string} jquerySelector
     * @param {undefined|null|appendHtmlContent}
     */
    static appendContent$(jquerySelector, appendHtmlContent = EzString.EMPTY) {
        if (EzString.hasLength(jquerySelector)) {
            globalThis.console.error('Cannot append content to element selected with an undefined or null jQuery selector.');
        }

        let element = EzUx.findElement$(jquerySelector);

        if (!EzObject.isValid(element)) {
            globalThis.console.error(`Cannot append content to element selected with jQuery selector ${jquerySelector}: Element does not exist.`);

            return null;
        }

        element.append(appendHtmlContent);
    }

    /**
     * @static
     * @public @method
     * Determines if the element with provided ID exists
     * Replaces:
     *  ezApi.ezclocker.ezUi.ezElementExists(id)
     *  ezApi.ezclocker.ezUi.ezDoesElementExist(elementOrId)
     * @returns {boolean}
     */
    static elementExists(elementRef) {
        let element = EzUx.findElement(elementRef);

        return EzObject.isValid(element);
    }

    /**
     * @static
     * @public @method
     * Determines if the element with provided ID exists
     * Replaces:
     *  ezApi.ezclocker.ezUi.ezElementExists$(jquerySelector)
     * @param {string} jquerySelector
     * @returns {boolean}
     */
    static elementExists$(jquerySelector) {
        if (!EzString.hasLength(jquerySelector)) {
            return false;
        }

        let element = EzUx.findElement$(jquerySelector);

        return EzObject.isValid(element) && 0 != element.length;
    }

    /**
     * @static
     * @public @method
     * Sets focus on the element referenced by the jquery selector
     * Replaces:
     *  ezApi.ezclocker.ezUi.ezFocusElement(elementOrId)
     *  ezApi.ezclocker.ezUi.ezFocusInput(id)
     *  ezApi.ezclocker.ezUi.ezFocus(elementId)
     * @param {selector} selector
     */
    static focus(elementRef) {
        let element = EzUx.findElement(elementRef);

        if (!EzObject.isValid(element)) {
            globalThis.console.error(`Cannot set focus to input element ${elementRef}: Element does not exist.`);

            return null;
        }

        element.focus();
    }

    /**
     * @static
     * @public @method
     * Sets focus to the element referenced by the provided selector
     * Replaces:
     *  ezApi.ezclocker.ezUi.ezFocus$(selector)
     *  ezApi.ezclocker.ezUi.ezFocusInput$(selector)
     * @param {string} jquerySelector
     * @returns {null|object}
     */
    static focus$(jquerySelector) {
        if (!EzString.hasLength(jquerySelector)) {
            globalThis.console.error('Cannot focus an element selected by a null or undefiend jquery selector.');

            return;
        }

        let element = EzUx.findElement$(jquerySelector);

        if (!EzObject.isValid(element)) {
            globalThis.console.error(`Cannot focus element selected by jquery selector "${jquerySelector}" : Element does not exist.`);

            return;
        }

        return element.focus();
    }

    /**
     * @static
     * @public @method
     * Sets the input value
     * Replaces:
     *  ezApi.ezclocker.ezUi.ezSetInputValue(elementOrId, value)
     * @param {string} elementRef
     * @param {undefined|null|number|string|boolean} value
     * If the value is undefined or null then the element.value is assigned null.
     */
    static setInputValue(elementRef, value) {
        let element = EzUx.findElement(elementRef);

        if (!EzObject.isValid(element)) {
            globalThis.console.error(`Cannot set input ${elementRef} value of ${value}: Element does not exist.`);

            return;
        }

        element.value = EzObject.assignOrNull(value);
    }

    /**
     * @static
     * @public @method
     * Sets the input value
     * Replaces:
     *  ezApi.ezclocker.ezUi.ezSetInputValue(elementOrId, value)
     * @param {string} elementRef
     */
    static clearInputValue(elementRef) {
        let element = EzUx.findElement(elementRef);

        if (!EzObject.isValid(element)) {
            globalThis.console.error(`Cannot set input ${elementRef} value of ${value}: Element does not exist.`);

            return;
        }

        element.value = EzString.EMPTY;
    }

    /**
     * @static
     * @public @method
     * Clears all the HTML input elements who's reference/id appear in the provided inputRefsArray.
     * @param {array} inputRefsArray
     */
    static clearAllInputValues(inputRefsArray = []) {
        if (!EzArray.hasLength(inputRefsArray)) {
            return;
        }

        inputRefsArray.forEach(
            (inputRef) => EzUx.clearInputValue(inputRef));
    }

    /**
     * @static
     * @public @method
     * Sets the input value for the item identified by the selector
     * Replaces:
     *  ezApi.ezclocker.ezUi.ezSetInputValue$(selector, value)
     * @param {string} jquerySelector
     * @param {undefined|null|*} value
     */
    static setInputValue$(jquerySelect, value) {
        if (!EzString.hasLength(jquerySelect)) {
            globalThis.console.error('Cannot set the input using a null or undefiend jquery selector value.');

            return;
        }

        let element = EzUx.findElement$(selector);

        if (!EzObject.isValid(element)) {
            globalThis.console.error(`Cannot set input value of ${value} to input selected by jquery selector "${jquerySelect}" : Element does not exist.`);

            return;
        }

        if (EzObject.isValid(element)) {
            element.val(
                EzObject.assignOrNull(value));
        }
    }

    /**
     * @static
     * @public @method
     * Gets the value the HTML input element referenced by the provided elementRef
     * Replaces:
     *  ezApi.ezclocker.ezUi.ezGetInputValue(elementOrId)
     * @param {string} elementRef
     * @returns {*}
     * Returns the value of the input assoicated with the provided elementRef
     */
    static getInputValue(elementRef) {
        let element = EzUx.findElement(elementRef);

        if (!EzObject.isValid(element)) {
            globalThis.console.error(`Cannot get the value from input ${elementRef}: Element does not exist.`);

            return;
        }

        return EzObject.assignOrNull(element?.value);
    }

    /**
     * @static
     * @public @method
     * Determiens if the provied element refernce is the browser window.
     * @param {undefined|null|object} element
     * @returns {boolean}
     */
    static isElementWindow(element) {
        return EzObject.isValid(element) && '[object Window]' === EzObject.getObjectType(element);
    }

    /**
     * @static
     * @public @method
     * Gets the clientHeight of an element or the outerHeight of the window
     * @param {string} elementRef
     * @returns {number}
     */
    static clientHeight(elementRef) {
        let element = EzUx.findElement(elementRef);

        if (!EzObject.isValid(element)) {
            globalThis.console.error(`Cannot get client height element ${elementRef}: Element does not exist.`);

            return 0;
        }

        return window == elementRef
            ? window.outerHeight
            : element.clientHeight;
    }

    /**
     * @static
     * @public @method
     * Gets the clientWidth of an element or the outerWidth of the window
     * @param {string} elementRef
     * @returns {number}
     * Returns the element if found, or null.
     */
    static clientWidth(elementRef) {
        let element = EzUx.findElement(elementRef);

        if (!EzObject.isValid(element)) {
            globalThis.console.error(`Cannot get client width element ${elementRef}: Element does not exist.`);

            return 0;
        }

        return window == elementRef
            ? window.outerWidth
            : element.clientWidth;
    }

    /**
     * @static
     * @public @method
     * Gets an element's offsetHeight or the window's outerHeight value.
     * Returns zero if the element does not exist or of the value obtained from the window or element is not a number.
     * The inner height value is a sum of the element or window:
     *  1) Height
     *  2) Padding top value
     *  3) Padding bottom value
     *  4) Border top size value
     *  5) Border bottom size value
     * @param {string} elementRef
     * @returns {number}
     */
    static outerHeight(elementRef) {
        let element = EzUx.findElement(elementRef);

        if (!EzObject.isValid(element)) {
            globalThis.console.error(`Cannot obtain outer height of element ${elementRef}: Element does not exist.`);

            return 0;
        }

        return EzUx.isElementWindow(element)
            ? EzNumber.numberOrZero(window?.outerHeight)
            : EzNumber.numberOrZero(element?.offsetHeight);
    }

    /**
     * @static
     * @public @method
     * Gets an element's offsetWidth or the window's outerWidth value.
     * Returns zero if the element does not exist or of the value obtained from the window or element is not a number.
     * The value returned is the sum of the following element or window properties:
     *  1) Element height (without padding or border)
     *  2) Padding left value
     *  3) Padding right value
     *  4) Border left size value
     *  5) Border right size value
     * @param {string} elementRef
     * @returns {number}
     */
    static outerWidth(elementRef) {
        let element = EzUx.findElement(elementRef);

        if (!EzObject.isValid(element)) {
            globalThis.console.error(`Cannot obtain outer height of element ${elementRef}: Element does not exist.`);

            return 0;
        }

        return EzUx.isElementWindow(element)
            ? EzNumber.numberOrZero(window?.outerWidth)
            : EzNumber.numberOrZero(element?.offsetWidth);
    }

    /**
     * @static
     * @public @method
     * Gets an element's clientHeight or the window's innerHeight value.
     * Returns zero if the element/window does not exist or of the value obtained from the window or element is not a number.
     * The value returned is the height of the element or window without padding or border.
     * @param {string} elementRef
     * @returns {number}
     */
    static innerHeight(elementRef) {
        let element = EzUx.findElement(elementRef);

        if (!EzObject.isValid(element)) {
            globalThis.console.error(`Cannot obtain the inner height of element ${elementRef}: Element does not exist.`);

            return 0;
        }

        return EzUx.isElementWindow(element)
            ? EzNumber.numberOrZero(window.innerHeight)
            : EzNumber.numberOrZero(element.clientHeight);
    }

    /**
     * @static
     * @public @method
     * Gets an element's clientWidth or the window's innerWidth value.
     * Returns zero if the element/window does not exist or of the value obtained from the window or element is not a number.
     * The value returned is the width of the element or window without padding or border.
     * @param {string} elementRef
     * @returns {number}
     */
    static innerWidth(elementRef) {
        let element = EzUx.findElement(elementRef);

        if (!EzObject.isValid(element)) {
            globalThis.console.error(`Cannot obtain the inner height of element ${elementRef}: Element does not exist.`);

            return 0;
        }

        return EzUx.isElementWindow(element)
            ? EzNumber.numberOrZero(window.innerWidth)
            : EzNumber.numberOrZero(element.clientWidth);
    }

    /**
     * @public @method
     * Sets the element's CSS height value
     * @param {string} elementRef
     * @param {number|string} cssHeight
     */
    static setHeight(elementRef, cssHeight) {
        let element = EzUx.findElement(elementRef);

        if (!EzObject.isValid(element)) {
            globalThis.console.error(`Cannot set the css height of element ${elementRef}: Element does not exist.`);

            return;
        }

        element.style.height = EzNumber.isNumber(cssHeight)
            ? `${height}px`
            : height;
    }

    /**
     * @static
     * @public @method
     * Enables the element
     * @param {string} elementRef
     */
    static enable(elementRef) {
        let element = EzUx.findElement(elementRef);

        if (!EzObject.isValid(element)) {
            globalThis.console.error(`Cannot enable element element ${elementRef}: Element does not exist.`);

            return;
        }

        element.disabled = false;
    }

    /**
     * @static
     * @public @method
     * Enables all the element references/ids in the elementRefArray param.
     * @param {undefined|null|array} elementRefArray
     * Default: []
     */
    static enableAll(elementRefArray = []) {
        if (!EzArray.hasLength(elementRefArray)) {
            return;
        }

        elementRefArray.forEach(
            (elementRef) => EzUx.enable(elementRef));
    }

    /**
     * @static
     * @public @method
     * Disables the element
     * @param {string} elementRef
     */
    static disable(elementRef) {
        let element = EzUx.findElement(elementRef);

        if (!EzObject.isValid(element)) {
            globalThis.console.error(`Cannot disable element ${elementRef}: Element does not exist.`);

            return;
        }

        element.disabled = true;
    }

    /**
     * @static
     * @public @method
     * Disables all the element references/ids in the elementRefArray param.
     * @param {undefined|null|array} elementRefArray
     * Default: []
     */
    static disableAll(elementRefArray = []) {
        if (!EzArray.hasLength(elementRefArray)) {
            return;
        }

        elementRefArray.forEach(
            (elementRef) => EzUx.disable(elementRef));
    }

    /**
     * @static
     * @public @method
     * Determines if the elementRef is an existing element and is enabled.
     * @param {string} elementRef
     */
    static isEnabled(elementRef) {
        return EzBoolean.isFalse(
            EzUx.isDisabled(elementRef));
    }

    /**
     * @static
     * @public @method
     * Determines if the elementRef is an existing element and is disabled.
     * @param {string} elementRef
     */
    static isDisabled(elementRef) {
        let element = EzUx.findElement(elementRef);

        if (!EzObject.isValid(element)) {
            globalThis.console.error(`Cannot determine if element ${elementRef} is enabled or disabled: Element does not exist.`);

            return;
        }

        return EzBoolean.isTrue(element?.disabled);
    }

    /**
     * @static
     * @public @method
     * Inserts the provided html by:
     *  1) Creating a <span> node with the provided wrapperId
     *  2) Assigning the provided html to the <span> node's innerHTML
     *  3) Inserting the <span> node before the element with the provided elementOrId.
     * @param {string} elementRef
     * @param {undefined|null|string} html
     * Default is: empty string
     * @param {undefined|null|string} wrapperId
     * Default is: 'EzInsertedElementWrapperSpan'
     */
    static insertBeforeElement(elementRef, html, wrapperId) {
        let element = EzUx.findElement(elementRef);

        if (!EzObject.isValid(element)) {
            globalThis.console.error(`Cannot insert html before element ${elementRef}: Element does not exist.`);

            return;
        }

        let spanNode = document.createElement('div');

        spanNode.style.display = 'contents';

        spanNode.id = EzString.hasLength(wrapperId)
            ? wrapperId
            : 'EzInsertedElementWrapperSpan';

        spanNode.innerHTML = EzString.stringOrEmpty(html);

        element.parentNode.insertBefore(spanNode, element);
    }

    /**
     * @static
     * @public @method
     * Sets the selected property of the element associated with the elementRef to true.
     * @param {string} elementRef
     */
    static select(elementRef) {
        let element = EzUx.findElement(elementRef);

        if (!EzObject.isValid(element)) {
            globalThis.console.error(`Cannot select element ${elementRef}: Element does not exist.`);

            return;
        }

        elementRef.selected = true;
    }

    /**
     * @static
     * @public @method
     * Sets the selected property of the element associated with the elementRef to false.
     * @param {string} elementRef
     */
    static unselect(elementRef) {
        let element = EzUx.findElement(elementRef);

        if (!EzObject.isValid(element)) {
            globalThis.console.error(`Cannot select element ${elementRef}: Element does not exist.`);

            return;
        }

        element.selected = false;
    }

    /**
     * @static
     * @public @method
     * Returns if the element associated with the elementRef has it's selected property set to true.
     * @param {string} elementRef
     * @returns {boolean}
     */
    static isSelected(elementRef) {
        let element = EzUx.findElement(elementRef);

        if (!EzObject.isValid(element)) {
            globalThis.console.error(`Cannot select element ${elementRef}: Element does not exist.`);

            return;
        }

        return EzBoolean.isTrue(element?.selected);
    }

    /**
     * @static
     * @public @method
     * Gets the element's dataset value for the provided dataSetKey for the element associated with the provided elementRef.
     * Can exclude the 'data-' prefix and/or send the dataSetKey as camel cased instead of with dashes.
     * @param {string} elementRef
     * @param {string} dataSetKey
     * @returns {*}
     */
    static getDatasetValue(elementRef, dataSetKey) {
        let element = EzUx.findElement(elementRef);

        if (!EzObject.isValid(element)) {
            globalThis.console.error(`Cannot get element ${elementRef}'s dataset value for data set key "${dataAttributeName}": Element does not exist.`);

            return undefined;
        }

        dataSetKey = 0 === dataSetKey.indexOf('data-')
            ? dataSetKey.substring(5).replace('-', EzString.EMPTY)
            : dataSetKey.replace('-', EzString.EMPTY);

        if (!EzString.hasLength(dataSetKey)) {
            throw new EzBadParamException(
                'dataSetKey',
                EzUX,
                EzUX.getDatasetValue);
        }

        return element?.dataset?.[dataSetKey];
    }

    /**
     * @static
     * @public @method
     * Gets the element's dataset value as a JSON object for the provided dataSetKey for the element associated with the provided elementRef.
     * Can exclude the 'data-' prefix and/or send the dataSetKey as camel cased instead of with dashes.
     * @param {string} elementRef
     * @param {string} dataSetKey
     * @returns {object}
     */
    static getDatasetValueAsJsonObject(elementRef, dataSetKey) {
        let dataSetValue = EzUx.getDatasetValue(elementRef, dataSetKey);

        if (!EzString.hasLength(dataSetValue)) {
            throw new EzBadStateException(
                `Expected a valid, non-empty JSON string from element.dataset[${dataSetKey}]`,
                EzString.em`
                    However, the value of element.dataset[${dataSetKey}] is undefined, null, or an empty string.
                    [Dataset Value: ${EzObject.isValid(dataSetValue) ? dataSetValue.toString() : 'undefined or null'}]`,
                EzUx,
                EzUx.getDatasetValueAsJsonObject);
        }

        return EzJson.fromJson(dataSetValue);
    }

    /**
     * @static
     * @public @method
     * Gets the element's dataset value as an int number for the provided dataSetKey for the element associated with the provided elementRef.
     * Can exclude the 'data-' prefix and/or send the dataSetKey as camel cased instead of with dashes.
     * @param {string} elementRef
     * @param {string} dataSetKey
     * @returns {number}
     */
    static getDatasetValueAsInt(elementRef, dataSetKey) {
        let dataSetValue = EzUx.getDatasetValue(elementRef, dataSetKey);

        if (!EzNumber.isNumber(dataSetValue) && !EzString.hasLength(dataSetValue)) {
            throw new EzBadStateException(
                `Expected a valid number (or string representing a number) from element.dataset[${dataSetKey}]`,
                EzString.em`
                    However, the value element.dataset[${dataSetKey}] is either undefined, null, not a string representing a number, or not a number.
                    [Dataset Value: ${EzObject.isValid(dataSetValue) ? dataSetValue.toString() : 'undefined or null'}]`,
                EzUx,
                EzUx.getDatasetValueAsInt);
        }

        return EzNumber.strToInt(dataSetValue);
    }

    /**
     * @static
     * @public @method
     * Determines if the element or element with the provided id is checked or not.
     * Replaces:
     *  ezApi.ezclocker.ezUi.ezIsCheckBoxChecked(elementOrId)
     *  ezApi.ezclocker.ezUi.ezIsCheckboxChecked(elementOrId)
     * @param {string} elementRef
     * @returns {boolean}
     */
    static isCheckboxChecked(elementRef) {
        let element = EzUx.findElement(elementRef);

        if (!EzObject.isValid(element)) {
            globalThis.console.error(`Cannot determine if checkbox ${elementRef} is checked or not: Element does not exist.`);

            return;
        }

        return EzBoolean.booleanOrFalse(element.checked);
    }

    /**
     * @static
     * @public @method
     * Sets an HTML checkbox input's checked value
     * Replaces
     *  ezApi.ezclocker.ezUi.ezSetCheckboxValue(elementOrId, checked)
     * @param {string} elementRef
     * @param {boolean} checked
     */
    static setCheckboxValue(elementRef, checked) {
        let element = EzUx.findElement(elementRef);

        if (!EzObject.isValid(element)) {
            globalThis.console.error(`Cannot set checkbox ${elementRef} value to ${checked}: Element does not exist.`);

            return;
        }

        element.checked = EzBoolean.booleanOrFalse(checked);
    }

    /**
     * @static
     * @public @method
     * Adds the error highlight to an input editor
     * Replaces:
     *  ezApi.ezclocker.ezUi.ezShowInputError
     * @param {string} elementRef
     */
    static showInputError(elementRef) {
        let element = EzUx.findElement(elementRef);

        if (!EzObject.isValid(element)) {
            globalThis.console.error(`Cannot show input error for element ${elementRef}: Element does not exist.`);

            return;
        }

        // Class ezInputErrorHighlight is located in ez-inputs.css
        if (!element.classList.contains('ezInputErrorHighlight')) {
            element.classList.add('ezInputErrorHighlight');
        }
    }

    /**
     * @static
     * @public @method
     * Removes the error highlight to an input editor
     * Replaces:
     *  ezApi.ezclocker.ezUi.ezHideInputError(elementOrId)
     * @param {string} elementRef
     */
    static hideInputError(elementRef) {
        let element = EzUx.findElement(elementRef);

        if (!EzObject.isValid(element)) {
            globalThis.console.error(`Cannot hide input error for element ${elementRef}: Element does not exist.`);

            return;
        }

        // Class ezInputErrorHighlight is located in ez-inputs.css
        if (element.classList.contains('ezInputErrorHighlight')) {
            element.classList.remove('ezInputErrorHighlight');
        }
    }

    /**
     * @static
     * @public @method
     * Sets the value of the select input identified by
     * Replaces
     *  ezApi.ezclocker.ezUi.ezSetSelectValue(elementRef, value)
     * @param {string} elementRef
     * @param {*} value
     */
    static setSelectValue(elementRef, value) {
        let element = EzUx.findElement(elementRef);

        if (!EzObject.isValid(element)) {
            globalThis.console.error(`Cannot set select input ${elementRef} value to ${value}: Element does not exist.`);

            return;
        }

        if (EzUx.elementExists(elementRef)) {
            EzUx.setInputValue(elementRef, value);
        } else {
            // Assume it is a JQuery UI selector instead, and use the older jquery
            EzUx.setSelectValue$(elementRef, value);
        }
    }

    /**
     * @static
     * @public @method @statc
     * Sets the value of the select input identified by the provided jquery selector
     * Replaces:
     *  ezApi.ezclocker.ezUi.ezSetSelectValue$(jquerySelector, value)
     * @param {string} jquerySelector
     * @param {*} value
     */
    static setSelectValue$(jquerySelector, value) {
        let jqueryElement = EzUx.findElement$(jquerySelector);

        if (!EzObject.isValid(jqueryElement)) {
            globalThis.console.error(`Cannot set jQuery select input ${jquerySelector} value to ${value}: Element does not exist.`);

            return;
        }

        jqueryElement.val(value);

        jqueryElement.selectmenu('refresh');
    }

    /**
     * @static
     * @public @method
     * Removes the element or element with id from the document.
     * Replaces:
     *  ezApi.ezclocker.ezUi.ezRemoveElement(elementOrId)
     * @param {string} elementRef
     */
    static removeElement(elementRef) {
        let element = EzUx.findElement(elementRef);

        if (!EzObject.isValid(element)) {
            globalThis.console.error(`Cannot remove element ${elementRef}: Element does not exist.`);

            return;
        }

        element.remove();
    }

    /**
     * @static
     * @public @method
     * Selects all the text in an input.
     * Replaces:
     *  ezApi.ezclocker.ezUi.ezSelectAll(id)
     *  ezApi.ezclocker.ezUi.ezInputSelectAll(id)
     *  ezApi.ezclocker.ezUi.ezInputSelectAll$(selector)
     * @param {string} elementRef
     */
    static selectAll(elementRef) {
        let element = EzUx.findElement(elementRef);

        if (!EzObject.isValid(element)) {
            globalThis.console.error(`Cannot select all in input element ${elementRef}: Element does not exist.`);

            return;
        }

        element.focus();

        element.select();
    }
}

/**
 * Alternative name for EzUx
 * Provided to try and avoid issues with typos in the name
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Import with:
 *  import { EzUX } from '/ezlibrary/ux/EzUx.js';
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
export const EzUX = EzUx;
