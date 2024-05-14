import {
    EzObject,
    EzString
} from '/ezlibrary/helpers/EzHelpers.js';

import { EzEnumeration2 } from '/ezlibrary/enums/EzEnumeration2.js';

/**
    TODO: Move EzValidationResponseStatus to its own file in /ezlibrary/enums/EzValidationResponseStatus.js
    Represents the status of a validation response
    ---------------------------------------------------------------------------
    Import with:
        import { EzValidationResponseStatus } from '/ezlibrary/EzValidationResponse.js';
    ---------------------------------------------------------------------------
 */
export class EzValidationResponseStatus extends EzEnumeration2 {
    /**
        @private @field
        Stores the singleton instance of this enumeration class.
        @type {EzRegistrationState}
     */
    static #ezEnumerationSingleton = null;

    /**
        @static
        Static Initialization
     */
    static {
        if (null == EzValidationResponseStatus.#ezEnumerationSingleton) {
            EzValidationResponseStatus.#ezEnumerationSingleton = new EzValidationResponseStatus(
                // Enum property names
                [
                    'UNKNOWN',
                    'VALID',
                    'ERROR',
                    'WARNING',
                    'ERROR_UNSUPPORTED'
                ],
                // Enum property values for each enum property name as an array
                // Enter null if the values are equal to the names
                null,
                // Optional array of additional data for eac enumeration property.
                // Enter null if not needed.
                [
                    {
                        display: 'Unknown',
                        errorCode: 1
                    },
                    {
                        display: 'Valid',
                        errorCode: 0
                    },
                    {
                        display: 'Error',
                        errorCode: 500
                    },
                    {
                        display: 'Warning',
                        errorCode: -1
                    },
                    {
                        display: 'Unsupported',
                        errorCode: -500
                    }
                ]);
        }
    }

    /**
        @static
        @public @method
        Returns the associated errorCode
        @returns {number}
     */
    static ezToErrorCode(enumValue) {
        return EzValidationResponseStatus.ezEnumData(enumValue).errorCode;
    }

    /**
        @static
        @public @method
        Returns the display string
        @returns {string}
     */
    static ezToDisplay(enumValue) {
        return EzValidationResponseStatus.ezEnumData(enumValue).display;
    }
}

/**
    @class
    Represents the response of an validation from ez-validation.js (or other validators)
    ---------------------------------------------------------------------------
    Import with:
        import { EzValidationResponse } from '/ezlibrary/EzValidationResponse.js';
    ---------------------------------------------------------------------------
 */
export class EzValidationResponse {
    /**
        @public
        Constructor for EzValidationResponse
        @param {String|EzValidationResponseStatus} ezValidationResponseStatus
        @param {string} message
        @param {string|undefined|null} htmlMessage
        @param {number|string} errorCode
     */
    constructor(ezValidationResponseStatus, message, htmlMessage, errorCode) {

        this.ezStatus = EzValidationResponseStatus.ezAsEnum(ezValidationResponseStatus);

        if (EzValidationResponseStatus.UNKNOWN === this.ezStatus) {
            this.ezStatus = EzValidationResponseStatus.VALID;
        }

        this.message = EzString.stringOrEmpty(message);

        this.htmlMessage = EzString.stringOrDefault(
            htmlMessage,
            `<div class="ezPad2">${this.message}</div>`);

        this.errorCode = EzObject.assignOrDefault(
            errorCode,
            EzValidationResponseStatus.ezToErrorCode(this.ezStatus));
    }

    /**
        @private @field
        Stores the EzValidationResponseStatus
        @type {EzValidationResponseStatus}
     */
    #ezStatus = EzValidationResponseStatus.VALID;
    /**
        @public @property @getter
        Gets the EzValidationResponseStatus
        @returns {EzValidationResponseStatus}
     */
    get ezStatus() {
        return this.#ezStatus;
    }
    /**
        @public @property @setter
        Sets the EzValidationResponseStatus
        @param {EzValidationResponseStatus} ezValidationResponseStatus
     */
    set ezStatus(ezValidationResponseStatus) {
        this.#ezStatus = EzValidationResponseStatus.ezAsEnum(ezValidationResponseStatus);
    }

    /**
        @private @field
        Stores the error code number
        @type {number|string}
     */
    #errorCode = 0;
    /**
        @public @property @getter
        Returns the error code number
        @returns {number|string}
     */
    get errorCode() {
        return this.#errorCode;
    }
    /**
        @public @property @setter
        Sets the error code number
        If the errorCode is undefined or null, then zero is assigned.
        @param {number|string} errorCode
     */
    set errorCode(errorCode) {
        this.#errorCode = EzObject.assignOrDefault(errorCode, 0);
    }

    /**
        @private @field
        Stores the error message
        @type {string}
     */
    #message = '';
    /**
        @public @property @getter
        Gets the error message
        @returns {string}
     */
    get message() {
        return this.#message;
    }
    /**
        @public @property @setter
        Sets the error message
        @param {string} message
     */
    set message(message) {
        this.#message = EzString.stringOrEmpty(message)
    }

    /**
        @private @field
        Stores the error message as HTML
        @type {string}
     */
    #htmlMessage = '';
    /**
        @public @property @getter
        Gets the error message as HTML
        @returns {EzValidationResponseStatus}
     */
    get htmlMessage() {
        return this.#htmlMessage;
    }
    /**
        @public @property @setter
        Sets the error message as HTML
        @param {EzValidationResponseStatus} ezValidationResponseStatus
     */
    set htmlMessage(htmlMessage) {
        this.#htmlMessage = EzString.stringOrEmpty(htmlMessage);
    }

    /**
        @public
        Returns the Validation status
        @returns {String|EzValidationResponseStatus}
        @deprecated
        Migrate to the ezStatus property instead.
     */
    ezGetStatus() {
        return this.ezStatus;
    }

    /**
        @public
        Returns the validation error code
        @returns {number}
        @deprecated
        Migrate to the errorCode property instead.
     */
    ezGetErrorCode() {
        return this.errorCode;
    }

    /**
        @public
        Returns the validation message
        @returns {string}
        @deprecated
        Migrate to the message property instead.
     */
    ezGetMessage() {
        return this.message;
    }

    /**
        @public
        Returns the validation message
        @returns {string}
        @deprecated
        Migrate to the htmlMessage property instead.
     */
    ezGetHtmlMessage() {
        return this.htmlMessage;
    }
}
