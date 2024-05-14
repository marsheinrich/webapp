import {
    EzException
} from '/ezlibrary/exceptions/EzExceptions.js';

import { EzStaticClass } from '/ezlibrary/EzStaticClass.js';

import { EzObject } from '/ezlibrary/helpers/EzObject.js';
import { EzNumber } from '/ezlibrary/helpers/EzNumber.js';
import { EzString } from '/ezlibrary/helpers/EzString.js';

/**
 * @public @class {EzString} extends {EzStaticClass}
 * @description
 * A class of static utility methods and/or properties for string types.
 * >>> WOOT: Does not require EzApi <<<
 * ---------------------------------------------------------------------------
 * Import with:
 *     import { EzError } from '/ezlibrary/helpers/EzError.js';
 * ---------------------------------------------------------------------------
 */
export class EzError extends EzStaticClass {
    /**
     * @static
     * @public @readonly @property
     * Gets the default error code of 500.
     * @type {number}
     */
    static get DEFAULT_ERROR_CODE() {
        return 500;
    }

    /**
     * @static
     * @public @readonly @property
     * Returns the default error message
     * @type{string}
     */
    static get DEFAULT_ERROR_MESSAGE() {
        return 'Unexpected error - no additional details provided.';
    }

    /**
     * @static
     * @public @method
     * Evaluates the provided err (exception) instance to verify it has a
     * properties errorCode and message. If the properties are missing they are
     * added to the err instance before returning.
     * @param {undefined|null|object} err
     * @returns {object}
     * Returns the provided err or a default err (if not provided) enhanced with additional properties
     * if needed.
     */
    static errorOrDefaultError(err) {
        return EzError.errorOrDefault(
            err,
            new EzException(EzError.DEFAULT_ERROR_MESSAGE));
    }

    /**
     * @static
     * @public @method
     * Evaluates the provided err (exception) instance to verify it has a
     * properties errorCode and message. If the properties are missing they are
     * added to the err instance before returning.
     * If the provided err is undefined or null, then the provided defaultErr is returned.
     * @param {undefined|null|object} err
     * @param {undefined|null|object} defaultErr
     * @returns {object}
     * Returns the provided err or the defaultError enhanced with additional properties
     * if needed.
     */
    static errorOrDefault(err, defaultErr) {
        const errToReturn = EzObject.isValid(err)
            ? err
            : defaultErr;

        // Returning a Promise.reject with the error message
        if (!EzNumber.isNumber(errToReturn?.errorCode)) {
            try {
                errToReturn.errorCode = 500;
            } catch {
                // Ignoring issues when setting err.errorCode.
                // An error here is most likely caused by a read-only property
            }
        }

        if (!EzString.hasLength(errToReturn?.message)) {
            try {
                // If the error message is blank, attempt to set it if possible
                errToReturn.message = EzError.DEFAULT_ERROR_MESSAGE;
            } catch {
                // Ignoring issues when setting err.message.
                // An error here is most likely caused by a read-only property
            }
        }

        return errToReturn;
    }

    /**
     * @static
     * @public @method
     * Throws a new EzException with the provided parameters.
     * @param {string} message
     * @param {number} errorCode
     * @param {object} options
     * @throws {EzException}
     */
    static throwEzException(message, errorCode, options) {
        errorCode = EzNumber.numberOrDefault(
            errorCode,
            EzError.DEFAULT_ERROR_CODE);

        message = EzString.stringWithLengthOrDefault(
            message,
            EzError.DEFAULT_ERROR_MESSAGE);

        if (!EzObject.isValid(options)) {
            options = {
                errorCode: EzNumber.numberOrDefault(errorCode, 500)
            };
        }

        if (EzNumber.isNumber(errorCode) && EzNumber.isNumber(options?.errorCode) && options.errorCode !== errorCode) {
            options.errorCode = errorCode;
        }

        throw new EzException(
            EzString.hasLength(message)
                ? message
                : EzException.DEFAULT_ERROR_MESSAGE,
            options);
    }
}
