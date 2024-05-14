import {
    EzBadParamException
} from '/ezlibrary/exceptions/EzExceptions.js';

import { EzStaticClass } from '/ezlibrary/EzStaticClass.js';

import { EzObject } from '/ezlibrary/helpers/EzObject.js';
import { EzBoolean } from '/ezlibrary/helpers/EzBoolean.js';
import { EzNumber } from '/ezlibrary/helpers/EzNumber.js';
import { EzString } from '/ezlibrary/helpers/EzString.js';
import { EzArray } from '/ezlibrary/helpers/EzArray.js';
import { EzRegEx } from '/ezlibrary/helpers/EzRegEx.js';

/*
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    WARNING:
        1) Do not import anything from /ezlibrary/helpers/EzHelpers.js into this module
        2) Do not import the following into this module:
            import { EzApi } from '/public/common/javascript/ezapi.js';
            import { EzUI } from '/public/common/javascript/ezui.js';
            import { ezUI } from '/public/common/javascript/ezui.js';
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

/**
 * @class
 * @extends {EzStaticClass}
 * @description
 * Static class that provides utility methods and properties for generating HTML
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Import with:
 *     import { EzHtml } from '/ezlibrary/helpers/EzHtml.js';
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
export class EzHtml extends EzStaticClass {
    /**
     * @static
     * @public @method
     * Javascript Template String Method
     * Removes all extract space from the provided aTemplateLitteralValue param. Then returns
     * the value with one space in front, once space at end and a line feed.
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * Ouput format: ' ${value_with_extra_space_removed} \n';
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * Example use: EzHTML.template`<h1>Hello!</h1>`;
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * @param {array} aStrings
     * @param {array} aKeys
     * @returns {string}
     * @deprecated
     * Migrate to: EzHtml.build`...`
     */
    static template(aStrings, ...aKeys) {
        let cleanValues = EzString.EMPTY;

        if (EzArray.arrayHasLength(aStrings)) {
            for (let x = 0; x < aStrings.length; x++) {
                let aString = aStrings[x];

                if (EzNumber.isNumber(aString) || EzBoolean.isBoolean(aString)) {
                    aString = aString.toString();
                }

                let aKey = x < aKeys.length
                    ? aKeys[x]
                    : EzString.EMPTY;

                aKey = EzNumber.isNumber(aKey) || EzBoolean.isBoolean(aKey)
                    ? aKey.toString()
                    : EzString.stringOrEmpty(aKey);

                const cleanValue = aString
                    .replace(EzRegEx.MATCH_2_OR_MORE_SPACES, ' ')
                    .replace(EzRegEx.MATCH_ALL_TABS, ' ');

                cleanValues = `${cleanValues}${cleanValue}${aKey}`;
            }
        }

        return `${cleanValues}`;
    }

    /**
     * @static
     * @public @method
     * Javascript Template String Method
     * Removes all extract space from the provided aTemplateLitteralValue param. Then returns
     * the value with one space in front, once space at end and a line feed.
     * -------------------------------------------------------------
     * Ouput format: ' ${value_with_extra_space_removed} \n';
     * -------------------------------------------------------------
     * Example use: EzHTML.template`<h1>Hello!</h1>`;
     * -------------------------------------------------------------
     * @param {array} aStrings
     * @param {array} aKeys
     * @returns {string}
     */
    static build(aStrings, ...aKeys) {
        let cleanValues = EzString.EMPTY;

        if (EzArray.arrayHasLength(aStrings)) {
            for (let x = 0; x < aStrings.length; x++) {
                let aString = aStrings[x];

                if (EzNumber.isNumber(aString) || EzBoolean.isBoolean(aString)) {
                    aString = aString.toString();
                }

                let aKey = x < aKeys.length
                    ? aKeys[x]
                    : EzString.EMPTY;

                aKey = EzNumber.isNumber(aKey) || EzBoolean.isBoolean(aKey)
                    ? aKey.toString()
                    : EzString.stringOrEmpty(aKey);

                const cleanValue = aString
                    .replace(EzRegEx.MATCH_2_OR_MORE_SPACES, ' ')
                    .replace(EzRegEx.MATCH_ALL_TABS, ' ');

                cleanValues = `${cleanValues}${cleanValue}${aKey}`;
            }
        }

        return `${cleanValues}`;
    }

    /**
     * @static
     * @public @method
     * Removes all spaces and line feeds from the provided aTemplateLitteralValue param. Then returns
     * the trimmed value.
     * Result template: '${value_with_no_space_linefeeds}';
     * @param {string} aTemplateLitteralValue
     * @returns {string}
     */
    static buildId(aStrings, ...aKeys) {
        let cleanValues = EzString.EMPTY;

        if (EzArray.arrayHasLength(aStrings)) {
            for (let x = 0; x < aStrings.length; x++) {
                let aString = aStrings[x];

                aString = EzString.trimOrEmpty(
                    !EzString.isString(aString)
                        ? EzObject.assignOrDefault(aString, EzString.EMPTY).toString()
                        : aString);

                let aKey = x < aKeys.length
                    ? aKeys[x]
                    : EzString.EMPTY;

                aKey = EzString.stringOrEmpty(
                    !EzString.isString(aKey)
                        ?
                        EzObject.assignOrDefault(
                            aKey,
                            EzString.EMPTY)
                            .toString()
                        : aKey);

                const cleanLine = `${aString.trimStart().replace(EzRegEx.MATCH_ALL_WHITESPACE_CHARACTERS, '')}${aKey}`.trim();

                cleanValues = `${cleanValues}${cleanLine}`.trim();
            }
        }

        return `${cleanValues}`.trim();
    }

    /**
     * @public @readonly @property
     * Gets an open-ended starting div tag: '<div ';
     * @returns {string}
     */
    static get divStart() {
        return '<div ';
    }

    /**
     * @public @readonly @property
     * Gets the ending div tag: '</div>'
     * @returns {string}
     */
    static get divEnd() {
        return '</div>';
    }

    /**
     * @static
     * @public @method
     * Builds an HTML a element
     * @param {string} id
     * The id is required
     * @param {undefined|null|array} additionalElementAttributes
     * Array of additional attributes to add to the HTML element
     * @param {undefined|null|string} innerHtml
     * HTML/Text to place between the open and close elements.
     */
    static div(id = null, additionalElementAttributes = null, innerHtml = EzString.EMPTY) {
        if (!EzString.hasLength(id)) {
            throw new EzBadParamException(
                'id',
                EzHtml,
                EzHtml.a);
        }

        const additionalElementAttributesHTML = EzArray.hasLength(additionalElementAttributes)
            ? EzHtml.attributeArrayToElementAttributes(additionalElementAttributes)
            : EzString.empty;

        return EzString.hasLength(additionalElementAttributesHTML)
            ? `${EzHtml.divStart}id="${id}" ${additionalElementAttributesHTML}>${EzString.trimOrEmpty(innerHtml)}${EzHtml.divEnd}`
            : `${EzHtml.divStart}id="${id}">${EzString.trimOrEmpty(innerHtml)}${EzHtml.divEnd}`;
    }

    /**
     * @public @readonly @property
     * Gets an open ended starting a (anchor) tag: '<a '
     * @returns {string}
     */
    static get aStart() {
        return '<a ';
    }

    /**
     * @public @readonly @property
     * Gets the closing a (anchor) tag: '</a>'
     * @returns {string}
     */
    static get aEnd() {
        return '</a>';
    }

    /**
     * @static
     * @public @method
     * Builds an HTML a element
     * @param {string} id
     * REQUIRED: HTML element Id for the <a/> tag
     * @param {undefined|null|string} href
     * REQUIRED: default is '#'
     * @param {undefined|null|array} additionalElementAttributes
     * Optional: Array of additional attributes to add to the HTML element
     * @param {string} innerHtml
     * Optional: HTML/Text to place between the open and close elements.
     * If not provided, the HREF value is used instead.
     */
    static a(id, href = '#', additionalElementAttributes = null, innerHtml = null) {
        if (!EzString.hasLength(id)) {
            throw new EzBadParamException(
                'id',
                EzHtml,
                EzHtml.a);
        }

        href = EzString.trimOrEmpty(href);

        innerHtml = EzString.trimOrEmpty(innerHtml);

        if (!EzString.hasLength(href)) {
            href = '#';
        }

        if (!EzString.hasLength(innerHtml)) {
            if ('#' === href) {
                throw new EzBadParamException(
                    'innerHtml',
                    EzHtml,
                    EzHtml.a);
            }

            innerHtml = href;
        }

        const additionalElementAttributesHTML = EzArray.hasLength(additionalElementAttributes)
            ? EzHtml.attributeArrayToElementAttributes(additionalElementAttributes)
            : EzString.empty;

        return EzString.hasLength(additionalElementAttributesHTML)
            ? `${EzHtml.aStart}id="${id}" href="${href}" ${additionalElementAttributesHTML}>${innerHtml}${EzHtml.aEnd}`
            : `${EzHtml.aStart}id="${id}" href="${href}">${innerHtml}${EzHtml.aEnd}`;
    }

    /**
     * @static
     * @public @readonly @property
     * Gets a open-ended button element starting tag: '<button '
     * @returns {string}
     */
    static get buttonStart() {
        return '<button ';
    }

    /**
     * @static
     * @public @readonly @property
     * Gets the button element's ending tag: '</button>'
     * @returns {string}
     */
    static get buttonEnd() {
        return '</button>';
    }

    /**
     * @static
     * @public @method
     * Returns the HTML for a button.
     * Template:
     *     EzHtml.template`
     *         <button id="${id}" class="${classes}" title="${title}" onclick="${onclick}" ${optionalAttributes[0]} ... ${optionalAttributes[N]}>
     *             ${content}
     *         </button>`
     * @param {undefined|null|string} id
     * Required
     * A valid id is required to create the <button> html.
     * @param {undefined|null|string} classes
     * Optional class attribute value.
     * If undefined, null, or empty string the attribute is not added to the <button> tag.
     * @param {undefined|null|string} title
     * Default: ''
     * Optional title attribute value.
     * If undefined, null, or empty string the attribute is not added to the <button> tag.
     * @param {undefined|null|string} onclick
     * Default: ''
     * This is not an event handler!
     * If undefined, null, or empty string the attribute is not added to the <button> tag.
     * @param {undefined|null|array} additionalElementAttributes
     * An array of additional attributes to add to the <button> tag.
     * Example: [
     *     'style="display:none",
     *     "disabled"'
     * ]
     * Default: null
     * @param {undefined|null|string} content
     * Optional content for the button.
     * @returns {string}
     */
    static button(id = null, classes = null, title = null, onclick = null, additionalElementAttributes = null, innerHtml = null) {
        if (!EzString.isString(id)) {
            throw new EzBadParamException(
                'id',
                EzHtml,
                EzHtml.button);
        }

        classes = EzString.trimOrEmpty(classes);

        title = EzString.trimOrEmpty(title);

        onclick = EzString.trimOrEmpty(onclick);

        innerHtml = EzString.trimOrEmpty(innerHtml);

        const classAttributeHTML = EzString.hasLength(classes)
            ? ` class="${classes}"`
            : EzString.EMPTY;

        const titleAttributeHTML = EzString.hasLength(title)
            ? ` title="${title}"`
            : EzString.EMPTY;

        const onClickAttribuetHtml = EzString.hasLength(onclick)
            ? ` onclick="${onclick}"`
            : EzString.EMPTY;

        const additionalElementAttributesHTML = EzArray.hasLength(additionalElementAttributes)
            ? ` ${EzHtml.attributeArrayToElementAttributes(additionalElementAttributes)}`
            : EzString.EMPTY;

        const elementAttributes = `id="${id}"${classAttributeHTML}${titleAttributeHTML}${onClickAttribuetHtml}${additionalElementAttributesHTML}`;

        return `${EzHtml.buttonStart}${elementAttributes}>${innerHtml}${EzHtml.buttonEnd}`;
    }

    /**
     * @static
     * @public @method
     * Transforms an array of HTML element attributes to a string of attributes that
     * can then get added to an HTML template line.
     * Example:
     * attributesList = [
     *     `class="${MyClassName}"',
     *     'onclick="ezApi.ezclocker.ezApi.ezToJson(aObject)"'
     * ]
     *
     * Will transform to:
     * 'class="${MyClassName}" onclick="ezApi.ezclocker.ezApi.ezToJson(aObject)"'
     * @param {array} attributes
     * @returns {string}
     */
    static attributeArrayToElementAttributes(elementAttributes) {
        let elementAttributesHTML = EzString.EMPTY;

        if (EzArray.hasLength(elementAttributes)) {
            for (const attributeHTML of elementAttributes) {
                if (EzString.hasLength(attributeHTML)) {
                    elementAttributesHTML = `${elementAttributesHTML} ${attributeHTML}`.trim();
                }
            }
        }

        return elementAttributesHTML;
    }

    /**
     * @static
     * @public @method
     * Replaces HTML special character with their HTML codes
     * Convenience method that forwards to EzString.simpleEncodeHtml
     * @param {string} value
     * @returns {string}
     * @deprecated
     * Migrate to: EzString.htmlEncode(...)
     */
    static simpleEncodeHtml(value) {
        return EzHtml.htmlEncode(value);
    }

    /**
     * @static
     * @public @method
     * Encodes html characters in the provided value.
     * Convenience method that forwards to EzString.encodeHtml
     * @param {string} value
     * @returns {string}
     * @deprecated
     * Migrate to: EzString.htmlEncode(...)
     */
    static encodeHtml(value) {
        return EzString.htmlEncode(value);
    }

    /**
     * @static
     * @public @method
     * Decodes html characters in the provided value.
     * Convenience method that forwards to EzString.decodeHtml
     * @param {string} value
     * @returns {string}
     * @deprecated
     * Migrate to: EzString.htmlDecode(...)
     */
    static decodeHtml(value) {
        return EzString.htmlDecode(value);
    }
}
