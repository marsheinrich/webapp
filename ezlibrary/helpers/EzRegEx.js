/*
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    ENGINEERING NOTES
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    DO not import/export this class into/from /ezlibrary/helpers/EzHelpers.js
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    Do not import the following into this class:
        import { EzApi } from '/public/common/javascript/ezapi.js'
        import { EzUI } from '/public/common/javascript/ezui.js'
        import { ezUI } from '/public/common/javascript/ezui.js'
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    Do not import the following helper classes into this class:
        import { EzArray } from '/ezlibrary/helpers/EzArray.js'
        import { EzAsync } from '/ezlibrary/helpers/EzAsync.js'
        import { EzBoolean } from '/ezlibrary/helpers/EzBoolean.js'
        import { EzChars } from '/ezlibrary/helpers/EzChars.js'
        import { EzConsole } from '/ezlibrary/helpers/EzConsole.js'
        import { EzDateTime } from '/ezlibrary/helpers/EzDateTime.js'
        import { EzDocument } from '/ezlibrary/helpers/EzDocument.js'
        import { EzError } from '/ezlibrary/helpers/EzError.js'
        import { EzFloat } from '/ezlibrary/helpers/EzFloat.js'
        import { EzFunction } from '/ezlibrary/helpers/EzFunction.js'
        import { * } from '/ezlibrary/helpers/EzHelpers.js'
        import { EzHtml } from '/ezlibrary/helpers/EzHtml.js'
        import { EzHtmlCharacterCode } from '/ezlibrary/helpers/EzHtmlCharacterCode.js'
        import { EzHttp } from '/ezlibrary/helpers/EzHttp.js'
        import { EzJson } from '/ezlibrary/helpers/EzJson.js'
        import { EzNumber } from '/ezlibrary/helpers/EzNumber.js'
        import { EzObject } from '/ezlibrary/helpers/EzObject.js'
        import { EzPromise } from '/ezlibrary/helpers/EzPromise.js'
        import { EzString } from '/ezlibrary/helpers/EzString.js'
        import { EzUrl } from '/ezlibrary/helpers/EzUrl.js'
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

import { EzStaticClass } from '/ezlibrary/EzStaticClass.js';

/**
 * @class
 * @extends EzStaticClass
 * @description
 * Provides commonly used regular expression constants.
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Import into other helper classes (that allow it) with:
 *     import { EzRegEx } from '/ezlibrary/helpers/EzRegEx.js';
 *  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Static access:
 *     EzRegEx.{property or method}
 *  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
export class EzRegEx extends EzStaticClass {
    /**
     * @static
     * @public @readonly @property
     * Gets a regular expression to match two or more sequential spaces.
     * @returns {object}
     * Returns regular expression: /( {2})+/g
     */
    static get MATCH_2_OR_MORE_SPACES() {
        return /( {2})+/g;
    }

    /**
     * @static
     * @public @readonly @property
     * Gets a regular expression to match all tab characters
     * @returns {object}
     * Returns regular expression: /\t+/g
     */
    static get MATCH_ALL_TABS() {
        return /\t+/g;
    }

    /**
     * @static
     * @public @readonly @property
     * Gets a regular expression to match all line feed characters
     * @returns {object}
     * Returns regular expression: /\n+/g
     */
    static get MATCH_ALL_LINEFEEDS() {
        return /\n+/g;
    }

    /**
     * @static
     * @public @readonly @property
     * Gets a regular expression to match all charrage returns and tabs feed characters
     * @returns {object}
     * Returns regular expression: /[\r\t]+/g
     */
    static get MATCH_ALL_RETURNS_AND_TABS() {
        return /[\r\t]+/g;
    }

    /**
     * @static
     * @public @readonly @property
     * Gets a regular expression to match all charrage returns and tabs feed characters
     * @returns {object}
     * Returns regular expression: /[\r\t]+/g
     */
    static get MATCH_ALL_TAB_LINEFEED_RETURN() {
        return /[\t\n\r]+/g;
    }

    /**
     * @static
     * @public @readonly @property
     * Gets a regular expression to match all 'supported' control characters
     * Supported controller characters:
     * 1) Horizontal Tabulator: \t
     * 2) New Line: \n
     * 3) Carriage Return: \r
     * 4) Form Feed: \f
     * 5) Vertical Tabulator: \v
     * 6) Backspace: \b
     * @returns {object}
     * Returns regular expression: /[\b\t\n\r\f\v]+/g
     */
    static get MATCH_CONTROL_CHARACTERS() {
        return /[\b\t\n\r\f\v]+/g;
    }

    /**
     * @static
     * @public @readonly @property
     * Gets the regular expression to match all white space characters
     * White space characters include all control characters and the space character.
     * @returns {object}
     * Returns regular expression: /\s+/g
     */
    static get MATCH_ALL_WHITESPACE_CHARACTERS() {
        return /\s+/g;
    }

    /**
     * @static
     * @public @readonly @property
     * Gets the regular expression to match only the following characters:
     * 1) Space: ' '
     * 2) Horizontal Tabulator: '\t'
     * 3) New Line: '\n'
     * 4) Carriage Return: '\r'
     * @returns {object}
     * Returns regular expression: /[ \t\n\r]+/g
     */
    static get MATCH_SPACE_N_R_T() {
        return /[ \t\n\r]+/g;
    }

    /**
     * @static
     * @public @readonly @property
     * Gets a regular expression to match all:
     * 1) Two or more sequential spaces: '  '
     * 2) Horizontal Tabulator: '\t'
     * 3) New Line: '\n'
     * 4) Carriage Return: '\r'
     * @returns {object}
     * Returns regular expression: /( {2})+[\t\n\r]+/g
     */
    static get MATCH_ALL_2SPACES_TAB_LINEFEED_RETURN() {
        return /( {2})+[\t\n\r]+/g;
    }

    /**
     * @static
     * @public @readonly @property
     * Gets a regular expression to match all the following characters:
     * 1) Bang: '!'
     * 2) Tick: '\''
     * 3) Open Parenthesis: '('
     * 4) Close Parenthesis: ')'
     * 5) Astrix: '*'
     * Example:
     *  "WOW! 'that' was amazing (I think)".replaceAll(EzRegEx.MATCH_ALL_2SPACES_TAB_LINEFEED_RETURN, '');
     *  Output: 'WOW that was amazing I think'
     * @returns {object}
     * Returns regular expression: /[!'()*]/g
     */
    static get MATCH_ALL_BANG_TICK_PARENTHESIS_ASTRIX() {
        return /[!'()*]/g;
    }

    /**
     * @static
     * @public @readonly @property
     * Gets a regular expression to match all ampersand ('&') characters.)
     * @returns {object}
     * Returns regular expression: /&/g
     */
    static get MATCH_AMPERSAND() {
        return /&/g;
    }

    /**
     * @static
     * @public @readonly @property
     * Gets a regular expression to match all double quote ('"') characters.)
     * @returns {object}
     * Returns regular expression: /"/g
     */
    static get MATCH_ALL_DOUBLE_QUOTE() {
        return /"/g;
    }

    /**
     * @static
     * @public @readonly @property
     * Gets a regular expression to match all back-slash ('\') characters
     * @returns {object}
     * Returns regular expression: /\//
     */
    static get MATCH_ALL_BACK_SLASH() {
        return /\//g;
    }

    /**
     * @static
     * @public @readonly @property
     * Gets a regular expression to match all ampersand ('<') characters.)
     * @returns {object}
     * Returns regular expression: /</g
     */
    static get MATCH_ALL_LESS_THAN() {
        return /</g;
    }

    /**
     * @static
     * @public @readonly @property
     * Gets a regular expression to match all ampersand ('>') characters.)
     * @returns {object}
     * Returns regular expression: />/g
     */
    static get MATCH_ALL_GREATER_THAN() {
        return />/g;
    }

    /**
     * @static
     * @public @readonly @property
     * Gets a regular expression to match all ampersand ('\'') characters.)
     * @returns {object}
     * Returns regular expression: /'/g
     */
    static get MATCH_ALL_SINGLE_QUOTE() {
        return /'/g;
    }

    /**
     * @static
     * @public @readonly @property
     * Gets a regular expression to match all ampersand ('@') characters.)
     * @returns {object}
     * Returns regular expression: /@/g
     */
    static get MATCH_ALL_AT_SYMBOL() {
        return /@/g;
    }

    /**
     * @static
     * @public @readonly @property
     * Gets a regular expression to match all ampersand ('!') characters.)
     * @returns {object}
     * Returns regular expression: /!/g
     */
    static get MATCH_ALL_BANG() {
        return /!/g;
    }

    /**
     * @static
     * @public @readonly @property
     * Gets a regular expression to match all ampersand ('=') characters.)
     * @returns {object}
     * Returns regular expression: /=/g
     */
    static get MATCH_ALL_EQUAL() {
        return /=/g;
    }

    /**
     * @static
     * @public @readonly @property
     * Gets a regular expression to match all ampersand ('-') characters.)
     * @returns {object}
     * Returns regular expression: /-/g
     */
    static get MATCH_ALL_DASH() {
        return /-/g;
    }

    /**
     * @static
     * @public @readonly @property
     * Gets a regular expression to match all ampersand ('`') characters.)
     * @returns {object}
     * Returns regular expression: /`/g
     */
    static get MATCH_ALL_BACK_TICK() {
        return /`/g;
    }

}
