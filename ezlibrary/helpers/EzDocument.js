import {
    EzException,
    EzBadParamException
} from '/ezlibrary/exceptions/EzExceptions.js';

import { EzStaticClass } from '/ezlibrary/EzStaticClass.js';

import { EzObject } from '/ezlibrary/helpers/EzObject.js';
import { EzString } from '/ezlibrary/helpers/EzString.js';
import { EzFunction } from '/ezlibrary/helpers/EzFunction.js';

/*
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    ENGINEERING NOTES
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    DO NOT IMPORT THE FOLLOWING INTO THIS CLASS:
        import { <anything> } from '/ezlibrary/helpers/EzHelpers.js'
        import { EzApi } from '/public/common/javascript/ezapi.js';
        import { EzUI } from '/public/common/javascript/ezui.js';
        import { ezUI } from '/public/common/javascript/ezui.js';
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

/**
 * @class
 * @extends {EzStaticClass}
 * @description
 * Provides HTML document manipulation utility methods.
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Import into non-helper classes with:
 *     import {
 *         // Comment out or remove the helpers you do not use
 *         // EzObject,
 *         // EzBoolean,
 *         // EzNumber,
 *         // EzFloat,
 *         // EzString,
 *         // EzArray,
 *         // EzUrl,
 *         // EzHtml,
 *         // EzFunction,
 *         // EzJson,
 *         // EzConsole,
 *         // EzAsync,
 *         // EzPromise,
 *         EzDocument
 *     } from '/ezlibrary/helpers/EzHelpers.js';
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Import into another helper classes with:
 *     import { EzDocument } from '/ezlibrary/helpers/EzDocument.js';
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Static access:
 *     EzDocument.{property or method}
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
export class EzDocument extends EzStaticClass {
    /*
        -----------------------------------------------------------------
        Element Lookup Helpers
        -----------------------------------------------------------------
            * EzElement.window
            * EzElement.document
            * EzElement.html
            * EzElement.body
            * EzElement.head
            * EzElement.title
            * EzElement.elementById(elementIdOrTagName)
        -----------------------------------------------------------------
    */

    /**
     * @static
     * @public @readonly @property
     * Gets the browser document's window reference.
     * @return {object}
     */
    static get window() {
        return globalThis.window;
    }

    /**
     * @static
     * @public @readonly @property
     * Gets the browser's document reference.
     * @return {object}
     */
    static get document() {
        return globalThis.window.document;
    }

    /**
     * @static
     * @public @readonly @property
     * Gets the browser's document.html reference.
     * @return {object}
     */
    static get html() {
        return globalThis.window.document.html;
    }

    /**
     * @static
     * @public @readonly @property
     * Gets the browser's document.body reference.
     * @return {object}
     */
    static get body() {
        return globalThis.window.document.body;
    }

    /**
     * @static
     * @public @readonly @property
     * Gets the browser's document.head reference.
     * @return {object}
     */
    static get head() {
        return globalThis.window.document.head;
    }

    /**
     * @static
     * @public @readonly @property
     * Gets the browser's document.title reference.
     * @return {object}
     */
    static get title() {
        return globalThis.window.document.title;
    }

    /**
     * @static
     * @public @element
     * Returns the element associated with the provided elementId OR
     * the global element named.
     * Global elements: window, document, body, head, title
     * @returns {null|object}
     * Returns the element if it exists, null otherwise.
     */
    static elementById(elementIdOrTagName) {
        if (!EzString.hasLength(elementIdOrTagName)) {
            throw new EzBadParamException(
                'elementIdOrTagName',
                EzDocument,
                EzDocument.elementById);
        }

        if ('window' === elementIdOrTagName) {
            return EzDocument.window;
        }

        if ('html' === elementIdOrTagName) {
            return EzDocument.html;
        }

        if ('document' === elementIdOrTagName) {
            return EzDocument.document;
        }

        if ('body' === elementIdOrTagName) {
            return EzDocument.body;
        }

        if ('head' === elementIdOrTagName) {
            return EzDocument.head;
        }

        if ('title' === elementIdOrTagName) {
            return EzDocument.title;
        }

        // If the elementOrId is an object, assume it is an HTML element and return it.
        // Otherwise, look up the HTML element by id and return it.
        return document.getElementById(elementIdOrTagName);
    }

    /*
        -----------------------------------------------------------------
        Element Visibility/Availability Helpers
        -----------------------------------------------------------------
             * elementExists(elementId)
             * showElement(elementId, optionalDisplayStyle)
             * hideElement(elementId)
             * removeElement(elementId)
         -----------------------------------------------------------------
     */

    static elementExists(elementId) {
        return EzString.hasLength(elementId) &&
            EzObject.isValid(EzDocument.elementById(elementId));
    }

    /**
     * @static
     * @private @method
     * Remvoes the old ezClocker hidden classes from the element and instead
     * sets its display value to 'none'
     * @param {element}
     */
    static #ezRemoveOldHiddenClassesFromElement(element) {
        if (!EzObject.isValid(element)) {
            // No element to remove classes on
            return;
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
    }

    /**
     * @static
     * @private @method
     * Returns the display style to use when showing an element
     * @param {object} element
     * @param {undefined|null|string} optionalDisplayStyle
     * @returns {string}
     */
    static #ezDetermineShowDisplayStyleForElement(element, optionalDisplayStyle) {
        if (EzObject.isValid(element)) {

        if (EzString.hasLength(optionalDisplayStyle)) {
                return optionalDisplayStyle;
            }

            if (EzString.hasLength(element?.ezDisplay)) {
                return element.ezDisplay;
            }

            if ('DIV' === element?.tagName.toUpperCase()) {
                return 'block';
            }

            if ('TABLE' === element?.tagName.toUpperCase()) {
                return 'table';
            }
        }

        return 'initial';
    }

    /**
     * @static
     * @public @method
     * Shows the element or element associated by the provided id
     * @param {string} elementId
     * @param {null|string} optionalDisplayStyle
     */
    static showElement(elementId, optionalDisplayStyle) {
        const element = EzDocument.elementById(elementId);

        if (!EzObject.isValid(element)) {
            return;
        }

        if ('none' !== element.style.display) {
            // already visible
            return;
        }

        EzDocument.#ezRemoveOldHiddenClassesFromElement(element);

        element.style.display = EzDocument.#ezDetermineShowDisplayStyleForElement(element, optionalDisplayStyle);
    }

    /**
     * @static
     * @public @method
     * Hides the element or associated by the provided id
     * @param {Object|String} elementOrId
     * @returns {Object|null}
     * Returns the element (if exists)
     */
    static hideElement(elementId) {
        const element = EzDocument.elementById(elementId);

        if (!EzObject.isValid(element)) {
            throw new EzException(`Document HTML element with id=${elementId} does not exist.`);
        }

        const displayStyle = getComputedStyle(element, null).display;

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
     * Removes the document's HTML element associated with the provided elementId
     * @param {string} elemetnId
     */
    static removeElement(elementId) {
        const element = EzDocument.elementById(elementId);

        if (!EzObject.isValid(element)) {
            throw new EzException(`Document HTML element with id=${elementId} does not exist.`);
        }

        element.remove();
    }

    /*
        -----------------------------------------------------------------
        Element State Manipulation Helpers
        -----------------------------------------------------------------
            * EzElement.enableElement(elementId)
            * EzElement.disableElement(elementId)
            * EzElement.focusElement(elementId)
        -----------------------------------------------------------------
    */

    /**
     * @static
     * @public @method
     * Enables the document's HTML element associated with the provided elementId
     * @param {string} elemetnId
     */
    static enableElement(elementId) {
        const element = EzDocument.elementById(elementId);

        if (!EzObject.isValid(element)) {
            throw new EzException(`Document HTML element with id=${elementId} does not exist.`);
        }

        element.disabled = false;
    }

    /**
     * @static
     * @public @method
     * Disables the document's HTML element associated with the provided elementId
     * @param {string} elemetnId
     */
    static disableElement(elementId) {
        const element = EzDocument.elementById(elementId);

        if (!EzObject.isValid(element)) {
            throw new EzException(`Document HTML element with id=${elementId} does not exist.`);
        }

        element.disabled = true;
    }

    /**
     * @static
     * @public @method
     * Sets focus to the document's HTML element associated with the provided elementId
     * @param {string} elemetnId
     */
    static focusElement(elementId) {
        const element = EzDocument.elementById(elementId);

        if (!EzObject.isValid(element)) {
            throw new EzException(`Document HTML element with id=${elementId} does not exist.`);
        }

        if (EzFunction.isFunction(element.focus)) {
            element.focus();
        }
    }

    /*
        -----------------------------------------------------------------
        Element InnerHtml Manipulation Helpers
        -----------------------------------------------------------------
            * EzElement.setElementContent(elementId, content)
            * EzElement.prependElementContent(elementId, content)
            * EzElement.getElementContent(elementId)
        -----------------------------------------------------------------
    */

    /**
     * @static
     * @public @method
     * Sets the innerHtml of the document's HTML element associated with the provided elementId equal to the provided content
     * @param {string} elemetnId
     * @param {undefined|null|string} content
     * Default: ''
     */
    static setElementContent(elementId, content = '') {
        const element = EzDocument.elementById(elementId);

        if (!EzObject.isValid(element)) {
            throw new EzException(`Document HTML element with id=${elementId} does not exist.`);
        }

        element.innerHTML = content;
    }

    /**
     * @static
     * @public @method
     * Sets focus to the document's HTML element associated with the provided elementId
     * @param {string} elemetnId
     * @param {undefined|null|string} content
     * Default: ''
     */
    static prependElementContent(elementId, content = '') {
        const element = EzDocument.elementById(elementId);

        if (!EzObject.isValid(element)) {
            throw new EzException(`Document HTML element with id=${elementId} does not exist.`);
        }

        element.insertAdjacentHTML(
            'afterbegin',
            content);
    }

    /**
     * @static
     * @public @method
     * Sets focus to the document's HTML element associated with the provided elementId
     * @param {string} elemetnId
     */
    static getElementContent(elementId) {
        const element = EzDocument.elementById(elementId);

        if (!EzObject.isValid(element)) {
            throw new EzException(`Document HTML element with id=${elementId} does not exist.`);
        }

        return EzString.stringOrEmpty(element.innerHTML);
    }

    /*
        -----------------------------------------------------------------
        Element Class and Style Manipulation Helpers
        -----------------------------------------------------------------
            * EzElement.setElementCSSProp(elementId, cssPropertyName, cssPropertyValue)
            * EzElement.addElementClass(elementId, className)
            * EzElement.removeElementClass(elementId, className)
        -----------------------------------------------------------------
    */

    /**
     * @static
     * @public @method
     * Adds a CSS property to the element
     * The element's style object stores CSS properties by, but the name
     * is camel case and does not contain the dash (as what could be used in a CSS file).
     * This method will auto-magiclly convert a normal CSS property name with dashes
     * to the camel case version for you. However, you may pass in the camel case property
     * name if you prefer.
     * @param {string} elemetnId
     * @param {string} cssPropertyname
     * @param {*} cssPropertyValue
     */
    static setElementCSSProp(elementId, cssPropertyName, cssPropertyValue) {
        if (!EzString.hasLength(cssPropertyName)) {
            throw new EzBadParamException(
                'cssPropertyName',
                EzDocument,
                EzDocument.addElementCSSProp);
        }

        const element = EzDocument.elementById(elementId);

        if (!EzObject.isValid(element)) {
            throw new EzException(`Document HTML element with id=${elementId} does not exist.`);
        }

        if (0 >= cssPropertyName.indexOf('-')) {
            // Converting to camel case if a dash
            // is detected.

            let nextUpper = false;

            let camelCasedCssPropertyName = EzString.EMPTY;

            for (const aChar of cssPropertyName) {
                if (nextUpper) {
                    camelCasedCssPropertyName = camelCasedCssPropertyName + aChar.toUpperCase();

                    nextUpper = false;
                } else if ('-' === aChar) {
                    nextUpper = true;
                } else {
                    camelCasedCssPropertyName = camelCasedCssPropertyName + aChar;
                }
            }

            cssPropertyName = camelCasedCssPropertyName;
        }

        element.style[cssPropertyName] = cssPropertyValue;
    }

    /**
     * @static
     * @public @method
     * Adds the provide className class to the document's element associated with the provided elementId.
     * @param {string} elementId
     * @param {string} className
     */
    static addElementClass(elementId, className) {
        if (!EzString.hasLength(className)) {
            throw new EzBadParamException(
                'className',
                EzDocument,
                EzDocument.addElementClass);
        }

        const element = EzDocument.elementById(elementId);

        if (!EzObject.isValid(element)) {
            throw new EzException(`Document HTML element with id=${elementId} does not exist.`);
        }

        if (EzString.hasLength(className) && !element.classList.contains(className)) {
            element.classList.add(className);
        }
    }


    /**
     * @static
     * @public @method
     * Removes the provide className class to the document's element associated with the provided elementId.
     * @param {string} elementId
     * @param {string} className
     */
    static removeElementClass(elementId, className) {
        if (!EzString.hasLength(className)) {
            throw new EzBadParamException(
                'className',
                EzDocument,
                EzDocument.addElementClass);
        }

        const element = EzDocument.elementById(elementId);

        if (!EzObject.isValid(element)) {
            throw new EzException(`Document HTML element with id=${elementId} does not exist.`);
        }

        if (EzString.hasLength(className) && element.classList.contains(className)) {
            element.classList.remove(className);
        }
    }
}
