import { EzBadParamException } from '/ezlibrary/exceptions/EzBadParamException.js';

import { EzStaticClass } from '/ezlibrary/EzStaticClass.js';

import { EzObject } from '/ezlibrary/helpers/EzObject.js';

/*
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    ENGINEERING NOTES
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        1) Do not import anything from /ezlibrary/helpers/EzHelpers.js into this module
        2) Do not import the following into this module:
            import { EzApi } from '/public/common/javascript/ezapi.js';
            import { EzUI } from '/public/common/javascript/ezui.js';
            import { ezUI } from '/public/common/javascript/ezui.js';
            import { EzFloat } from '/ezlibrary/helpers/EzFloat.js';
            import { EzString } from '/ezlibrary/helpers/EzString.js';
            import { EzArray } from '/ezlibrary/helpers/EzArray.js';
            import { EzHtml } from '/ezlibrary/helpers/EzHtml.js';
            import { EzFunction } from '/ezlibrary/helpers/EzFunction.js';
            import { EzJson } from '/ezlibrary/helpers/EzJson.js';
            import { EzConsole } from '/ezlibrary/helpers/EzConsole.js';
            import { EzAsync } from '/ezlibrary/helpers/EzAsync.js';
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

/**
 * @class
 * @extends {EzStaticClass}
 * @description
 * Static class that provides utility methods and properties for numbers
 * ---------------------------------------------------------------------------
 * Import with:
 *     import { EzNumber } from '/ezlibrary/helpers/EzNumber.js';
 * ---------------------------------------------------------------------------
 * Static Access Only:
 *     EzNumber.{property or method}
 * ---------------------------------------------------------------------------
 */
export class EzNumber extends EzStaticClass {
    /**
     * @static
     * @public @readonly @property
     * Returns the number zero.
     * @returns {number}
     */
    static get ZERO() {
        return 0;
    }

    /**
     * @static
     * @public @method
     * Wraps the Javascript isNaN function as an alternative method.
     * Returns true if the provided value equals NaN or is not a number, false otherwise.
     * @returns {boolean}
     * @deprecated
     * Migrate to either Javascript's own isNaN(...) method or EzNumber.isNaN(...)
     */
    static isNAN(value) {
        return EzNumber.isNaN(value);
    }

    /**
     * @static
     * @public @method
     * Wraps the Javascript isNaN function as an alternative method.
     * Returns true if the provided value equals NaN or is not a number, false otherwise.
     * @returns {boolean}
     * @deprecated
     * Migrate to: globalThis.isNaN(...) (the global Javascript provided function)
     */
    static isNaN(value) {
        return undefined !== value && null !== value && 'number' === typeof value
            ? globalThis.isNaN(value)
            : false;
    }

    /**
     * @static
     * @public @method
     * Determines if the passed value is a of type number.
     * @param {*} value
     * @returns {boolean}
     */
    static isNumber(value) {
        return undefined !== value && null !== value && 'number' === typeof value && !isNaN(value)
    }

    /**
     * @static
     * @public @method
     * Returns the provided value if it is a valid number, Otherwise, returns null
     * @param {*} value
     * @returns {number|null}
     */
    static numberOrNull(value) {
        return EzNumber.isNumber(value)
            ? value
            : null;
    }

    /**
     * @static
     * @public @method
     * Returns the provided value as a string. If the provided value is not a number, 'NaN' is returned.
     * @param {*|number} value
     * @returns {string}
     * @deprecated
     * WILL REMOVE IN A FUTURE RELEASE
     * Migrate to: EzNumber.asString(value) to avoid confusion with the built-in toString.
     */
    static toString(value) {
        // Showing an error to force updating all uses so this method can get removed.
        let deprecationError = new Error(
            `EzNumber.toString(...) is now DEPRECATED and will soon get removed in a future release.` +
            `Please switch to EzNumber.asString(...) from EzNumber.toString(...) as soon as possible to avoid ` +
            `confusion with the default Javascript toString() method.`);

        console.error(`${deprecationError?.message} [Stack trace: ${deprecationError?.stack}]`);

        if ('string' === typeof value) {
            return value;
        }

        if (isNaN(value)) {
            return 'NaN';
        }

        return EzNumber.isNumber(value)
            ? value.toString()
            : 'NaN';
    }

    /**
     * @static
     * @public @method
     * Returns the provided value as a string. If the provided value is not a number, 'NaN' is returned.
     * @param {*|number} value
     * @returns {string}
     */
    static asString(value) {
        if ('string' === typeof value) {
            return value;
        }

        if (isNaN(value)) {
            return 'NaN';
        }

        return EzNumber.isNumber(value)
            ? value.toString()
            : 'NaN';
    }

