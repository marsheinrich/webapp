/*
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    ENGINEERING NOTES
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    When importing exceptions using this module (EzExceptions.js)
    Please either comment out or remove the exceptions you do not use
    from the import.
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

/**
    @module /ezlibrary/exceptions/EzExceptions.js
    @description
    A module that provides exports for all the ezlibrary/exceptions/*.js
    classes to ease importing these classes into other modules.
    -----------------------------------------------------------------
    Import with:
        import {
            // Comment out or remove the exception classes not used in this module
            EzException,
            EzExceptionInClassMethod,
            EzBadParamException,
            EzBadStateException,
            EzStaticClassException,
            EzNotSupportedException
        } from '/ezlibrary/exceptions/EzExceptions.js';
    -----------------------------------------------------------------
 */

export { EzException } from '/ezlibrary/exceptions/EzException.js';
export { EzExceptionInClassMethod } from '/ezlibrary/exceptions/EzExceptionInClassMethod.js';
export { EzBadParamException } from '/ezlibrary/exceptions/EzBadParamException.js';
export { EzBadStateException } from '/ezlibrary/exceptions/EzBadStateException.js';
export { EzStaticClassException } from '/ezlibrary/exceptions/EzStaticClassException.js';
export { EzNotSupportedException } from '/ezlibrary/exceptions/EzNotSupportedException.js';
