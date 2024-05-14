/*
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    ENGINEERING NOTES
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    Do not import the following into this file:
        import { EzApi } from '/public/common/javascript/ezapi.js';
        import { EzUI } from '/public/common/javascript/ezui.js';
        import { ezUI } from '/public/common/javascript/ezui.js';
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

import {
    EzException,
    EzBadParamException
} from '/ezlibrary/exceptions/EzExceptions.js';

import { EzStaticClass } from '/ezlibrary/EzStaticClass.js';

import { EzObject } from '/ezlibrary/helpers/EzObject.js';
import { EzNumber } from '/ezlibrary/helpers/EzNumber.js';
import { EzString } from '/ezlibrary/helpers/EzString.js';
import { EzFunction } from '/ezlibrary/helpers/EzFunction.js';
import { EzArray } from '/ezlibrary/helpers/EzArray.js';
import { EzConsole } from '/ezlibrary/helpers/EzConsole.js';
import { EzError } from '/ezlibrary/helpers/EzError.js';

/**
 * @public @class {EzString} extends {EzStaticClass}
 * @description
 * A class of static utility methods and/or properties for string types.
 * >>> WOOT: Does not require EzApi <<<
 * ---------------------------------------------------------------------------
 * Import with:
 *     import { EzPromise } from '/ezlibrary/helpers/EzPromise.js';
 * ---------------------------------------------------------------------------
 */
export class EzPromise extends EzStaticClass {
    /**
     * @static
     * @readonly @property
     * Constant string: 'No error message provided'
     * @returns {string}
     */
    static get NO_ERROR_MESSAGE_PROVIDED() {
        return 'No error message provided.';
    }

    /**
     * @static
     * @readonly @property
     * Constant string: 'No additional details provided.'
     * @returns {string}
     */
    static get EM_NoAdditionalDetailsProvided() {
        return 'No additional details provided.';
    }

    /**
     * @static
     * @readonly @property
     * Constant string: 'Promise execution failed: '
     * @returns {string}
     */
    static get DEFAULT_PROMISE_EXECUTION_FAILED_MESSAGE() {
        return 'Promise execution failed:';
    }

    /**
     * @static
     * @readonly @property
     * Constant string: 'Promise execution failed with unhandled exception (no additional details or exception object provided).'
     * @returns {string}
     */
    static get DEFAULT_PROMISE_ERROR_CATCHER_MESSAGE() {
        return `${EzPromise.DEFAULT_PROMISE_EXECUTION_FAILED_MESSAGE} Encountered an exception with no additional details provided.`;
    }

    /**
     * @static
     * @readonly @property
     * Constant string: 'Promise rejected without provided error response entity.'
     * @returns {string}
     */
    static get PROMISE_REJECTED_ERROR_PREFIX() {
        return 'Promise rejected: ';
    }

    /**
     * @static
     * @public @method
     * Wraps the creation of a promise into the ezApi
     * @param {Function} aFunction
     * @returns {Promise}
     */
    static promise(aFunction) {
        if (!EzFunction.isFunction(aFunction)) {
            throw new EzBadParamException(
                'aFunction',
                EzPromise,
                EzPromise.ezPromise);
        }

        try {
            return new Promise(aFunction)
                .catch(EzPromise.promiseErrorCatcher);
        } catch (err) {
            return EzPromise.promiseErrorCatcher(err);
        }
    }

    /**
     * @static
     * @public @method
     * Wraps the Promise.All static method
     * @param {undefined|null|array} args
     * @returns {Promise}
     */
    static promiseAll(...args) {
        return Promise.all(EzArray.arrayOrNull(args));
    }

    /**
     * @static
     * @public @method
     * Wraps the Promise.All static method
     * @param {undefined|null|array} args
     * @returns {Promise}
     */
    static asyncWaitAll(...args) {
        return EzPromise.asyncAction(
            (finished) => Promise.all(
                EzArray.arrayOrNull(args))
                .then(finished));
    }