    /**
     * @static
     * @public @method
     * Returns the provided value if it is a valid number, Otherwise, returns null
     * @param {*} value
     * @returns {number|null}
     */
    static numberOrNaN(value) {
        return EzNumber.isNumber(value)
            ? value
            : NaN;
    }

    /**
     * @static
     * @public @method
     * Returns the provided value if it is a valid number, Otherwise, returns the provided aDefault value.
     * @param {*} value
     * @param {number|null} aDefault
     * @returns {number|{aDefault}}
     */
    static numberOrDefault(value, aDefault) {
        return EzNumber.isNumber(value)
            ? value
            : aDefault;
    }

    /**
     * @static
     * @public @method
     * Converts a string value to a Javascript number (using parseInt)
     * If the stringValue is null, undefined, or not a number, then NaN is returned.
     * @param {undefined|null|string} stringValue
     * @param {undefined|null|number} radix
     * A value of undefined, null, NaN or zero will result in a default radix of 10 (decimal).
     * An integer between 2 and 36 that represents the radix (the base in mathematical numeral systems) of the string.
     * Default: 10
     * @returns {number}
     */
    static asNumber(stringValue, radix = 10) {
        if (undefined == stringValue || null == stringValue || 'string' !== typeof stringValue || 0 == stringValue.length) {
            globalThis.console.warn(
                `Returning NaN from ${EzNumber.asNumber.toString()}}: The provided stringValue of ${stringValue} is either undefined, null, or not a string.`);

            return NaN;
        }

        let radixNumber = radix;

        if (!EzNumber.isNumber(radixNumber) || EzNumber.isNaN(radixNumber) || (radixNumber > 36) || (radixNumber != 0 && radixNumber < 2)) {
            globalThis.console.warn(
                `Using the default radix value of 10 (decimal) in call to ${EzNumber.asNumber.toString()}: ` +
                `The provided radix value of ${radix} is not a valid raidx number from 2 to 36.`);

            radixNumber = 10;
        }

        return EzNumber.asNumberOrDefault(
            stringValue,
            NaN,
            radixNumber);
    }

    /**
     * @static
     * @public @method
     * Converts a string value to a Javascript number (using parseInt).
     * If the stringValue is null, undefined, or not a number then the provided defaultValue is returned.
     * @param {undefined|null|string} stringValue
     * Default: NaN (returns defaultValue)
     * @param {undefined|null|NaN|number|*} defaultValue
     * Default: NaN
     * @param {undefined|null|number} radix
     * A value of undefined, null, NaN or zero will result in a default radix of 10 (decimal).
     * An integer between 2 and 36 that represents the radix (the base in mathematical numeral systems) of the string.
     * Default: 10
     * @returns {number}
     */
    static asNumberOrDefault(stringValue = NaN, defaultValue = NaN, radix = 10) {
        if (!EzObject.isValid(stringValue) || 'string' !== typeof stringValue || 0 == stringValue.length) {
            globalThis.console.warn(
                `Returning the provided default value of ${defaultValue} in call to ${EzNumber.asNumberOrDefault.toString()}: ` +
                `The provided stringValue of ${stringValue} is either undefined, null, or not a string.`);

            return defaultValue; // fall to NaN if the string value is null, empty, or undefined
        }

        try {
            let numberValue = parseInt(stringValue);

            if (EzNumber.isNaN(numberValue)) {
                globalThis.console.warn(
                    `Returning the provided default value of ${defaultValue} in call to ${EzNumber.asNumberOrDefault.toString()}: ` +
                    `The provided stringValue of ${stringValue} is not a valid number.`);

                // Could not translate stringValue into a number, returning the default value
                return defaultValue;
            }

            let radixNumber = radix;

            if (!EzNumber.isNumber(radixNumber) || EzNumber.isNaN(radixNumber) || (radixNumber > 36) || (radixNumber != 0 && radixNumber < 2)) {
                globalThis.console.warn(
                    `Using the default radix value of 10 (decimal) in call to ${EzNumber.asNumberOrDefault.toString()}: ` +
                    `The provided radix value of ${radix} is not a valid raidx number from 2 to 36.`);

                radixNumber = 10;
            }

            let parseIntResult = parseInt(
                numberValue,
                radixNumber);

            return EzNumber.isNaN(parseIntResult)
                ? defaultValue
                : parseIntResult;
        } catch (err) {
            return defaultValue;
        }
    }

    /**
     * @static
     * @public @method
     * Transforms the provided string value into an integer.
     * Returns NaN if the provided string value cannot transform to an integer.
     * @param {string} value
     * @returns {number}
     */
    static strToInt(value) {
        return EzNumber.strToIntDefault(
            value,
            NaN);
    }

