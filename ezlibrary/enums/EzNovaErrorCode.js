/*
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    ENGINEERING NOTES
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    Keep this JS class in sync with the Java equivlant
    com.eznova.common.exceptions.EzNovaErrorCode.java.
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

import { EzEnumeration2 } from '/ezlibrary/enums/EzEnumeration2.js';

import { EzHttpStatus } from '/ezlibrary/enums/EzHttpStatus.js';
import { EzErrorCodeInfo } from '/ezlibrary/entities/EzErrorCodeInfo.js';

/**
 * @class
 * @extends {EzEnumeration2}
 * Defines the exclocker error codes that might return from service calls.
 * -----------------------------------------------------------------
 * Import into non-enumeration classes with:
 *     import {
 *          // ... other enumeration classes ...
 *         EzNovaErrorCode
 *     }
 *     from '/ezlibrary/enums/EzEnumerations.js';
 * -----------------------------------------------------------------
 * Import into other enumeration classes with:
 *     import { EzNovaErrorCode } from '/ezlibrary/enums/EzNovaErrorCode.js';
 * -----------------------------------------------------------------
 */
export class EzNovaErrorCode extends EzEnumeration2 {
    /**
     * @private @field
     * Stores the singleton instance of this enumeration class.
     * @type {EzNovaErrorCode}
     */
    static #ezEnumerationSingleton = null;

    /**
     * @static
     * Static Initialization
     */
    static {
        if (null == EzNovaErrorCode.#ezEnumerationSingleton) {
            EzNovaErrorCode.#ezEnumerationSingleton = new EzNovaErrorCode(
                // Enum property names
                [
                    /**
                     * UNKNOWN
                     * Error Code: -1
                     */
                     'UNKNOWN',
                    /**
                     * No error
                     * Error Code: 0
                     */
                    'NONE',
                    /**
                     * General Error
                     * Error code: 1
                     */
                    'ERROR',
                    /**
                     * Unauthorized error
                     * Error Code: 401
                     */
                    'UNAUTHORIZED',
                    /**
                     * Forbidden error
                     * Error Code: 403
                     */
                    'FORBIDDEN',
                    /**
                     * Internal server error
                     * Error Code: 500
                     */
                    'INTERNAL'
                ],
                // Enum property values for each enum property name as an array
                // Enter null if the values are equal to the names
                [
                    /**
                     * UNKNOWN
                     * Error Code: -1
                     */
                    -1,
                    /**
                     * NONE
                     * No error
                     * Error Code: 0
                     */
                    0,
                    /**
                     * ERROR
                     * General Error
                     * Error code: 1
                     */
                    1,
                    /**
                     * UNAUTHORIZED
                     * Unauthorized error
                     * Error Code: 401
                     */
                    401,
                    /**
                     * FORBIDDEN
                     * Forbidden error
                     * Error Code: 403
                     */
                    403,
                    /**
                     * INTERNAL
                     * Internal server error
                     * Error Code: 500
                     */
                    500
                ],
                // Optional array of additional data for eac enumeration property.
                // Enter null if not needed.
                [
                    /**
                     * UNKNOWN
                     * Error Code: -1
                     */
                    new EzErrorCodeInfo(
                        // statusCode
                        0,
                        // errorCode
                        -1,
                        // category
                        'UNKNOWN',
                        // displayName
                        'UNKNOWN',
                        // textErrorMessage
                        'UNKNOWN',
                        // htmlErrorMessage
                        '<div>UNKNOWN</div>'),
                    // NONE
                    new EzErrorCodeInfo(
                        // statusCode
                        EzHttpStatus.OK,
                        // errorCode
                        0,
                        // category
                        'No Error',
                        // displayName
                        'No Error',
                        // textErrorMessage
                        'Success',
                        // htmlErrorMessage
                        '<div>Success</div>'),
                    // ERROR
                    new EzErrorCodeInfo(
                        // statusCode
                        EzHttpStatus.INTERNAL_SERVER_ERROR,
                        // errorCode
                        1,
                        // category
                        'Server Error',
                        // displayName
                        'Internal Server Error',
                        // textErrorMessage
                        EzHttpStatus.ezEnumData(EzHttpStatus.INTERNAL_SERVER_ERROR).reasonPhrase,
                        // htmlErrorMessage
                        `<div>${EzHttpStatus.ezEnumData(EzHttpStatus.INTERNAL_SERVER_ERROR).reasonPhrase}</div>`),
                    /**
                     * UNAUTHORIZED
                     * Error code: 401
                     */
                    new EzErrorCodeInfo(
                        // statusCode
                        EzHttpStatus.UNAUTHORIZED,
                        // errorCode
                        EzHttpStatus.UNAUTHORIZED,
                        // category
                        'Server Error',
                        // displayName
                        'Unauthorized',
                        // textErrorMessage
                        EzHttpStatus.ezEnumData(EzHttpStatus.UNAUTHORIZED).reasonPhrase,
                        // htmlErrorMessage
                        `<div>${EzHttpStatus.ezEnumData(EzHttpStatus.UNAUTHORIZED).reasonPhrase}</div>`),
                    /**
                     * FORBIDDEN
                     * Error Code: 403
                     */
                    new EzErrorCodeInfo(
                        // statusCode
                        EzHttpStatus.FORBIDDEN,
                        // errorCode
                        EzHttpStatus.FORBIDDEN,
                        // category
                        'Server Error',
                        // displayName
                        'Unauthorized',
                        // textErrorMessage
                        EzHttpStatus.ezEnumData(EzHttpStatus.FORBIDDEN).reasonPhrase,
                        // htmlErrorMessage
                        `<div>${EzHttpStatus.ezEnumData(EzHttpStatus.FORBIDDEN).reasonPhrase}</div>`),
                    new EzErrorCodeInfo(
                        // statusCode
                        EzHttpStatus.INTERNAL_SERVER_ERROR,
                        // errorCode
                        EzHttpStatus.INTERNAL_SERVER_ERROR,
                        // category
                        'Server Error',
                        // displayName
                        'Internal Server Error',
                        // textErrorMessage
                        EzHttpStatus.ezEnumData(EzHttpStatus.INTERNAL_SERVER_ERROR).reasonPhrase,
                        // htmlErrorMessage
                        `<div>${EzHttpStatus.ezEnumData(EzHttpStatus.INTERNAL_SERVER_ERROR).reasonPhrase}</div>`),
                ]);
        }
    }
}
