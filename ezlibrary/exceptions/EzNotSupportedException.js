/*
    ---------------------------------------------------------------------------
    WARNING:
        1) Do not import the following modules into this module:
            import {
                < any enumeration >
            } from '/ezlibrary/enums/EzEnumerations.js';
            import {
                < any helper classes >
            } from '/ezlibrary/helpers/EzHelpers.js';
            import {
                < any other exception classes >
            } from '/ezlibrary/exceptions/EzExceptions.js';
    ---------------------------------------------------------------------------
*/

import { EzException } from '/ezlibrary/exceptions/EzException.js'

/**
    @class
    @extends {Error}
    @description
    Exception for unsupported actions, requests, operations, or states.
    ---------------------------------------------------------------------------
    Import with:
        import {
            // EzException,
            // EzExceptionInClassMethod,
            // EzBadParamException,
            // EzBadStateException,
            // EzStaticClassException,
            EzNotSupportedException
        } from '/ezlibrary/exceptions/EzExceptions.js';
    ---------------------------------------------------------------------------
 */
export class EzNotSupportedException extends EzException {
    constructor(message, cause) {
        super(message, cause);
    }
}
