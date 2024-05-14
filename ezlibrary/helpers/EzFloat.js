import { EzObject } from '/ezlibrary/helpers/EzObject.js';
import { EzNumber } from '/ezlibrary/helpers/EzNumber.js';
/*
    ---------------------------------------------------------------------------
    WARNING:
        1) Do not import anything from /ezlibrary/helpers/EzHelpers.js into this module
        2) Do not import the following into this module:
            import { EzApi } from '/public/common/javascript/ezapi.js';
            import { EzUI } from '/public/common/javascript/ezui.js';
            import { ezUI } from '/public/common/javascript/ezui.js';
            import { EzString } from '/ezlibrary/helpers/EzString.js';
            import { EzArray } from '/ezlibrary/helpers/EzArray.js';
            import { EzHtml } from '/ezlibrary/helpers/EzHtml.js';
            import { EzFunction } from '/ezlibrary/helpers/EzFunction.js';
            import { EzJson } from '/ezlibrary/helpers/EzJson.js';
            import { EzConsole } from '/ezlibrary/helpers/EzConsole.js';
            import { EzAsync } from '/ezlibrary/helpers/EzAsync.js';
    ---------------------------------------------------------------------------
*/

/**
 * @class
 * @description
 * Static class that provides utility methods and properties for Objects
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Import with:
 *     import { EzFloat } from '/ezlibrary/helpers/EzFloat.js';
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
export class EzFloat extends EzNumber {
    /**
     * @public @readonly @property
     * Gets floating point constant 0.00
     * @returns {number}
     */
    static get ZERO() {
        return 0.00;
    }

    /**
     * @static
     * @public @method
     * Converts a string value to a Javascript number (using parseFloat)
     * @param {string} stringValue
     * @returns {number}
     * The provided stringValue transformed to a float number if successful.
     * Returns 0.00 if the provided stringValue is undefined, null, or an empty string.
     * Returns 0.00 if the attempt to transform the provided stringValue fails.
     */
    static toFloat(stringValue) {
        if (!stringValue || 'string' != typeof stringValue || 0 == stringValue.length) {
            // fall to zero if the string value is null, empty, or undefined
            return EzFloat.ZERO;
        }

        try {
            const floatResult = parseFloat(stringValue);

            return !isNaN(floatResult)
                ? floatResult
                : EzFloat.ZERO;
        } catch (err) {
            if (EzObject.isValid(globalThis?.console)) {
                globalThis.console.error(
                    `Failed to transform string "${stringValue}" to a float number due to the following error: ${err.message}`);
            }

            return EzFloat.ZERO;
        }
    }
}