    /**
     * @static
     * @public @method
     * Returns a resolve only promise
     * @param {function} aFunction
     * @returns {Promise.resolve}
     */
    static asyncAction(aFunction) {
        if (!EzFunction.isFunction(aFunction)) {
            throw new EzBadParamException(
                'aFunction',
                EzPromise,
                EzPromise.ezAsyncAction);
        }

        try {
            return new Promise((finished) => aFunction(finished))
                .catch(EzPromise.promiseErrorCatcher);
        } catch (err) {
            return EzPromise.promiseErrorCatcher(err);
        }
    }

    /**
     * @public @method
     * Execute async function
     * @param {function} functionToExecute
     * Function to execute async
     * @returns {Promise.resolve}
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * Example use:
     *  await EzPromise.async(
     *      (finished) => {
     *          // do stuff here...
     *
     *          return finished();
     *      });
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     */
    static async(functionToExecute) {
        if (!EzFunction.isFunction(functionToExecute)) {
            throw new EzBadParamException(
                'functionToExecute',
                EzPromise,
                EzPromise.ezAsyncAction);
        }

        return new Promise(
            (finished) => functionToExecute(finished))
            .catch(
                (err) => EzPromise.promiseErrorCatcher(err));
    }

    /**
     * @static
     * @public @method
     * Executes Promise.resolve, passing the provided response in the
     * resolve.
     * @param {*} response
     * @returns {Promise.resolve}
     */
    static resolve(response) {
        try {
            return Promise.resolve(response)
                .catch(EzPromise.promiseErrorCatcher);
        } catch (err) {
            return EzPromise.promiseErrorCatcher(err);
        }
    }

    /**
     * @static
     * @public @method
     * Calls Promise.resolve passing along the provdied response.
     * @param {*} response
     * @returns {Promise.resolve}
     */
    static finished(response) {
        return EzPromise.resolve(response);
    }

    /**
     * @static
     * @public @method
     * Executes Promise.reject passing the provided response.
     * If the response is a string, an error is also logged.
     * @param {*} response
     * @returns {Promise.reject}
     */
    static reject(response) {
        try {
            if (!EzObject.isValid(response)) {
                return Promise.reject(
                    new EzException(
                        'An operation encountered an unexpected error. No additional details available.',
                        {
                            errorCode: 500
                        }));
            }

            if (EzString.stringHasLength(response)) {
                return Promise.reject(
                    new EzException(
                        response,
                        {
                            errorCode: 500,
                        }));
            }

            return Promise.reject(response)
                .catch(EzPromise.promiseErrorCatcher);
        } catch (err) {
            return EzPromise.promiseErrorCatcher(err);
        }
    }

    /**
     * @public
     * Handles a promise.catch
     * @param {object} err
     * @returns {Promise.reject}
     */
    static promiseErrorCatcher(err) {
        if (!EzObject.isValid(err)) {
            try {
                throw new EzException(EzPromise.DEFAULT_PROMISE_ERROR_CATCHER_MESSAGE);
            }
            catch (ezExceptionError) {
                return EzPromise.promiseErrorCatcher(ezExceptionError);
            }
        }

        // Returning a Promise.reject with the error message
        if (!err?.errorCode || !err?.mmessage || !EzString.hasLength(err?.message) ||
            (!EzNumber.isNumber(err?.errorCode) && !EzString.hasLength(err?.errorCode))) {
            if (!err?.errorCode) {
                // When no error code, add the default error code
                err.errorCode = 500;
            } else if (!EzNumber.isNumber(err.errorCode) && !EzString.hasLength(err?.errorCode)) {
                try {
                    err.errorCode = 500;
                } catch {
                    // Ignoring issues when setting err.errorCode.
                    // An error here is most likely caused by a read-only property
                }
            }

            if (!err?.message) {
                // When no message property, add a default error message
                err.message = EzPromise.NO_ERROR_MESSAGE_PROVIDED;
            } else if (!EzString.hasLength(err?.message)) {
                try {
                    // If the error message is blank, attempt to set it if possible
                    err.message = EzPromise.NO_ERROR_MESSAGE_PROVIDED;
                } catch {
                    // Ignoring issues when setting err.message.
                    // An error here is most likely caused by a read-only property
                }
            }
        }

        EzConsole.error(
            EzPromise.DEFAULT_PROMISE_EXECUTION_FAILED_MESSAGE,
            err);

        // Returning a Promise.reject with the error message
        return Promise.reject(err);
    }

