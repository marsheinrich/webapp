import {
    EzBadParamException
} from '/ezlibrary/exceptions/EzExceptions.js';

import { EzStaticClass } from '/ezlibrary/EzStaticClass.js';

import { EzObject } from '/ezlibrary/helpers/EzObject.js';
import { EzNumber } from '/ezlibrary/helpers/EzNumber.js';
import { EzString } from '/ezlibrary/helpers/EzString.js';
import { EzFunction } from '/ezlibrary/helpers/EzFunction.js';

/*
    ---------------------------------------------------------------------------
    ENGINEERING NOTES
    ---------------------------------------------------------------------------
    DO NOT IMPORT THE FOLLOWING INTO THIS CLASS:
        import { EzApi } from '/public/common/javascript/ezapi.js';
        import { EzUI } from '/public/common/javascript/ezui.js';
        import { ezUI } from '/public/common/javascript/ezui.js';
        import { EzPromise } from '/public/helpers/EzPromise.js';
    ---------------------------------------------------------------------------
*/

/**
 * @class
 * @description
 * Class that provides Javascript Logging methods but uses its own
 * internal storage.
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Import with:
 *     import { EzNullConsole } from '/ezlibrary/helpers/EzConsole.js';
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
export class EzNullConsole {
    /**
     * @public @constructor
     * Creates a new instance of EzNullConsole
     * @param {undefined|null|number} maxLines
     */
    constructor(maxLines) {
        this.#maxLines = EzNumber.numberOrDefault(maxLines, 1000);
    }

    /**
     * @private @field
     * Stores the maximum number of log lines to keep in the #ezConsoleLog array.
     * Default is: 1000
     * @type {number}
     */
    #maxLines = 1000;

    /**
     * @private @field
     * Stores the array of log messages.
     * @type {array}
     */
    #ezConsoleLog = [];

    /**
     * @public @method
     * Logs the provided message with the prepended level indicator.
     * Template: `[{level}] {message}`
     * @param {string} level
     * @param {string} message
     * @param {undefined|null|object} optionalErr
     */
    ezLog(level, message, optionalErr) {
        if (!EzString.isString(level)) {
            level = EzString.EMPTY;
        }
        if (!EzString.hasLength(message)) {
            return;
        }

        if (this.#maxLines === this.#ezConsoleLog.length) {
            this.#ezConsoleLog.splice(this.#ezConsoleLog.length - 1, 1);
        }

        const stackTrace = EzObject.isValid(optionalErr)
            ? `[Stack trace: ${optionalErr.stack}]`
            : EzString.EMPTY;

        this.#ezConsoleLog.push(`[${level}] ${message} ${stackTrace}`);
    }

    /**
     * @public @method
     * Logs the provided message with the assert level indicator.
     * @param {string} message
     */
    assert(message) {
        this.ezLog('assert', message);
    }

    /**
     * @public @method
     * Logs the provided message with the info level indicator.
     * @param {string} message
     */
    info(message) {
        this.ezLog('info', message);
    }

    /**
     * @public @method
     * Logs the provided message with the warn level indicator.
     * @param {string} message
     */
    warn(message) {
        this.ezLog('warn', message);
    }

    /**
     * @public @method
     * Logs the provided message with the error level indicator.
     * @param {string} message
     */
    error(message, err) {
        this.ezLog('error', message, err);
    }

    /**
     * @public @method
     * Logs the provided message with the debug level indicator.
     * @param {string} message
     */
    debug(message) {
        this.ezLog('debug', message);
    }

    /**
     * @public @method
     * Logs the provided message with the trace level indicator.
     * @param {string} message
     */
    trace(message) {
        this.ezLog('trace', message);
    }

    /**
     * @public @method
     * Clears the internal ezConsoleLog array of all messages
     */
    clear() {
        this.#ezConsoleLog = [];
    }

    /**
     * @public @method
     * NOT IMPLEMENTED
     */
    context() {
        // not implemented
    }

    /**
     * @public @method
     * NOT IMPLEMENTED
     */
    count() {
        // not implemented
    }

    /**
     * @public @method
     * NOT IMPLEMENTED
     */
    countReset() {
        // not implemented
    }

    /**
     * @public @method
     * NOT IMPLEMENTED
     */
    createTask() {
        // not implemented
    }

    /**
     * @public @method
     * NOT IMPLEMENTED
     */
    dir() {
        // not implemented
    }

    /**
     * @public @method
     * NOT IMPLEMENTED
     */
    dirxml() {
        // not implemented
    }

    /**
     * @public @method
     * NOT IMPLEMENTED
     */
    group() {
        // not implemented
    }

    /**
     * @public @method
     * NOT IMPLEMENTED
     */
    groupCollapsed() {
        // not implemented
    }

    /**
     * @public @method
     * NOT IMPLEMENTED
     */
    groupEnd() {
        // not implemented
    }

    /**
     * @public @method
     * NOT IMPLEMENTED
     */
    profile() {
        // not implemented
    }

    /**
     * @public @methodNOT
     * IMPLEMENTED
     */
    profileEnd() {
        // not implemented
    }

    /**
     * @public @method
     * NOT IMPLEMENTED
     */
    table() {
        // not implemented
    }

    /**
     * @public @method
     * NOT IMPLEMENTED
     */
    time() {
        // not implemented
    }

    /**
     * @public @method
     * NOT IMPLEMENTED
     */
    timeEnd() {
        // not implemented
    }

    /**
     * @public @method
     * NOT IMPLEMENTED
     */
    timeLog() {
        // not implemented
    }

    /**
     * @public @method
     * NOT IMPLEMENTED
     */
    timeStamp() {
        // not implemented
    }
}

