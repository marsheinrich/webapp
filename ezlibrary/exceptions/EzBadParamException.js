/*
    ---------------------------------------------------------------------------
    WARNING:
        1) Do not import /ezlibrary/exceptions/EzExceptions.js into this module
        2) Do not import any other "exception classes" into this module
        1) Do not import /ezlibrary/ezclocker-classes/EzClass.js into this module
        2) Do not import /ezlibrary/enums/EzEnumerations.js into this module
        3) Do not import /ezlibrary/helpers/EzHelpers.js into this module
        4) Do not import the following modules into this module:
            import { EzObject } from '/ezlibrary/helpers/EzObject.js';
            import { EzBoolean } from '/ezlibrary/helpers/EzBoolean.js';
            import { EzNumber } from '/ezlibrary/helpers/EzNumber.js';
            import { EzFloat } from '/ezlibrary/helpers/EzFloat.js';
            import { EzString } from '/ezlibrary/helpers/EzString.js';
            import { EzArray } from '/ezlibrary/helpers/EzArray.js';
            import { EzFunction } from '/ezlibrary/helpers/EzArray.js';
            import { EzHtml } from '/ezlibrary/helpers/EzArray.js';
            import { EzJson } from '/ezlibrary/helpers/EzArray.js';
            import { EzPromise } from '/ezlibrary/helpers/EzArray.js';
    ---------------------------------------------------------------------------
*/

import { EzException } from '/ezlibrary/exceptions/EzException.js';

/**
 * @class
 * @extends {EzException}
 * @description
 * Exception for function parameters that fail validation.
 * ---------------------------------------------------------------------------
 * WARNING:
 *     1) Do not import /ezlibrary/exceptions/EzExceptions.js into this class
 * ---------------------------------------------------------------------------
 * Import with:
 *     import { EzBadParamException } from '/ezlibrary/exceptions/EzBadParamException.js';
 * ---------------------------------------------------------------------------
 * Import when you also import other exception classes:
 *      import {
 *          // ... other imported exception classes ...
 *          EzBadParamException
 *     } from '/ezlibrary/exceptions/EzExceptions.js';
 * ---------------------------------------------------------------------------
 */
export class EzBadParamException extends EzException {
    /**
     * @static
     * @public @readonly @property
     * Returns the default message for EzBadParamException
     * @returns {string}
     */
    static get DEFAULT_BAD_PARAM_ERROR_MESSAGE() {
        return 'A valid parameter is required';
    }

    /**
     * @public @constructor
     * Creates a new instance of EzBadParamException
     * @param {undefined|null|string} paramName
     * The parameter name is determined with the following evaluations on the provided paramName:
     *     1) If paramName is undefined or null then a blank string is assigned.
     *     2) If the paramName is a non-empty string then the paramName is assigned.
     *     3) For all other cases a blank string is assigned.
     * @param {undefined|null|string|class} classRefOrName
     * The class name is determined with the following evaluation:
     *     1) If classRefOrName is a class reference then the constructor name of the class is assigned.
     *     2) If classRefOrName is a function then the function's constructor name is assigned.
     *     3) If the classRefOrName is a string, then the ezClassNameOfDev value is assigned.
     *     4) If the classRefOrName is an object then the object's constructor name is assigned.
     *     5) Otherwise, a blank string is assigned.
     * @param {undefined|null|string|function} enclosingMethodRefOrMethodDef
     * The enclosingMethodRefOrMethodDef is determined with the following evaluations on the provided enclosingMethodRefOrMethodDef:
     *     1) If the enclosingMethodRefOrMethodDef is a method reference then the method definition is assigned (method name and parameters)
     *     2) If the enclosingMethodRefOrMethodDef is a non-empty string the the enclosingMethodRefOrMethodDef is assigned
     *     3) If the enclosingMethodRefOrMethodDef is an object then the object.toString() is assigned.
     *     4) Otherwise, a blank string is assigned.
     * @param {undefined|null|string} additionalMessage
     * The additional message is determined with the following evaluations on the provided additionalMessage:
     *     1) If additionalMessage is undefined or null then a blank string is assigned.
     *     2) If additionalMessage is a non-empty string then the string ` ${additionalMesage}` is assigned.
     *     3) For all other cases a blank string is assigned.
     * @param {undefined|null|Object} cause
     *     Default is null.
     */
    constructor(
        paramName = '',
        enclosingClazz = '',
        enclosingMethod = '',
        additionalMessage = '',
        cause = null) {
        super(
            EzBadParamException.DEFAULT_BAD_PARAM_ERROR_MESSAGE,
            cause);

        this.ezParamName = paramName;

        this.enclosingClazz = enclosingClazz;

        this.enclosingMethod = enclosingMethod;

        this.additionalMessage = additionalMessage;

        this.message = this.ezBuildExceptionMessage();
    }

