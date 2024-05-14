import {
    EzBadParamException
} from '/ezlibrary/exceptions/EzExceptions.js';

import {
    EzNumber,
    EzString
} from '/ezlibrary/helpers/EzHelpers.js';

/**
 * @class
 * @description
 * Used for each of EzHttpStatus's enumerations ezData value.
 * Provides additional context for a enumeration property in the EzHttpStatus
 * enumeration class.
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * See also:
 *      Used by class EzHttpStatus from /ezlibrary/enums/EzHttpStatus.js.
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Import with:
 *      import { EzHttpStatusCode } from '/ezlibrary/entities/EzHttpStatusCode.js';
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
export class EzHttpStatusCode {
    /**
     * @public @constructor
     * Creates a new instance of EzHttpStatusCode
     * @param {string|number} statusCode
     * Required: A number (or number as a string) representing the HTTP status code.
     * @param {string} reasonPhrase
     * Default: Http Status {statusCode}
     */
    constructor(statusCode, reasonPhrase) {
        if (!EzNumber.isNumber(statusCode) && !EzString.isString(statusCode)) {
            throw new EzBadParamException(
                'statusCode',
                this,
                this.constructor);
        }

        this.statusCode = statusCode;

        this.reasonPhrase = reasonPhrase;
    }

    /**
     * @private @field
     * Stores the status code (number)
     * @type {number}
     */
    #statusCode = 0;
    /**
     * @public @property @getter
     * Gets the status code (number)
     * @returns {number}
     */
    get statusCode() {
        return this.#statusCode;
    }
    /**
     * @public @property @setter
     * Sets the status code (number)
     * @param {string|number} statusCode
     */
    set statusCode(statusCode) {
        if (!EzNumber.isNumber(statusCode)) {
            if (!EzString.isString(statusCode)) {
                throw new EzBadParamException(
                    'statusCode',
                    this,
                    this.statusCode);
            }

            try {
                parseInt(statusCode);
            } catch (err) {
                throw new EzBadParamException(
                    'statusCode',
                    this,
                    this.statusCode);
            }
        }

        this.#statusCode = statusCode;
    }

    /**
     * @private @field
     * Stores the status code reason phrase
     * @type {string}
     */
    #reasonPhrase;
    /**
     * @public @property @getter
     * Gets the status code reason phrase
     * @returns {string}
     */
    get reasonPhrase() {
        return EzString.stringWithLengthOrDefault(
            this.#reasonPhrase,
            this.displayName);
    }
    /**
     * @public @property @setter
     * Sets the status code reason phrase
     * @param {string} reasonPhrase
     */
    set reasonPhrase(reasonPhrase) {
        this.#reasonPhrase = EzString.stringOrEmpty(reasonPhrase);
    }

    /**
     * @public @readonly @property
     * Gets the display name for the http status code.
     * Format: `Http Status ${this.statusCode}`
     * @returns {string}
     */
    get displayName() {
        return EzString.msg`Http Status ${this.statusCode}`;
    }
}