/**
 * @class
 * @extends {EzStaticClass}
 * @description
 * Static class that provides utility methods and properties for Objects
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Import with:
 *     import { EzConsole } from '/ezlibrary/helpers/EzConsole.js';
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
export class EzConsole extends EzStaticClass {
    /**
     * @static
     * @private @field
     * Stores the EzNullConsole instance in use
     * @type {EzNullConsole}
     */
    static #ezNullConsole = null;
    /**
     * @static
     * @private @readonly @property
     * Gets the EzNullConsole instance in use (creating it if necessary)
     * @returns {EzNullConsole}
     */
    static get ezNullConsole() {
        if (null == this.#ezNullConsole) {
            this.#ezNullConsole = new EzNullConsole();
        }

        return this.#ezNullConsole;
    }

    /**
     * @static
     * @public @readonly @property
     * Gets the default console that is available to use. The default console is determined in the following order (when reference is valid):
     *  1) globalThis.console
     *  2) globalThis.window.console
     *  3) EzConsole's internal EzNullConsole instance
     * @returns {object|EzNullConsole}
     */
    static get ezDefaultConsole() {
        return this.#ezGetAvailableConsole();
    }

    /**
     * @static
     * @private @field
     * Stores the console that is currently in use.
     * @type {object}
     */
    static #ezActiveConsole = null;
    /**
     * @static
     * @public @property @getter
     * Gets the console that is currently in use.
     * @returns {object}
     */
    static get ezActiveConsole() {
        if (null == this.#ezActiveConsole) {
            this.#ezActiveConsole = this.ezDefaultConsole;
        }

        return this.#ezActiveConsole;
    }

    /**
     * @static
     * @public @property @setter
     * Sets the console that is currently in use.
     * @param {object} activeConsole
     */
    static set ezActiveConsole(activeConsole) {
        if (!EzObject.isObject(activeConsole)) {
            throw new EzBadParamException(
                'activeConsole',
                EzConsole,
                'SET EzConsole.ezActiveConsole');
        }

        this.#ezActiveConsole = activeConsole;
    }

    /**
     * @static
     * @private @method
     * Returns the currently available global console or null console if none is found.
     * @returns {object}
     */
    static #ezGetAvailableConsole() {
        if (globalThis?.console) {
            globalThis.console.info('EzConsole using console instance: globalThis.console.');

            return globalThis.console;
        }

        if (globalThis?.window?.console) {
            globalThis.window.console.info('EzConsole using console instance: globalThis.window.console.');

            return globalThis.window.console;
        }

        if (console) {
            console.info('EzConsole using console instance: console.');

            return console;
        }

        this.ezNullConsole.info('EzConsole using console instance: EzConsole.ezNullConsole.');

        return this.ezNullConsole;
    }


    /**
     * @static
     * @public @method
     * Logs the provided message using the active console's log() method.
     * 1) If the provided message is undefined, null, or an empty string AND the optionalErr is undefined or null then no longging action is performed.
     * 2) If the provided message is a non-empty string and optionalErr is undefined or null then just the provided message is logged.
     * 3) If the provided message is undefined, null, or an empty string and the optionalErr is a valid instance, then the optionalErr is logged.
     * 4) If the provided message is a non-empty string and the provided optionalErr is a valid instance then the provided message is logged followed by
     *    optionalErr.
     * 5) If the EzConsole.ezActiveConsole is undefined, null, or does not provide the log() method then no logging action is performed.
     * @param {undefined|null|string} message
     * Default value: null
     * @param {undefined|null|object} optionalErr
     * Default value: null
     */
    static log(message = null, optionalErr = null) {
        if (!EzFunction.isFunction(EzConsole?.ezActiveConsole?.log)) {
            throw new Error('EzConsole Error: Unable to log message, no useable console configured/avaialble.');
        }

        EzConsole.ezLogTo(
            EzConsole.ezActiveConsole.log,
            message,
            optionalErr);
    }

    /**
     * @static
     * @public @method
     * Logs the provided message using the EzConsole.ezActiveConsole.info() method.
     * If EzConsole.ezActiveConsole is undefined, null, or does not provide the EzConsole.ezActiveConsole.info() method then
     * the message is pre-pended with '[INFO ]' and the log is attempted by calling EzConsole.log(message, optionalErr) using the provided params.
     * @param {undefined|null|string} message
     * Default value: null
     * @param {undefined|null|object} optionalErr
     * Default value: null
     */
    static info(message = null, optionalErr = null) {
        if (!EzFunction.isFunction(EzConsole?.ezActiveConsole?.info)) {
            EzConsole.log(
                `[INFO ] ${EzString.stringOrEmpty(message)}`,
                optionalErr);

            return;
        }

        EzConsole.ezLogTo(
            EzConsole.ezActiveConsole.info,
            message,
            optionalErr);
    }

    /**
     * @static
     * @public @method
     * Logs the provided message using the EzConsole.ezActiveConsole.warn(...) method.
     * If EzConsole.ezActiveConsole is undefined, null, or does not provide the EzConsole.ezActiveConsole.info() method then
     * the message is pre-pended with '[WARN ]' and the log is attempted by calling EzConsole.log(message, optionalErr) using the provided params.
     * @param {undefined|null|string} message
     * Default value: null
     * @param {undefined|null|object} optionalErr
     * Default value: null
     */
    static warn(message = null, optionalErr = null) {
        if (!EzFunction.isFunction(EzConsole?.ezActiveConsole?.warn)) {
            EzConsole.info(
                `[WARN ] ${EzString.stringOrEmpty(message)}`,
                optionalErr);

            return;
        }

        EzConsole.ezLogTo(
            EzConsole.ezActiveConsole.warn,
            message,
            optionalErr);
    }

    /**
     * @static
     * @public @method
     * Logs the provided message using the EzConsole.ezActiveConsole.error(...) method.
     * If EzConsole.ezActiveConsole is undefined, null, or does not provide the EzConsole.ezActiveConsole.info() method then
     * the message is pre-pended with '[ERROR]' and the log is attempted by calling EzConsole.log(message, optionalErr) using the provided params.
     * @param {undefined|null|string} message
     * Default value: null
     * @param {undefined|null|object} optionalErr
     * Default value: null
     */
    static error(message = null, optionalErr = null) {
        if (!EzFunction.isFunction(EzConsole?.ezActiveConsole?.error)) {
            EzConsole.info(
                `[ERROR] ${EzString.stringOrEmpty(message)}`,
                optionalErr);

            return;
        }

        EzConsole.ezLogTo(
            EzConsole.ezActiveConsole.error,
            message,
            optionalErr);
    }

    /**
     * @static
     * @public @method
     * Logs the provided message using the EzConsole.ezActiveConsole.debug(...) method.
     * If EzConsole.ezActiveConsole is undefined, null, or does not provide the EzConsole.ezActiveConsole.info() method then
     * the message is pre-pended with '[DEBUG]' and the log is attempted by calling EzConsole.info(message, optionalErr) using the provided params.
     * @param {undefined|null|string} message
     * Default value: null
     * @param {undefined|null|object} optionalErr
     * Default value: null
     */
    static debug(message = null, optionalErr = null) {
        if (!EzFunction.isFunction(EzConsole?.ezActiveConsole?.debug)) {
            EzConsole.info(
                `[DEBUG] ${EzString.stringOrEmpty(message)}`,
                optionalErr);

            return;
        }

        EzConsole.ezLogTo(
            EzConsole.ezActiveConsole.debug,
            message,
            optionalErr);
    }

    /**
     * @static
     * @public @method
     * Logs the provided message using the EzConsole.ezActiveConsole.trace(...) method.
     * If EzConsole.ezActiveConsole is undefined, null, or does not provide the EzConsole.ezActiveConsole.info() method then
     * the message is pre-pended with '[TRACE]' and the log is attempted by calling EzConsole.debug(message, optionalErr) using the provided params.
     * @param {undefined|null|string} message
     * Default value: null
     * @param {undefined|null|object} optionalErr
     * Default value: null
     */
    static trace(message = null, optionalErr = null) {
        if (!EzFunction.isFunction(EzConsole?.ezActiveConsole?.trace)) {
            EzConsole.debug(
                `[TRACE] ${EzString.stringOrEmpty(message)}`,
                optionalErr);

            return;
        }

        EzConsole.ezLogTo(
            EzConsole.ezActiveConsole.trace,
            message,
            optionalErr);
    }

    /**
     * @static
     * @public @method
     * Attempts to log a useable message from an exception catch err object.
     * @param {undefined|null|string} em
     * @param {undefined|null|object} optionalErr
     */
    static logException(em = 'Unexpected error.', optionalErr = null) {
        let exMsg = EzString.hasLength(em)
            ? `Exception: ${em}`
            : 'Exception:';

        if (EzObject.isValid(optionalErr)) {
            if (EzString.hasLength(optionalErr?.message)) {
                exMsg = `${exMsg} ${optionalErr?.message}`;
            } else if (EzObject.isValid(optionalErr?.stderr)) {
                exMsg = `${exMsg} ${optionalErr.stderr}`;
            }

            if (EzNumber.isNumber(optionalErr?.errorCode)) {
                exMsg = `${exMsg} (Error code: ${optionalErr?.errorCode})`;
            }

            if (EzObject.isValid(optionalErr?.stack)) {
                exMsg = `${exMsg} => [Stack trace: ${optionalErr.stack}]`;
            }
        }

        EzConsole.error(exMsg);
    }

    /**
     * @static
     * @public @method
     * Logging helper method that determines the parameters (if any) to pass to the
     * provided loggerMethodToCall.
     * Will call the provided loggerMethodToCall with message and optionalErr, just message,
     * or just optionalErr (depending upon if either param is provided as undefined or null).
     * If both message and optionalErr params are undefined or null then no logging is performed.
     * @param {function} loggerMethod
     * @param {undefined|null|string} message
     * Default: '' (empty string)
     * @param {undefined|null|object} optionalErr
     * Default: null
     */
    static ezLogTo(loggerMethod, message = '', optionalErr = null) {
        if (!EzFunction.isFunction(loggerMethod)) {
            throw new EzBadParamException(
                'loggerMethod',
                EzConsole,
                EzConsole.ezLogTo);
        }

        if (EzObject.isValid(optionalErr)) {
            loggerMethod(
                EzString.stringOrEmpty(message),
                optionalErr);
        } else {
            loggerMethod(message);
        }
    }
}
