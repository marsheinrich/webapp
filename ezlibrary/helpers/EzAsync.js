import { EzStaticClass } from '/ezlibrary/EzStaticClass.js';

import { EzObject } from '/ezlibrary/helpers/EzObject.js';
import { EzString } from '/ezlibrary/helpers/EzString.js';
import { EzFunction } from '/ezlibrary/helpers/EzFunction.js';
import { EzError } from '/ezlibrary/helpers/EzError.js';
import { EzConsole } from '/ezlibrary/helpers/EzConsole.js';

import {
    EzException,
    EzBadParamException
} from '/ezlibrary/exceptions/EzExceptions.js';


/*
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    ENGINEERING NOTES
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    DO NOT IMPORT THE FOLLOWING INTO THIS CLASS:
        1) import { EzApi } from '/public/common/javascript/ezapi.js';
        2) import { EzUI } from '/public/common/javascript/ezui.js';
        3) import { ezUI } from '/public/common/javascript/ezui.js';
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

/**
 * @class
 * @extends {EzStaticClass}
 * @description
 * Static class that provides utility methods and properties for numbers
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Import with:
 *     import { EzAsync } from '/ezlibrary/helpers/EzAsync.js';
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
export class EzAsync extends EzStaticClass {
    /**
     * @static
     * @readonly @property
     * Constant message: 'Async operation failed: '
     * @returns {string}
     */
    static get ASYNC_OPERATION_FAILED_MSG() {
        return 'Async operation failed: ';
    }

    /**
     * @static
     * @readonly @property
     * Constant message: 'Async operation encountered an unexpected error.'
     * @returns {string}
     */
    static get ASYNC_OPERATION_ENCOUNTERED_UNEXPECTED_ERROR_MSG() {
        return 'Async operation encountered an unexpected error.';
    }

    /**
     * @static
     * @public @method
     * Wraps the creation of a promise into the ezApi
     * @param {Function} aFunction
     */
    static async promise(functionToCall) {
        if (!EzFunction.isFunction(functionToCall)) {
            throw new EzBadParamException(
                'functionToCall',
                EzAsync.ezInstance,
                EzAsync.ezInstance.ezPromise);
        }

        return new Promise(functionToCall);
    }

    /**
     * @static
     * @public @method
     * Generic handler for a Promise.catch callback.
     * Attempts to log as much details about the error then throws the generic
     * EzException exception.
     * @param {undefined|null|object} err
     */
    static handlePromiseCatch(err) {
        let em = '[Unhandled Promise.catch]';

        if (EzObject.isValid(err)) {
            if (EzObject.isValid(err.errorCode)) {
                em = `${em}:[Error code: ${err.errorCode.toString()}]`;
            }

            if (EzString.stringHasLength(err.message)) {
                em = `${em}:[Error reported: ${err.message}]`;
            }

            if (EzObject.isValid(err.stack)) {
                em = `${em}:[Stack trace: ${err.stack}]`;
            }
        }

        if (EzObject.hasOwnProperty(globalThis, 'console') && EzObject.hasOwnProperty(globalThis.console, 'error')) {
            globalThis.console.error(em);
        }

        throw new EzException(em, err);
    }

    /**
     * @static
     * @public @method
     * Provides the method for handling Promise.reject call backs with zero processing.
     */
    static ignoreReject() {
        if (EzObject.hasOwnProperty(globalThis, 'console') && EzObject.hasOwnProperty(globalThis.console, 'debug')) {
            globalThis.console.debug('Ignored Promise.reject call back.');
        }
    }

    /**
     * @static
     * @public @method
     * Provides the method for handling Promise.resolve call backs with zero processing.
     */
    static ignoreResolve() {
        // promise resolve handler, does nothing
        if (EzObject.hasOwnProperty(globalThis, 'console') && EzObject.hasOwnProperty(globalThis.console, 'debug')) {
            globalThis.console.debug('Ignored Promise.resolve call back.');
        }
    }

    /**
     * @static
     * @public @method
     * Provides the method for handling async finished (aka Promise.resolve) callbacks with with zero processing.
     */
    static ignoreFinished() {
        if (EzObject.hasOwnProperty(globalThis, 'console') && EzObject.hasOwnProperty(globalThis.console, 'debug')) {
            globalThis.console.debug('Ignored async finished (aka Promise.resolve) call back.');
        }
    }

    /**
     * @static
     * @public @method
     * Provides a method for handle Promise.catch call backs.
     * @param {undefined|null|Error} err
     */
    static ignoreCatch(err) {
        // Promise catch handler that does nothing more than log
        if (EzObject.hasOwnProperty(globalThis, 'console') && EzObject.hasOwnProperty(globalThis.console, 'error')) {
            globalThis.console.error(
                `Generic handle of Promise.catch. ${err && err.message ? err.message : ''}` +
                `${err && err.stack ? err.stack : ''}`);
        }
    }

    /**
     * @static
     * @public @method
     * Returns the response in a Promise.resolve().
     * @param {undefined|null|*} response
     * @returns {Promise.resolve}
     */
    static async finished(response) {
        return EzAsync.resolve(response);
    }

    /**
     * @static
     * @public @method
     * Returns the response in a Promise.resolve().
     * @param {undefined|null|*} response
     * @returns {Promise.resolve}
     */
    static async resolve(response) {
        return Promise.resolve(response);
    }

    /**
     * @static
     * @public @method
     * Executes Promise.reject passing the provided response.
     * If the response is a string, an error is also logged.
     * @param {undefined|null|*} response
     * @returns {Promise.reject}
     */
    static async reject(response) {
        return Promise.reject(response);
    }

    /**
     * @static
     * @public @method
     * EzClocker's alternative name to a resolve only promise.
     * Calls the provided functionToCall and passes in a
     * reference to a function callback (aka Promise.resolve function)
     * (Use function callback param name 'finished').
     * The functionToCall will then call the provided finished callback
     * function (passing what ever parameters to include in the response)
     * when all processing is complete.
     * Example:
     * // Function definition
     * let myAsyncActions = () => {
     *     return EzAsync.asyncAction(
     *         (finished) -> {
     *             // Perform actions ...
     *             return finished(aResult);
     *         });
     * }
     *
     * // Caller of function
     * myAsyncActions.then(
     *     (result) => {
     *         // Do something with result ...
     *     });
     * @param {Function) aFunction
     * @returns
     * Returns the result returned from the functionToCall
     */
    static async asyncAction(functionToCall) {
        if (!EzFunction.isFunction(functionToCall)) {
            throw new EzBadParamException(
                'functionToCall',
                EzAsync,
                EzAsync.asyncAction);
        }

        try {
            return new Promise(
                (finished) => functionToCall(finished));
        } catch (err) {
            return EzAsync.promiseCatchHandler(
                err,
                Promise.resolve);
        }
    }

    /**
     * @static
     * @public @method
     * Returns a Promise.reject response and passed the function arguments back in the reject.
     * @returns {Promise.reject}
     * Reject contains the arguments passed to this function.
     */
    static async rejected(...rejectedArguments) {
        return Promise.reject(rejectedArguments);
    }

    /**
     * @static
     * @public @method
     * Returns a Promise.resolve response and passed the function arguments back in the resolve.
     * @returns {Promise.resolve}
     * Resolve contains the arguments passed to this function.
     */
    static async accepted(...rejectedArguments) {
        return Promise.resolve(rejectedArguments);
    }

    /**
     * @public
     * Handles a promise.catch
     * @param {object} err
     * @returns {Promise.reject}
     */
    static promiseCatchHandler(err, resolveRejectCatch) {
        err = EzError.errorOrDefault(
            err,
            new EzException(EzAsync.ASYNC_OPERATION_ENCOUNTERED_UNEXPECTED_ERROR_MSG));

        // Log the automaticlly caught exception
        EzConsole.error(
            EzString.em`
                ${EzAsync.ASYNC_OPERATION_FAILED_MSG}
                [${err.errorCode}] ${err.message}`,
            err);

        // Fall back to returning Promnise.reject(err)
        return EzFunction.isFunction(resolveRejectCatch)
            ? resolveRejectCatch(err)
            : err;
    }
}
