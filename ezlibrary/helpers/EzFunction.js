import {
    EzBadParamException
} from '/ezlibrary/exceptions/EzExceptions.js';

import { EzStaticClass } from '/ezlibrary/EzStaticClass.js';

import { EzObject } from '/ezlibrary/helpers/EzObject.js';
import { EzArray } from '/ezlibrary/helpers/EzArray.js';

/*
    ---------------------------------------------------------------------------
    WARNING:
        1) Do not import anything from /ezlibrary/helpers/EzHelpers.js into this module
        2) Do not import the following into this module:
            import { EzApi } from '/public/common/javascript/ezapi.js';
            import { EzUI } from '/public/common/javascript/ezui.js';
            import { ezUI } from '/public/common/javascript/ezui.js';
            import { EzJson } from '/ezlibrary/helpers/EzJson.js';
            import { EzConsole } from '/ezlibrary/helpers/EzConsole.js';
            import { EzAsync } from '/ezlibrary/helpers/EzAsync.js';
    ---------------------------------------------------------------------------
*/

/**
 * @class
 * @extends {EzStaticClass}
 * @description
 * Static class that provides utility methods and properties for functions
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Import with:
 *     import { EzFunction } from '/ezlibrary/helpers/EzFunction.js';
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
export class EzFunction extends EzStaticClass {
    /**
     * @static
     * @public @method
     * Returns true if the passed ref is a javascript function
     * @param {undefined|null|function|*} aFunction
     * @returns {boolean}
     */
    static isFunction(value) {
        return undefined !== value && null !== value &&
            ('function' === typeof value || '[object Function]' === EzObject.getObjectType(value));
    }

    /**
     * @static
     * @public @method
     * If the provided value is a function, then the value is returned.
     * Otherwise, null is returned.
     * @param {undefined|null|function|*} value
     * @returns {null|function}
     */
    static functionOrNull(value) {
        return EzFunction.isFunction(value)
            ? value
            : null;
    }

    /**
     * @static
     * @public @method
     * If the provided value is a function, then the value is returned.
     * Otherwise, the provided defaultValue is returned.
     * @param {undefined|null|function|*} value
     * @param {undefined|null|function|*} defaultValue
     * @returns {undefined|null|function|*}
     */
    static functionOrDefault(value, defaultValue) {
        return EzFunction.isFunction(value)
            ? value
            : defaultValue;
    }

    /**
     * @static
     * @public @method
     * Verifies the passed function is valid, and returns the call to that method. Otherwise, returns null
     * The first argument is expected to be the function to call back (if a valid function)
     * The remaining arguments get passed to the function when called.
     * @returns {*}
     * Returns the result of calling the function.
     */
    static callback(...args) {
        const callbackFunction = args[0];

        if (!EzFunction.isFunction(callbackFunction)) {
            return null;
        }

        const callBackFunctionArguments = args.slice(1);

        return callbackFunction.apply(this, callBackFunctionArguments);
    }

    /**
     * @static
     * @public @method
     * Calls the provided functionToCall passing along the arrayOfParams provided (if any).
     * If the optionalThisContext is valid, will call the function with the provided context.
     * Otherwise, the current this context is used.
     * @returns {null|undefined|*}
     * Returns the result of calling the provided functionToCall
     */
    static callWithParams(functionToCall, arrayOfParams, optionalThisContext) {
        if (!EzFunction.isFunction(functionToCall)) {
            throw new EzBadParamException(
                'functionToCall',
                EzFunction,
                EzFunction.callWithParams);
        }
        if (EzObject.isValid(arrayOfParams) && !EzArray.isArray(arrayOfParams)) {
            throw new EzBadParamException(
                'arrayOfParams',
                EzFunction,
                EzFunction.callWithParams);
        }

        if (!EzObject.isValid(optionalThisContext)) {
            optionalThisContext = this;
        }

        return functionToCall.apply(optionalThisContext, EzArray.arrayOrNull(arrayOfParams));
    }

    /**
     * @static
     * @public @method
     * Place holder function that performs no actions.
     */
    static dummyFunction() {
        // Does nothing, used as a function placeholder
    }
}
