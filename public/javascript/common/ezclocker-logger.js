import {
    EzBadParamException
} from '/ezlibrary/exceptions/EzExceptions.js';

import { EzRegistrationState } from '/ezlibrary/enums/EzEnumerations.js';

import { EzClass } from '/ezlibrary/EzClass.js';

/**
    Represents the supported logging levels
    Import with:
        import { EzLogLevel } from '/public/javascript/common/ezclocker-logger.js';
 */
export class EzLogLevel {
    static get ezNames() {
        return [
            'DEBUG',
            'INFO',
            'WARN',
            'ERROR'
        ];
    }

    static get ezValues() {
        return [
            EzLogLevel.ezNames[0],
            EzLogLevel.ezNames[1],
            EzLogLevel.ezNames[2],
            EzLogLevel.ezNames[3],
        ];
    }

    static get DEBUG() {
        return EzLogLevel.ezValues[0];
    }

    static get INFO() {
        return EzLogLevel.ezValues[1];
    }

    static get WARN() {
        return EzLogLevel.ezValues[2];
    }

    static get ERROR() {
        return EzLogLevel.ezValues[3];
    }

    /**
        @public @static @method
        Returns the enum property value that matches the provided enum property name.
        @returns {string}
     */
    static ezValueOf(ezLogLevelEnumPropertyName) {
        let index = EzLogLevel.ezNames.indexOf(ezLogLevelEnumPropertyName.toUpperCase());

        if (0 > index) {
            return EzLogLevel[EzLogLevel.ezNames[0]];
        }

        return EzLogLevel[EzLogLevel.ezNames[index]];
    }
}

/**
    Implementation of a logging console
    Import with:
        import { EzDefaultConsole } from '/public/javascript/common/ezclocker-logger.js';
 */
export class EzDefaultConsole {
    /**
        @public @constructor
        @param {string|null} consoleName
        @param {number|null} maxLength
     */
    constructor(consoleName, maxLength) {
        this.ezConsoleName = consoleName;
        this.ezMaxLength = maxLength;
    }

    #ezMaxLength = 100;

    #ezConsoleName = 'EzClockerConsole';

    #ezLog = [];

    get ezConsoleName() {
        return this.#ezConsoleName;
    }

    set ezConsoleName(ezConsoleName) {
        this.#ezConsoleName = undefined != ezConsoleName && null != ezConsoleName && 'string' === typeof ezConsoleName && 0 != ezConsoleName.length
            ? ezConsoleName
            : 'EzClockerConsole';
    }

    get internalLog() {
        return this.#ezLog;
    }

    set internalLog(ezLog) {
        this.ezLog = undefined !== ezLog && null !== ezLog && '[object Array]' === Object.prototype.toString.call(ezLog)
            ? ezLog
            : [];
    }

    get ezMaxLength() {
        return this.#ezMaxLength;
    }

    set ezMaxLength(ezMaxLength) {
        this.#ezMaxLength = undefined != ezMaxLength && null != ezMaxLength && 'number' === typeof ezMaxLength && 0 > ezMaxLength
            ? ezMaxLength
            : 100;
    }

    error(msg) {
        this.#ezLogAppend(msg, EzLogLevel.ERROR);
    }

    warn(msg) {
        this.#ezLogAppend(msg, EzLogLevel.WARN);
    }

    log(msg) {
        this.#ezLogAppend(msg, EzLogLevel.INFO);
    }

    info(msg) {
        this.#ezLogAppend(msg, EzLogLevel.INFO);
    }

    debug(msg) {
        this.#ezLogAppend(msg, EzLogLevel.DEBUG);
    }

    #ezLogAppend(msg, ezLogLevel, date) {
        if (!msg || 'string' !== typeof msg || 0 == msg.length) {
            return; // nothing to log
        }

        if (undefined == date || null == date || 'string' !== typeof date || 0 == date.length) {
            date = `[${moment().format()}]`;
        }

