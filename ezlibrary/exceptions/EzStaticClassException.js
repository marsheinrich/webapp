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
    @extends {EzException}
    @description
    An exception for static only classes where someone has attempted to create a new instance of.
    ---------------------------------------------------------------------------
    WARNING:
        1) Do not import /ezlibrary/exceptions/EzExceptions.js into this class
    ---------------------------------------------------------------------------
    Import with:
        import {
            // EzException,
            // EzExceptionInClassMethod,
            // EzBadParamException,
            // EzBadStateException,
            EzStaticClassException,
            // EzNotSupportedException
        } from '/ezlibrary/exceptions/EzExceptions.js';
    ---------------------------------------------------------------------------
 */
export class EzStaticClassException extends EzException {
    /**
        @static
        @public @readonly @property
        Returns the default error message for this exception.
        @returns {string}
     */
    static get DEFAULT_STATIC_CLASS_ERROR_MESSAGE() {
        return 'Class is considered static and forbids creating new instances. In addition, you may only access static method, fields, and properties.';
    }

    /**
        @public @constructor
        Creates a new instance of EzStaticClassException
        @param {undefined|null|string} classRefOrName
        @param {undefined|null|Error} cause
     */
    constructor(classRefOrName, cause) {
        super(EzStaticClassException.DEFAULT_STATIC_CLASS_ERROR_MESSAGE, cause);

        if (classRefOrName) {
            this.ezClassRefOrName = classRefOrName;
            this.#ezBuildExceptionMessage();
        }
    }

    /**
        @private @field`
        Stores the class name if provided.
        @type {string}
     */
    #ezClassName = '';

    /**
        @public @property @getter
        Gets the class name.
        @returns {string}
     */
    get ezClassName() {
        return this.#ezClassName;
    }

    /**
        @public @property @getter
        Gets the class name.
        @returns {undefined|null|Class|string}
     */
    set ezClassName(classRefOrName) {
        this.#ezClassName = this.ezDetermineClassName(classRefOrName);
    }

    /**
        @protected @method
        Determines the the name of the class from the provided classRefOrName with the following evaluations:
        If the globalThis.ezApi is not available then:
            1) If classRefOrName is a non-empty string, then the classRefOrName is returned.
            2) Otherwise, a blank string is returned.
        If the glboalThis.ezApi instance is available then:
            1) If classRefOrName is a non-empty string, then the classRefOrName is returned.
            2) If classRefOrName is a function reference then the classRefOrName.prototype.constructor.name is returned.
            3) If classRefOrName is an object reference then the object's constructor.name is returned.
            4) For all other cases, a blank string is returned.
        @param {undefined|null|string|class} classRefOrName
        @returns {string}
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
        @private @method
        Builds an exception error message from the available exception data.
     */
    #ezBuildExceptionMessage() {
        this.message = this.ezClassName && 'string' === this.ezClassName && 0 != this.ezClassName.length
            ? `Class ${this.ezClassName} is considered a static class forbids creation of new instances.` +
                'In addition, you may only access the static methods, fields, and properties of the class.'
            : EzStaticClassException.DEFAULT_STATIC_CLASS_ERROR_MESSAGE
    }
}