    /**
     * @static
     * @public @method
     * Provides the method for handling promise rejects with zero processing.
     * A helper method to call the EzSpinner waitDone callback and ignore the promise resolve returned by it.
     * @param {function} waitDone
     * @deprecated
     * Will remove in a future release.
     * Migrate to: EzPromise.waitDoneIgnoreResolve(waitDone)
     */
    static waitDoneThenIgnore(waitDone) {
        if (!EzFunction.isFunction(waitDone)) {
            throw new EzBadParamException(
                'waitDone',
                EzPromise,
                EzPromise.waitDoneThen);
        }

        return waitDone()
            .then(EzPromise.ignoreResolve)
            .catch(EzPromise.ignoreCatch);
    }

    /**
     * @static
     * @public @method
     * Provides the method for handling promise rejects with zero processing.
     * A helper method to call the EzSpinner waitDone callback and ignore the promise resolve returned by it.
     * @param {function} waitDone
     */
    static waitDoneIgnoreResolve(waitDone) {
        if (!EzFunction.isFunction(waitDone)) {
            throw new EzBadParamException(
                'waitDone',
                EzPromise,
                EzPromise.waitDoneIgnoreResolve);
        }

        return waitDone()
            .then(EzPromise.ignoreResolve)
            .catch(EzPromise.ignoreCatch);
    }

    /**
     * @static
     * @public @method
     * Returns the result of executing a promise function with the provided thisRef context
     * passing the provided ...promiseFunctionParams and ignoring the resolve and reject
     * callbacks.
     * @param {undefined|null|*} thisRef
     * The this context to call th e promiseFunction within. If not provided, the current
     * this context is used instead.
     * @param {function} resolveOnlyPromiseFunction
     * A function that is expected to only return Promise.resovle()
     * @param {undefined|null|*} ...resolveOnlyPromiseFunctionParams
     * None or more parameters to pass to the provided resolveOnlyPromiseFunction when called.
     * @returns
     * Returns the result from:
     *  return resolveOnlyPromiseFunction.apply(
     *      thisRef,
     *      EzArray.arrayOrNull(resolveOnlyPromiseFunctionParams))
     *      .then(EzPromise.ignoreResolve);
     */
    static executeIgnoreResolve(thisRef, resolveOnlyPromiseFunction, ...resolveOnlyPromiseFunctionParams) {
        if (null == resolveOnlyPromiseFunction) {
            throw new EzBadParamException(
                'resolveOnlyPromiseFunction',
                EzPromise,
                EzPromise.executeIgnoreResolve);
        }
        if (!EzObject.isValid(thisRef)) {
            thisRef = this;
        }
        console.log(!EzObject.isValid(thisRef));

        return resolveOnlyPromiseFunction.apply(
            thisRef,
            EzArray.arrayOrNull(resolveOnlyPromiseFunctionParams))
            .then(EzPromise.ignoreResolve);
    }

    /**
     * @static
     * @public @method
     * Returns the result of executing a promise function with the provided thisRef context
     * passing the provided ...promiseFunctionParams and ignoring the resolve and reject
     * callbacks.
     * @param {undefined|null|*} thisRef
     * The this context to call th e promiseFunction within. If not provided, the current
     * this context is used instead.
     * @param {function} promiseFunction
     * A function returning a Promise
     * @param {undefined|null|*} ...promiseFunctionParams
     * None or more parameters to pass to the provided promiseFunction when called.
     * @returns
     * Returns the result from:
     *  return promiseFunction.apply(
     *      thisRef,
     *      EzArray.arrayOrNull(promiseFunctionParams))
     *      .then(
     *          EzPromise.ignoreResolve,
     *          EzPromise.ignoreReject);
     */
    static executeIgnoreResolveReject(thisRef, promiseFunction, ...promiseFunctionParams) {
        if (null == promiseFunction) {
            throw new EzBadParamException(
                'promiseFunction',
                EzPromise,
                EzPromise.executeIgnoreResolveReject);
        }

        if (!EzObject.isValid(thisRef)) {
            thisRef = this;
        }

        return promiseFunction.apply(
            thisRef,
            EzArray.arrayOrNull(promiseFunctionParams))
            .then(
                EzPromise.ignoreResolve,
                EzPromise.ignoreReject);
    }

