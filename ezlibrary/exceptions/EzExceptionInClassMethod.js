/*
    ---------------------------------------------------------------------------
    WARNING:
        1) Do not import the following modules into this module:
            import {
                ...
            } from '/ezlibrary/enums/EzEnumerations.js';
            import {
                ...
            } from '/ezlibrary/helpers/EzHelpers.js';
            import {
                ...
            } from '/ezlibrary/exceptions/EzExceptions.js';
        2) Can import other exception classes individually
    ---------------------------------------------------------------------------
*/

import { EzException } from '/ezlibrary/exceptions/EzException.js';

/**
 * @class {EzExceptionInClassMethod}
 * @extends {EzException}
 * @description
 * An exception to throw when the class reference or name and/or enclosing method reference or method definition string is known.
 * ---------------------------------------------------------------------------
 * WARNING:
 *     1) Do not import /ezlibrary/exceptions/EzExceptions.js into this class
 * ---------------------------------------------------------------------------
 * Import with:
 *     import {
 *         // EzException,
 *         EzExceptionInClassMethod,
 *         // EzBadParamException,
 *         // EzBadStateException,
 *         // EzStaticClassException,
 *         // EzNotSupportedException
 *     } from '/ezlibrary/exceptions/EzExceptions.js';
 * ---------------------------------------------------------------------------
 */
export class EzExceptionInClassMethod extends EzException {
    /**
     * @public @static @method
     * Converts the provided function reference to a string based upon the following:
     *     * If the function has parameters then the format is:
     *       {function_name}({function_param_1}, {function_param_2}, ..., {function_param_n})
     *     * If the function does not have parameters then the format is:
     *         {function_name}()
     * @param {function}
     * @returns {string}
     */
    static functionToMethodNameAndParams(functionRef) {
        if (!ezApi.ezIsFunction(functionRef)) {
            throw new EzBadParamException(
                'functionRef',
                EzBadParamException.name,
                EzBadParamException.functionToMethodNameAndParams);
        }

        let functionDefinition = functionRef.toString();

        try {
            // Strip out the function keyword
            functionDefinition = functionDefinition.substring(
                'function '.length,
                functionAsString.length - 1);

            // Stop out the function implementation
            functionDefinition = functionDefinition.substring(
                0,
                functionAsString.indexOf('){') + 1);
        } catch (err) {
            ezApi.ezclocker.ezLogger.ezLogException(
                'An unexpected error occurred while transforming a function reference to a ' +
                'function definition string.' +
                `Error reported: ${err.message}`);
        }

        // If the resulting function defintion is undefined, null, or an empty string then
        // just return functionRef.toString(). Otherwise, return the functionDefinition string.
        return ezApi.ezStringHasLength(functionDefinition)
            ? functionDefinition
            : functionRef.toString();
    }

    /**
     * @public @constructor
     * @param {undefined|null|string} message
     * Default is: The default EzException error message
     * Default error message defined in EzException.DEFAULT_ERROR_MESSAGE
     * @param {undefined|null|string|class} classNameOrRef
     * The class name is determined with the following evaluation:
     *     * If ezClassNameOrDef is a class reference then the constructor name of the class is assigned.
     *     * If ezClassNameOrDef is a function then the function's constructor name is assigned.
     *     * If the ezClassNameOrDef is a string, then the ezClassNameOfDev value is assigned.
     *     * If the ezClassNameOrDef is an object then the object's constructor name is assigned.
     *     * Otherwise, a blank string is assigned.
     * Default is: ''
     * @param {undefined|null|string|function} enclosingMethodDefOrRef
     * The enclosingMethodDef is determined with the following evaluations on the provided enclosingMethodDefOrRef:
     *     * If the enclosingMethodDefOrRef is a method reference then the method definition is assigned (method name and parameters)
     *     * If the enclosingMethodDefOrRef is a non-empty string the the enclosingMethodDefOrRef is assigned
     *     * If the enclosingMethodDefOrRef is an object then the object.toString() is assigned.
     *     * Otherwise, a blank string is assigned.
     * Default is: ''
     * @param {undefined|null|Error} cause
     * Default is: null
     */
    constructor (message, classRefOrName, enclosingMethodRefOrMethodDef, cause) {
        super(message, cause);

        if (classRefOrName || enclosingMethodRefOrMethodDef) {
            this.ezClassName = classRefOrName;
            this.ezEnclosingMethodDef = enclosingMethodRefOrMethodDef;
            this.message = this.ezBuildExceptionMessage();
        }
    }

    /**
     * @private @field
     * Stores the name of the class (if provided)
     * @type {string}
     */
    #ezClassName = '';
    /**
     * @public @property @getter
     * Gets the name of the class (if provided)
     * @returns {string}
     */
    get ezClassName() {
        return this.#ezClassName;
    }
    /**
     * @public @property @getter
     * Sets the name of the class by evaluating the provided ezClassNameOrDef:
     *     * If ezClassNameOrDef is a class reference then the constructor name of the class is assigned.
     *     * If ezClassNameOrDef is a function then the function's constructor name is assigned.
     *     * If the ezClassNameOrDef is a string, then the ezClassNameOfDev value is assigned.
     *     * If the ezClassNameOrDef is an object then the object's constructor name is assigned.
     *     * Otherwise, a blank string is assigned.
     * @returns {undefined|null|class|string}
     */
    set ezClassName(classRefOrName) {
        this.#ezClassName = undefined != classRefOrName && null != classRefOrName
            ? this.ezDetermineClassName(classRefOrName)
            : '';
    }

