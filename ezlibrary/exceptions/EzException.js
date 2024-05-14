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

/**
 * @class
 * @extends {Error}
 * @description
 * Top level exception for ezClocker website
 * EzException is the base Exception class for all ezClocker exceptions.
 * ---------------------------------------------------------------------------
 * WARNING:
 *     1) Do not import this class into /ezlibrary/ezclocker-classes/EzClasses.js
 *        import group module because EzException is alredy exported by the
 *        /ezlibrary/exceptions/EzExceptions.js import group module.
 * ---------------------------------------------------------------------------
 * Import with:
 *     import {
 *         EzException,
 *         // EzExceptionInClassMethod,
 *         // EzBadParamException,
 *         // EzBadStateException,
 *         // EzStaticClassException,
 *         // EzNotSupportedException
 *     } from '/ezlibrary/exceptions/EzExceptions.js';
 * ---------------------------------------------------------------------------
 */
export class EzException extends Error {
    /**
     * @static
     * @public @readonly @property
     * Returns the default EzException error mesage.
     * @returns {string}
     */
    static get DEFAULT_ERROR_MESSAGE() {
        return 'An unexpected error occurred.';
    }

    /**
     * @public @constructor
     * Creates a new instance of EzException
     * @param {undefined|null|String} message
     * Default is 'An unexpected error occurred.'
     * @param {undefined|null|Object} cause
     * Default is null.
     */
    constructor(message, options) {
        super(message, options);

        this.name = this.constructor.name;

        this.message = message && 'string' === typeof message && 0 != message.length
            ? message
            : EzException.DEFAULT_ERROR_MESSAGE;

        this.errorCode = options && Object.hasOwn(options, 'errorCode')
            ? options.errorCode
            : 500;
    }

    /**
     * @private @field
     * Stores the exception's error code
     * Default is: 500
     * @type {number}
     */
    #errorCode = 500;
    /**
     * @public @property @getter
     * Gets the exception's error code
     * @returns {number}
     */
    get errorCode() {
        return this.#errorCode;
    }
    /**
     * @public @property @setter
     * Sets the exception's error code
     * @param {number}
     */
    set errorCode(errorCode){
        this.#errorCode = errorCode || 500;
    }

    /**
     * @public @property @getter
     * Gets the cause of this exception (a caught Error)
     * @param {null|object}
     */
    get cause() {
        return super.cause;
    }
    /**
     * @public @property @setter
     * Sets the cause of this exception (a caught Error)
     * @param {undefined|null|object} cause
     */
    set cause(cause) {
        super.cause = undefined != cause && null != cause
            ? cause
            : null;
    }

    /**
     * @public @property @getter
     * Gets the message for this exception
     * @returns {string}
     */
    get message() {
        return super.message;
    }
    /**
     * @public @property @setter
     * Sets the message for this exception
     * @param {string} aMessage
     */
    set message(aMessage) {
        super.message = aMessage && 'string' === typeof aMessage && 0 != aMessage.length
            ? aMessage
            : '[no error message provided]';
    }

    /**
     * @public @property @getter
     * Gets the stack trace for the error
     * @returns {string}
     */
    get stack() {
        return super.stack;
    }
    /**
     * @public @property @setter
     * Sets the message for this exception
     * @param {string} stack
     */
    set stack(stack) {
        super.stack = stack;
    }

    /**
     * @public @method
     * Gets this exception as a string
     * @returns {string}
     */
    toString() {
        return this.message;
    }
}
