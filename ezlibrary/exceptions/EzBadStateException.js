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

import {
    EzExceptionInClassMethod
} from '/ezlibrary/exceptions/EzExceptionInClassMethod.js';

/**
 * @class {EzBadStateException}
 * @extends {EzExceptionInClassMethod}
 * @description
 * An exception for when a bad UX state is detected.
 * ---------------------------------------------------------------------------
 * WARNING:
 *     1) Do not import /ezlibrary/exceptions/EzExceptions.js into this class
 * ---------------------------------------------------------------------------
 * Import when you also import other exception classes:
 *     import {
 *         EzBadParamException,
 *         ... other supported exception classes ...
 *     } from '/ezlibrary/exceptions/EzExceptions.js';
 * ---------------------------------------------------------------------------
 * Example:
 *     throw new EzBadStateException(
 *         {expected_state_message},
 *         {detected_state_message},
 *         {class_reference_or_string_name_of_class_with_method_that_threw_exception}
 *         {method_reference_or_string_method_name_where_exception_was_thrown},
 *         {optional_additional_message},
 *         {optional_caused_by_exception_reference});
 * ---------------------------------------------------------------------------
 */
export class EzBadStateException extends EzExceptionInClassMethod {
    /**
        @public @readonly @property
        Gets the default error message for EzBadStateException
        @returns {string}
     */
    static get DEFAULT_BAD_UX_STATE_ERROR_MESSAGE() {
        return 'A bad UX state was detected';
    }

    /**
        @public @readonly @property
        Gets the default expected state message
        @returns {string}
     */
    static get DEFAULT_EXPECTED_STATE_MESSAGE() {
        return 'Expected a defined UX state';
    }

    /**
        @public @readonly @property
        Gets the default incorrect state message
        @returns {string}
     */
    static get DEFAULT_INCORRECT_STATE_MESSAGE() {
        return 'Detected a incorrect or unexpected UX state';
    }

    /**
        @public @constructor
        Creates a new instance of EzUxFlowException
        @param {undefined|nulll, string} expectedState,
        Default is: 'A specificilly defined UX state.'
        @param {undefined|null|string} detectedState
        Default is: 'A incorrect or unexpected UX state.'
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
        @param {undefined|null|string} additionalMessage
        @param {undefined|null|Object} cause
        Default is null.
     */
    constructor(expectedState, detectedState, classRefOrName, enclosingMethodRefOrMethodDef, additionalMessage, cause) {
        super(
            EzBadStateException.DEFAULT_BAD_UX_STATE_ERROR_MESSAGE,
            // Null is passed to skip generating the parent classes exception message for no reason
            null,
            // Null is passed to skip generating the parent classes exception message for no reason
            null,
            cause);

        if (expectedState || detectedState || classRefOrName || enclosingMethodRefOrMethodDef || additionalMessage) {
            this.ezExpectedState = expectedState;
            this.detectedState = detectedState;
            this.ezClassName = classRefOrName;
            this.enclosingMethod = enclosingMethodRefOrMethodDef;
            this.ezAdditionalMessage = additionalMessage;
            this.message = this.ezBuildExceptionMessage();
        }
    }

    /**
        @private @field
        Stores the expected state message.
        Default is: EzBadStateException.DEFAULT_EXPECTED_STATE_MESSAGE
        @type {string}
     */
    #ezExpectedState = EzBadStateException.DEFAULT_EXPECTED_STATE_MESSAGE;

    /**
        @public @property @getter
        Gets the expected state message.
        @returns {string}
     */
    get ezExpectedState() {
        return this.#ezExpectedState;
    }

    /**
        @public @property @setter
        Sets the expected state message.
        Default is: EzBadStateException.DEFAULT_EXPECTED_STATE_MESSAGE
        @param {undefined|null|string} expectedState
     */
    set ezExpectedState(expectedState) {
        this.#ezExpectedState = expectedState && 'string' === typeof expectedState && 0 != expectedState.length
            ? expectedState
            : EzBadStateException.DEFAULT_EXPECTED_STATE_MESSAGE;
    }

    /**
        @private @field
        Stores the incorrect state message.
        Default is: EzBadStateException.DEFAULT_INCORRECT_STATE_MESSAGE
        @type {string}
     */
    #ezIncorrectState = EzBadStateException.DEFAULT_INCORRECT_STATE_MESSAGE;

    /**
        @public @property @getter
        Gets the incorrect state message.
        @returns {string}
     */
    get ezIncorrectState() {
        return this.#ezIncorrectState;
    }

    /**
        @public @property @setter
        Sets the incorrect state message.
        Default is: EzBadStateException.DEFAULT_INCORRECT_STATE_MESSAGE
        @param {undefined|null|string} expectedState
     */
    set ezIncorrectState(incorrectState) {
        this.#ezIncorrectState = incorrectState && 'string' === typeof incorrectState && 0 != incorrectState.length
            ? incorrectState
            : EzBadStateException.DEFAULT_INCORRECT_STATE_MESSAGE;
    }

    /**
        @private @field
        Stores the additional message (if provided)
        Default is blank string.
        @type {string}
     */
    #ezAdditionalMessage = '';

    /**
        @public @property @getter
        Gets the additional message (if provided)
        @returns {string}
     */
    get ezAdditionalMessage() {
        return this.#ezAdditionalMessage;
    }

    /**
        @public @property @setter
        Sets the additional message based upon the following evaluations of the provided additionalMessage:
        @param {string} paramName
     */
    set ezAdditionalMessage(additionalMessage) {
        this.#ezAdditionalMessage = additionalMessage && 'string' === typeof additionalMessage
            ? additionalMessage
            : '';
    }

    /**
        @protected @method
        Builds the exception message from the available exception data.
        When none of the available exception data can be used to build an error message, then the
        default exception EzBadStateException.DEFAULT_BAD_UX_STATE_ERROR_MESSAGE value is returned
        @returns {string}
     */
    ezBuildExceptionMessage() {
        let em = EzBadStateException.DEFAULT_BAD_UX_STATE_ERROR_MESSAGE;

        if (this.ezClassName && 'string' === typeof this.ezClassName && 0 != this.ezClassName.length) {
            em = null == this.ezEnclosingMethodDef && 'string' === typeof this.ezEnclosingMethodDef && 0 != this.ezEnclosingMethodDef.length
                ? `${em} in class ${this.ezClassName}`
                : `${em} in a call to ${this.className}.${this.enclosingMethodName}`
        } else if (this.ezEnclosingMethodDef && 'string' === typeof this.ezEnclosingMethodDef && 0 != this.ezEnclosingMethodDef.length) {
            em = `${em} in call to method ${this.ezEnclosingMethodDef}`;
        }

        if (this.ezAdditionalMessage && 'string' === typeof this.ezAdditionalMessage && 0 != this.ezAdditionalMessage.length) {
            em = `${em} - ${this.ezAdditionalMessage}`;
        }

        if (this.ezExpectedState && 'string' === typeof this.ezExpectedState && 0 != this.ezExpectedState.length) {
            em = `${em} [Expected state: ${this.ezExpectedState}]`;
        }

        if (this.ezIncorrectState && 'string' === typeof this.ezIncorrectState && 0 != this.ezIncorrectState.length) {
            em = `${em} [Incorrect state: ${this.ezIncorrectState}]`;
        }

        if (this.cause) {
            if (this.cause.message && 'string' === typeof this.cause.message && 0 != this.cause.message.length) {
                em = `${em} [Caused by: ${this.cause.message}]`;
            }

            if (cause.stack) {
                em =`${em} [Stack: ${this.cause.stack}]`;
            }
        }

        return em;
    }
}