    /**
     * @static
     * @public @method
     * Executes the page wait spiner's waitDone() method and handles
     * it's promise resolve to then return the call to the provided
     * resolve method passing the remaining parameters.
     * @param {undefined|null|*} thisRef
     * The this reference to perform the call with. If not provided, uses
     * the curren this reference.
     * @param {function} waitDone
     * The waitDone callback function for the ezSpinner
     * @param {function} resolve
     * The promise resolve function
     * @param {undefined|null|*} resolveParams
     * None or more parameters to pass to the waitDone and resolve calls.
     * @returns {Promise.resolve}
     * Returns:
     *  return waitDone.call(thisRef, rejectParams)
     *      .then(
     *          () => resolve.call(thisRef, rejectParams));
     */
    static waitDoneResolve(thisRef, waitDone, resolve, ...resolveParams) {
        if (!EzFunction.isFunction(waitDone)) {
            throw new EzBadParamException(
                'waitDone',
                EzPromise,
                EzPromise.waitDoneResolve);
        }
        if (!EzFunction.isFunction(resolve)) {
            throw new EzBadParamException(
                'resolve',
                EzPromise,
                EzPromise.waitDoneResolve);
        }

        if (!EzObject.isValid(thisRef)) {
            thisRef = this;
        }

        return EzArray.hasLength(resolveParams)
            ? waitDone
                .apply(
                    thisRef,
                    resolveParams)
                .then(
                    () => resolve.apply(
                        thisRef,
                        resolveParams))
            : waitDone
                .apply(thisRef)
                .then(
                    () => resolve.apply(thisRef));
    }

    /**
     * @static
     * @public @method
     * Executes the page wait spiner's waitDone() method and handles
     * it's promise resolve to then return the call to the provided
     * resolve method passing the remaining parameters.
     * @param {undefined|null|*} thisRef
     * The this reference to perform the call with. If not provided, uses
     * the curren this reference.
     * @param {function} waitDone
     * The waitDone callback function for the ezSpinner
     * @param {function} resolve
     * The promise resolve function
     * @param {undefined|null|*} ...rejectParams
     * None or more parameters to pass to the waitDone and reject calls.
     * @returns {Promise.reject}
     * Returns:
     *  return waitDone.call(thisRef, rejectParams)
     *      .then(
     *          () => reject.call(thisRef, rejectParams));
     */
    static waitDoneReject(thisRef, waitDone, reject, ...rejectParams) {
        if (!EzFunction.isFunction(waitDone)) {
            throw new EzBadParamException(
                'waitDone',
                EzPromise,
                EzPromise.waitDoneReject);
        }
        if (!EzFunction.isFunction(reject)) {
            throw new EzBadParamException(
                'reject',
                EzPromise,
                EzPromise.waitDoneReject);
        }

        if (!EzObject.isValid(thisRef)) {
            thisRef = this;
        }

        return waitDone.apply(
            this,
            EzArray.arrayOrNull(rejectParams))
            .then(
                () => reject.apply(
                    thisRef,
                    EzArray.arrayOrNull(rejectParams)));
    }

    /**
     * @static
     * @public @method
     * Executes the page wait spiner's waitDone() method and handles
     * it's promise resolve to then return the call to the provided
     * resolve method passing the remaining parameters.
     * @param {undefined|null|*} thisRef
     * The this reference to perform the call with. If not provided, uses
     * the curren this reference.
     * @param {function} waitDone
     * The waitDone callback function for the ezSpinner
     * @param {function} resolve
     * The promise resolve function
     * @param {undefined|null|*} ...callbackParams
     * None or more parameters to pass to the waitDone and functionToExecute when called.
     * @returns {Promise.reject}
     * Returns:
     *  return waitDone.call(this, callbackParams)
     *      .then(
     *          () => functionToExecute.call(thisRef, callbackParams));
     */
    static waitDoneThen(thisRef, waitDone, functionToExecute, ...callbackParams) {
        if (!EzFunction.isFunction(waitDone)) {
            throw new EzBadParamException(
                'waitDone',
                EzPromise,
                EzPromise.waitDoneThen);
        }
        if (!EzFunction.isFunction(functionToExecute)) {
            throw new EzBadParamException(
                'functionToExecute',
                EzPromise,
                EzPromise.waitDoneThen);
        }

        if (!EzObject.isValid(thisRef)) {
            thisRef = this;
        }

        return waitDone.apply(
            this,
            EzArray.arrayOrNull(callbackParams))
            .then(
                () => functionToExecute.apply(
                    thisRef,
                    EzArray.arrayOrNull(callbackParams)));
    }