        if (this.#ezMaxLength <= this.#ezLog.length) {
            this.#ezLog.shift();
        }

        this.#ezLog.push(`${date} ${EzLogLevel.ezValueOf(ezLogLevel)}: ${msg}`);
    }
}

/**
    EzClocker's logger class.
    NOTE: There is no need to import this class if you reference it from ezApi.ezclocker.logger.
    Import with:
        import { EzLogger } from '/public/javascript/common/ezclocker-logger.js';
 */
export class EzLogger extends EzClass {
    static #ezInstance = Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
        globalThis.ezApi &&
        Object.prototype.hasOwnProperty.call(globalThis.ezApi, 'ezclocker') &&
        globalThis.ezApi.ezclocker &&
        Object.prototype.hasOwnProperty.call(globalThis.ezApi.ezclocker, EzLogger.ezApiName) &&
        globalThis.ezApi.ezclocker[EzLogger.ezApiName]
        ? globalThis.ezApi.ezclocker[EzLogger.ezApiName]
        : null;

    /**
        @public @static @field
        @type {String}
        Acceptable values: null, 'PENDING', 'REGISTERED'
     */
    static #ezApiRegistrationState = Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
        globalThis.ezApi &&
        Object.prototype.hasOwnProperty.call(globalThis.ezApi, 'ezclocker') &&
        globalThis.ezApi.ezclocker &&
        Object.prototype.hasOwnProperty.call(globalThis.ezApi.ezclocker, EzLogger.ezApiName) &&
        globalThis.ezApi.ezclocker[EzLogger.ezApiName]
        ? EzRegistrationState.REGISTERED
        : null;

    /**
        @public @static @property @getter
        Returns the ezApi registration state of this classes's singleton instance.
        @returns {string}
        A valid enum property value from EzRegistrationState
     */
    static get ezApiRegistrationState() {
        return EzLogger.#ezApiRegistrationState;
    }

    /**
        @public @static @property @setter
        Sets the ezApi registration state of this classes's singleton instance.
        @param {string} ezApiRegistrationState
        A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzLogger.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
    }

    /**
        @public @static @getter @property
        Returns the singleton instance of EzDateTime registered with EzApi (if available yet)
        @param {EzLogger}
     */
    static get ezInstance() {
        return EzLogger.#ezInstance;
    }

    /**
        @public @static @getter @property
        Returns the singleton instance of EzDateTime registered with EzApi (if available yet)
        @param {EzLogger} ezLogger
     */
    static set ezInstance(ezLogger) {
        if (null != EzLogger.#ezInstance) {
            throw new Error('EzLogger\'s singleton instance is already reigstered with EzApi.');
        }

        EzLogger.#ezInstance = ezLogger;
    }

    /**
        @public @static @readonly @property
        Returns the name of this class's singleton instance when registered with ezApi.
        @returns {string}
     */
    static get ezApiName() {
        return 'ezLogger';
    }

    /**
        @public @static @readonly @property
        Returns the alternative 'short' name of this class's singleton instance when registered with ezApi.
        @returns {string}
     */
    static get ezShortApiName() {
        return 'logger';
    }

    /**
        @public @static @readonly @property
        Returns an object of event names that this class may trigger.
        @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzLogger_Ready'
        }
    }

    /**
        @public @static @readonly @property
        Returns if all necessary dependences are ready and therefore it is ok for this class to
        register it's singleton instance with ezApi.
        @returns {boolean}
     */
    static get ezCanRegister() {
        return EzRegistrationState.PENDING === EzLogger.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
            globalThis.ezApi && globalThis.ezApi.ready;
    }

