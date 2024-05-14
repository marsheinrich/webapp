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

import { EzExceptionInClassMethod } from '/ezlibrary/exceptions/EzExceptionInClassMethod.js';

/**
    @class {EzBadParamDataException}
    @extends {EzExceptionInClassMethod}
    @description
    Exception for function parameters who's data fails validation
    ---------------------------------------------------------------------------
    WARNING:
        1) Do not import /ezlibrary/exceptions/EzExceptions.js into this class
    ---------------------------------------------------------------------------
    Import with:
        import { EzBadParamDataException } from '/ezlibrary/exceptions/EzBadParamDataException.js';
    ---------------------------------------------------------------------------
    Import when you also import other exception classes:
        import {
            EzBadParamDataException,
            ... other supported exception classes ...
        } from '/ezlibrary/exceptions/EzExceptions.js';
    ---------------------------------------------------------------------------
 */
export class EzBadParamDataException extends EzExceptionInClassMethod {
    /**
        @static
        @public @readonly @property
        Returns the default message for EzBadParamException
        @returns {string}
     */
    static get DEFAULT_BAD_PARAM_ERROR_MESSAGE() {
        return 'A valid parameter is required';
    }

    /**
        @public @constructor
        Creates a new instance of EzBadParamException
        @param {undefined|null|string} paramName
        The parameter name is determined with the following evaluations on the provided paramName:
            1) If paramName is undefined or null then a blank string is assigned.
            2) If the paramName is a non-empty string then the paramName is assigned.
            3) For all other cases a blank string is assigned.
        @param {undefined|null|string} paramPropertyName
        Default is: ''
        @param {undefined|null|string} expectedCondition
        Default is: ''
        @param {undefined|null|string|class} classRefOrName
        The class name is determined with the following evaluation:
            1) If ezClassNameOrDef is a class reference then the constructor name of the class is assigned.
            2) If ezClassNameOrDef is a function then the function's constructor name is assigned.
            3) If the ezClassNameOrDef is a string, then the ezClassNameOfDev value is assigned.
            4) If the ezClassNameOrDef is an object then the object's constructor name is assigned.
            5) Otherwise, a blank string is assigned.
        @param {undefined|null|string|function} enclosingMethodRefOrMethodDef
        The enclosingMethodDef is determined with the following evaluations on the provided enclosingMethodDefOrRef:
            1) If the enclosingMethodDefOrRef is a method reference then the method definition is assigned (method name and parameters)
            2) If the enclosingMethodDefOrRef is a non-empty string the the enclosingMethodDefOrRef is assigned
            3) If the enclosingMethodDefOrRef is an object then the object.toString() is assigned.
            4) Otherwise, a blank string is assigned.
        @param {undefined|null|Object} cause
            Default is: null
     */
    constructor(paramName, paramPropertyName, expectedCondition, actualCondition, classRefOrName, enclosingMethodRefOrMethodDef, cause) {
        super(
            EzBadParamException.DEFAULT_BAD_PARAM_ERROR_MESSAGE,
            null,
            null,
            cause);

            this.ezAssignConstructorParams(
                paramName,
                paramPropertyName,
                expectedCondition,
                actualCondition,
                classRefOrName,
                enclosingMethodRefOrMethodDef,
                additionalMessage);
    }

    /**
        @private @method
        Assigns the constructor parameters to their properties and builds the exception message if any of the constructor
        params are valid.
        If all params are undefined or null, then the exception message is not generated.
        @param {undefined|null|string} paramName
        @param {undefined|null|string} paramPropertyName
        @param {undefined|null|string} expectedCondition
        @param {undefined|null|string} actualCondition
        @param {undefined|null|string|class} classRefOrName
        @param {undefined|null|string|function} enclosingMethodRefOrMethodDef
     */
    #ezAssignConstructorParams(paramName, paramPropertyName, expectedCondition, actualCondition, classRefOrName, enclosingMethodRefOrMethodDef) {
        if (!ezApi.ezAnyValid(
            paramName,
            paramPropertyName,
            expectedCondition,
            actualCondition,
            classRefOrName,
            enclosingMethodRefOrMethodDef)) {
            return;
        }

        if (paramName) {
            this.paramName = paramName;
        }

        // Only perform the actions if any of the constructor params are valid.
        if (paramPropertyName) {
            this.ezParamPropertyName = paramPropertyName;
        }

        if (expectedCondition) {
            this.ezExpectedCondition =  expectedCondition;
        }

        if (actualCondition) {
            this.actualCondition = actualCondition;
        }

        if (classRefOrName || enclosingMethodRefOrMethodDef) {
            this.ezClassName = classRefOrName;
            this.ezEnclosingMethodDef = enclosingMethodRefOrMethodDef;
        }