    /**
     * @static
     * @public @method
     * Logs the error response from a Promise.reject handler with the optional error message.
     * @param {undefined|null|object} eResponse
     * Default: null
     * If no eResponse is provided a EzClockerException is created and used as the response.
     * @param {undefined|null|string} errorMessage
     * Default: EzPromise.DEFAULT_PROMISE_REJECTED_ERROR
     * @returns {Promise.reject}
     * Reject returns the provided eResponse or created EzClockerException instance.
     */
    static logReject(eResponse = null, errorMessage = EzPromise.DEFAULT_PROMISE_REJECTED_ERROR) {
        if (!EzString.hasLength(errorMessage)) {
            errorMessage = EzPromise.EM_NoAdditionalDetailsProvided;
        }

        if (!EzObject.isValid(eResponse)) {
            eResponse = new EzException(errorMessage);
        }

        EzConsole.error(
            EzPromise.PROMISE_REJECTED_ERROR_PREFIX,
            eResponse);

        return EzPromise.reject(eResponse);
    }

    /**
     * @static
     * @public @method
     * Provides the method for handling resolves with zero processing.
     * @param {undefined|null|array} args
     * @returns {null|array}
     * Returns the args passed to the ingoreReject method.
     */
    static ignoreResolve(...args) {
        return EzPromise.ignoredCallback.apply(
            null,
            EzArray.arrayWithLengthOrNull(args));
    }

    /**
     * @static
     * @public @method
     * Provides the method for handling resolves with zero processing.
     * @param {undefined|null|array} args
     * @returns {null|array}
     * Returns the args passed to the ingoreReject method.
     */
    static ignoreFinished(...args) {
        return EzPromise.ignoredCallback.apply(
            null,
            EzArray.arrayWithLengthOrNull(args));
    }

    /**
     * @static
     * @public @method
     * Dummy method handler used in place of a resolve or reject handler.
     * @param {undefined|null|array} args
     * @returns {null|array}
     * Returns the args passed to the ingoreReject method.
     */
    static ignoreResult(...args) {
        return EzPromise.ignoredCallback.apply(
            null,
            EzArray.arrayWithLengthOrNull(args));
    }

    /**
     * @static
     * @public @method
     * Provides the method for handling promise rejects with zero processing.
     * @param {undefined|null|array} args
     * @returns {array}
     * Returns the args passed to the ingoreReject method.
     */
    static ignoreReject(...args) {
        return EzPromise.ignoredCallback.apply(
            null,
            EzArray.arrayWithLengthOrNull(args));
    }

    /**
     * @static
     * @public @method
     * Used as a place holder method when intending to ignore a callback.
     * @param {undefined|null|array} args
     * @returns {null|array}
     * Returns the args passed to the ingoreReject method.
     */
    static ignoredCallback(...args) {
        return EzArray.arrayWithLengthOrNull(args);
    }

    /**
     * @static
     * @public @method
     * Provides the method for handling promise catch with zero processing.
     * Will log the error message that was ignored.
     * @param {undefined|null|array} args
     * @returns {null|array}
     * Returns the args passed to the ingoreReject method.
     */
    static ignoreCatch(...args) {
        const passedError = EzArray.hasLength(args)
            ? args[0]
            : null;

        if (!passedError) {
            EzConsole.warn('No error instance provided to EzPromise.ignoreCatch(...)');
        }

        const caughtError = EzError.errorOrDefault(
            passedError,
            new EzException(EzPromise.DEFAULT_PROMISE_ERROR_CATCHER_MESSAGE));

        EzConsole.error(
            EzPromise.DEFAULT_PROMISE_EXECUTION_FAILED_MESSAGE,
            caughtError);

        // Returning a Promise.reject with the error message
        return EzArray.arrayWithLengthOrNull(args);
    }
}