    /**
        @private @static @readonly @property
        Returns if this class's singleton instance is registered with ezApi yet.
        @returns {boolean}
     */
    static get #ezIsRegistered() {
        return null != EzLogger.ezInstance &&
            EzRegistrationState.REGISTERED === EzLogger.ezApiRegistrationState;
    }

    /**
        @private @static @method
        Attempts to register the singleton instance for this class with ezApi. Returns true
        if successful, false otherwise.
        @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzLogger.ezCanRegister && !EzLogger.#ezIsRegistered) {
            // EzLogger is unique in how it registers because it is created and registerd in the EzApi class constructor.
            EzLogger.ezApiRegistrationState = EzRegistrationState.REGISTERED;

            document.dispatchEvent(
                new CustomEvent(
                    EzLogger.ezEventNames.onReady,
                    {
                        bubbles: true
                    }));
        }

        return EzRegistrationState.REGISTERED === EzLogger.ezApiRegistrationState;
    }

    /**
        @public @constructor
        @param {object|null||undefined} logConsoleToUse
     */
    constructor(logConsoleToUse) {
        super();

        EzLogger.#ezInstance = this;

        this.#ezLogConsole = logConsoleToUse || new EzDefaultConsole();

        this.ezLoggingEnabled = null != this.#ezLogConsole && undefined != this.#ezLogConsole;

        EzLogger.#ezRegistrator();
    }

    /**
        @private @field
        Stores the reference to the console logs are written to
        @type {object}
     */
    #ezLogConsole = null;

    /**
        @private @field
        Stores the current log level
        @type {string}
     */
    #ezLogLevel = 'DEBUG';

    /**
        @private @field
        Stores if logging is enabled
        @type {boolean}
     */
    #ezLoggingEnabled = true;

    /**
        @private @field
        Stores if debug logging is enabled
        @type {boolean}
     */
    #ezDebugEnabled = true;

    /**
        @private @field
        Stores if info logging is enabled
        @type {boolean}
     */
    #ezInfoEnabled = true;

    /**
        @private @field
        Stores if warn logging is enabled
        @type {boolean}
     */
    #ezWarnEnabled = true;

    /**
        @private @field
        Stores if error logging is enabled
        @type {boolean}
     */
    #ezErrorEnabled = true;

    /**
        @public @property @getter
        Returns the configured logging console.
        @returns {object}
     */
    get ezLogConsole() {
        return this.#ezLogConsole;
    }

    /**
        @public @property @setter
        Sets if logging enabled. Will assign the provided ezLoggingEnabled value to all supported logging levels.
        @param {boolean} ezLoggingEnabled
     */
    set ezLoggingEnabled(ezLoggingEnabled) {
        this.#ezLoggingEnabled = undefined != ezLoggingEnabled && null != ezLoggingEnabled && 'boolean' === typeof ezLoggingEnabled
            ? ezLoggingEnabled
            : true;

        this.ezDebugEnabled = this.#ezLoggingEnabled;
        this.ezWarnEnabled = this.#ezLoggingEnabled;
        this.ezInfoEnabled = this.#ezLoggingEnabled;
        this.ezErrorEnabled = this.#ezLoggingEnabled;
    }

    /**
        @public @property @setter
        Returns if logging is enabled. The value returned only indicates that logging is enabled. However, is is possible for specific
        logging levels to be disabled if set outside of the ezLoggingEnabled assignment.
     */
    get ezLoggingEnabled() {
        return this.#ezLoggingEnabled;
    }

    /**
        @public @property @setter
        Enable or disable all logging
        @param {boolean} loggingEnabled
     */
    set enabled(loggingEnabled) {
        this.ezLoggingEnabled = loggingEnabled;
        this.ezLogLevel = this.#ezLogLevel;
    }

    /**
        @public @property @getter
        Returns if logging is enabled
        @returns {boolean}
     */
    get enabled() {
        return undefined != this.#ezLogConsole && null != this.#ezLogConsole && this.ezLoggingEnabled;
    }

    /**
        @public @property @setter
        Enable or disable debug logging.
        @param {boolean} ezDebugEnabled
     */
    set ezDebugEnabled(ezDebugEnabled) {
        this.#ezDebugEnabled = undefined != ezDebugEnabled && null != ezDebugEnabled && 'boolean' === typeof ezDebugEnabled
            ? ezDebugEnabled
            : true;
    }

    /**
        @public @property @getter
        Returns if debug logging is enabled
        @returns {boolean}
     */
    get ezDebugEnabled() {
        return this.ezLoggingEnabled && this.#ezDebugEnabled;
    }

    /**
        @public @property @setter
        Enable or disable info logging.
        @param {boolean} ezInfoEnabled
     */
    set ezInfoEnabled(ezInfoEnabled) {
        this.#ezInfoEnabled = undefined != ezInfoEnabled && null != ezInfoEnabled && 'boolean' === typeof ezInfoEnabled
            ? ezInfoEnabled
            : true;
    }

    /**
        @public @property @getter
        Returns if info logging is enabled
        @returns {boolean}
     */
    get ezInfoEnabled() {
        return this.ezLoggingEnabled && this.#ezInfoEnabled;
    }


    /**
        @public @property @setter
        Enable or disable warn logging.
        @param {boolean} ezWarnEnabled
     */
    set ezWarnEnabled(ezWarnEnabled) {
        this.#ezWarnEnabled = undefined != ezWarnEnabled && null != ezWarnEnabled && 'boolean' === typeof ezWarnEnabled
            ? ezWarnEnabled
            : true;
    }

    /**
        @public @property @getter
        Returns if warn logging is enabled
        @returns {boolean}
     */
    get ezWarnEnabled() {
        return this.ezLoggingEnabled && this.#ezWarnEnabled;
    }


    /**
        @public @property @setter
        Enable or disable error logging.
        @param {boolean} enableLogging
     */
    set ezErrorEnabled(ezErrorEnabled) {
        this.#ezErrorEnabled = undefined != ezErrorEnabled && null != ezErrorEnabled && 'boolean' === typeof ezErrorEnabled
            ? ezErrorEnabled
            : true;
    }

    /**
        @public @property @getter
        Returns if error logging is enabled
        @returns {boolean}
     */
    get ezErrorEnabled() {
        return this.#ezErrorEnabled;
    }

    /**
        @public @property @setter
        Sets the logging level to use.
        @param {string} aLogLevel
        A valid enum property from EzLogLevel
     */
    set ezLogLevel(aLogLevel) {
        if (!aLogLevel || 'string' !== typeof aLogLevel) {
            throw new EzBadParamException(
                'aLogLevel',
                this,
                'set ezLogLevel(logLevel)');
        }

        aLogLevel = aLogLevel.toUpperCase();
        switch (aLogLevel) {
            case EzLogLevel.ERROR:
                this.ezDebugEnabled = false;
                this.ezInfoEnabled = false;
                this.ezWarnEnabled = false;
                this.ezErrorEnabled = this.ezLoggingEnabled;
                break;
            case EzLogLevel.WARN:
                this.ezDebugEnabled = false;
                this.ezInfoEnabled = false;
                this.ezWarnEnabled = this.ezLoggingEnabled;
                this.ezErrorEnabled = this.ezLoggingEnabled;
                break;
            case EzLogLevel.INFO:
                this.ezDebugEnabled = false;
                this.ezInfoEnabled = this.ezLoggingEnabled;
                this.ezWarnEnabled = this.ezLoggingEnabled;
                this.ezErrorEnabled = this.ezLoggingEnabled;
                break;
            case EzLogLevel.DEBUG:
                this.ezDebugEnabled = this.ezLoggingEnabled;
                this.ezInfoEnabled = this.ezLoggingEnabled;
                this.ezWarnEnabled = this.ezLoggingEnabled;
                this.ezErrorEnabled = this.ezLoggingEnabled;
                break;
            default:
                throw new EzBadParamException(
                    'aLogLevel',
                    this,
                    'set ezLogLevel(logLevel)');
        }
    }

    /**
        @public @property @getter
        Returns the currently logging level
        @returns {string}
        A valid enum property value from EzLogLevel
     */
    get ezLogLevel() {
        return this.#ezLogLevel;
    }

    /**
        @public @method
        Writes a deprecation log message
        @param {string} depItem
        @param {string|null} migrateTo
        @param {string|null} msg
        @param {string|null} source
     */
    deprecate(depItem, useInstead, msg, source) {
        if (!this.ezEnabled) {
            return;
        }

        this.dep(depItem, useInstead, msg, source);
    }

    /**
        @public @method
        Attempts to log a useable message from an exception catch err object.
        @param {string} em
        @param {object|null} err
     */
    ezLogException(em, err) {
        if (!this.ezEnabled) {
            return;
        }

        if (em && 'string' === typeof em && 0 < em.length) {
            let exMsg = `EzClocker Exception: ${em} (no additional details).`;

            if (err.message) {
                exMsg = `${exMsg}, Details: ${err.message}`;
            }

            if (err.stack) {
                exMsg = `${exMsg}, Stack trace: ${err.stack}`;
            }

            if (err.stderr && 0 < err.stderr.length) {
                exMsg = `${exMsg} -> ${err.stderr}`;
            }

            this.error(exMsg);
        } else if (err) {
            this.error(err);
        }
    }

    /**
        @public @method
        Logs a deprecation message in the format:
        @param {string} depItem
        @param {string|null} migrateTo
        @param {string|null} msg
        @param {string|null} source
     */
    dep(depItem, migrateTo, msg, source) {
        if (!this.ezEnabled) {
            return;
        }

        if (!depItem || 'string' !== typeof depItem || 0 == depItem.length) {
            return;
        }

        msg = !msg || 'string' !== typeof msg || 0 == msg.length
            ? ''
            : msg;

        migrateTo = !migrateTo || 'string' !== typeof migrateTo || 0 == migrateTo.length
            ? ''
            : `Migrate to ${migrateTo}. `;

        let depMsg = `Use of ${depItem} is deprecated and no longer supported. ${migrateTo}${msg}`;

        self.warn(depMsg, source);
    }

    /**
        @public @method
        Logs a message at the error level
        @param {string|null} msg
        @param {string|null} source
     */
    error(msg, source) {
        if (!this.ezErrorEnabled) {
            return;
        }

        if (!msg || 'string' !== typeof msg || 0 == msg.length) {
            return;
        }

        source = !source || 'string' !== typeof source || 0 == source.length
            ? ''
            : `[${source}]: `;

        this.ezLogConsole.error(`${source}${msg}`);
    }

    /**
        @public @method
        Logs a message at the error level
        @param {string} msg
        @param {string} source
     */
    warn(msg, source) {
        if (!this.ezWarnEnabled) {
            return;
        }

        if (!msg || 'string' !== typeof msg || 0 == msg.length) {
            return;
        }

        source = !source || 'string' !== typeof source || 0 == source.length
            ? ''
            : `[${source}]: `;

        this.ezLogConsole.warn(`${source}${msg}`);
    }

    /**
        @public @method
        Logs a message at the error level
        @param {string|null} msg
        @param {string|null} source
     */
    info(msg, source) {
        if (!this.ezInfoEnabled) {
            return;
        }

        if (!msg || 'string' !== typeof msg || 0 == msg.length) {
            return;
        }

        source = !source || 'string' !== typeof source || 0 == source.length
            ? ''
            : `[${source}]: `;

        this.ezLogConsole.info(`${source}${msg}`);
    }

    /**
        @public @method
        Logs a message at the error level
        @param {string|null} msg
        @param {string|null} source
     */
    debug(msg, source) {
        if (!this.ezDebugEnabled) {
            return;
        }

        if (!msg || 'string' !== typeof msg || 0 == msg.length) {
            return;
        }

        source = !source || 'string' !== typeof source || 0 == source.length
            ? ''
            : `[${source}]: `;

        this.ezLogConsole.debug(`${source}${msg}`);
    }
}