    /**
     * @static
     * @public @method
     * Transforms the provided string value into an integer.
     * Returns the provided defaultValue if the provided string value cannot transform to an integer.
     * @param {string} stringValue
     * @param {undefined|null|number|*} defaultValue
     * Can be any value (does not need to be an number)
     * Default: NaN
     * @returns {undefined|null|number|*}
     */
    static strToIntDefault(stringValue, defaultValue = NaN) {
        if (!EzObject.isValid(stringValue) || 'string' !== typeof stringValue || 0 == stringValue.length) {
            globalThis.console.warn(
                `Returning the default value of ${defaultValue} from call to EzNumber.strToIntDefault(...): ` +
                `The provided stringValue of ${stringValue} is either undefined, null, not a string, or a string with zero length.`);

            return defaultValue;
        }

        try {
            let parseIntResult = parseInt(stringValue);

            if (EzNumber.isNaN(parseIntResult)) {
                globalThis.console.warn(
                    `Returning the default value of ${defaultValue} from call to EzNumber.strToIntDefault(...): ` +
                    `The provided stringValue of ${stringValue} does not represent a valid integer.`);

                return defaultValue;
            }

            return parseIntResult;
        } catch (err) {
            globalThis.console.warn(
                `Returning the default value of ${defaultValue} from call to EzNumber.strToIntDefault(...) ` +
                `after failing to transform the provided stringValue of ${stringValue} to an integer due to the following error: ${err.message}.`);

            return defaultValue;
        }
    }

    /**
     * @static
     * @public @method
     * Transforms the provided string value into a floating point number by calling EzNumber.strToFloatDefault(stringValue, NaN)
     * @param {string} value
     * Expecting: A floating point number represented as a string.
     * @returns {number}
     */
    static strToFloat(stringValue) {
        if (!EzObject.isValid(stringValue) || 'string' !== typeof stringValue || 0 == stringValue.length) {
            globalThis.console.warn(
                `Returning NaN from call to EzNumber.strToFloat(...): ` +
                `The provided stringValue of ${stringValue} is either undefined, null, not a string, or a string with zero length.`);

            return NaN;
        }

        return EzNumber.strToFloatDefault(stringValue, NaN);
    }

    /**
     * @static
     * @public @method
     * Transforms the provided stringValue into a floating point number.
     * If the stringValue cannot transform to a floating point number then the defaultValue is returned instead.
     * @param {string} value
     * Expecting: A floating point number represented as a string.
     * @param {undefined|null|number|*} defaultValue
     * Can be any value (does not have to be a floating point value)
     * @returns {undefined|null|number|*}
     */
    static strToFloatDefault(stringValue, defaultValue = NaN) {
        if (!EzObject.isValid(stringValue) || 'string' !== typeof stringValue || 0 == stringValue.length) {
            globalThis.console.warn(
                `Returning the provided default value of ${defaultValue} from call to EzNumber.strToFloatDefault(...): ` +
                `The provided stringValue of ${stringValue} is either undefined, null, an empty string, or not a string.`);

            return defaultValue;
        }

        try {
            let parseFloatResult = parseFloat(stringValue);

            if (EzNumber.isNaN(parseFloatResult)) {
                globalThis.console.warn(
                    `Returning the provided default value of ${defaultValue} from call to EzNumber.strToFloatDefault(...): ` +
                    `The provided stringValue of ${stringValue} does not transform to a valid floating point number.`);

                return defaultValue;
            }

            return parseFloatResult;
        } catch (err) {
            globalThis.console.warn(
                `Returning the provided default value of ${defaultValue} from call to EzNumber.strToFloatDefault(...) ` +
                `after failing to transform the provided stringValue of ${stringValue} ` +
                `to a floating point number due to the following error: ${err.message}.`);

            return defaultValue;
        }
    }

    /**
     * @static
     * @public @method
     * Determines: value >= aMinNumber && value <= aMaxNumber
     * @param {number} aNumber
     * @param {undefined|null|number} aMinNumber
     * If a number is not provided then aMinNumber is set equal Number.MIN_VALUE.
     * Default: Number.MIN_VALUE
     * @param {undefined|null|number} aMaxNumber
     * If a number is not provided then aMaxNumber is set equal to Number.MAX_VALUE.
     * Default: Number.MAX_VALUE
     * @returns {boolean}
     * Returns true if the provided aNumber is >= aMinNumber OR aNumber <= aMaxNumber.
     * Returns false otherwise.
     */
    static isNumberWithinRange(aNumber, aMinNumber = Number.MIN_VALUE, aMaxNumber = Number.MAX_VALUE) {
        if (!EzNumber.isNumber(aNumber)) {
            throw new EzBadParamException(
                'aNumber',
                EzNumber,
                EzNumber.isNumberWithinRange,
                `The provided value of ${aNumber} is not a valid number.`);
        }

        if (!EzNumber.isNumber(aMinNumber)) {
            aMinNumber = Number.MIN_VALUE;
        }

        if (!EzNumber.isNumber(aMaxNumber)) {
            aMaxNumber = Number.MAX_VALUE;
        }

        if (aMinNumber > aMaxNumber) {
            throw new EzBadParamException(
                'aMinNumber',
                EzNumber,
                EzNumber.isNumberWithinRange,
                'The aMinNumber parameter must be less than or equal to the aMaxNumber parameter.');
        }

        return aNumber >= aMinNumber && aNumber <= aMaxNumber;
    }