    /**
     * @private @field
     * Stores the parameter name (if provided)
     * Default is blank string.
     * @type {string}
     */
    #ezParamName = '';
    /**
     * @public @property @getter
     * Gets the parameter name (if provided)
     * @returns {string}
     */
    get ezParamName() {
        return this.#ezParamName;
    }
    /**
     * @public @property @setter
     * Sets the parameter name based upon the following evaluations on the provided paramName:
     *     1) If paramName is undefined or null then a blank string is assigned.
     *     2) If the paramName is a non-empty string then the paramName is assigned.
     *     3) For all other cases a blank string is assigned.
     * @param {string} ezParamName
     */
    set ezParamName(ezParamName) {
        this.#ezParamName = undefined != ezParamName && null != ezParamName &&
            'string' === typeof ezParamName && 0 < ezParamName.length
            ? ezParamName
            : '';
    }

    /**
     * @private @field
     * Stores the class enclosing the exception's name
     * Default: ''
     * @type {string}
     */
    #enclosingClazz = '';
    /**
     * @public @property @getter
     * Gets the class enclosing the exception's name
     * @returns {string}
     */
    get enclosingClazz() {
        return this.#enclosingClazz;
    }
    /**
     * @public @property @setter
     * Sets the class enclosing the exception's name
     * @param {string} enclosingClazz
     */
    set enclosingClazz(enclosingClazz) {
        if (undefined == enclosingClazz || null == enclosingClazz) {
            this.#enclosingClazz = '';
        } else {
            this.#enclosingClazz = 'string' === typeof enclosingClazz
                ? enclosingClazz
                : enclosingClazz.toString();
        }
    }

    /**
     * @private @field
     * Stores information on the exceptions enclosing method
     * Default: ''
     * @type {string}
     */
    #ezEnclosingMethod = '';
    /**
     * @public @property @getter
     * Gets information on the exceptions enclosing method
     * @returns {string}
     */
    get ezEnclosingMethod() {
        return this.#ezEnclosingMethod;
    }
    /**
     * @public @property @setter
     * Sets information on the exceptions enclosing method
     * @param {string} ezEnclosingMethod
     */
    set ezEnclosingMethod(ezEnclosingMethod) {
        if (undefined == ezEnclosingMethod || null == ezEnclosingMethod) {
            this.#ezEnclosingMethod = '';
        } else if ('string' === typeof ezEnclosingMethod) {
            this.#ezEnclosingMethod = ezEnclosingMethod;
        } else {
            this.#ezEnclosingMethod = ezEnclosingMethod.toString();
        }
    }

    /**
     * @private @field
     * Stores the additional message (if provided)
     * Default: ''
     * @type {string}
     */
    #ezAdditionalMessage = '';
    /**
     * @public @property @getter
     * Gets the additional message (if provided)
     * @returns {string}
     */
    get ezAdditionalMessage() {
        return this.#ezAdditionalMessage;
    }
    /**
     * @public @property @setter
     * Sets the additional message based upon the following evaluations of the provided additionalMessage:
     * @param {string} paramName
     */
    set ezAdditionalMessage(additionalMessage) {
        this.#ezAdditionalMessage = undefined != additionalMessage && null != additionalMessage &&
            'string' === typeof additionalMessage && 0 < additionalMessage.length
            ? additionalMessage
            : '';
    }

    /**
     * @override
     * @protected @method
     * Builds the exception message from the available exception data.
     * When none of the available exception data can be used to build an error message, then the
     * default the value from EzBadParamException.DEFAULT_BAD_PARAM_ERROR_MESSAGE is returned.
     */
    ezBuildExceptionMessage() {
        let em = `A valid ${this.ezParamName} parameter value is required`

        if (this.ezEnclosingClazz && 'string' === this.ezEnclosingClazz && 0 != this.ezEnclosingClazz.length) {
            em = this.ezEnclosingMethodDef && 'string' === this.ezEnclosingMethod && 0 != this.ezEnclosingMethod.length
                ? `${em} in a call to ${this.ezClassName}.${this.ezEnclosingMethodDef}.`
                : `${em} in a call to a method nn ${this.ezClassName}.`
        } else if (this.ezEnclosingMethod && 'string' === this.ezEnclosingMethod && 0 != this.ezEnclosingMethod.length) {
            em = `${em} in a call to method ${this.ezEnclosingMethodDef}`;
        }

        return this.ezAdditionalMessage && 'string' === this.ezAdditionalMessage && 0 != this.ezAdditionalMessage.length
            ? `${em} [Additional info: ${this.ezAdditionalMessage}]`
            : em;
    }

    /**
     * @public @method
     * Returns the error message for this exception
     */
    toString() {
        return this.message;
    }
}