        // Build the message from the available data
        this.message = this.ezBuildExceptionMessage();
    }

    /**
        @private @field
        Stores the parameter's property name who's data is not valid.
        @type {string}
     */
    #ezParamPropertyName = '';

    /**
        @public @property @getter
        Gets the parameter's property name who's data is not valid.
        @returns {string}
     */
    get ezParamPropertyName() {
        return this.#ezParamPropertyName;
    }

    /**
        @public @property @setter
        Sets the parameter's property name who's data is not valid.
        @param {string} paramPropertyName
     */
    set ezParamPropertyName(paramPropertyName) {
        this.#ezParamPropertyName = ezApi.ezStringOrEmpty(paramPropertyName);
    }

    /**
        @private @field
        Stores the expected data condition for parameter's property value.
        @type {string}
     */
    #ezExpectedCondition = '';

    /**
        @public @property @getter
        Gets the expected data condition for parameter's property value.
        @returns {string}
     */
    get ezExpectedCondition() {
        return this.#ezExpectedCondition;
    }

    /**
        @public @property @setter
        Sets the expected data condition for parameter's property value.
        @param {string} expectedCondition
     */
    set ezExpectedCondition(expectedCondition) {
        this.#ezExpectedCondition = ezApi.ezStringOrEmpty(expectedCondition);
    }

    /**
        @private @field
        Stores the actual data condition for parameter's property value.
        @type {string}
     */
    #ezActualCondition = '';

    /**
        @public @property @getter
        Gets the actual data condition for parameter's property value.
        @returns {string}
     */
    get ezActualCondition() {
        return this.#ezActualCondition;
    }

    /**
        @public @property @setter
        Sets the actual data condition for parameter's property value.
        @param {string} actualCondition
     */
    set ezActualCondition(actualCondition) {
        this.#ezActualCondition = ezApi.ezStringOrEmpty(actualCondition);
    }

    /**
        @private @field
        Stores the parameter name (if provided)
        Default is blank string.
        @type {string}
     */
    #ezParamName = '';

    /**
        @public @property @getter
        Gets the parameter name (if provided)
        @returns {string}
     */
    get ezParamName() {
        return this.#ezParamName;
    }

     /**
        @public @property @setter
        Sets the parameter name
        @param {string} paramName
     */
    set ezParamName(paramName) {
        this.#ezParamName = paramName && 'string' === typeof paramName
            ? paramName
            : '';
    }

    /**
        @protected @method
        Returns the additional message string after the following evaluations:
            1) If additionalMessage is undefined or null then a blank string is returned.
            2) If additionalMessage is a non-empty string then the string ` ${additionalMesage}` is returned.
            3) For all other cases a blank string is returned.
        @param {undefined|null|string} additionalMessage
        @returns {string}
     */
    ezDetermineAdditionalMessage(additionalMessage) {
        if (undefined == additionalMessage || null == additionalMessage) {
            return '';
        }

        if (!Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') || !globalThis.ezApi) {
            return 'string' === typeof additionalMessage && 0 < additionalMessage.length
                ? ` ${additionalMessage}`
                : '';
        }

        return ezApi.ezStringHasLength(additionalMessage)
            ? ` ${additionalMessage}`
            : '';
    }

    /**
        @override
        @protected @method
        Builds the exception message from the available exception data.
        When none of the available exception data can be used to build an error message, then the
        default the value from EzBadParamException.DEFAULT_BAD_PARAM_ERROR_MESSAGE is returned.
     */
    ezBuildExceptionMessage() {
        let em = 'Detected bad or unexpected data ';

        if (this.ezParamName && 'string' === this.ezParamName && 0 != this.ezParamName.length) {
            em = `${em} for ${this.ezParamName}`
        }

        if (this.ezParamPropertyName && 'string' === this.ezParamPropertyName && 0 != this.ezParamPropertyName.length) {
            em = `${em}.${this.ezParamPropertyName}`;
        }

        if (this.ezClassName && 'string' === this.ezClassName && 0 != this.ezClassName.length) {
            em = this.ezEnclosingMethodDef && 'string' === this.ezEnclosingMethodDef && 0 != this.ezEnclosingMethodDef.length
                ? `${em} in a call to ${this.ezClassName}.${this.ezEnclosingMethodDef}`
                : `${em} in a method call in ${this.ezClassName}.`
        } else if (this.ezEnclosingMethodDef && 'string' === this.ezEnclosingMethodDef && 0 != this.ezEnclosingMethodDef.length) {
            em = `${em} in a call to ${this.ezEnclosingMethodDef}`;
        }

        if (this.ezExpectedCondition && 'string' === this.ezExpectedCondition && 0 != this.ezExpectedCondition.length) {
            em = `${em} [Expected: ${this.ezExpectedCondition}]`;
        }

        return this.ezActualCondition && 'string' === this.ezActualCondition && 0 != this.ezActualCondition.length
            ? `${em} [Actual: ${this.ezActualCondition}]`
            : em;
    }

    /**
        @public @method
        Returns the error message for this exception
     */
    toString() {
        return this.message;
    }
}