    /**
     * @private @field
     * Stores the enclosing method definition where the exception occurred (if provided).
     * Default is: ''
     * @type {string}
     */
    #ezEnclosingMethodDef = '';
    /**
        @public @property @getter
        Gets the enclosing method definition where the exception occurred (if provided).
        @returns {string}
     */
    get ezEnclosingMethodDef() {
        return this.#ezEnclosingMethodDef;
    }
    /**
     * @public @property @setter
     * The assigned value determined from the provided enclosingMethodDefOrName with the following evaluations:
     *     * If the enclosingMethodDefOrName is a method reference then the method's definition string is assigned (method name and parameters).
     *     * If the enclosingMethodDefOrName is a non-empty string the the enclosingMethodDefOrRef is assigned.
     *     * If the enclosingMethodDefOrName is an object then the result of object.toString() is assigned.
     *     * Otherwise, a blank string is assigned.
     * Default is: ''
     * @param {undefined|null|function|string} enclosingMethodRefOrDef
     */
    set ezEnclosingMethodDef(enclosingMethodRefOrDef) {
        this.#ezEnclosingMethodDef = undefined != enclosingMethodRefOrDef && null != enclosingMethodRefOrDef
            ? this.ezDetermineEnclosingMethodDefinition(enclosingMethodRefOrDef)
            : '';
    }

    /**
     * @protected @method
     * Builds the exception message from the available exception data.
     * When none of the available exception data can be used to build an error message, then the
     * default exception EzException.DEFAULT_ERROR_MESAGE value is returned
     * @returns {string}
     */
    ezBuildExceptionMessage() {
        let em = EzException.DEFAULT_ERROR_MESSAGE;

        if (this.ezClassName && 'string' === this.ezClassName && 0 != this.ezClassName.length) {
            em = null == this.ezEnclosingMethodDef && 'string' === this.ezEnclosingMethodDef && 0 != this.ezEnclosingMethodDef.length
                ? `${em} in class ${this.ezClassName}`
                : `${em} in a call to ${this.className}.${this.enclosingMethodName}`
        } else if (this.ezEnclosingMethodDef && 'string' === this.ezEnclosingMethodDef && 0 != this.ezEnclosingMethodDef.length) {
            em = `${em} in call to method ${this.ezEnclosingMethodDef}`;
        }

        if (message && 'string' === typeof message && 0 != message.length) {
            em = `${em}: ${message}`;
        }

        if (cause) {
            if (cause.message && 'string' === typeof cause.message && 0 != cause.message.length) {
                em = `${em} [Caused by: ${cause.message}]`;
            }
            if (cause.stack) {
                em =`${em} [Stack: ${cause.stack}]`;
            }
        }

        return em;
    }

    /**
     * @protected @method
     * Determines the the name of the class from the provided classRefOrName with the following evaluations:
     * If the globalThis.ezApi is not available then:
     *     1) If classRefOrName is a non-empty string, then the classRefOrName is returned.
     *     2) Otherwise, a blank string is returned.
     * If the glboalThis.ezApi instance is available then:
     *     1) If classRefOrName is a non-empty string, then the classRefOrName is returned.
     *     2) If classRefOrName is a function reference then the classRefOrName.prototype.constructor.name is returned.
     *     3) If classRefOrName is an object reference then the object's constructor.name is returned.
     *     4) For all other cases, a blank string is returned.
     * @param {undefined|null|string|class} classRefOrName
     * @returns {string}
     */
    ezDetermineClassName(classRefOrName) {
        if (undefined == classRefOrName || null == classRefOrName) {
            return '';
        }

        if (!Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') || !globalThis.ezApi) {
            return 'string' === typeof classRefOrName && 0 < classRefOrName.length
                ? classRefOrName
                : '';
        }

        if (ezApi.ezIsString(classRefOrName) && ezApi.ezStringHasLength(classRefOrName)) {
            return classRefOrName;
        }

        if (ezApi.ezIsFunction(classRefOrName)) {
            return classRefOrName.prototype.constructor.name;
        }

        if (ezApi.ezIsObject(classRefOrName)) {
            return classRefOrName.constructor.name;
        }

        return '';
    }

    /**
     * @protected @method
     * Determines a method definition string from the provided enclosingMethodDefOrName with the following evaluations:
     * If the globalThis.ezApi instance IS NOT available:
     *     1) If the enclosingMethodDefOrName is a non-empty string then the enclosingMethodDefOrName is returned.
     *     2) For all other cases a blank string is returned.
     * If the globalThis.ezApi instance IS available:
     *     1) If the enclosingMethodDefOrName is a function reference then the result of
     *        EzExceptionInClassMethod.functionToMethodNameAndParams(enclosingMethodDefOrName) is returned.
     *     2) If the enclosingMethodDefOrName is a string then the enclosingMethodDefOrName is returned.
     *     3) For all other cases a blank string is returned.
     * @param {string|function|null} enclosingMethodDefOrName
     * @returns {string}
     */
    ezDetermineEnclosingMethodDefinition(enclosingMethodDefOrName) {
        if (undefined == enclosingMethodDefOrName || null == enclosingMethodDefOrName) {
            return '';
        }

        if (!Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') || !globalThis.ezApi) {
            return enclosingMethodDefOrName && 'string' === typeof enclosingMethodDefOrName && 0 < enclosingMethodDefOrName.length
                ? enclosingMethodDefOrName
                : '';
        }

        if (ezApi.ezIsFunction(enclosingMethodDefOrName)) {
            return EzExceptionInClassMethod.functionToMethodNameAndParams(enclosingMethodDefOrName);
        }

        if (ezApi.ezIsString(enclosingMethodDefOrName) && 0 < enclosingMethodDefOrName.length) {
            return enclosingMethodDefOrName;
        }

        return '';
    }
}