    /**
     * @static
     * @public @method
     * Determines if the provided value param is between the aMinNumber and aMaxNumber range.
     * @param {number} aNumber
     * @param {undefined|null|number} aMinNumber
     * If aMinNumber is undefined or null then aMinNumber is set equal to Number.MIN_VALUE
     * Default: Number.MIN_VALUE
     * @param {number} aMaxNumber
     * If a aMaxNumber is undefined or null then aMaxNumber is set equal to Number.MAX_VALUE
     * Default: Number.MAX_VALUE
     * @returns {boolean}
     * 1) If the provided aNumber is not a valid number then an exception is thrown.
     * 2) If aMinNumber is greater than a aMaxNumber then an exception is thrown.
     * 3) Returns true if aNumber is > aMinNumber AND aNumber is < aMaxNumber
     */
    static isNumberBetweenRange(aNumber, aMinNumber = Number.MIN_VALUE, aMaxNumber = Number.MAX_VALUE) {
        if (!EzNumber.isNumber(aNumber)) {
            throw new EzBadParamException(
                'value',
                EzNumber,
                EzNumber.isNumberBetweenRange,
                `The provided value of ${aNumber} is not a valid number.`);
        }

        if (!EzNumber.isNumber(aMinNumber)) {
            aMinNumber = Number.MIN_VALUE;
        }

        if (!EzNumber.isNumber(aMaxNumber)) {
            aMaxNumber = Number.MAX_VALUE;
        }

        if (aMinNumber > aMaxNumber) {
            throw new EzBadParamException(
                'aMinNumber',
                EzNumber,
                EzNumber.isNumberWithinRange,
                'The aMinNumber parameter must be less than or equal to the aMaxNumber parameter.');
        }

        return aNumber > aMinNumber && aNumber < aMaxNumber;
    }

    /**
     * @static
     * @public @method
     * If the provided aNumber is a valid number then the aNumber value is returned.
     * Otherwise, zero is returned.
     * @param {undefined|null|number|*} number
     * @returns {number}
     */
    static numberOrZero(aNumber) {
        return EzNumber.isNumber(aNumber)
            ? aNumber
            : 0;
    }

    /**
     * @static
     * @public @method
     * Returns the provided number as a currency string using the provided
     * EzLocale and EzCurrency values.
     * @param {number} aNumber
     * @param {string} ezLocal
     * A valid enumeration property value from /ezlibrary/locales/EzLocale.js
     * Default: 'en-us'
     * @param {string} ezCurrency
     * A valid enumeration property value from /ezlibrary/locales/EzCurrency.js
     * Default: 'USD'
     */
    static numberAsCurrencyString(aNumber, ezLocale, ezCurrency) {
        if (!EzObject.isValid(ezLocale) || 'string' !== typeof ezLocale) {
            ezLocale = 'en';
        }
        if (!EzObject.isValid(ezCurrency) || 'string' !== typeof ezCurrency) {
            ezCurrency = 'USD';
        }

        // Create our number formatter.
        let numberFormatter = new Intl.NumberFormat(
            ezLocale,
            {
                style: 'currency',
                currency: ezCurrency,
            });

        return numberFormatter.format(aNumber);
    }

    /**
     * @static
     * @public @method
     * Formats the provided value to have the provided number of decimal places.
     * References:
     *     https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed
     * @param {number} aNumber
     * @param {undefined|null|number} numberOfDecimalPlaces
     * Default: 0
     * @returns {number}
     * Returns a floating point number
     */
    static formatDecimal(aNumber, numberOfDecimalPlaces) {
        if (!EzNumber.isNumber(aNumber)) {
            throw new EzBadParamException(
                'aNumber',
                EzNumber,
                EzNumber.formatDecimal);
        }
        if (!EzNumber.isNumber(numberOfDecimalPlaces)) {
            numberOfDecimalPlaces = 0;
        }
        if (0 > numberOfDecimalPlaces || 100 < numberOfDecimalPlaces) {
            throw new EzBadParamException(
                'numberOfDecimalPlaces (must be between 0 and 100)',
                EzNumber,
                EzNumber.formatDecimal);
        }

        return parseFloat(aNumber.toFixed(numberOfDecimalPlaces));
    }
}
