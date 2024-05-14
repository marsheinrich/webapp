import { EzStaticClass } from '/ezlibrary/EzStaticClass.js';

import { EzObject } from '/ezlibrary/helpers/EzObject.js';

/*
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    ENGINEERING NOTES
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    !! DO NOT IMPORT THE FOLLOWING INTO THIS CLASS !!
    -----------------------------------------------------------------
    import { EzApi } from '/public/common/javascript/ezapi.js';
    import { EzUI } from '/public/common/javascript/ezui.js';
    import { ezUI } from '/public/common/javascript/ezui.js';
    import { EzString } from '/ezlibrary/helpers/EzString.js';
    import { EzHtml } from '/ezlibrary/helpers/EzHtml.js';
    import { EzJson } from '/ezlibrary/helpers/EzJson.js';
    import { EzUrl } from '/ezlibrary/helpers/EzUrl.js';
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

/**
 * @class
 * @extends {EzStaticClass}
 * @description
 * Static class that provides utility methods and properties for Booleans
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Import with:
 *     import {
 *         // other healper classes ...,
 *         EzBoolean
 *     } from '/ezlibrary/helpers/EzHelpers.js';
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Static class reference: EzBoolean
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
export class EzBoolean extends EzStaticClass {
    /**
     * @static
     * @public @method
     * Transforms the provided value to a boolean value.
     * @returns {boolean}
     */
    static toBoolean(value) {
        if (undefined == value || null == value) {
            return false;
        }

        if (EzBoolean.isBoolean(value)) {
            return value;
        }

        if ('string' === typeof value && 0 != value.length) {
            switch (value.toUpperCase()) {
                case '0':
                case 'NO':
                case 'FALSE':
                case 'F':
                case 'N':
                    return false;
                case '1':
                case 'YES':
                case 'TRUE':
                case 'T':
                case 'Y':
                    return true;
                default:
                    throw new EzException(`Unable to transform value ${value} to a boolean value.`);
            }
        }

        return 'number' === typeof value
            ? 0 < value
            : true;
    }


    /**
     * @static
     * @public @method
     * Determines if the passed object is a boolean type.
     * @param {*} aObject
     * @returns {boolean}
     */
    static isBoolean(aObject) {
        return undefined !== aObject && null !== aObject &&
            ('boolean' === typeof aObject || '[object Boolean]' === EzObject.getObjectType(aObject));
    }

    /**
     * @static
     * @public @method
     * Returns true if the boolean value is true. Otherwise, returns false if the value is NOT a boolean at all OR
     * is actually false.
     * @param {boolean} aValue
     * @returns {boolean}
     */
    static isTrue(aValue) {
        return undefined !== aValue && null !== aValue &&
            ('boolean' === typeof aValue || '[object Boolean]' === EzObject.getObjectType(aValue)) &&
            true === aValue;
    }

    /**
     * @static
     * @public @method
     * Returns true if the boolean value is false. Otherwise, returns false if the value is NOT a boolean at all OR
     * is actually true.
     * @param {boolean} aValue
     * @returns {boolean}
     */
    static isFalse(aValue) {
        return undefined !== aValue && null !== aValue &&
            ('boolean' === typeof aValue || '[object Boolean]' === EzObject.getObjectType(aValue)) &&
            false === aValue;
    }

    /**
     * @static
     * @public @method
     * Returns true if all of the provided boolean arguments are true;
     * @param {*} arguments
     * @returns {boolean}
     */
    static allTrue(/* arguments */) {
        for (let argument of arguments) {
            if (EzBoolean.isBoolean(argument) && EzBoolean.isFalse(argument)) {
                return false;
            }
        }

        return true;
    }

    /**
     * @static
     * @public @method
     * Returns true if all of the provided boolean arguments are false;
     * @returns {boolean}
     */
    static allFalse() {
        for (let argument of arguments) {
            if (EzBoolean.isBoolean(argument) && EzBoolean.isTrue(argument)) {
                return false;
            }
        }

        return true;
    }

    /**
     * @static
     * @public @method
     * Returns true if ANY of the provided boolean arguments is true
     * @returns {boolean}
     */
    static anyTrue() {
        for (let argument of arguments) {
            if (EzBoolean.isBoolean(argument) && EzBoolean.isTrue(argument)) {
                return true;
            }
        }

        return false;
    }

    /**
     * @static
     * @public @method
     * Returns true if ANY of the provided boolean arguments is false
     * @returns {boolean}
     */
    static anyFalse() {
        for (let argument of arguments) {
            if (EzBoolean.isBoolean(argument) && EzBoolean.isFalse(argument)) {
                return true;
            }
        }

        return false;
    }

    /**
     * @static
     * @public @method
     * If the value is a boolean, the value is returned.
     * Otherwise, false is returned.
     * @param {undefined|null|boolean|*} value
     * @returns {boolean}
     */
    static booleanOrFalse(value) {
        return EzBoolean.isBoolean(value)
            ? value
            : false;
    }

    /**
     * @static
     * @public @method
     * If the value is a boolean, the value is returned.
     * Otherwise, true is returned.
     * @param {undefined|null|boolean|*} value
     * @returns {boolean}
     */
    static booleanOrTrue(value) {
        return EzBoolean.isBoolean(value)
            ? value
            : true;
    }

    /**
     * @static
     * @public @method
     * If the value is a boolean, the value is returned.
     * Otherwise, null is returned.
     * @param {undefined|null|boolean|*} value
     * @returns {boolean}
     */
    static booleanOrNull(value) {
        return EzBoolean.isBoolean(value)
            ? value
            : null;
    }

    /**
     * @static
     * @public @method
     * If the value is a boolean, the value is returned.
     * Otherwise, the provided defaultValue is returned.
     * @param {undefined|null|boolean|*} value
     * @param {undefined|null|boolean|*} defaultValue
     * @returns {boolean}
     */
    static booleanOrDefault(value, defaultValue) {
        return EzBoolean.isBoolean(value)
            ? value
            : defaultValue;
    }

    /**
     * @static
     * @public @method
     * Evaluates all the provided boolean expressions and if all evaluate to true, then true is returned.
     * Otherwise, false is returned
     * @param {boolean|array} booleanExpressions
     */
    static requireAll(...booleanExpressions) {
        for (let booleanExpression of booleanExpressions) {
            if (!booleanExpression) {
                return false;
            }
        }

        return true;
    }
}
