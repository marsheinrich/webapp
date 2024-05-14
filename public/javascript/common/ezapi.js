import {
    EzObject,
    EzBoolean,
    EzString,
    EzArray,
    EzFunction,
    EzJson
} from '/ezlibrary/helpers/EzHelpers.js';

import {
    EzException,
    EzBadParamException
} from '/ezlibrary/exceptions/EzExceptions.js';

import {
    EzRegistrationState,
    EzInstanceState
} from '/ezlibrary/enums/EzEnumerations.js';

import { EzLogger } from '/public/javascript/common/ezclocker-logger.js';

import '/ezlibrary/ez-event-engine.js';

// TODO: Remove EzEnumBuilder import once all use is migrated
import '/ezlibrary/EzEnumBuilder.js';

// TODO: Remove EzGetterSetter import once all use is migrated
import { EzGetterSetter } from '/ezlibrary/ez-getter-setter.js';

// TODO: Remove EzGetter import once all use is migrated
import { EzGetter } from '/ezlibrary/ez-getter.js';

import { EzCustomEvent } from '/ezlibrary/events/EzCustomEvent.js';


/**
    Provides utility methods, helper methods, and ezClocker API registration/access
 */
export class EzApi {
    /**
     * @public @static @readonly @property
        Global name of EzApi instance reference
     * @returns {string}
     */
    static get ezApiName() {
        return 'ezApi';
    }

    /**
     * @public @static @readonly @property
        EzApi public event names
     * @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzApi_Ready',
            onEzApiReady: 'onEzApiReady'
        };
    }

    static #ezInstance;

    /**
     * @public @static @field
        Gets the singleton instance of EzApi
     * @returns {EzApi|null}
    */
    static get ezInstance() {
        return EzApi.#ezInstance;
    }

    /**
     * @public @static @setter @property
        Sets the singleton EzApi instance on globalThis.
     * @param {EzApi} ezApiInstance
     */
    static set ezInstance(ezApiInstance) {
        if (!ezApiInstance) {
            globalThis[EzApi.ezApiName] = null;
            delete globalThis[EzApi.ezApiName];
            return;
        }

        if (EzApi.#ezInstance) {
            throw new Error('EzApi\'s singleton instance is already assigned.');
        }

        EzApi.#ezInstance = ezApiInstance;

        globalThis[EzApi.ezApiName] = EzApi.ezInstance;
    }

    /**
     * @private @static @property
        Holds the initialization state of EzApi
     */
    static #ezInitializationState = null;

    /**
     * @public @static
     * Name of the event name property that is defined by classes in their ezEventNames
        static property that is dispatched after the class is registered with ezApi.
     */
    static API_READY_EVENT_NAME_PROPERTY = 'onReady';

    /**
     * @public @static @readonly @proeprty
     * Determines if it is safe for the EzApi.ezInitialize to execute.
     * @returns {boolean}
     */
    static get ezCanInitialize() {
        return 'PENDING' === EzApi.#ezInitializationState &&
            'interactive' === document.readyState;
    }

    /**
     * @public @static @readonly @proeprty
     * Returns if ezApi's singleton instance is assigned to globalThis yet.
     */
    static get isRegistered() {
        return null != EzApi.#ezInstance;
    }

    /**
     * @private @static
        Initializes the EzApi class assigning ezApi as the global reference.
        NOTE: EzApi.ezInitialize should only get called during initially loading of this script.
     * @returns {boolean}
     */
    static #ezInitialize() {
        if (!EzApi.ezCanInitialize) {
            return false;
        }

        if (EzApi.isRegistered) {
            return true;
        }

        EzApi.ezInstance = new EzApi();

        EzApi.ezInstance.ezInit();

        EzApi.#ezInitializationState = 'INITIALIZED';

        let onEzApiReadyCustomEvent = new CustomEvent(
            EzApi.ezEventNames.onEzApiReady,
            {
                bubbles: true,
                composed: true,
                ezApi: EzApi.ezInstance
            });

        let onReadyCustomEvent = new CustomEvent(
            EzApi.ezEventNames.onReady,
            {
                bubbles: true,
                composed: true,
                ezApi: EzApi.ezInstance
            });

        // Fire the EzApi Ready events
        document.dispatchEvent(onEzApiReadyCustomEvent);

        document.dispatchEvent(onReadyCustomEvent);

        return true;
    }

    // Static initializer
    static {
        EzApi.#ezInstance = Object.prototype.hasOwnProperty.call(globalThis, EzApi.ezApiName) && globalThis.ezApi
            ? globalThis.ezApi
            : null;

        EzApi.#ezInitializationState = 'PENDING';

        document.addEventListener(
            'onreadystatechange',
            EzApi.#ezInitialize);

        document.addEventListener(
            'DOMContentLoaded',
            EzApi.#ezInitialize);
    }

    /**
     * @public @constructor
     * Creates a new instance of EzApi
     */
    constructor() {
        this.ezStates.push('CONSTRUCTED');
        EzApi.ezInstnace = this;

        this.ezclocker['EzApiRegistrationScope'] = this.EzApiRegistrationScope;

        // Make sure the logger is created and ready
        this.ezclocker['ezLogger'] = new EzLogger(
            Object.prototype.hasOwnProperty.call(globalThis, 'console')
                ? globalThis['console']
                : console);
        this.ezclocker['logger'] = this.ezclocker['ezLogger'];
    }

    /**
     * @public @property
        Indicates if this instance is ready to be used
     */
    #ready = false;

    get ready() {
        return this.#ready;
    }

    set ready(readyBoolean) {
        this.#ready = readyBoolean;
    }

    /**
     * @deprecated
     * Stop all use of ezTypeName, use EzApi.ezInstance.constructor.name, self.constructor.name,
        or this.constructor.name instead.
     * Will remove in future release.
     * @public @property
        Holds the name of the type/class.
     */
    ezTypeName = 'EzApi';

    /**
     * @public @property
        Holds this instance's current states. See EzInstanceState for available state values.
     */
    #ezInstanceStates = [];
    get ezStates() {
        return this.#ezInstanceStates;
    }
    set ezStates(ezInstanceStates) {
        this.#ezInstanceStates = ezInstanceStates;
    }

    /**
     * @public @property
     */
    #ezDebugMode = false;
    get ezDebugMode() {
        return this.#ezDebugMode;
    }
    set ezDebugMode(debugMode) {
        this.#ezDebugMode = debugMode;
        // TODO: Cascade the debug mode boolean to all registered apis
    }

    /**
     * @deprecated
     * Stop all use, will remove in future release.
     * @public @property
     */
    paramEvalClass = {
        functionClass: 'EzApi'
    };

    /**
     * @public @property
     * Offical array to access to all registered api's and enumerations
     */
    #ezclocker = {};
    get ezclocker() {
        return this.#ezclocker;
    }
    set ezclocker(registeredEzClockerApis) {
        this.#ezclocker = registeredEzClockerApis;
    }
    /**
     * @public @property @getter
     * Gets
     * Alias to ezApi.ezclocker property
     * @returns {object}
     */
    get ezClocker() {
        return this.#ezclocker;
    }
    /**
     * @public @property @setter
     * Sets
     * Alias to ezApi.ezclocker property
     * @param {object} registeredEzClockerApis
     */
    set ezClocker(registeredEzClockerApis) {
        this.#ezclocker = registeredEzClockerApis;
    }

    /**
     * @public @property
        Migrate away from using EzApi.ezInstance.enums
        Instead, import the enumeration class and reference the class name.
     * @deprecated
        Most numerations no longer register here. See enumeration class for
        how to access.
     */
    enums = [];

    /**
     * @deprecated
     * Stop all use, will remove in future release.
        Migrate to EzEventEngine functionality
     * @public @property
        All registered event names (access with: EzApi.ezInstance.events[{eventOwner}.{eventCategory}])
     */
    events = [];

    /**
     * @deprecated
     * Stop all use, will remove in future release.
     * @public @property
        EzApiRegistrationScope is deprecated and should no longer be used anywhere.
     */
    EzApiRegistrationScope = {
        EZCLOCKER: 'ezclocker',
        ROOT: 'r',
        PUBLIC: 'p',
        SECURE: 's',
        EXTERNAL: 'x',
        DIALOGS: 'd',
        WINDOW: 'window',
        fromEzApiRegistrationScopeValue: (ezApiRegistrationScopeValue) => {
            for (let key in EzApi.ezInstance.EzApiRegistrationScope) {
                if (EzApi.ezInstance.EzApiRegistrationScope[key] === ezApiRegistrationScopeValue) {
                    return EzApi.ezInstance.EzApiRegistrationScope;
                }
            }
            return EzApi.ezInstance.EzApiRegistrationScope.ROOT;
        }
    };

    /**
     * @deprecated
     * Use EzApi.ezInstance.ezclocker instead
     * Will remove in future release.
     * @public @property
     */
    Public = this.ezclocker;

    /**
     * @deprecated
     * Use EzApi.ezInstance.ezclocker instead
     * Will remove in future release.
     * @public @property
     */
    public = this.ezclocker;

    /**
     * @deprecated
     * Use EzApi.ezInstance.ezclocker instead
     * Will remove in future release.
     * @public @property
     */
    p = this.ezclocker;

    /**
     * @deprecated
     * Use EzApi.ezInstance.ezclocker instead
     * Will remove in future release.
     * @public @property
     */
    Secure = this.ezclocker;

    /**
     * @deprecated
     * Use EzApi.ezInstance.ezclocker instead
     * Will remove in future release.
     * @public @property
     */
    secure = this.ezclocker;

    /**
     * @deprecated
     * Use EzApi.ezInstance.ezclocker instead
     * Will remove in future release.
     * @public @property
     */
    s = this.ezclocker;

    /**
     * @deprecated
     * Use EzApi.ezInstance.ezclocker instead
     * Will remove in future release.
     * @public @property
     */
    External = this.ezclocker;

    /**
     * @deprecated
     * Use EzApi.ezInstance.ezclocker instead
     * Will remove in future release.
     * @public @property
     */
    external = this.ezclocker;

    /**
     * @deprecated
     * Use EzApi.ezInstance.ezclocker instead
     * Will remove in future release.
     * @public @property
     */
    x = this.ezclocker;

    /**
     * @deprecated
     * Use EzApi.ezInstance.ezclocker instead
     * Will remove in future release.
     * @public @property
     */
    Dialogs = this.ezclocker;

    /**
     * @deprecated
     * Use EzApi.ezInstance.ezclocker instead
     * Will remove in future release.
     * @public @property
     */
    dialogs = this.ezclocker;

    /**
     * @deprecated
     * Use EzApi.ezInstance.ezclocker instead
     * Will remove in future release.
     * @public @property
     */
    d = this.ezclocker;

    /**
     * @protected @method
        Initalizes ezApi
     * @returns {EzApi}
     */
    ezInit() {
        EzApi.ezInstance.enableDebugLogging = EzLogger.ezInstance.ezDebugEnabled;
        EzApi.ezInstance.enableInfoLogging = EzLogger.ezInstance.ezInfoEnabled;
        EzApi.ezInstance.enableWarnLogging = EzLogger.ezInstance.ezWarnEnabled;
        EzApi.ezInstance.enableErrorLogging = EzLogger.ezInstance.ezErrorEnabled;

        EzApi.ezInstance.ezStates.push('INITIALIZED');
        EzApi.ezInstance.ready = true;

        return EzApi.ezInstance;
    }

    /**
     * @public
     * Creates a new Error() with the provided message.
     * @param {string} em
     */
    ezException(em) {
        return new Error(em);
    }

    /**
     * @deprecated
        Migrate to creating new EzBadParamException instead of calling ezApi.ezBadParm().
        Example: throw new EzBadParamException(paramName, className, functionName);
     * @public
     * Creates a new Error() with the provided message.
     * @param {string} paramName
     * @param {string} className
     * @param {string} functionName
     * @returns {EzBadParamException}
     */
    ezBadParam(paramName, className, functionName) {
        return new EzBadParamException(paramName, className, functionName);
    }

    /**
     * @public
        Obtains the api reference for the provided api id. If the provided api id does not match a known api reference,
        then the defaultApiReference is returned.
     * @param {string} apiId
     * @param {null|object} defaultApiReference
     * @returns {object}
     */
    ezGetApiIdReference(apiId, defaultApiReference) {
        return EzString.stringHasLength(apiId) &&
            EzObject.isValid(EzApi.ezInstance.ezclocker[apiId])
            ? EzApi.ezInstance.ezclocker[apiId]
            : defaultApiReference;
    }

    /**
     * @public
     * Determines if the window.console[{FunctionName}] is available to call.
     * @param {string} functionName
     * @returns {boolean}
     */
    ezIsWindowConsoleFunctionAvailable(functionName) {
        return EzObject.isValid(window.console) &&
            EzFunction.isFunction(window.console[functionName]);
    }

    /**
     * @public
        Sets the enableDebugLogging. When true, ezApi will allow log writing to the window.console.debug.
        If debugLogEnabled is null, then it is assumed false.
     * @param {null|Boolean} debugLogEnabled
     */
    ezSetEnableDebugLogging(debugLogEnabled) {
        EzApi.ezInstance.enableDebugLogging = EzBoolean.isTrue(debugLogEnabled);
    }

    /**
     * @public
        Sets the enableInfoLogging. When true, ezApi will allow log writing to the window.console.info.
        If infoLogEnabled is null, then it is assumed false.
     * @param {null|Boolean} infoLogEnabled
     */
    ezSetEnableInfoLogging(infoLogEnabled) {
        EzApi.ezInstance.enableInfoLogging = EzBoolean.isTrue(infoLogEnabled);
    }

    /**
     * @public
        Sets the enableErrorLogging. When true, ezApi will allow log writing to the window.console.warn.
        If warnLogEnabled is null, then it is assumed false.
     * @param {null|Boolean} warnLogEnabled
     */
    ezSetEnableWarnLogging(warnLogEnabled) {
        EzApi.ezInstance.enableWarnLogging = EzBoolean.isTrue(warnLogEnabled);
    }

    /**
     * @public
        Sets the enableErrorLogging. When true, ezApi will allow log writing to the window.console.error.
        If infoLogEnabled is null, then it is assumed false.
     * @param {null|boolean} errorLogEnabled
     */
    ezSetEnableErrorLogging(errorLogEnabled) {
        EzApi.ezInstance.enableErrorLogging = EzBoolean.isTrue(errorLogEnabled);
    }

    /**
     * @public
     * Logs a function parameter error if the evalResult is false.
     * @param {Boolean|null} evalResult
     * @param {string|null} paramName
     * @param {string|null} functionName
     * @param {string|null} className
     * @returns {boolean}
     * Returns true if an error log was NOT written, true otherwise.
     */
    ezValidateParam(evalResult, paramName, functionName, className) {
        return EzApi.ezInstance.ezValidParam({
            result: EzBoolean.isTrue(evalResult),
            param: EzApi.ezInstance.ezStringOrEmpty(paramName),
            callerFunction: EzApi.ezInstance.ezStringOrEmpty(functionName),
            functionClass: EzApi.ezInstance.ezStringOrEmpty(className)
        });
    }

    /**
     * @public
     * Logs a function parameter error if the evalResult is false.
     * @param {Boolean|null} evalResult
     * @param {string|null} paramName
     * @param {string|null} functionName
     * @param {string|null} className
     * @returns {boolean}
     * Returns true if an error log was written, false otherwise.
     */
    ezParamNotValid(evalResult, paramName, functionName, className) {
        return EzApi.ezInstance.ezNotValidParam({
            result: EzBoolean.isTrue(evalResult),
            param: EzApi.ezInstance.ezStringOrEmpty(paramName),
            callerFunction: EzApi.ezInstance.ezStringOrEmpty(functionName),
            functionClass: EzApi.ezInstance.ezStringOrEmpty(className)
        });
    }

    /**
     * @public
        Processes the evalObject to determine if a bad parameter error log needs written.
     * @param {object} evalObject
     * @returns {boolean}
     * Returns true if an error log was NOT written. False otherwise.
     */
    ezValidParam(evalObject) {
        return !EzApi.ezInstance.ezNotValidParam(evalObject);
    }
    /**
     * @public
        Processes the evalObject to determine if a function parameter error needs logged and returns if an error
        was logged or not (indicating the param is not valid).
     * @param {object} evalObject
     * @returns {boolean}
     * Returns true if an error log was written. False otherwise.
     */
    ezNotValidParam(evalObject) {
        if (!EzObject.isValid(evalObject)) {
            EzApi.ezInstance.ezLogError('The evalObject param is required in call to EzApi.ezValidParam().');
            return true;
        }

        if (EzApi.ezInstance.ezIsFalse(evalObject)) {
            let em = '';
            if (!EzString.stringHasLength(evalObject.param)) {
                em += 'Then ' + evalObject.param + ' is required';
            } else {
                em += 'Failed to validate a required param';
            }

            if (!!EzString.stringHasLength(evalObject.functionClass) &&
                !!EzString.stringHasLength(evalObject.callerFunction)) {
                em += ' in call to ' + evalObject.functionClass + '.' + evalObject.callerFunction + '().';
            } else if (!!EzString.stringHasLength(evalObject.callerFunction)) {
                em += ' in call to ' + evalObject.callerFunction + '().';
            }

            EzApi.ezInstance.ezclocker.logger.error(em);
            return true;
        }

        return false;
    }

    /**
     * @public
        Writes to the window.console.debug if available AND EzApi.ezInstance.enableDebugLogging is true.
     * @param {string} dMessage
     */
    ezLogDebug(dMessage) {
        if (EzApi.ezInstance.ezIsFalse(EzApi.ezInstance.ezDebugMode)) {
            return;
        }

        if (EzApi.ezInstance.ezIsWindowConsoleFunctionAvailable('debug') &&
            EzString.stringHasLength(dMessage) &&
            EzBoolean.isTrue(EzApi.ezInstance.enableDebugLogging)) {
            window.console.debug(EzString.em`[EzApi] [DEBUG]: ${dMessage}`);
        }
    }
    /**
     * @deprecated Migrate to: EzApi.ezInstance.ezLogInfo(iMessage)
     * @param {string} iMessage
     */
    ezLog(iMessage) {
        EzApi.ezInstance.ezLogInfo(iMessage);
    }
    /**
     * @public
     * Logs to window.console.info if available AND EzApi.ezInstance.enableInfoLogging is true.
     * @param {string} iMessage
     */
    ezLogInfo(iMessage) {
        if (EzApi.ezInstance.ezIsWindowConsoleFunctionAvailable('info') &&
            EzString.stringHasLength(iMessage) &&
            EzBoolean.isTrue(EzApi.ezInstance.enableInfoLogging)) {
            window.console.info('[EzApi] [INFO ]: ' + iMessage);
        }
    }
    /**
     * @public
     * Logs to window.console.warn if available AND EzApi.ezInstance.enableWarnLogging is true.
     * @param {string} message
     */
    ezLogError(wMessage) {
        if (EzApi.ezInstance.ezIsWindowConsoleFunctionAvailable('warn') &&
            EzString.stringHasLength(wMessage) &&
            EzBoolean.isTrue(EzApi.ezInstance.enableWarnLogging)) {
            window.console.warn('[EzApi] [ERROR]: ' + wMessage);
        }
    }

    /**
     * @public
     * Logs to window.console.warn if available AND EzApi.ezInstance.enableWarnLogging is true.
     * @param {string} message
     */
    ezLogWarn(eMessage) {
        if (EzApi.ezInstance.ezIsWindowConsoleFunctionAvailable('warn') &&
            EzString.stringHasLength(eMessage) &&
            EzBoolean.isTrue(EzApi.ezInstance.enableWarnLogging)) {
            window.console.warn('[EzApi] [WARN ]: ' + eMessage);
        }
    }
    /**
     * @deprecated Use EzApi.ezInstance.ezRegisterNewEnum() instead
     * @public
     * Registers an enumeration with the ezApi instance. Registered enumerations are available from
        EzApi.ezInstance.enums
     * @param {string} constName
     * @param {object} constInstance
     * @return {object}
        constInstance passed in
     */
    ezRegisterEnum(enumerationName, enumerationInstance) {
        if (!EzString.stringHasLength(enumerationName)) {
            throw new Error('[EzApi.ezRegisterEnum]: A non-empty name is required to register with ezApi.');
        }
        if (!EzObject.isValid(enumerationInstance)) {
            throw new Error('[EzApi.ezRegisterEnum]: You can only register valid, non-null instances with ezApi.');
        }

        EzApi.ezInstance.enums[enumerationName] = enumerationInstance;

        // Add the common properties and methods
        if (!EzString.stringHasLength(enumerationInstance.UNKNOWN)) {
            enumerationInstance.UNKNOWN = 'UNKNOWN';
        }
        if (!EzFunction.isFunction(enumerationInstance.ezFromValue)) {
            enumerationInstance.ezFromValue = (enumValue) => {
                return EzApi.ezInstance.ezGetJSONObjectPropertyValueOrDefault(enumValue, enumerationInstance.UNKNOWN);
            };
        }

        return EzApi.ezInstance.enums[enumerationName];
    }

    /**
     * @deprecated
        Migrate to EzApi.ezInstance.ezRegisterEnumeration
        Wil remove ezRegisterNewEnum in future release.
     * @public
     * Registers a new enumeration instance. Calls new on the provided EnumerationReference.
     * Will add the UNKNOWN enum value if it is not already on the enumeration.
     * Will add the ezFromValue function if not already implemented on the provided enumeration instance.
        Example:
             function MyEnumeration() {
                 ENUM_VALUE_1 = 'enumValue1';
                 ENUM_EVALUE_2 = 'enumValue2';
             }
             document.addEventListener('onEzApiReady', function() { EzApi.ezInstance.ezRegisterNewEnum(MyEnumeration); });
     * @param {Function} EnumerationReference
     * @param {string} enumName
     * @returns {object}
     * Returns the registered enumeration instance
     */
    ezRegisterNewEnum(EnumerationReference, enumName) {
        if (!EzFunction.isFunction(EnumerationReference)) {
            throw new EzBadParamException('EnumerationReference', 'EzApi', 'ezRegisterNewEnum');
        }

        let enumInstance = new EnumerationReference();

        if (!EzString.stringHasLength(enumInstance.ENUM_NAME)) {
            if (EzString.stringHasLength(enumName)) {
                enumInstance.ENUM_NAME = enumName;
            } else if (EzObject.isValid(enumInstance.constructor.name)) {
                try {
                    enumInstance.ENUM_NAME = enumInstance.constructor.name;
                } catch (err) {
                    EzApi.ezInstance.ezLogError('EzApi.ezRegisterNewEnum: Unable to register a new enumeration. ' +
                        'Encounted an unexpected error during the attempt to discover the name of the enumeration ' +
                        'from {enumInstance}.constructor.name. Error: ' + err.message);
                    throw (err);
                }
            }
        }

        return EzApi.ezInstance.ezStoreEnum(enumInstance.ENUM_NAME, enumInstance);
    }

    /**
     * @deprecated
        Migrate to EzApi.ezInstance.ezRegisterEnumeration
        Wil remove EzApi.ezInstance._ezRegisterEzEnum in future release.
     */
    _ezRegisterEzEnum(EnumerationClass) {
        if (!EzObject.isValid(EnumerationClass)) {
            throw new EzBadParamException('EnumerationClass', 'EzApi', '_ezRegisterEzEnum');
        }

        // Add the static ezKeys property
        EnumerationClass.ezKeys = [];
        EnumerationClass.ezDisplayValues = {};

        // Constructor class and create the static ENUM values
        let enumInstance = new EnumerationClass();
        enumInstance.ezKeys = EnumerationClass.ezKeys;
        enumInstance.ezDisplayValues = EnumerationClass.ezDisplayValues;
        enumInstance.ezTypeName = EnumerationClass.name;

        // Add the static UNKNOWN property if not already available
        if (!EzObject.isValid(enumInstance.UNKNOWN)) {
            enumInstance.UNKNOWN = 'UNKNOWN';
        }

        // Replicate properties to class
        for (let prop in enumInstance) {
            if (EzObject.hasProperty(enumInstance, prop) &&
                !EzObject.hasProperty(EnumerationClass, prop)) {

                // Only replicate non-underscore properties and functions
                if ('_' !== prop.charAt(0)) {
                    EnumerationClass[prop] = enumInstance[prop];
                    if (prop === prop.toUpperCase() && EzApi.ezInstance.ezIsString(enumInstance[prop])) {
                        EnumerationClass.ezKeys.push(prop);

                        // Build display values object
                        if (!EzObject.hasProperty(enumInstance, `_${prop}`)) {
                            // Add internal detail property if none is available
                            enumInstance[`_${prop}`] = {
                                value: enumInstance[prop],
                                display: enumInstance[prop]
                            };
                        } else {
                            if (!EzObject.hasProperty(enumInstance[`_${prop}`], 'value')) {
                                enumInstance[`_${prop}`].value = prop;
                            }
                            if (!EzObject.hasProperty(enumInstance[`_${prop}`], 'display')) {
                                enumInstance[`_${prop}`].display = prop;
                            }
                            EnumerationClass.ezDisplayValues[`_${prop}`] = enumInstance[`_${prop}`].display;
                        }
                    }
                }
            }
        }

        // Add the generic ezTo enum value additional property function if not available
        if (!EzFunction.isFunction(enumInstance.ezTo)) {
            EnumerationClass.ezTo = (propName, enumValue) => {
                let self = EzApi.ezInstance.enums[EnumerationClass.name] || new EnumerationClass();

                if (!EzString.stringHasLength(enumValue) || -1 === self.ezKeys.indexOf(enumValue)) {
                    throw EzApi.ezInstance.ezException(EzString.em`
                    Enumeration value of ${enumValue} is not a member of enumeration ${self.ezTypeName}.`);
                }

                let _EnumValue = EzApi.ezInstance.ezSingleLineTemplate`_${enumValue}`;
                if (!EzObject.hasProperty(self, _EnumValue)) {
                    throw EzApi.ezInstance.ezException(EzString.em`
                        Enumeration ${self.ezTypeName} does not support additional properties for ${enumValue}`);
                }

                if (!EzObject.hasProperty(self[_EnumValue], propName)) {
                    throw EzApi.ezInstance.ezException(EzString.em`
                        Additional value property or ${propName} for enumeration value ${enumValue} on enumeration
                        ${self.ezTypeName} is not available.`);
                }

                return self[_EnumValue][propName];
            };
            enumInstance.ezTo = EnumerationClass.ezTo;
        }

        // Add the ezValueOf function if not on the EnumerationClass already
        if (!EzFunction.isFunction(enumInstance.ezValueOf)) {
            EnumerationClass.ezValueOf = (enumValue) => {
                let self = EzApi.ezInstance.enums[EnumerationClass.name] || new EnumerationClass();
                return EzString.stringHasLength(enumValue) && 0 > self.ezKeys.indexOf(enumValue.toUpperCase())
                    ? self[enumValue]
                    : self.UNKNOWN;
            };
            enumInstance.ezValueOf = EnumerationClass.ezValueOf;
        }

        // Add the ezToDisplayValue function if not already present
        if (!EzFunction.isFunction(enumInstance.ezToDisplayValue)) {
            EnumerationClass.ezToDisplayValue = (enumValue) => {
                let self = EzApi.ezInstance.enums[EnumerationClass.name] || new EnumerationClass();
                return self.ezTo('display', enumValue);
            };
            enumInstance.ezToDisplayValue = EnumerationClass.ezToDisplayValue;
        }

        EzApi.ezInstance.enums[EnumerationClass.name] = enumInstance;

        EzApi.ezInstance.ezLogDebug(`[EzApi: Registered API ${EnumerationClass.name}]`);

        return EzApi.ezInstance.enums[EnumerationClass.name];
    }

    /**
     * @deprecated
        Migrate to EzApi.ezInstance.ezRegisterEnumeration
        Wil remove EzApi.ezInstance.ezRegisterEzEnum in future release.
     * @public
     * Registers a EzEnum type. This registration and pattern replaces the older ezRegisterNewEnum functionality.
        Define:
        class EnumerationClass {
            constructor() {
                 this._IgnoreProperty = 'This is not considered an enum value';
                 this.ENUM_1 = 'ENUM_1';
                 this.ENUM_2 = 'ENUM_2';
                 this.ENUM_3 = 'ENUM_3';
                 this.ENUM_4 = 'ENUM_4';
            }
        }
        document.addEventListener('onEzApiReady', () => EzApi.ezInstance.ezRegisterEzEnum(EnumerationClass));
        Access:
        Can access the enumeration's values staticly (once registered):
             let enum3 = EnumerationClass.ENUM_3;
        Can also still access via EzApi.ezInstance.enums:
             let enum1 = EzApi.ezInstance.enums.EnumerationClass.ENUM_1;
        New ezValueOf method always available (replaces the old ezFromValue method):
             let enum2 = EzApi.ezInstance.enums.EnumerationClass.ezValueOf('ENUM_2');
        Access an array of the enumeration keys with property ezKeys:
             let enumKeysArray = EnumerationClass.ezKeys;
     */
    ezRegisterEzEnum(EnumerationClass) {
        if (!EzObject.isValid(EnumerationClass)) {
            throw new EzBadParamException('EnumerationClass', 'EzApi', 'ezRegisterEzEnum');
        }

        EzApi.ezInstance.enums[EnumerationClass.name] =
            EzApi.ezInstance.ezclocker.ezEnumBuilder.ezCreateEnumeration(EnumerationClass);

        if (EzObject.hasProperty(EzApi.ezInstance.enums[EnumerationClass.name], 'ezEventNames') &&
            EzObject.hasProperty(EzApi.ezInstance.enums[EnumerationClass.name]['ezEventNames'], EzApi.API_READY_EVENT_NAME_PROPERTY) &&
            EzString.stringHasLength(EzApi.ezInstance.enums[EnumerationClass.name]['ezEventNames'][EzApi.API_READY_EVENT_NAME_PROPERTY])) {
            // If the instance has defined a value fo ezOnReadyEventName, then
            // fire the event via the document.
            document.dispatchEvent(
                new CustomEvent(
                    EzApi.ezInstance.enums[EnumerationClass.name]['ezEventNames'][EzApi.API_READY_EVENT_NAME_PROPERTY],
                    {
                        bubbles: true,
                        apiClass: EnumerationClass,
                        apiName: EnumerationClass.name,
                        registeredInstance: EzApi.ezInstance.enums[EnumerationClass.name],
                        ezApi: EzApi.ezInstance
                    }));
        }

        return EzApi.ezInstance.enums[EnumerationClass.name];
    }

    /**
        // TODO: Remove this method once all use is migrated.
     * @public
        New enumeration registration method
     * @param {class} enumerationClazz
     * @returns {EnumerationClazz}
        Registered instance of enumeration class
     * @deprecated
        Migrate all enumerations to extend from EzEnumeration2
     */
    ezRegisterEnumeration(enumerationClazz) {
        if (!EzObject.isValid(enumerationClazz)) {
            throw new EzBadParamException(
                'enumerationClazz',
                EzApi.ezInstance,
                EzApi.ezInstance.ezRegisterEnumeration);
        }

        if (EzObject.isValid(enumerationClazz.ezInstance)) {
            if (0 > enumerationClazz.ezInstance.ezStates.indexOf(EzInstanceState.REGISTERED_WITH_EZAPI)) {
                // Already registered, ignore it
                return enumerationClazz.ezInstance;
            }
        }

        enumerationClazz.ezInstance = new enumerationClazz();

        enumerationClazz.ezInstance.ezStates = EzArray.arrayOrEmpty(enumerationClazz.ezInstance.ezStates);

        if (0 > enumerationClazz.ezInstance.ezStates.indexOf(EzInstanceState.CONSTRUCTED)) {
            enumerationClazz.ezInstance.ezStates.push(EzInstanceState.CONSTRUCTED);
        }

        // Register with ezApi
        EzApi.ezInstance.enums[enumerationClazz.name] = enumerationClazz.ezInstance;
        EzApi.ezInstance.ezclocker[enumerationClazz.name] = enumerationClazz.ezInstance;

        enumerationClazz.ezInstance.ezStates.push('REGISTERED_WITH_EZAPI');

        enumerationClazz.ezInstance.ready = true;

        // Trigger the ready event for the enumeration
        if (EzObject.isValid(enumerationClazz.ezEventNames) && EzString.stringHasLength(enumerationClazz.ezEventNames.onReady)) {
            EzCustomEvent
                .build(enumerationClazz.ezEventNames.onReady)
                .ezDocumentTiggerEvent({
                    apiClass: enumerationClazz,
                    apiName: enumerationClazz.name,
                    registeredInstance: enumerationClazz.ezInstance,
                    ezApi: EzApi.ezInstance
                });
        } else {
            EzCustomEvent
                .build(enumerationClazz.constructor.name)
                .ezDocumentTiggerEvent({
                    apiClass: enumerationClazz,
                    apiName: enumerationClazz.name,
                    registeredInstance: enumerationClazz.ezInstance,
                    ezApi: EzApi.ezInstance
                });
        }

        return enumerationClazz.ezInstance;
    }

    /**
     * @deprecated
        Migrate to EzApi.ezInstance.ezRegisterEnumeration
        Wil remove EzApi.ezInstance.ezStoreEnum in future release.
     * @public
     * Adds the UNKNOWN enum value to the provided enumeration (if not already present).
     * Adds the ezFromValue function to the provided enumerationInstance if not already available.
     * Adds the ezAsSet function to the provided enumeraionInstance if not already available.
        Finally, stores enumerationInstance within EzApi.ezInstance.enums with the provided enumberationName.
     * @param {string} enumerationName
     * @param {object} enumerationInstance
     * @return {object}
     */
    ezStoreEnum(enumerationName, enumerationInstance) {
        if (!EzString.stringHasLength(enumerationName)) {
            throw new EzBadParamException('enumerationName', 'EzApi', 'ezStoreEnum');
        }
        if (!EzObject.isValid(enumerationInstance)) {
            throw new EzBadParamException('enumerationInstance', 'EzApi', 'ezStoreEnum');
        }

        // Store the enumeration instance in ezApi
        EzApi.ezInstance.enums[enumerationName] = enumerationInstance;

        // Add the common properties
        if (!EzString.stringHasLength(enumerationInstance.constructor.UNKNOWN)) {
            enumerationInstance.constructor.UNKNOWN = 'UNKNOWN';
            enumerationInstance.UNKNOWN = enumerationInstance.constructor.UNKNOWN;
        }

        // Add the common methods
        if (!EzFunction.isFunction(enumerationInstance.constructor.getClass)) {
            enumerationInstance.constructor.ezGetClass = () => {
                return enumerationInstance.constructor;
            };
            enumerationInstance.ezGetClass = enumerationInstance.constructor.ezGetClass;
        }

        if (!EzFunction.isFunction(enumerationInstance.constructor.toString)) {
            enumerationInstance.constructor.ezToString = () => {
                return '[' + enumerationInstance.ezGetClass().name + ']';
            };
            enumerationInstance.ezToString = enumerationInstance.constructor.ezToString;
        }

        if (!EzFunction.isFunction(enumerationInstance.constructor.ezFromValue)) {
            enumerationInstance.constructor.ezFromValue = (enumValue) => {
                if (!EzString.stringHasLength(enumValue)) {
                    return enumerationInstance.UNKNOWN;
                }
                if (EzObject.hasProperty(this, enumValue)) {
                    return enumerationInstance[enumValue];
                }

                let keys = Object.keys(this);
                for (let index in keys) {
                    let enumKey = keys[index];
                    if (enumKey !== 'ENUM_NAME' && enumerationInstance[enumKey] === enumValue) {
                        return enumerationInstance[enumKey];
                    }
                }
                return enumerationInstance.UNKNOWN;
            };
            enumerationInstance.ezFromValue = enumerationInstance.constructor.ezFromValue;
        }

        if (!EzFunction.isFunction(enumerationInstance.constructor.ezAsSet)) {
            enumerationInstance.constructor.ezAsSet = () => {
                let aSet = new Set();
                for (let argValue of arguments) {
                    aSet.add(enumerationInstance.constructor.ezInstance.ezFromValue(argValue));
                }
                return aSet;
            };
            enumerationInstance.ezAsSet = enumerationInstance.constructor.ezAsSet;
        }

        if (!EzFunction.isFunction(enumerationInstance.constructor.ezTo)) {
            enumerationInstance.constructor.ezTo = (propName, enumValue) => {
                let self = enumerationInstance.constructor.ezInstance;

                if (!EzString.stringHasLength(enumValue) || -1 === self.ezKeys.indexOf(enumValue)) {
                    throw EzApi.ezInstance.ezException(EzString.em`
                    Enumeration value of ${enumValue} is not a member of enumeration ${self.ezTypeName}.`);
                }

                let _EnumValue = EzApi.ezInstance.ezSingleLineTemplate`_${enumValue}`;
                if (!EzObject.hasProperty(self, _EnumValue)) {
                    throw EzApi.ezInstance.ezException(EzString.em`
                        Enumeration ${self.ezTypeName} does not support additional properties for ${enumValue}`);
                }

                if (!EzObject.hasProperty(self[_EnumValue], propName)) {
                    throw EzApi.ezInstance.ezException(EzString.em`
                        Additional value property or ${propName} for enumeration value ${enumValue} on enumeration
                        ${self.ezTypeName} is not available.`);
                }

                return self[_EnumValue][propName];
            };
            enumerationInstance.ezTo = enumerationInstance.constructor.ezTo;
        }


        // Return the stored instance
        enumerationInstance.ezStates = enumerationInstance.ezStates || [];
        enumerationInstance.ezStates.push('REGISTERED_WITH_EZAPI');
        return EzApi.ezInstance.enums[enumerationName];
    }

    /**
     * @deprecated
        Migrate to EzApi.ezInstance.ezRegisterNewApi or EzApi.ezInstance.ezRegisterInstance
        Wil remove EzApi.ezInstance.ezRegisterApi in future release.
     * @public
        Register an api with the EzApi system.
     * @param {string} apiName
     * @param {object} apiInstance
     * @returns {object}
     * Returns the Api instance that is provided
     */
    ezRegisterApi(apiName, apiInstance, apiClass) {
        if (!EzString.stringHasLength(apiName)) {
            throw new EzBadParamException(
                'apiName',
                EzApi.ezInstance,
                EzApi.ezInstance.ezRegisterApi);
        }
        if (!EzObject.isValid(apiInstance)) {
            throw new EzBadParamException(
                'apiInstance',
                EzApi.ezInstance,
                EzApi.ezInstance.ezRegisterApi);
        }

        if (EzObject.isValid(EzApi.ezInstance.ezclocker[apiName])) {
            if (EzBoolean.isTrue(EzApi.ezInstance.ezDebugMode)) {
                EzApi.ezInstance.ezLogError(
                    EzString.em.ezEM`
                        EzApi: EzClocker API ${apiName} is already registered!
                        Please avoid registering an an api with the same name more than once.
                        Multiple registrations indicate a defect, duplicate api names, or duplicate imports of dependencies.`);
            } else {
                EzApi.ezInstance.ezLogWarn(
                    EzApi.ezMsg`EzApi: Replacing already registered api ${apiName} with another instance.`);
            }

            EzApi.ezInstance.ezclocker[apiName] = apiInstance;
            EzApi.ezInstance.ezLogDebug(ezApi.ezMsg`EzApi: Replaced existing registration of api ${apiName}.`);
        } else {
            EzApi.ezInstance.ezclocker[apiName] = apiInstance;
            EzApi.ezInstance.ezLogDebug('EzApi: Registered api with name=' + apiName + '.');
        }

        let typeName = null;
        if (EzObject.isValid(apiClass)) {
            typeName = apiClass.constructor.name;
        } else if (EzApi.ezInstance.ezJsonObjectHasProperty(apiInstance, 'CLASS_NAME')) {
            typeName = apiInstance.CLASS_NAME;
        } else {
            typeName = apiName.replace(apiName.charAt(0), apiName.charAt(0).toUpperCase());
        }

        if (EzString.stringHasLength(typeName)) {
            // Apply common helper functions to the instance...
            apiInstance.toString = () => {
                return '[object ' + typeName + ']';
            };
        }

        return EzApi.ezInstance.ezclocker[apiName];
    }

    ezDetermineNameOfClass(aClazz, aClazzInstance, aClazzName) {
        if (EzObject.isValid(aClazz)) {
            return aClazz.name;
        }

        if (EzObject.isValid(aClazzInstance)) {
            aClazzInstance.constructor.name;
        }

        if (EzString.stringHasLength(aClazzName)) {
            return aClazzName;
        }

        throw new EzException(
            EzString.em`
                Unable to determine the name of the class from the provided parameters:
                aClazz=${aClazz}, aClazzInstance=${aClazzInstance}, aClazzName=${aClazzName}`);
    }

    /**
     * @public
     * Attempts to determine the name of a class that can be used for registration in ezApi.
     * @param {object} apiClass
     * @returns {string}
     */
    ezDetermineApiNameFromClass(apiClass) {
        let apiName = '';
        try {
            if (EzObject.isValid(apiClass.prototype.constructor.name)) {
                apiName = apiClass.prototype.constructor.name;
            } else {
                // Try to guess the old fashion way...
                let result = /^function\s+([\w\$]+)\s*\(/.exec(apiClass.toString());
                apiName = result
                    ? result[1]
                    : '';
            }
        } catch (instanceNameError) {
            EzApi.ezInstance.ezLogError('EzApi: Unable to determine the api instance name to use' +
                ' from the provided api class/constructor ' + apiClass.name + '. Reason: ' +
                instanceNameError.name + ': ' + instanceNameError.message + '.');
            throw (instanceNameError);
        }

        if (!EzString.stringHasLength(apiName)) {
            throw EzApi.ezInstance.ezException(
                'Unable to determine the name from the constructor of an API class. Registration cannot continue.');
        }

        return apiName.replace(apiName.charAt(0), apiName.charAt(0).toLowerCase());
    }

    /**
     * @public
     * Creates a new instance of the provided class.
     * Adds a special toString method to return the constructor name of the class as well.
     * @param {Class} aClass
     * @returns {object}
     */
    ezNewInstance(aClass) {
        let apiInstance;
        try {
            apiInstance = new aClass.prototype.constructor();
            apiInstance.toString = () => {
                return '[object ' + aClass.prototype.constructor.name + ']';
            };
            return apiInstance;
        } catch (constructError) {
            EzApi.ezInstance.ezLogError(EzString.em`
            Creation of new instance of ${aClass.name} failed.
            Reason: ${constructError.name}::${constructError.message}`);
            throw (constructError);
        }
    }

    /**
     * @public @method
     * Registers a new api instance from the provided class. Calls the objects ezInit() method if it exists. Returns the
     * new api instance.
     * @param {Class} Clazz
     * @param {string} apiName
     * @param {boolean} overrideReRegistration
     * @param {array|null|undefined} aliasApiNames;
     * @returns {object}
     */
    ezRegisterNewApi(Clazz, apiName, overrideReRegistration, aliasApiNames) {
        if (!EzObject.isValid(Clazz)) {
            throw new EzBadParamException(
                'Clazz',
                EzApi.ezInstance,
                EzApi.ezInstance.ezRegisterNewApi);
        }

        if (!EzString.stringHasLength(apiName)) {
            apiName = EzApi.ezInstance.ezDetermineApiNameFromClass(Clazz);
        }

        if (EzObject.isValid(EzApi.ezInstance.ezclocker[apiName])) {
            if (EzBoolean.isTrue(overrideReRegistration)) {
                // Allow allow multiple registrations only if overrideReRegistration is true.
                // THIS IS A RARE CASE
                EzApi.ezInstance.ezLogWarn(
                    EzString.em`
                        [EzApi]: Re-Registration of a previously registered API class was permitted due to an override command.
                        Replacing previously register API class ${apiName} with a new instance and re-initializing.`);
            } else {
                // Already registered, do not allow multiple registrations
                if (EzBoolean.isTrue(EzApi.ezInstance.ezDebugMode)) {
                    // Log warning when in debug mode
                    EzApi.ezInstance.ezLogError(
                        EzString.em`
                            [EzApi]: Ignored 2nd attempt to register API class ${apiName}.
                            Do not register an api with the same name or more than once.`);
                }

                return Clazz.ezInstance;
            }
        }

        // Step 1: Create the instance
        Clazz.ezInstance = EzApi.ezInstance.ezNewInstance(Clazz);

        // Step 2: Make sure it has ezStates as an array
        Clazz.ezInstance.ezStates = EzArray.arrayOrEmpty(Clazz.ezInstance.ezStates);

        // Step 3: Register with ezApi
        // ---------------------------------------------------------------------
        // >>> IMPORTANT <<<
        // Registration with ezApi must happen before ezInit is called.
        // ---------------------------------------------------------------------
        EzApi.ezInstance.ezclocker[apiName] = Clazz.ezInstance;

        // Step 4: Set ezDebugMode if supported by api class
        if (EzObject.hasProperty(Clazz.ezInstance, 'ezDebugMode')) {
            Clazz.ezInstance.ezDebugMode = EzApi.ezInstance.ezDebugMode;
        }

        // Step 4: Update ezStates
        // NOTE: String values instead of the enum used here to avoid having to import the enumeration
        // and possibly causing an import loop.
        if (EzArray.isArray(Clazz.ezInstance.ezStates) && !Clazz.ezInstance.ezStates.includes('REGISTERED_WITH_EZAPI')) {
            Clazz.ezInstance.ezStates.push('REGISTERED_WITH_EZAPI');
        } else {
            Clazz.ezInstance.ezStates = ['REGISTERED_WITH_EZAPI'];
        }

        // Step 5: Call the ezInit function if the api class provides it
        if (EzFunction.isFunction(Clazz.ezInstance.ezInit)) {
            try {
                Clazz.ezInstance.ezInit();

                // NOTE: String values instead of the enum used here to avoid having to import the enumeration
                // and possibly causing an import loop.
                if (0 > Clazz.ezInstance.ezStates.indexOf(EzInstanceState.INITIALIZED)) {
                    // Add that ezInit was called to the instance's states if not already there.
                    EzApi.ezInstance.ezclocker[apiName].ezStates.push(EzInstanceState.INITIALIZED);
                }

                if (0 <= Clazz.ezInstance.ezStates.indexOf(EzInstanceState.NOT_INITIALIZED)) {
                    Clazz.ezInstance.ezStates = EzArray.removeAll(EzInstanceState.NOT_INITIALIZED);
                }

                Clazz.ezApiRegistrationState = EzRegistrationState.REGISTERED;

            } catch (initError) {
                EzApi.ezInstance.ezLogError(
                    EzString.em`
                        EzApi.ezRegisterNewApi call to instance's ezInit() method failed for apiName='${apiName}' and
                        provided api class/constructor '${Clazz.name}'.
                        [Root cause: ${EzString.stringOrDefault(initError.message, 'no additional details provided')}]`);

                throw (initError);
            }
        } else if (EzBoolean.isTrue(EzApi.ezInstance.ezDebugMode)) {
            // Warn if an ezInit method was not available on the class
            EzApi.ezInstance.ezLogWarn(
                EzApi.ezInstance.ezMsg`
                    EzApi.ezRegisterNewApi skipped automatic initialization.
                 * Builds API class with apiName='${apiName}' does not provide the ezInit() method.`);
        }

        // Step 6: Register any alias names specified
        if (EzArray.arrayHasLength(aliasApiNames)) {
            for (let aliasApiName of aliasApiNames) {
                EzApi.ezInstance.ezclocker[aliasApiName] = Clazz.ezInstance;
            }
        }

        // After ezInit, the class api is ready to use
        Clazz.ezInstance.ready = true;

        if (EzObject.isValid(Clazz.ezEventNames) && EzString.stringHasLength(Clazz.ezEventNames.onReady)) {
            EzCustomEvent
                .build(Clazz.ezEventNames.onReady, true)
                .ezDocumentTiggerEvent({
                    apiClass: Clazz,
                    apiName: apiName,
                    registeredInstance: apiName.ezInstance,
                    ezApi: EzApi.ezInstance
                });
        } else {
            EzCustomEvent
                .build(Clazz.constructor.name, true)
                .ezDocumentTiggerEvent({
                    apiClass: Clazz,
                    apiName: apiName,
                    registeredInstance: apiName.ezInstance,
                    ezApi: EzApi.ezInstance
                });
        }

        EzApi.ezInstance.ezLogDebug(`[EzApi: Created and registered api ${Clazz.constructor.name} as ezApi.ezclocker.${apiName}.]`);

        return Clazz.ezInstance;
    }

    /**
     * @public
     * Registers a named instance of an object. Does not call any initialization methods.
     * @param {string} instanceName
     * @param {object} instanceRef
     */
    ezRegisterInstance(instanceName, instanceRef) {
        if (!EzString.stringHasLength(instanceName)) {
            throw new EzBadParamException(
                'instanceName',
                EzApi.ezInstance,
                EzApi.ezInstance.ezRegisterInstance);
        }
        if (!EzObject.isValid(instanceRef)) {
            throw new EzBadParamException(
                'instanceRef',
                EzApi.ezInstance,
                EzApi.ezInstance.ezRegisterInstance);
        }

        instanceRef.ezInstanceName = instanceName;
        instanceRef.ezStates = instanceRef.ezStates || [];
        if (EzObject.hasProperty(instanceRef, 'ezDebugMode')) {
            instanceRef.ezDebugMode = EzApi.ezInstance.ezDebugMode;
        }

        // Set the classes ezApiRegistrationState to registered
        instanceRef['ready'] = true;

        // Create the new instance
        instanceRef['ezEventNames'] = instanceRef['ezEventNames'] || {};
        if (!EzObject.hasProperty(instanceRef['ezEventNames'], 'onReady')) {
            instanceRef['ezEventNames']['onReady'] = `ezOn_${instanceRef.name}_Ready`;
        }

        EzApi.ezInstance.ezclocker[instanceName] = instanceRef;
        if (!EzApi.ezInstance.ezclocker[instanceName].ezStates.includes('REGISTERED_WITH_EZAPI')) {
            EzApi.ezInstance.ezclocker[instanceName].ezStates.push('REGISTERED_WITH_EZAPI');
        }

        instanceRef['ezApiRegistrationState'] = 'REGISTERED';

        // If the instance has defined a value fo ezOnReadyEventName, then
        // fire the event via the document.
        document.dispatchEvent(
            new CustomEvent(
                instanceRef['ezEventNames']['onReady'],
                {
                    bubbles: true,
                    apiClass: instanceRef,
                    apiName: instanceName,
                    registeredInstance: EzApi.ezInstance.ezclocker[instanceName],
                    ezApi: EzApi.ezInstance
                }));

        EzApi.ezInstance.ezLogDebug(`[EzApi: Registered API ${instanceName}]`);
        return EzApi.ezInstance.ezclocker[instanceName];
    }

    /**
     * @public
        Unregisters an api from ezApi (if it exists)
     * @returns {boolean}
        True if the API was unregisterd, false otherwise
     */
    ezUnRegisterApi(apiName) {
        if (!EzString.stringHasLength(apiName)) {
            throw new EzBadParamException('apiName', 'EzApi', 'ezUnRegisterApi');
        }

        if (!EzObject.isValid(EzApi.ezInstance.ezclocker[apiName])) {
            if (EzBoolean.isTrue(EzApi.ezInstance.ezDebugMode)) {
                EzApi.ezInstance.ezLogError('EzApi: No need to unregister the api with name=' + apiName +
                    ' because it is not registerd with ezApi.');
            }
            return false;
        }

        try {
            delete EzApi.ezInstance.ezclocker[apiName];
            EzApi.ezInstance.ezLogDebug('EzApi: Unregistered api ' + apiName + '.');
            return true;
        } catch (err) {
            EzApi.ezInstance.ezLogDebug('EzApi: Unregistration of api with name=' + apiName + ' failed. Reason: ' +
                err.name + ': ' + err.message);
            throw (err);
        }
    }

    /**
     * @deprecated
        Migrate to EzApi.ezInstance.ezRegisterNewApi or EzApi.ezInstance.ezRegisterInstance
        Wil remove EzApi.ezInstance.ezRegisterApi in future release.
     * @public
     * Registers theezApi as a global (root level) api. Avoid registering an Api on on the window if possible.
     * @param {string} apiName
     * Name of the API object
     * @param {object} apiInstance
     * Instance of the API object
     * @returns {object}
     * Returns the api instance provided
     */
    ezRegisterWindow(apiName, apiInstance) {
        if (!EzString.stringHasLength(apiName)) {
            throw new EzBadParamException('apiName', 'EzApi', 'ezRegisterWindow');
        }
        if (!EzObject.isValid(apiInstance)) {
            throw new EzBadParamException('apiInstance', 'EzApi', 'ezRegisterWindow');
        }

        // Window level API is NOT uppercase
        window[apiName] = apiInstance;
        return window[apiName];
    }

    /**
     * @public
     * Determines if an api exists in the EzApi system.
     * @param {string} apiName
     * @returns {boolean}
     */
    ezApiExist(apiName) {
        if (!EzString.stringHasLength(apiName)) {
            return false;
        }

        if (!EzObject.hasProperty(EzApi.ezInstance.ezclocker, apiName)) {
            return false;
        }

        let theApi = EzApi.ezInstance.ezclocker[apiName];
        if (!EzObject.isValid(theApi)) {
            if (!EzObject.hasProperty(window, apiName)) {
                return false;
            }
            theApi = window[apiName];
        }

        return EzObject.isValid(theApi);
    }

    /**
     * @deprecated
        Migrate to EzEventEngine functionality
        Wil remove EzApi.ezInstance.ezRegisterGlobalEvent in future release.
     * @public
     * Registers a global categorized event for the owner
        If eventOwnerName OR eventName is empty or null the event will NOT register and the return is null.
     * If the eventCategory is not provided, then onEvent is used.
     * @param {string} eventOwnerName
     * @param {string|null} eventCategory
     * Builds eventCategory value is transformed to camel case when registering and can only be one of the following values:
        onReady, onClick, onValidate, onShow, onClose, onCancel, onRefresh, onSuccess, onFailure,
        or onEvent (the default category)
     * @param {string} eventName
     * @returns {string|null}
     * Returns the event's registration name: {eventOwnerName}.{eventCategory}
     * @deprecated Migrate to EzApi.ezInstance.ezEventEngine events.
     */
    ezRegisterGlobalEvent(eventOwnerName, eventCategory, eventName) {
        if (!EzString.stringHasLength(eventOwnerName) || !EzString.stringHasLength(eventName)) {
            throw new EzBadParamException('eventOwnerName', 'EzApi', 'ezRegisterGlobalEvent');
        }

        let useEventCategory = EzString.stringHasLength(eventCategory)
            ? eventCategory.toLowerCase()
            : 'onevent';

        switch (useEventCategory) {
            case 'ondone':
                useEventCategory = 'onDone';
                break;
            case 'onerror':
                useEventCategory = 'onError';
                break;
            case 'onsubmitted':
                useEventCategory = 'onSubmitted';
                break;
            case 'onsave':
                useEventCategory = 'onSave';
                break;
            case 'onsaved':
                useEventCategory = 'onSave';
                break;
            case 'onauthorize':
                useEventCategory = 'onAuthorize';
                break;
            case 'onaction':
                useEventCategory = 'onAction';
                break;
            case 'onfinished':
                useEventCategory = 'onFinished';
                break;
            case 'onready':
                useEventCategory = 'onReady';
                break;
            case 'onafter':
                useEventCategory = 'onAfter';
                break;
            case 'onbefore':
                useEventCategory = 'onBefore';
                break;
            case 'onclick':
                useEventCategory = 'onClick';
                break;
            case 'onvalidate':
                useEventCategory = 'onValidate';
                break;
            case 'onshow':
                useEventCategory = 'onShow';
                break;
            case 'onchanged':
                useEventCategory = 'onChanged';
                break;
            case 'onupdate':
                useEventCategory = 'onUpdate';
                break;
            case 'onupdated':
                useEventCategory = 'onUpdated';
                break;
            case 'onchange':
                useEventCategory = 'onChange';
                break;
            case 'onclosed':
                useEventCategory = 'onClosed';
                break;
            case 'onclose':
                useEventCategory = 'onClose';
                break;
            case 'oncancel':
                useEventCategory = 'onCancel';
                break;
            case 'onrefresh':
                useEventCategory = 'onRefresh';
                break;
            case 'onsuccess':
                useEventCategory = 'onSuccess';
                break;
            case 'onfailure':
                useEventCategory = 'onFailure';
                break;
            case 'onload':
                useEventCategory = 'onLoad';
                break;
            case 'onloaded':
                useEventCategory = 'onLoaded';
                break;
            case 'onevent':
            default:
                if (EzBoolean.isTrue(EzApi.ezInstance.ezDebugMode)) {
                    EzApi.ezInstance.ezLogWarn('EzApi: Detected an unknown event category of ' + useEventCategory +
                        ' for eventName=' + eventName + ' and eventOwner=' + eventOwnerName +
                        '. Will use the default category of "onEvent" as a fallback.');
                }
                useEventCategory = 'onEvent';
                break;
        }

        let eventRegName = eventOwnerName + '.' + useEventCategory;
        EzApi.ezInstance.ezLogDebug('EzApi: Registered global event: ' + eventRegName + '=' + eventName);

        if (EzApi.ezInstance.ezIsNotEmptyArray(EzApi.ezInstance.events)) {
            EzApi.ezInstance.events[eventRegName].push(eventName);
        } else {
            EzApi.ezInstance.events[eventRegName] = [];
            EzApi.ezInstance.events[eventRegName].push(eventName);
        }

        return eventRegName + '.' + eventName;
    }

    /**
     * @public
     * Generates an ezClocker objectid in the format: 'EzId' + new Date().getTime()
     * @returns {string}
     */
    ezGenerateObjectId() {
        return 'EzId' + new Date().getTime();
    }

    /**
     * @deprecated
     * Use EzDateTime functionality instead.
     * Will remove in future release.
     * @public
     * Returns the UTC offset for the local time zone
     */
    getLocalUTCOffset() {
        if (EzObject.isValid(moment)) {
            return moment.tz(EzApi.ezInstance.ezGetPreferredTimeZone()).utcOffset();
        }
        let offset = new Date().getTimezoneOffset();
        let minutes = Math.abs(offset);
        let hours = Math.floor(minutes / 60);
        let prefix = offset < 0 ? '+' : '-';
        return prefix + hours;
    }

    /**
     * @deprecated
     * Use EzDateTime functionality instead.
     * Will remove in future release.
     * @public
     * Returns the local browser timezone id - if possible
     */
    getLocalTimeZoneId() {
        if (EzObject.isValid(moment) && EzObject.isValid(moment.tz)) {
            return moment.tz.guess();
        }

        return 'UTC';
    }

    /**
     * @deprecated
     * Use EzDateTime functionality instead.
     * Will remove in future release.
     * @public
     * Creates a timestamp with optional prefix and suffix text in the format:
        {prefix-}YYYY.MM.kk.mm{-suffix}
     */
    ezCreateTimeStamp(prefix, suffix) {
        let pre = EzString.stringHasLength(prefix) ? prefix + '-' : '';
        let suf = EzString.stringHasLength(suffix) ? '-' + suffix : '';
        return pre + moment.tz(EzApi.ezInstance.ezGetPreferredTimezone()).format('YYYY.MM.kk.mm') + suf;
    }

    /**
     * @public
        Gets the user's preferred timezone
     * @returns {string}
     * User's preferred timezone
     */
    ezGetPreferredTimeZone() {
        let self = ezApi;
        if (self.ezIsEmptyString(EzApi.ezInstance.ezPreferredTimeZone)) {
            if (self.ezIsValid(moment) && self.ezIsValid(moment.tz)) {
                self.ezPreferredTimeZone = moment.tz.guess(true);
            } else {
                self.ezPreferredTimeZone = new Date().getTimezoneOffset();
            }
        }
        return self.ezPreferredTimeZone;
    }

    /**
     * @public @method
        Guesses the method name from the provided reference of string name. If a method name
        is not possible from methodRefOrName then the operonal defaultName is returned OR one of the
        following strings: '[unknown class]' or '[null or undefined class]'
     * @param {undefined|null|Object|String} classInstanceOrName
     * @param {undefiend|null|String} defaultName
     * @returns {String}
     */
    ezGuessClassName(classInstanceOrName, defaultName) {
        if (EzObject.isValid(classInstanceOrName)) {
            if (EzApi.ezInstance.ezIsString(classInstanceOrName)) {
                return EzApi.ezInstance.ezStringHasLength(classInstanceOrName)
                    ? classInstance
                    : '[unknown class]';
            } else if (EzApi.ezInstance.ezIsFunction(classInstanceOrName)) {
                return classNameProvided.prototype.constructor.name;
            } else if (EzApi.ezInstance.ezIsObject(classInstanceOrName)) {
                return classInstanceOrName.constructor.name;
            }

            return EzApi.ezInstance.ezStringHasLength(defaultName)
                ? defaultName
                : '[unknown class]';
        }

        return EzApi.ezInstance.ezStringHasLength(defaultName)
            ? defaultName
            : '[null or undefined class]';
    }

    /**
     * @public @method
        Guesses the method name from the provided reference of string name. If a method name
        is not possible from methodRefOrName then the operonal defaultName is returned OR one of the
        following strings: '[unknown_method]()' or '[null or undefined method]()'
     * @param {undefined|null|Object|string} methodRefOrName
     * @param {undefiend|null|String} defaultName
     * @returns {String}
     */
    ezGuessMethodName(methodRefOrName, defaultName) {
        if (EzObject.isValid(methodRefOrName)) {
            if (EzApi.ezInstance.ezIsFunction(methodRefOrName)) {
                return EzBadParamException.functionToMethodNameAndParams(methodRefOrName);
            } else if (EzApi.ezInstance.ezIsString(methodRefOrName) && 0 < methodRefOrName.length) {
                return methodRefOrName;
            }

            return EzApi.ezInstance.ezStringHasLength(defaultName)
                ? defaultName
                : '[unknown_method]()';
        }

        return EzApi.ezInstance.ezStringHasLength(defaultName)
            ? defaultName
            : '[null or undefined method]()';
    }

    /**
        Transforms the provided errorEntity into an error message that includes the
        option userMsg and the className and/or methodName where the error occurred.
     * @param {undefiend|null|Object} errorEntity
     * @param {undefiend|null|String} userMsg
     * @param {undefiend|null|Object|String} classInstanceOrName
     * @param {undefiend|null|Function|String} methodNameOrRef
     */
    ezErrorEntityAsErrorMessage(errorEntity, userMsg, classInstanceOrName, methodNameOrRef) {
        let errorMsgPrefix = EzApi.ezInstance.ezStringHasLength(userMsg)
            ? userMsg
            : '';

        let errorCode = '500';

        let additionalDetails = '';

        let stackMsg = '';

        let classAndMethod = '';

        if (EzObject.isValid(errorEntity)) {

            if (EzObject.isValid(errorEntity.errorCode)) {
                if (EzApi.ezInstance.ezIsNumber(errorEntity.errorCode)) {
                    errorCode = errorEntity.errorCode.toString();
                } else if (EzApi.ezInstance.ezIsString(errorEntity.errorCode)) {
                    errorCode = errorEntity.errorCode;
                } else {
                    errorCode = EzJson.toJson(errorEntity.errorCode);
                }
            }

            let entityJson = EzJson.toJson(errorEntity);

            if (EzApi.ezInstance.ezStringHasLength(entityJson) && '{}' !== entityJson) {
                additionalDetails = `Additional details: ${entityJson}`;
            }

            if (EzObject.isValid(errorEntity.stack)) {
                stackMsg = `Stack: ${errorEntity.stack}`;
            }
        }

        let className = EzApi.ezInstance.ezGuessClassName(classInstanceOrName, '');
        let classMethod = EzApi.ezInstance.ezGuessMethodName(methodNameOrRef, '');

        if (EzApi.ezInstance.ezStringHasLength(classMethod)) {
            classAndMethod = EzApi.ezInstance.ezStringHasLength(className)
                ? `${className}.${classMethod}`
                : classMethod;
        } else {
            classAndMethod = className;
        }

        if (EzApi.ezInstance.ezStringHasLength(classAndMethod)) {
            errorMsgPrefix = EzApi.ezInstance.ezStringHasLength(errorMsgPrefix)
                ? `Error [${errorCode}]:[${classAndMethod}] ${errorMsgPrefix}`
                : `Error [${errorCode}]:An unexpected error occurred in ${classAndMethod}.`;
        } else {
            errorMsgPrefix = EzApi.ezInstance.ezStringHasLength(errorMsgPrefix)
                ? `Error [${errorCode}] ${errorMsgPrefix}`
                : `Error [${errorCode}] An unexpected error occurred.`;
        }

        return EzString.em`${errorMsgPrefix}, ${additionalDetails}, ${stackMsg}`;
    }

    /**
     * @public
     * Converts the item to JSON if it is NOT a string. Otherwise, returns the string.
     * @param {object} item
     * @returns {string|object}
        JSON string version of the provided item OR the actual value of the item if it cannot convert to json.
     */
    ezToJson(item, indentValue, htmlDisplay) {
        if (EzApi.ezInstance.ezIsString(item)) {
            return item;
        }

        if (!EzObject.isValid(item)) {
            return '{}';
        }

        if (EzFunction.isFunction(item.ezToJSON)) {
            // Has it's own ezToJson serilization method
            return item.ezToJSON(indentValue, htmlDisplay);
        }

        if (EzFunction.isFunction(item.toJson)) {
            // The item object has a legacy toJson method to perform it's own JSON serilization.
            return item.toJson();
        }

        try {
            if (EzBoolean.isTrue(htmlDisplay)) {
                return JSON.stringify(item, null, '&nbsp;').replace('\n', '<br/>');
            }

            if (EzApi.ezInstance.ezIsNumber(indentValue)) {
                return JSON.stringify(item, null, indentValue);
            }

            let jsonString = JSON.stringify(item);

            return 2 === jsonString.length && '{}' === jsonString && '{}' !== item
                // Probably not a JSON object
                ? item
                : jsonString;
        } catch (ex) {
            EzApi.ezInstance.ezLogInfo(`Failed to convert "${item}" to json.`);
            return item;
        }
    }

    /**
     * @public
     * Returns and JS object created from the provided JSON string
     * @param {string} jsonString
     */
    ezFromJson(jsonString) {
        if (!EzApi.ezInstance.ezStringHasLength(jsonString)) {
            return jsonString;
        }

        try {
            return JSON.parse(jsonString);
        } catch (ex) {
            EzApi.ezInstance.ezLogInfo('Failed to convert "' + jsonString + '" to a Javascript object.');
            return jsonString;
        }
    }

    /**
     * @public
     * Builds a default exception json message (similar to what service would return with)
     * @param {string} errorCode
     * @param {string} message
     * @param {object} ex
     */
    buildJsonError(errorCode, message, ex) {
        if (EzObject.isValid(ex)) {
            message = EzString.stringHasLength(message)
                ? message + ' Error: ' + EzJson.toJson(ex)
                : ' Error: ' + EzJson.toJson(ex);
        } else {
            message = EzString.stringHasLength(message)
                ? message
                : 'Failed';
        }
        errorCode = EzObject.isValid(errorCode) ? errorCode : '500';
        return EzApi.ezInstance.buildBasicJsonResponse(errorCode, message);
    }

    /**
     * @public
     * Builds the basic JSON response object with errorCode = 0
     * @param {string} response
     * @returns {object}
         {
             errorCode: '0',
             messasge: {response|'Success'}
         }
     */
    buildBasicJsonResponse(response) {
        return {
            errorCode: '0',
            message: EzString.stringHasLength(response)
                ? response
                : 'Success'
        };
    }

    /**
     * @public
     * @param {Number=500} errorCode
     * @param {String='No error message provided.'} errorMessage
     * @returns {object}
         {
             errorCode: {errorCode|500}
             message: {errorMessage|'No error message provided.'}
         }
     */
    ezBuildEzClockerErrorResponse(errorCode, errorMessage) {
        return {
            'errorCode': EzApi.ezInstance.ezIsNumber(errorCode)
                ? errorCode
                : 500,
            'message': !EzString.stringHasLength(errorMessage)
                ? 'No error message provided.'
                : errorMessage
        };
    }

    /**
     * @deprecated
        Migrate to EzJson.toJson()
     * Will remove in future release.
     * @public
     * Returns the passed item as a json string. If the item is already a string, the string is simply reflected back
        as is.
     * @param {*} jsonItem
     */
    gJsonString(jsonItem) {
        return EzJson.toJson(jsonItem);
    }

    /**
     * @deprecated
        Migrate to EzJson.toJson()
     * Will remove in future release.
     * @public
     * Returns a Javascript object jsonItem is a json string. Otherwise, returns the object as is.
     */
    gJsonObject(jsonItem) {
        return EzApi.ezInstance.ezFromJson(jsonItem);
    }

    /**
     * @public
     * Adds the key property with value to the provided jsonObject. If jsonObject is null an empty json object is used.
     * @param {object} jsonObject
     * @param {string} key
     * @param {*} value
     */
    ezAddJsonProp(jsonObject, key, value) {
        jsonObject = EzObject.isValid(jsonObject)
            ? jsonObject
            : {};

        if (!EzString.stringHasLength(key)) {
            return jsonObject;
        }

        jsonObject[key] = EzObject.isValid(value)
            ? value
            : '';

        return jsonObject;
    }

    /**
     * @public
        If condition is true, then result of aCallback() is returned. Otherwise, the result of bCallback() is returned. If
        the calling callback is null, null is returned.
     * @param {boolean} condition
     * @param {Function} aCallback
     * @param {Function} bCallback
     */
    callAelseB(condition, aCallback, bCallback) {
        if (EzBoolean.isTrue(condition)) {
            if (EzFunction.isFunction(aCallback)) {
                return aCallback();
            }
        } else if (EzFunction.isFunction(bCallback)) {
            return bCallback();
        }
        return null;
    }

    /**
     * @deprecated
        Migrate to EzUI.ezInstance.ezId()
     * Will remove in future release.
     * @public
        Wrapps up $('#' + id) jquery syntax and allows for caching of the references
        Always assumes single id passed!
     * @param {string} id
     * @deprecated Use ezUi.ezId()
     */
    ez(id) {
        return $('#' + id);
    }

    /**
     * @deprecated
        Migrate to EzUI.ezInstance.ezId()
     * Will remove in future release.
     * @public
        Alternate wrapper for jquery $(#..) calls
        Always assumes single id passed!
     * @param {string} id
     */
    ezId(id) {
        return $('#' + id);
    }

    /**
     * @public @method
     * Alternate wrapper for jquery $(#..) calls
     * Always assumes single id passed!
     * @param {string} id
     * @deprecated
     * Will remove in future release.
     * Migrate to EzUI.ezInstance.ezId()
     */
    ezId$(id) {
        return $('#' + id);
    }

    /**
     * Will remove in future release.
     * @public
     * Alternate wrapper for $() call
     * @param {string} jQuerySelector
     * @deprecated
     * Will remove in future release.
     * Migrate to EzUx.$(jQuerySelector)
     */
    ez$(jQuerySelector) {
        return $(jQuerySelector);
    }

    /**
     * @deprecated
        Migrate to EzUI.ezInstance.ezId()
     * Will remove in future release.
     * @public
        Alternate wrapper for $() call
     * @param {string} id
     */
    ezJQuery(jQuerySelector) {
        return $(jQuerySelector);
    }

    /**
     * @deprecated
        Migrate to EzUI.ezInstance.ezId()
     * Will remove in future release.
     * @public
     * Returns the element identified by the provided jQuery selector. If the element does not exist,
        null is returned instead.
     * @param {string|null} id
     */
    ezEid(id) {
        if (!EzString.stringHasLength(id)) {
            return null;
        }
        return EzApi.ezInstance.ezEid$('#' + id);
    }

    /**
     * @deprecated
        Migrate to EzUI.ezInstance.ezId()
     * Will remove in future release.
     * @public
     * Returns the element identified by the provided jQuery selector. If the element does not exist,
        null is returned instead.
     * @param {string|null} jQuerySelector
     */
    ezEid$(jQuerySelector) {
        if (!EzObject.isValid(jQuerySelector)) {
            return null;
        }
        let element = EzApi.ezInstance.ez$(jQuerySelector);
        return EzObject.isValid(element) && element.length !== 0 ?
            element :
            null;
    }

    /**
     * @deprecated
        Migrate to EzUI.ezInstance.ezId('document')
     * Will remove in future release.
     * @public
     * Returns the referehce to the document either via $('document') or if no jquery available, then returns
        the global window.document.
     */
    ezDocument() {
        return EzObject.isValid($) ? $(document) : window.document;
    }

    /**
     * @deprecated
        Migrate to EzUI.ezInstance.ezId('body')
     * Will remove in future release.
     * @public
     * Returns the reference to the document's body. Either returns iva $('body') via jquery, or if no jquery is available
        returns window.document.body
     */
    ezBody() {
        return EzObject.isValid($) ? $('body') : window.document.body;
    }

    /**
     * @deprecated
        Migrate to EzUI.ezInstance.ezId('window') or globalThis or window
     * Will remove in future release.
     * @public
     * Wraps access to the window
     */
    ezWindow() {
        return EzObject.isValid($) ? $(window) : window;
    }

    /**
     * @deprecated
     * Stop all use
     * Will remove in future release.
     * @public
     * Builds the single auto-closed html tag
        Code:
        EzApi.ezInstance.tag('br');
        Output:
         <br/>
     * @param {string} tagName
     */
    tag(tagName) {
        return '<' + tagName + '/>';
    }

    /**
     * @deprecated
     * Stop all use
     * Will remove in future release.
     * @public
     * Builds a starting html tag
        Code:
        EzApi.ezInstance.stag('body');
        Output:
         <body>
     * @param {string} tagName
     */
    stag(tagName, params) {
        let htmlTag = '<' + tagName;
        if (EzObject.isValid(params)) {
            Object.keys(params).forEach(function(key) {
                let value = EzApi.ezInstance.ezString(params[key], key);
                if (EzString.stringHasLength(value)) {
                    htmlTag += ' ' + key + '="' + value + '"';
                } else if (!EzApi.ezInstance.isUndefined(value) && EzApi.ezInstance.isNull(value)) {
                    htmlTag += ' ' + key;
                }
            });
        }
        return htmlTag + '>';
    }

    /**
     * @deprecated
     * Stop all use
     * Will remove in future release.
     * @public
     * Builds an HTML ending tag.
        Code:
        EzApi.ezInstance.stag('body') +EzApi.ezInstance.etag('body');
        Output:
         <body></body>
     * @param {string} tagName
     */
    etag(tagName) {
        return '</' + tagName + '>';
    }

    /**
     * @deprecated
     * Stop all use
     * Will remove in future release.
     * @public
     * Builds an complete html tag with optional params
        and content.
        Code:
        EzApi.ezInstance.htmlTag('a', [{href: 'https://ezclocker.com'}], 'Click');
        Output:
         <a href="https://ezclocker.com">Click</a>
     * @param {string} tagName
     * @param {object} params
     * @param {string} content
     */
    htmlTag(tagName, params, content) {
        let htmlTag = '<' + tagName;
        if (EzObject.isValid(params)) {
            Object.keys(params).forEach(function(key) {
                let value = EzApi.ezInstance.ezString(params[key], params[key]);
                if (!EzApi.ezInstance.isUndefined(value)) {
                    if (EzString.stringHasLength(value)) {
                        htmlTag += ' ' + key + '="' + value + '"';
                    } else if (!EzApi.ezInstance.isUndefined(value) && EzApi.ezInstance.isNull(value)) {
                        htmlTag += ' ' + key;
                    }
                }
            });
        }
        htmlTag += '>';
        if (EzObject.isValid(content)) {
            htmlTag += '\n\t' + content + '\n';
        }
        htmlTag += '</' + tagName + '>\n';
        return htmlTag;
    }

    /**
     * @deprecated
     * Stop all use
     * Will remove in future release.
     * @public
     * Builds an HTML tag param string with leading space.
        Code:
         let link = '<a' +EzApi.ezInstance.tagParam('href', 'https://ezclocker.com') + '>Click</a>';
        Produces:
         <a href="https://ezclocker.com">Click</a>
     * @param {string} name
     * @param {string} value
     */
    tagProp(propName, propValue) {
        return ' ' + propName + '="' + propValue + '"';
    }

    /**
     * @deprecated
     * Stop all use
     * Will remove in future release.
     * @public
        Appends the subpath to the provided url:
        Example:
        url: https://ezclocker.com
        subPath: /public/signin.html
        result: https://ezclocker.com/public/signin.html
     * @param {string} url
     * @param {string} subPath
     */
    urlAppend(url) {
        let newUrl = url;
        let pathSeparator = !EzString.stringHasLength(url) && url.charAt(url.length - 1) === '/' ? '' : '/';
        for (let ai = 1; ai < arguments.length; ai++) {
            let value = EzApi.ezInstance.ezString(arguments[ai], arguments[ai]);
            if (EzString.stringHasLength(value)) {
                newUrl += pathSeparator + value;
            }
        }
        return newUrl;
    }

    /**
     * @public
     * Builds an api path from the items in the array. Appends the '/' after each item.
     * @param {array} pathParts
     * @deprecated Migrate to different soluction. Removing in a future release
     */
    buildApiPath(pathParts) {
        let apiPath = '';
        for (let pathPart of pathParts) {
            apiPath += pathPart + '/';
        }

        return apiPath;
    }

    /**
     * @deprecated
        Migreate to EzEventEngine functionality
     * Will remove in future release.
     * @public
     * Wraps on event hooks with promise return
     * @param {string} eventName
     */
    ezOn(eventName) {
        if (!EzObject.isValid(eventName)) {
            return null;
        }
        if (EzObject.isValid($)) {
            return EzApi.ezInstance.ezPromise(
                (resolve) => $(window).on(eventName, resolve));
        }

        return EzApi.ezInstance.ezPromise(
            (resolve) => window.addEventListener(eventName, resolve));
    }

    /**
     * @deprecated
        Migrate to EzUI.ezInstance.ezContent()
     * Will remove in future release.
     * @public
     * Uses the jquery.html() function to set the HTML contents of the item associated with the provided id
     * @param {string} id
     * @param {string} html
     */
    ezHtml(id, html) {
        EzApi.ezInstance.ez(id).html(html);
    }

    /**
     * @deprecated
        Migrate to EzUI.ezInstance.ezContent('')
     * Will remove in future release.
     * @public
     * Uses the jquery.html() function to set the HTML contents of the item associated with the provided id
     * @param {string} id
     * @param {string} html
     */
    ezClearHtml(id) {
        EzApi.ezInstance.ez(id).html('');
    }

    /**
     * @deprecated
     * Stop all use
     * Will remove in future release.
     * @public
     * Wraps the creation of html via jquery
     * @param {string} htmlString
     */
    newHtml(htmlString) {
        return EzApi.ezInstance.ezIsEmptyArray(htmlString)
            ? null
            : $(htmlString);
    }

    /**
     * @public
     * Returns type information from Object.prototype.toString.call(aObject);
        Result format
        [object {type}]
     * @param {*} aObject
     * @returns {string}
     */
    ezGetObjectType(aObject) {
        return Object.prototype.toString.call(aObject);
    }

    /**
     * @public
     * Determines if the provided item is 'undefined'
     * @param {*} item
     * @returns {boolean}
     */
    ezIsUndefined(item) {
        return undefined === item || 'undefined' === typeof item;
    }

    /**
     * @public
     * Determines if the provided image is null.
     * @param {*} item
     * @returns {boolean}
     */
    ezIsNull(item) {
        return null == item;
    }

    /**
     * @public
     * Determines if the provided item is an object type.
     * @returns {boolean}
     */
    ezIsObject(item) {
        return undefined !== item && null !== item && 'object' === typeof item;
    }

    /**
     * @public
        Determiens if the provided item is not null AND not 'undefined'.
     * @param {*} item
     * @returns {boolean}
     */
    ezIsValid(item) {
        return undefined !== item && null !== item && 'undefined' !== typeof item;
    }

    /**
     * @public
     * Determines if the provided item is null OR 'undefined'
     * @param {*} item
     * @returns {boolean}
     */
    ezIsNotValid(item) {
        return undefined === item || null === item || 'undefined' === typeof item;
    }

    /**
     * @public @method
     * Returns true if ALL the arguments provided to this method are
        NOT undefined and NOT null.
     * @param {*} arguments
     * @returns {boolean}
     */
    ezAllValid() {
        for (const argument of arguments) {
            if (!EzObject.isValid(argument)) {
                return false;
            }
        }
        return true;
    }

    /**
     * @public @method
     * Returns true if any of the argiments provided to this method are
        NOT undefined or null.
     * @param {*} arguments
     * @returns {boolean}
     */
    ezAnyValid() {
        for (const argument of arguments) {
            if (EzObject.isValid(argument)) {
                return true;
            }
        }

        return false;
    }

    /**
     * @public
     * Determines if any of the passed arguments are not valid
     * @returns {boolean}
     */
    ezAnyNotValid() {
        for (let aIndex in arguments) {
            if (!EzObject.isValid(arguments[aIndex])) {
                return true;
            }
        }
        return false;
    }

    /**
     * @public
     * Determines if the provided aObject is a string type
     * @param {*} aObject
     * @returns {boolean}
     */
    ezIsString(aObject) {
        return undefined !== aObject && null !== aObject && 'string' === typeof aObject;
    }

    /**
     * @public
     * Returns the provdied aString if it is a valid string. Otherwise, returns an empty string.
     * @param {*} aString
     * @returns {string}
     */
    ezStringOrEmpty(aString) {
        return undefined !== aString && null !== aString && 'string' === typeof aString
            ? aString
            : '';
    }

    /**
     * @public
     * Returns the provdied aString if it is a valid string. Otherwise, returns null;
     * @param {*} aString
     * @returns {string}
     */
    ezStringOrNull(aString) {
        return undefined !== aString && null !== aString && 'string' === typeof aString
            ? aString
            : null;
    }

    /**
     * @public
        Removes all extract space from the provided aTemplateLitteralValue param. Then returns
        the value with one space in front, once space at end and a line feed.
        Result template: ' ${value_with_extra_space_removed} \n';
     * @param {string} aTemplateLitteralValue
     * @returns {string}
     */
    ezTemplate(aStrings, ...aKeys) {
        let cleanValues = '';

        if (EzApi.ezInstance.ezArrayHasLength(aStrings)) {
            for (let x = 0; x < aStrings.length; x++) {
                let aString = aStrings[x];
                if (EzApi.ezInstance.ezIsNumber(aString) || EzApi.ezInstance.ezIsBoolean(aString)) {
                    aString = aString.toString();
                }

                let aKey = x < aKeys.length
                    ? aKeys[x]
                    : '';
                aKey = EzApi.ezInstance.ezIsNumber(aKey) || EzApi.ezInstance.ezIsBoolean(aKey)
                    ? aKey.toString()
                    : EzApi.ezInstance.ezStringOrEmpty(aKey);

                let cleanValue = aString.replace(/( {2})+/g, ' ');
                cleanValue = cleanValue.replace(/\t+/g, ' ');

                let cleanLine = `${cleanValue}${aKey}`;
                cleanValues = `${cleanValues}${cleanLine}`;
            }
        }

        return `${cleanValues}`;
    }

    /**
     * @public
        Removes all extract space from the provided aTemplateLitteralValue param. Then returns
        the value with one space in front, once space at end and a line feed.
        Result template: ' ${value_with_extra_space_removed} \n';
     * @param {string} aTemplateLitteralValue
     * @returns {string}
     */
    ezMessageTemplate(aStrings, ...aKeys) {
        let cleanValues = '';

        if (EzApi.ezInstance.ezArrayHasLength(aStrings)) {
            for (let x = 0; x < aStrings.length; x++) {
                let aString = aStrings[x];
                if (EzApi.ezInstance.ezIsNumber(aString) || EzApi.ezInstance.ezIsBoolean(aString)) {
                    aString = aString.toString();
                }

                let aKey = x < aKeys.length
                    ? aKeys[x]
                    : '';
                aKey = EzApi.ezInstance.ezIsNumber(aKey) || EzApi.ezInstance.ezIsBoolean(aKey)
                    ? aKey.toString()
                    : EzApi.ezInstance.ezStringOrEmpty(aKey);

                // Remove extra spaces
                let cleanValue = aString.replace(/[\t]+/g, ' ');
                cleanValue = cleanValue.replace(/( {2})+/g, ' ');
                // Remove line feeds, carrage returns, and tabs
                cleanValue = cleanValue.replace(/[\n,\r]+/g, '');
                let cleanLine = `${cleanValue} ${aKey}`;
                cleanValues = `${cleanValues}${cleanLine}`;
            }
        }

        return `${cleanValues}`;
    }

    /**
     * @public
        Removes all extract space from the provided aTemplateLitteralValue param. Then returns
        the value with one space in front, once space at end and a line feed.
        Result template: ' ${value_with_extra_space_removed} \n';
     * @param {string} aTemplateLitteralValue
     * @returns {string}
     */
    ezMsg(aStrings, ...aKeys) {
        let cleanValues = '';

        if (EzApi.ezInstance.ezArrayHasLength(aStrings)) {
            for (let x = 0; x < aStrings.length; x++) {
                let aString = aStrings[x];

                if (EzApi.ezInstance.ezIsNumber(aString) || EzApi.ezInstance.ezIsBoolean(aString)) {
                    aString = aString.toString();
                }

                let aKey = x < aKeys.length
                    ? aKeys[x]
                    : '';

                aKey = EzObject.isValid(aKey)
                    ? aKey.toString()
                    : '';

                // Remove line feeds, carrage returns, and tabs
                let cleanValue = aString.replace(/\n+/g, ' ');

                cleanValue = cleanValue.replace(/[\r\t]+/g, '');

                // Remove extra spaces
                cleanValue = cleanValue.replace(/( {2})+/g, ' ');

                let cleanLine = `${cleanValue}${aKey}`;

                cleanValues = `${cleanValues}${cleanLine}`;
            }
        }

        return cleanValues.replace(/( {2})+/g, ' ');
    }

    /**
     * @public
        Removes all extract space from the provided aTemplateLitteralValue param. Then returns
        the value with one space in front, once space at end and a line feed.
        Result template: ' ${value_with_extra_space_removed} \n';
     * @param {string} aTemplateLitteralValue
     * @returns {string}
     */
    ezEM(aStrings, ...aKeys) {
        return EzApi.ezInstance.ezMsg(aStrings, aKeys);
    }

    /**
     * @public
        Removes all spaces and line feeds from the provided aTemplateLitteralValue param. Then returns
        the trimmed value.
        Result template: '${value_with_no_space_linefeeds}';
     * @param {string} aTemplateLitteralValue
     * @returns {string}
     */
    ezUrlTemplate(aStrings, ...aKeys) {
        let cleanValues = '';

        if (EzApi.ezInstance.ezArrayHasLength(aStrings)) {
            for (let x = 0; x < aStrings.length; x++) {
                let aString = aStrings[x];

                if (EzApi.ezInstance.ezIsNumber(aString) || EzApi.ezInstance.ezIsBoolean(aString)) {
                    aString = aString.toString();
                }

                aString = EzString.stringHasLength(aString)
                    ? aString.trim()
                    : '';

                let cleanString = aString.replace(/[ \t\n\r]+/g, '');

                if (x < aKeys.length) {
                    let aKey = EzApi.ezInstance.ezIsString(aKeys[x])
                        ? aKeys[x].trim()
                        : EzApi.ezInstance.ezAssignOrDefault(aKeys[x], '');

                    aKey = EzApi.ezInstance.ezIsNumber(aKey) || EzApi.ezInstance.ezIsBoolean(aKey)
                        ? aKey.toString()
                        : EzApi.ezInstance.ezStringOrEmpty(aKey);

                    let cleanKey = aKey.replace(/[ \t\n\r]+/g, '');

                    cleanString = `${cleanString}${cleanKey}`.trim();
                }

                cleanValues = `${cleanValues}${cleanString}`.trim();
            }
        }

        return `${cleanValues}`;
    }

    /**
     * @public
        Removes all spaces and line feeds from the provided aTemplateLitteralValue param. Then returns
        the trimmed value.
        Result template: '${value_with_no_space_linefeeds}';
     * @param {string} aTemplateLitteralValue
     * @returns {string}
     */
    ezSingleLineTemplate(aStrings, ...aKeys) {
        let cleanValues = '';

        if (EzApi.ezInstance.ezArrayHasLength(aStrings)) {
            for (let x = 0; x < aStrings.length; x++) {
                let aString = aStrings[x];

                if (EzApi.ezInstance.ezIsNumber(aString) || EzApi.ezInstance.ezIsBoolean(aString)) {
                    aString = aString.toString();
                }

                aString = EzString.stringHasLength(aString)
                    ? aString.trim()
                    : '';

                let aKey = x < aKeys.length
                    ? aKeys[x]
                    : '';

                aKey = EzApi.ezInstance.ezIsNumber(aKey) || EzApi.ezInstance.ezIsBoolean(aKey)
                    ? aKey.toString()
                    : EzApi.ezInstance.ezStringOrEmpty(aKey);

                let cleanValue = aString.trimStart().replace(/[ \n\r\t]+/g, '');

                let cleanLine = `${cleanValue}${aKey}`.trim();

                cleanValues = `${cleanValues}${cleanLine}`.trim();
            }
        }

        return `${cleanValues}`.trim();
    }

    /**
     * @public
        Removes all spaces and line feeds from the provided aTemplateLitteralValue param. Then returns
        the trimmed value.
        Result template: '${value_with_no_space_linefeeds}';
     * @param {string} aTemplateLitteralValue
     * @returns {string}
     */
    ezIdTemplate(aStrings, ...aKeys) {
        let cleanValues = '';

        if (EzApi.ezInstance.ezArrayHasLength(aStrings)) {
            for (let x = 0; x < aStrings.length; x++) {
                let aString = aStrings[x];

                if (EzApi.ezInstance.ezIsNumber(aString) || EzApi.ezInstance.ezIsBoolean(aString)) {
                    aString = aString.toString();
                }

                aString = EzString.stringHasLength(aString)
                    ? aString.trim()
                    : '';

                let aKey = x < aKeys.length
                    ? aKeys[x]
                    : '';

                aKey = EzApi.ezInstance.ezIsNumber(aKey) || EzApi.ezInstance.ezIsBoolean(aKey)
                    ? aKey.toString()
                    : EzApi.ezInstance.ezStringOrEmpty(aKey);

                let cleanValue = aString.trimStart().replace(/[ \n\r\t]+/g, '');

                let cleanLine = `${cleanValue}${aKey}`.trim();

                cleanValues = `${cleanValues}${cleanLine}`.trim();
            }
        }

        return `${cleanValues}`.trim();
    }

    /**
     * @public
     * Returns a JSON string.
     * @param {array} aStrings
     * @param {array} akeys
     * @returns {string}
     */
    ezJsonTemplate(aStrings, ...aKeys) {
        let cleanValues = '';

        if (EzApi.ezInstance.ezArrayHasLength(aStrings)) {
            for (let x = 0; x < aStrings.length; x++) {
                let aString = aStrings[x];

                if (EzApi.ezInstance.ezIsNumber(aString) || EzApi.ezInstance.ezIsBoolean(aString)) {
                    aString = aString.toString();
                }

                aString = EzString.stringHasLength(aString)
                    ? aString
                        .trim()
                        .replaceAll('  ', '')
                    : '';

                let aKey = x < aKeys.length
                    ? aKeys[x]
                    : '';

                aKey = EzApi.ezInstance.ezIsNumber(aKey) || EzApi.ezInstance.ezIsBoolean(aKey)
                    ? aKey.toString()
                    : EzApi.ezInstance.ezStringOrEmpty(aKey);

                aKey = aKey.trim();

                let cleanValue = aString.replace(/[\n\r\t]+/g, '');

                let cleanLine = `${cleanValue}${aKey}`;

                cleanValues = `${cleanValues}${cleanLine}`;
            }
        }

        return `${cleanValues}`;
    }

    /**
     * @public
     * Returns the provdied aString if it is a valid string. Otherwise, returns an empty string.
     * @param {*} aString
     * @returns {string}
     */
    ezStringOrDefault(aString, aDefault) {
        return undefined !== aString && null !== aString && 'string' === typeof aString
            ? aString
            : aDefault;
    }

    /**
     * @public
     * Determines if the value passed is a string
     * @param {*} value
     * @returns {boolean}
     * @deprecated Migrate to EzApi.ezInstance.ezIsString()
     */
    isStringType(aObject) {
        return EzApi.ezInstance.ezIsString(aObject);
    }

    /**
     * @public
     * Determines if the passed object is an actual moment.js object or not.
     * @param {*} aObject
     * @returns {boolean}
     */
    ezIsMoment(aObject) {
        return undefined !== aObject && null !== aObject && 'undefined' !== typeof object && moment(aObject).isValid();
    }

    /**
     * @public
     * Determines if the passed array is not undefined, not null, and has a length greater than zero
     * @param {*} aArray
     * @returns {boolean}
     */
    ezIsEmptyArray(aArray) {
        return undefined === aArray || null === aArray ||
            ('[object Array]' === EzApi.ezInstance.ezGetObjectType(aArray) && 0 === aArray.length);
    }

    /**
     * @public
     * Determines if the passed array is not undefined, not null, and has a length greater than zero
     * @param {*} aArray
     * @returns {boolean}
     */
    ezIsNotArrayOrEmptyArray(aArray) {
        return undefined === aArray || null === aArray ||
            '[object Array]' !== EzApi.ezInstance.ezGetObjectType(aArray) ||
            0 === aArray.length;
    }

    /**
     * @public
     * Determines if the passed array is not undefined, not null, and has a length greater than zero
     * @param {*} aArray
     * @returns {boolean}
     */
    ezIsNotEmptyArray(aArray) {
        return undefined !== aArray && null !== aArray &&
            '[object Array]' === EzApi.ezInstance.ezGetObjectType(aArray) && 0 !== aArray.length;
    }

    /**
     * @public
     * Determines if the passed aArray is not undefined, not null, and has a length greater than zero
     * @param {*} aArray
     * @returns {boolean}
     */
    ezArrayHasLength(aArray) {
        return undefined !== aArray && null !== aArray &&
            '[object Array]' === EzApi.ezInstance.ezGetObjectType(aArray) && 0 !== aArray.length;
    }

    /**
     * @public
     * Determines if the passed object is an array or not.
     * @param {*} aArray
     * @returns {boolean}
     */
    ezIsArray(aArray) {
        return undefined !== aArray && null !== aArray && '[object Array]' === EzApi.ezInstance.ezGetObjectType(aArray);
    }

    /**
     * @public
     * Returns the provided aArray if it is a valid array. Otherwise, returns an empty array.
     * @param {*} aArray
     * @returns {Array}
     */
    ezArrayOrEmpty(aArray) {
        return undefined !== aArray && null !== aArray && '[object Array]' === EzApi.ezInstance.ezGetObjectType(aArray)
            ? aArray
            : [];
    }

    /**
     * @public
     * Determines if the passed object is a number type.
     * @param {*} aObject
     * @returns {boolean}
     */
    ezIsNumber(aObject) {
        return undefined !== aObject && null !== aObject && 'number' === typeof aObject;
    }

    /**
     * @public
     * Returns the provided aNumber if it is a valid number, Otherwise, returns null
     * @param {*} aNumber
     * @returns {Number|null}
     */
    ezNumberOrNull(aNumber) {
        return undefined !== aNumber && null !== aNumber &&
            ('number' === typeof aNumber || '[object Number]' === EzApi.ezInstance.ezGetObjectType(aNumber))
            ? aNumber
            : null;
    }

    /**
     * @public
     * Returns the provided aNumber if it is a valid number, Otherwise, returns the provided aDefault value.
     * @param {*} aNumber
     * @param {Number|null} aDefault
     * @returns {Number|{aDefault}}
     */
    ezNumberOrDefault(aNumber, aDefault) {
        return undefined !== aNumber && null !== aNumber &&
            ('number' === typeof aNumber || '[object Number]' === EzApi.ezInstance.ezGetObjectType(aNumber))
            ? aNumber
            : aDefault;
    }

    /**
     * @public
     * Determines if the passed object is NOT a number type.
     * @param {*} aObject
     */
    ezIsNotNumber(aObject) {
        return undefined === aObject && null === aObject ||
            ('number' !== typeof aObject && '[object Number]' !== EzApi.ezInstance.ezGetObjectType(aObject));
    }

    /**
     * @public
     * Converts a string value to a Javascript number (using parseInt)
     * @param {string} stringValue
     * @param {number} [radix]
        Optional radix value for parseInt
     * @returns {number}
     * Note that if the value cannot be converted, NaN is returned.
     */
    ezToNumber(stringValue, radix) {
        if (!EzString.stringHasLength(stringValue)) {
            return 0; // fall to zero if the string value is null, empty, or undefined
        }

        try {
            return parseInt(stringValue, radix);
        } catch (err) {
            return null;
        }
    }

    /**
     * @public
     * Converts a string value to a Javascript number (using parseInt)
     * @param {string} stringValue
     * @param {number} [radix]
        Optional radix value for parseInt
     * @returns {number}
     * Note that if the value cannot be converted, NaN is returned.
     */
    ezToFloat(stringValue) {
        if (!EzString.stringHasLength(stringValue)) {
            return 0.00; // fall to zero if the string value is null, empty, or undefined
        }

        try {
            return parseFloat(stringValue);
        } catch (err) {
            return null;
        }
    }

    /**
     * @public
     * Determines if the provided aNumber param is within the given range.
        If aNumber is not a valid number, false is returned.
        If aMinNumber is not provided, it is assumed equal to aNumber.
        If aMaxNumber is not provided, it is assumed equal to aNumber.
        If aMinNumber is greater than aMaxNumber, throws exception
        If aMaxNumber is less than a aMinNumber, throws exception
     * @param {number} aNumber
     * @param {number} aMinNumber
     * @param {number} aMaxNumber
     * @returns {boolean}
     * Returns true if the following is true:
         1) aNumber is >= aMinNumber
         2) aNumber <= aMaxNumber
     */
    ezNumberWithinRange(aNumber, aMinNumber, aMaxNumber) {
        if (aMinNumber > aMaxNumber) {
            throw new EzBadParamException('aMinNumber', 'EzApi', 'ezNumberBetweenRange');
        }

        if (undefined === aNumber || null === aNumber ||
            ('number' !== typeof aNumber && '[object Number]' !== EzApi.ezInstance.ezGetObjectType(aNumber))) {
            // Not a number
            return false;
        }

        return aNumber >= EzApi.ezInstance.ezNumberOrDefault(aMinNumber, aNumber) &&
            aNumber <= EzApi.ezInstance.ezNumberOrDefault(aMaxNumber, aNumber);
    }

    /**
     * @public
     * Determines if the provided aNumber param is between the aStartNumber and aEndNumber range.
        If aNumber is not a valid number, false is returned.
        If aEndNumber is not provided, it is assumed equal to aNumber - 1.
        If aStartNumber is not provided, it is assumed equal to aNumber + 1.
        If aStartNumber is greater than aEndNumber, throws exception
        If aEndNumber is less than a aStartNumber, throws exception
     * @param {number} aNumber
     * @param {number} aStartNumber
     * @param {number} aEndNumber
     * @returns {boolean}
     * Returns true if the following is true:
         1) aNumber is > aStartNumber
         2) aNumber is < aEndNumber
     */
    ezNumberBetweenRange(aNumber, aStartNumber, aEndNumber) {
        if (undefined === aStartNumber || null === aStartNumber) {
            throw new EzBadParamException('aStartNumber', 'EzApi', 'ezNumberBetweenRange');
        }
        if (undefined === aEndNumber || null == aEndNumber) {
            aEndNumber = aStartNumber;
        }
        if (aStartNumber > aEndNumber) {
            throw new EzBadParamException('aStartNumber', 'EzApi', 'ezNumberBetweenRange');
        }

        if (undefined === aNumber || null === aNumber ||
            ('number' !== typeof aNumber && '[object Number]' !== EzApi.ezInstance.ezGetObjectType(aNumber))) {
            // Not a number
            return false;
        }

        return aNumber > EzApi.ezInstance.ezNumberOrDefault(aStartNumber, aNumber - 1) &&
            aNumber < EzApi.ezInstance.ezNumberOrDefault(aEndNumber, aNumber + 1);
    }

    /**
     * @public
     * Determines if the passed object is a boolean type.
     * @param {*} aObject
     * @returns {boolean}
     */
    ezIsBoolean(aObject) {
        return undefined !== aObject && null !== aObject &&
            ('boolean' === typeof aObject || '[object Boolean]' === EzApi.ezInstance.ezGetObjectType(aObject));
    }

    /**
     * @public
     * Determines if the passed object is NOT boolean type.
     * @param {*} aObject
     * @returns {boolean}
     */
    ezIsNotBoolean(aObject) {
        return undefined === aObject || null === aObject ||
            ('boolean' !== typeof aObject && '[object Boolean]' !== EzApi.ezInstance.ezGetObjectType(aObject));
    }

    /**
     * @public
     * Returns true if the boolean value is false. Otherwise, returns false if the value is NOT a boolean at all OR
        is actually true.
     * @param {boolean} aValue
     * @returns {boolean}
     */
    ezIsFalse(aValue) {
        return undefined !== aValue && null !== aValue &&
            ('boolean' === typeof aValue || '[object Boolean]' === EzApi.ezInstance.ezGetObjectType(aValue)) &&
            false === aValue;
    }

    /**
     * @public
     * Returns true if the boolean value is true. Otherwise, returns false if the value is NOT a boolean at all OR
        is actually false.
     * @param {boolean} aValue
     * @returns {boolean}
     * @deprecated Migrate to EzBoolean.isTrue()
     */
    isTrue(aValue) {
        return EzBoolean.isTrue(aValue);
    }

    /**
     * @public
     * Returns true if the boolean value is true. Otherwise, returns false if the value is NOT a boolean at all OR
        is actually false.
     * @param {boolean} aValue
     * @returns {boolean}
     */
    ezIsTrue(aValue) {
        return undefined !== aValue && null !== aValue &&
            ('boolean' === typeof aValue || '[object Boolean]' === EzApi.ezInstance.ezGetObjectType(aValue)) &&
            true === aValue;
    }

    /**
     * @public
     * Returns true if the passed ref is a javascript function
     * @param {Function} aFunction
     * @returns {boolean}
     */
    ezIsFunction(aFunction) {
        return undefined !== aFunction && null !== aFunction &&
            ('function' === typeof aFunction || '[object Function]' === EzApi.ezInstance.ezGetObjectType(aFunction));
    }

    /**
     * @public
     * Returns true if the passed ref is a javascript function
     * @param {Function} aFunction
     * @returns {boolean}
     */
    ezIsNotFunction(aFunction) {
        return undefined !== aFunction && null === aFunction ||
            ('function' !== typeof aFunction && '[object Function]' !== EzApi.ezInstance.ezGetObjectType(aFunction));
    }

    /**
     * @public
     * Returns the provided item for assignment to a let if the item is valid. Otherwise, the defaultItem is returned for
        assignment.
     * @param {*} aItem
     * @param {*} aDefaultValue
     * @returns {*}
     * @deprecated Migrate to EzApi.ezInstance.ezAssignOrDefault()
     */
    ezReturnValidOrDefault(aItem, aDefaultValue) {
        return undefined !== aItem && null !== aItem && 'undefined' !== typeof aItem
            ? aItem
            : aDefaultValue;
    }

    /**
     * @public
     * Returns the provided value if it is a valid string, otherwise '' string is returned
     * @param {string} aValue
     * @returns {string}
     * @deprecated Migrate to EzApi.ezInstance.ezStringOrEmpty()
     */
    ezReturnValidOrEmptyString(aValue) {
        return EzApi.ezInstance.ezStringOrEmpty(aValue);
    }

    /**
     * @public
     * Returns the provided item to assign to a variable if the item is valid. Otherwise, null is returned
     * @param {*} item
     * @returns {*|null}
     * @deprecated Migrate to EzApi.ezInstance.ezAssignOrNull()
     */
    ezReturnValidOrNull(item) {
        return EzApi.ezInstance.ezAssignOrNull(item);
    }

    /**
     * @public
     * Determines if the passed aValue is undefined, null, or has length zero
     * @param {*} aValue
     * @returns {boolean}
     */
    ezIsEmptyString(aValue) {
        return undefined === aValue || null === aValue ||
            ('string' !== typeof aValue && '[object String]' !== EzApi.ezInstance.ezGetObjectType(aValue)) ||
            0 === aValue.length;
    }

    /**
     * @public
     * Determines if the passed aValue is a string type AND the length is greater than zero.
     * @param {*} aValue
     * @returns {boolean}
     */
    ezStringHasLength(aValue) {
        return undefined !== aValue && null !== aValue &&
            ('string' === typeof aValue || '[object String]' === EzApi.ezInstance.ezGetObjectType(aValue)) &&
            0 !== aValue.length;
    }

    /**
     * @public
     * Determines if the passed aValue is a string type AND the length is greater than zero.
     * @param {*} aValue
     * @returns {boolean}
     * @deprecated Migrate to EzString.stringHasLength(aValue)
     */
    ezIsNotEmptyString(aValue) {
        return EzString.stringHasLength(aValue);
    }

    /**
     * @public
     * Returns the aValue as a string.
     * Converts numbers to strings.
     * Returns objects as JSON
     * Returns null/undefined as aDefaultValue
     * @param {*} aValue
     * @param {string|null} aDefaultValue
     * @returns {string}
     */
    ezString(aValue, aDefaultValue) {
        if (undefined === aValue || null === aValue || 'undefined' === typeof aValue) {
            return aDefaultValue;
        }

        let stringValue = EzApi.ezInstance.ezIsNumber(aValue)
            ? EzApi.ezInstance.ezNumberToString(aValue)
            : aValue;

        return EzApi.ezInstance.ezIsString(aValue)
            ? aValue
            : EzJson.toJson(stringValue);
    }

    /**
     * @public
     * Executes Promise.reject passing the provided response.
     * If the response is a string, an error is also logged.
     * @param {object} response
     * @returns {Promise.reject}
     */
    ezReject(response) {
        if (!EzObject.isValid(response)) {
            return Promise.reject({
                errorCode: 500,
                message: 'An operation encountered an unexpected error. No additional details available.'
            });
        }

        if (EzString.stringHasLength(response)) {
            return Promise.reject({
                errorCode: 500,
                message: response
            });
        }
        return Promise.reject(response);
    }

    /**
     * @public
     * Executes Promise.reject passing the provided response.
     * @param {string|null} em
     * @returns {Promise.reject}
     * @deprecated Migrate to EzApi.ezInstance.ezReject
     */
    ezRejectWithError(em) {
        return EzString.stringHasLength(em)
            ? Promise.reject(em)
            : Promise.reject({
                errorCode: 500,
                message: 'An operation encountered an unexpected error.'
            });
    }

    /**
     * @public
     * Executes Promise.resolve, passing the provided response in the
        resolve.
     * @param {object} response
     * @returns {Promise.resolve}
     */
    ezResolve(response) {
        return Promise.resolve(response);
    }

    /**
     * @public
     * Wraps the provided function in a promise (only expecting a RESOLVE result)
     * @param {Function} promiseFunction
     * @returns {Promise.resolve}
     */
    ezResolver(promiseFunction) {
        return !EzFunction.isFunction(promiseFunction)
            ? Promise.resolve(promiseFunction)
            : EzApi.ezInstance.ezPromise((resolve) => {
                return EzApi.ezInstance.ezPromise(promiseFunction)
                    .then(resolve, resolve)
                    .catch(EzApi.ezInstance.ezHandlePromiseCatch);
            }).catch(EzApi.ezInstance.ezHandlePromiseCatch);
    }

    /**
     * @public
     * Alternative to a resolve only promise (or EzApi.ezInstance.ezResolver) to help communicate what is going on.
     * @param {Function) aFunction

     */
    ezAsyncAction(aFunction) {
        if (!EzFunction.isFunction(aFunction)) {
            throw new EzBadParamException(
                'aFunction',
                EzApi.ezInstance,
                EzApi.ezInstance.ezAsyncAction);
        }

        return new Promise((finished) => aFunction(finished))
            .catch(EzApi.ezInstance.ezHandlePromiseCatch);
    }

    /**
     * @public @method
     * Returns the result of wrapping the provided function in Promise.resolve()
     * @returns {Promise.resolve}
     */
    ezAsyncOperation(aFunction) {
        if (!EzFunction.isFunction(aFunction)) {
            throw new EzBadParamException(
                'aFunction',
                EzApi.ezInstance,
                EzApi.ezInstance.ezAsyncOperation);
        }

        return new Promise(
            (finished) => {
                aFunction();
                return finished();
            });
    }

    /**
     * @public
        Immediatly returns the 'Promise.resolve'
     * @returns {*}
     */
    ezFinished(response) {
        return Promise.resolve(response);
    }

    /**
     * @public
     * Wraps the provided function in a promise (only expecting a RESOLVE result)
     * @param {Function} promiseFunction
     * @returns {Promise.resolve}
     */
    ezRejector(promiseFunction) {
        return !EzFunction.isFunction(promiseFunction)
            ? Promise.reject(promiseFunction)
            : EzApi.ezInstance.ezPromise(
                (resolve, reject) => {
                    if (null != resolve) {
                        resolve = reject;
                    }
                    return EzApi.ezInstance.ezPromise(promiseFunction)
                        .then(resolve, reject)
                        .catch(reject);
                });
    }

    /**
     * @public
     * Wraps the creation of a promise into the ezApi
     * @param {Function} aFunction
     */
    ezPromise(aFunction) {
        if (!EzFunction.isFunction(aFunction)) {
            throw new EzBadParamException(
                'aFunction',
                EzApi.ezInstance,
                EzApi.ezInstance.ezPromise);
        }

        return new Promise(aFunction)
            .catch(EzApi.ezInstance.ezHandlePromiseCatch)
    }

    /**
     * @public
     * Handles a promise.catch
     * @param {object} err
     */
    ezHandlePromiseCatch(err) {
        let em = 'EzApi.ezPromise execution failed with unhandled exception. ';

        if (EzObject.isValid(err)) {
            if (EzApi.ezInstance.ezIsNumber(err.errorCode)) {
                // Should get handled in the reject call
                EzApi.ezInstance.ezclocker.ezLogger.error(
                    EzString.em`
                        ${em}
                        Error: ${EzJson.toJson(err)}`);
            } else {
                EzApi.ezInstance.ezclocker.ezLogger.error(
                    EzString.em`
                        ${em}
                        Error: ${err.message}`);
            }
        } else {
            EzApi.ezInstance.ezclocker.ezLogger.ezLogException(em, err);
        }

        //return promiseError;
        throw (err);
    }

    /**
     * @public
        Provides the method for handling promise rejects with zero processing.
     */
    ezIgnoreReject() {
        // promise rejection handler, does nothing
    }

    /**
     * @public
        Provides the method for handling resolves with zero processing.
     */
    ezIgnoreResolve() {
        // promise resolve handler, does nothing
    }
    /**
     * @public
        Provides a method for ignoring Promise.catch calls.
     */
    ezIgnoreCatch() {
        // Promise catch handler that does nothing
    }

    /**
     * @public
        Trims the provided value or returns null if not a valid string
     * @param {*} value
     */
    trimEmptyStringToNull(value) {
        if (!EzApi.ezInstance.ezIsString(value)) {
            return null;
        }

        let tvalue = value.trim();

        return !EzString.stringHasLength(tvalue) ? null : tvalue;
    }

    /**
     * @public
     * Applies URL decoding to the provided string
     * @param {string} value
     */
    ezDecode(value, replacePlusWithSpace) {
        if (!EzString.stringHasLength(value)) {
            return value;
        }

        let decodedValue = decodeURIComponent(value);

        if (EzBoolean.isTrue(replacePlusWithSpace)) {
            decodedValue = decodedValue.replaceAll('+', ' ');
        }

        return decodedValue;
    }

    /**
     * @public
     * Applies URL encoding to the provided string
     * @param {string} value
     */
    ezEncode(value) {
        if (!EzString.stringHasLength(value)) {
            return value;
        }

        return encodeURIComponent(value).replace(
            /[!'()*]/g,
            (c) => {
                return '%' + c.charCodeAt(0).toString(16);
            });
    }

    /**
     * @public
        Replaces HTML special character with their HTML codes
     * @param {string} value
     * @returns {string}
     */
    ezHtmlEncode(value) {
        if (!EzString.stringHasLength(value)) {
            return '';
        }

        value = value.replace(/&/g, '&amp;'); // &
        value = value.replace(/"/g, '&quot;'); // "
        value = value.replace(/\//g, '&frasl;'); // /
        value = value.replace(/</g, '&lt;'); // <
        value = value.replace(/>/g, '&gt;'); // >
        value = value.replace(/'/g, '&#96;'); // '
        value = value.replace(/@/g, '&#64;'); // @
        value = value.replace(/!/g, '&#33;'); // !
        value = value.replace(/=/g, '&#61;'); // =
        value = value.replace(/-/g, '&#45;'); // =
        value = value.replace(/`/g, '&#96;'); // `

        return value;
    }

    /**
     * @public
     * Converts the provided number to a string or returns NAN if not possible
     * @param {number} num
     * @returns {string}
     */
    ezNumberToString(num) {
        if (!EzApi.ezInstance.ezIsNumber(num)) {
            // If it is a string, return that. Otherwise, return NAN
            return EzString.stringHasLength(num)
                ? num
                : 'NAN';
        }

        try {
            return num.toString();
        } catch (ex) {
            return 'NAN';
        }
    }

    /**
     * @public
     * Converts the provided number to a string. If conversion fails, either the defaultValue
     * is returned (if not null/empty string) OR 'NAN' is returned.
     * @param {number} num,
     * @param {null|string} defaultValue
     * @returns {string}
     */
    ezNumberToStringDefault(num, defaultValue) {
        defaultValue = !EzString.stringHasLength(defaultValue)
            ? 'NAN'
            : defaultValue;

        if (!EzApi.ezInstance.ezIsNumber(num)) {
            // If it is a string, return that. Otherwise, return defaultValue
            return EzString.stringHasLength(num) ? num : defaultValue;
        }

        try {
            return num.toString();
        } catch (ex) {
            return defaultValue;
        }
    }

    /**
     * @public
     * Safely extracts a value from an array. Returns the provided defaultValue if unable to obtain a value from
     * the provided array at the provided index OR returns null if defaultValue is not provided.
     * @param {array} array
     * @param {number} index
     * @param {*} defaultValue
     */
    aGet(array, index, defaultValue) {
        defaultValue = EzObject.isValid(defaultValue)
            ? defaultValue
            : null;

        if (EzObject.isValid(index) && EzApi.ezInstance.ezArrayHasLength(array) && array.length > index) {
            let item = array[index];

            return EzObject.isValid(item)
                ? item
                : defaultValue;
        }
    }

    /**
     * @public
     * Logs a deprecation message
     * @param {string} deprecatedItem
     * @param {string} useInsteadItem
     * @param {string} additionalMessage
     */
    deprecated(deprecatedItem, useInsteadItem, additionalMessage) {
        if (!EzString.stringHasLength(deprecatedItem)) {
            return; // not logging, no specific item
        }
        let dm = 'DEPRECATED: ' + deprecatedItem + ' is deprecated and will be removed in the future.';
        if (EzString.stringHasLength(useInsteadItem)) {
            dm += ' Please use ' + useInsteadItem + ' instead.';
        }
        if (EzString.stringHasLength(additionalMessage)) {
            dm += ' ' + EzApi.ezInstance.gString(additionalMessage);
        }
        if (EzObject.isValid(EzApi.ezInstance.p) && EzObject.isValid(EzApi.ezInstance.p.logger)) {
            EzApi.ezInstance.p.logger.warn(dm);
        } else {
            window.console.warn(dm);
        }
    }

    /**
     * @public
     * Opens a new window in the browser to the provided url and adds the provided windowTitle. If not title is provided
     * ezclocker.com is used instead.
     * @param {string} url
     * @param {string} windowTitle
     */
    ezNewWindow(url, windowTitle) {
        if (!EzString.stringHasLength(url)) {
            return; // nothing to open
        }
        let title = !EzString.stringHasLength(windowTitle) ? 'ezClocker.com' : windowTitle;
        window.open(url, title);
    }

    /**
     * @public
     * Implementation of onCallback handler. All arguments (except for the callback function reference) are
     * passed into the onCallback function call.
     * @param {Function} callback
     * @returns {boolean}
     * True if processing can proceed, false if processing should stop
     */
    ezOnCallback() {
        let args = Array.prototype.slice.call(arguments);

        let callBack = args[0];

        if (!EzFunction.isFunction(callBack)) {
            return EzApi.ezInstance.ezResolve(true); // no handler, continue
        }

        return EzApi.ezInstance.ezPromise(function(resolve, reject) {
            let params = args.slice(1);

            if (EzApi.ezInstance.isFalse(callBack.apply(this, params))) {
                return reject(false);
            }

            return resolve(true);
        });
    }

    /**
     * @public
     * Verifies the passed function is valid, and returns the call to that method. Otherwise, returns null
     * @param {Function} callBackRef
     */
    ezCallback() {
        let args = Array.prototype.slice.call(arguments);
        let callBack = args[0];
        if (!EzFunction.isFunction(callBack)) {
            return null;
        }
        let params = args.slice(1);
        return callBack.apply(this, params);
    }

    /**
     * @public
     * Returns the function for assignment, or returns null if not a valid function.
     * @param {Function|null} handler
     * @deprecated Use a Promise pattern instead.
     */
    ezAssignHandler(handler) {
        return EzFunction.isFunction(handler)
            ? handler
            : function() {
                return;
            };
    }

    /**
     * @public
     * Creates a basic JSON service response object
     * @param {long|null} errorCode
     * @param {string|null} message
     * @returns {object}
     */
    ezResponse(errorCode, message) {
        return {
            errorCode: EzObject.isValid(errorCode)
                ? errorCode
                : 0,
            message: EzString.stringHasLength(message)
                ? message
                : 'Success'
        };
    }

    /**
     * @public
     * Returns if the current browser is a variation of Internet Explorer or Edge
     * @returns {boolean}
     * @deprecated Use ezlibrary/ez-old-browser-check.js functionality instead.
     */
    ezIsIeCrap() {
        let ua = window.navigator.userAgent;
        // Test values; Uncomment to check result …
        // IE 10
        // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';
        // IE 11
        // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';
        // Edge 12 (Spartan)
        // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';
        // Edge 13
        // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';
        let msie = ua.indexOf('MSIE ');
        if (msie > 0) {
            // IE 10 or older => return version number
            return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
        }

        let trident = ua.indexOf('Trident/');
        if (trident > 0) {
            // IE 11 => return version number
            let rv = ua.indexOf('rv:');
            return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
        }

        let edge = ua.indexOf('Edge/');
        if (edge > 0) {
            // Edge (IE 12+) => return version number
            return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
        }

        // other browser
        return false;
    }

    /**
     * @public
     * Injects the Internet Explorer Outdated Message if the browser is a flavor of Internet Explorer or Edge.
     */
    ezInjectIeWarning() {
        if (EzApi.ezInstance.ezIsFalse(EzApi.ezInstance.ezIsIeCrap())) {
            return;
        }

        // Internet Explorer Warning
        EzApi.ezInstance.ezId('_PageContent').prepend('<div style="padding:4px;background-color:#ffc500">' +
            '<h1>Supported browsers</h1>' +
            '<p>We design ezClocker.com to support the latest web browsers. We support the current versions of Chrome, ' +
            'Firefox, Safari, and Microsoft Edge.</p>' +
            '<h1>Extended Support Releases</h1>' +
            '<p>While we do our best to support a browser provider\'s extended support releases, older version of a ' +
            'browser might cause some aspects of ezClocker.com to stop working. In such cases, enabling the functionality ' +
            'will require the browser\'s latest release.</p>' +
            '<h1>Beta and Other Special Builds</h1>' +
            '<p>Any browser that is not the officially latet release version might have defects that will prevent ezClocker.com from '
            +
            'functioning as expected. If you encounter such a defects, please reach out to the browser provider\'s support team as '
            +
            'ezClocker.com cannot provide a solution.</p></div>');
    }

    /**
     * @public
     * Returns the provided selfToUse if the reference is valid. Otherwise, returns the instance referenced by the provided
     * apiName. *
     * @param {string} apiName
     * @param {Object|null} selfToUse
     * @returns {object}
     */
    ezSelf(apiName, selfToUse) {
        let theApi = EzObject.isValid(selfToUse) ? selfToUse : EzApi.ezInstance.ezclocker[apiName];
        if (!EzObject.isValid(theApi)) {
            theApi = window[apiName]; // attempt to pull from global
        }

        if (!EzObject.isValid(theApi)) {
            EzApi.ezInstance.ezLogError('Unable to locate an ezApi with the name ' + apiName);
            return null;
        }

        return theApi;
    }

    /**
     * @public
     * Applies the the / character as the last charcter of the provided path.
     * If the path already has / as the last charcter, the path is returned as is.
     * If the path is empty or null, a single / character is returned
     * @param {string|null} path
     * @returns {string}
     * A string value of the path with a single applied / at the end if needed.
     */
    ezPostSlash(path) {
        if (!EzString.stringHasLength(path)) {
            return '/';
        }
        return path[path.length - 1] == '/' ? path : path + '/';
    }

    /**
     * @public
     * Applies the the / character as the first charcter of the provided path.
     * If the path already has / as the first charcter, the path is returned as is.
     * If the path is empty or null, a single / character is returned
     * @param {string|null} path
     * @returns {string}
     * A string value of the path with a single / at the beginning if needed.
     */
    ezPreSlash(path) {
        if (!EzString.stringHasLength(path)) {
            return '/';
        }
        return path[0] == '/' ? path : '/' + path;
    }

    /**
     * @public
     * Builds a path from the provided arguments. Placeing the / character at the
     * beginning (if not already there), between each argument (if not already there).
     * A / character is NOT added to the end of the path, but if one exists in the last argument it will return.
     * @param {arguments}
     * @returns {string}
     * A string value of the host root relative path
     */
    ezBuildRootPath() {
        if (!EzObject.isValid(arguments) || 0 === arguments.length) {
            return '/';
        }

        let path = EzApi.ezInstance.isArray(arguments[0]) ?
            EzApi.ezInstance.ezBuildUrl('', arguments[0]) :
            EzApi.ezInstance.ezBuildUrl.call(this, '', arguments);

        return ('/' === path[0]) ? path.substring(1) : path;
    }

    /**
     * @public
     * Builds a url from the baseUrl and array of path parts.
     * Builds baseUrl is used as the initial url. Any / character at the end of baseUrl is removed first.
     * Path parts are appended to the initial url with a preceeding / character (if one doesn't already exist).
     * @param {string|null} baseUrl
     * Builds path's prefixing domain + host (if any)
     * @param {array|null} pathParts
     * Builds array of paths to build
     * @returns {string}
     * A string value of the host root relative path
     */
    ezBuildUrl(baseUrl, pathParts) {
        if (!EzObject.isValid(pathParts) || pathParts.length === 0) {
            return !EzObject.isValid(baseUrl) ? '/' : baseUrl;
        }

        let path = EzString.stringHasLength(baseUrl) ? EzApi.ezInstance.ezPostSlash(baseUrl) : '';
        for (let i in pathParts) {
            let pathPart = pathParts[i];

            if (EzString.stringHasLength(pathPart)) {
                // Appending to path: {arguments[ai]}/
                if ('/' === path[path.length - 1]) {
                    // Remove if first character is a /
                    path = path.substr(0, path.length - 1);
                }

                path += pathPart[0] == '/' ? pathPart : '/' + pathPart;
            }
        }
        return path;
    }

    /**
     * @public
     * Creates new references of objects based upon the ezClocker JS Object template.
     * @param {Function} ezClockerApiObject
     * @returns {object}
     */
    ezNew() {
        let constructorFunction = arguments[0];
        if (!EzObject.isValid(constructorFunction) || !EzFunction.isFunction(constructorFunction)) {
            EzApi.ezInstance.ezLogError('ezNew requires the first argument to be the object\'s constructor function.');
            return null;
        }

        let ref = new (Function.prototype.bind.apply(constructorFunction, arguments));
        if (EzFunction.isFunction(ref.ezInit)) {
            return ref.ezInit();
        }

        return ref;
    }

    /**
     * @public
     * Returns true if the response contains the basic pieces: Error Code and message, neither being null
     * @param {} response
     */
    ezIsValidApiResponse(response) {
        return EzObject.isValid(response) &&
            EzObject.isValid(response.errorCode) &&
            EzObject.isValid(response.message);
    }

    /**
     * @public
     * Returns true if the response is a valid api response AND the error code is not zero.
     * @param {*} eResponse
     */
    ezIsValidApiErrorResponse(eResponse) {
        return EzObject.isValidApiResponse(eResponse) && eResponse.errorCode !== 0;
    }

    /* ************************************************************************************* */
    /* DEPRECATED METHODS ****************************************************************** */
    /* ************************************************************************************* */
    /**
     * @deprecated Dialogs should no longer be registered with ezApi but instead register via EzApi.ezInstance.ezRegisterApi()
     * @public
     * @param {string} dialogName
     * @param {object} dialogInstance
     * @returns {object}
     * Returns instance associated with the dialog name
     */
    ezRegisterDialog(dialogName, dialogInstance) {
        if (!EzString.stringHasLength(dialogName)) {
            throw new Error('[EzApi.ezRegisterDialog]: A non-empty name is required to register with ezApi.');
        }
        if (!EzObject.isValid(dialogInstance)) {
            throw new Error('[EzApi.ezRegisterDialog]: You can only register valid, non-null instances with ezApi.');
        }

        EzApi.ezInstance.ezclocker[dialogName] = dialogInstance;
        return EzApi.ezInstance.ezclocker[dialogName];
    }

    /**
     * @deprecated Call EzApi.ezInstance.ezRegisterGlobalEvent directly with a specific name for the event.
     * @public
     * Registers an onReady event for the owner
     * @param {string} eventOwnerName
     */
    ezRegisterReadyEvent(eventOwnerName) {
        if (!EzString.stringHasLength(eventOwnerName)) {
            EzApi.ezInstance.ezLogError('A valid, non-empty event owner name is required to register a global OnReady event.');
        }
        EzApi.ezInstance.ezRegisterGlobalEvent(eventOwnerName, 'onReady', '_EzOn' + eventOwnerName + '_Ready');
    }

    /**
     * @deprecated Move to EzApi.ezInstance.ezCallback()
     * @public
     * Verifies the passed function is valid, and returns the call to that method. Otherwise, returns null
     * @param {Function} callBackRef
     */
    callBack() {
        return EzApi.ezInstance.ezCallBack.apply(this, arguments);
    }

    /**
     * @public
     * Determines of the provided object reference has the property named as the string provided in propertyName.
     * @param {object} ref
     * @param {string} propertyName
     * @returns {boolean}
     */
    ezJsonObjectHasProperty(ref, propertyName) {
        if (!EzObject.isValid(ref) || !EzString.stringHasLength(propertyName)) {
            return false;
        }

        return Object.hasOwn(ref, propertyName);
    }

    /**
     * @deprecated Move to EzApi.ezInstance.ezReturnValidOrDefault()
     * @public
     * Returns the provided item for assignment to a let if the item is valid. Otherwise, the defaultItem is returned for
        assignment.
     * @param {*} item
     * @param {*} defaultItem
     */
    assignOrDefault(item, defaultItem) {
        return EzApi.ezInstance.ezReturnValidOrDefault(item, defaultItem);
    }

    /**
     * @public
     * Returns the provided item for assignment to a let if the item is valid. Otherwise, the defaultItem is returned for
     * assignment.
     * @param {*} item
     * @param {*} defaultItem
     */
    ezAssignOrDefault(item, defaultItem) {
        return EzObject.isValid(item)
            ? item
            : defaultItem;
    }

    /**
     * @public
     * Returns the provided aArray if it is a valid array. Otherwise, an empty array is returned.
     * @param {Array} aArray
     * @returns {Array}
     */
    ezAssignOrEmptyArray(aArray) {
        return EzArray.isArray(aArray)
            ? aArray
            : [];
    }

    /**
     * @deprecated Move to EzApi.ezInstance.ezReturnValidOrEmptyString()
     * @public
     * Returns the provided value if it is a valid string, otherwise '' string is returned
     * @param {string} value
     */
    assignOrEmpty(value) {
        return EzApi.ezInstance.ezReturnValidOrEmptyString(value);
    }

    /**
     * @deprecated Move to EzApi.ezInstance.ezAssignOrNull()
     * @public
     * Returns the provided item to assign to a variable if the item is valid. Otherwise, null is returned
     * @deprecated
     * Usewindow.EzApi.ezInstance.ezReturnValidOrNull instead.
     * @param {*} item
     */
    assignOrNull(item) {
        return EzApi.ezInstance.ezAssignOrDefault(item, null);
    }
    /**
     * @deprecated Move to EzApi.ezInstance.ezReturnValidOrNull()
     * @public
     * Returns the provided item to assign to a variable if the item is valid. Otherwise, null is returned
     * @param {*} item
     */
    ezAssignOrNull(item) {
        return EzApi.ezInstance.ezAssignOrDefault(item, null);
    }

    /**
     * @deprecated Move to EzApi.ezInstance.ezDecode()
     * @public
     * Decodes the provided string, converting to a blank string first if null, undefined
     * @param {string} string
     */
    decode(stringValue) {
        return decodeURIComponent(EzApi.ezInstance.gString(stringValue));
    }

    /**
     * @deprecated Move to EzApi.ezInstance.ezNumberToString()
     * @public
     * Converts a number to a string or returns NAN if not posslbe
     * @param {number} num
     */
    numberToString(num) {
        if (!EzApi.ezInstance.isNumber(num)) {
            // If it is a string, return that. Otherwise, return NAN
            return EzString.stringHasLength(num) ? num : 'NAN';
        }
        try {
            return num.toString();
        } catch (ex) {
            return 'NAN';
        }
    }

    /**
     * @public
     * Returns the valie of the property named {propertyKey} from the provided {jsonObject} if {jsonObject} contains
     * that valid property. Otherwise, the default value is returned.
     * @param {object} jsonObject
     * @param {string} propertyKey
     * @param {defaultValue|null} defaultValue
     */
    ezGetJSONObjectPropertyValueOrDefault(jsonObject, propertyKey, defaultValue) {
        if (EzObject.isValid(jsonObject) &&
            EzString.stringHasLength(propertyKey) &&
            EzObject.isValid(jsonObject[propertyKey])) {
            return jsonObject[propertyKey];
        }

        return defaultValue;
    }

    /**
     * @deprecated Use EzApi.ezInstance.ezRegisterApi(name, instance); instead
     * @public
     * Registers an ezclocker-api object with theezApi instance with the appropriate scope.
     * @param {string} apiName
     * Name of the API object
     * @param {object} apiInstance
     * Instance of the API object
     * @param {string|null} accessScope
     * Defaults to secure scope if none provided
     * @returns {object}
     * Returns the api instance provided
     */
    ezRegister(apiName, apiInstance, accessScope) {
        if (!EzString.stringHasLength(apiName)) {
            throw new Error('A non-empty name is required to register with ezApi.');
        }
        if (!EzObject.isValid(apiInstance)) {
            throw new Error('You can only register valid, non-null instances with ezApi.');
        }

        // Force API uppercase to make it non-case sensitive
        //apiName = apiName.toUpperCase();
        let scope = !EzString.stringHasLength(accessScope) ? EzApi.ezInstance.EzApiRegistrationScope.SECURE : accessScope;
        if (EzApi.ezInstance.EzApiRegistrationScope.WINDOW === scope) {
            EzApi.ezInstance.ezLogDebug('[ezClocker API]: ' + apiName + ' registered as a GLOBAL API on the window object.');
            window[apiName] = apiInstance;
            return window[apiName];
        }
        if (EzObject.isValid(apiInstance)) {
            apiInstance.ezApiScope = accessScope;
        }
        EzApi.ezInstance.ezLogDebug('[ezClocker API]: ' + apiName + ' registered.');
        EzApi.ezInstance.ezclocker[apiName] = apiInstance;
        return EzApi.ezInstance.ezclocker[apiName];
    }

    /**
     * @deprecated Use EzApi.ezInstance.ezRegisterApi(name, instance); instead
     * @public
     * Registers theezApi as a public api
     * @param {string} apiName
     * Name of the API object
     * @param {object} apiInstance
     * Instance of the API object
     * @returns {object}
     * Returns the api instance provided
     */
    ezRegisterPublic(apiName, apiInstance) {
        if (!EzString.stringHasLength(apiName)) {
            throw new Error('A non-empty name is required to register with ezApi.');
        }
        if (!EzObject.isValid(apiInstance)) {
            throw new Error('You can only register valid, non-null instances with ezApi.');
        }

        EzApi.ezInstance.ezclocker[apiName] = apiInstance;
        return EzApi.ezInstance.ezclocker[apiName];
    }

    /**
     * @deprecated Use EzApi.ezInstance.ezRegisterApi(name, instance); instead
     * @public
     * Registers theezApi as a secure api
     * @param {string} apiName
     * Name of the API object
     * @param {object} apiInstance
     * Instance of the API object
     * @returns {object}
     * Returns the api instance provided
     */
    ezRegisterSecure(apiName, apiInstance) {
        if (!EzString.stringHasLength(apiName)) {
            throw new Error('A non-empty name is required to register with ezApi.');
        }
        if (!EzObject.isValid(apiInstance)) {
            throw new Error('You can only register valid, non-null instances with ezApi.');
        }

        EzApi.ezInstance.ezclocker[apiName] = apiInstance;
        return EzApi.ezInstance.ezclocker[apiName];
    }

    /**
     * @deprecated Use EzApi.ezInstance.ezRegisterApi(name, instance); instead
     * @public
     * Registers an external API
     * @param {string} apiName
     * Name of the API object
     * @param {object} apiInstance
     * Instance of the API object
     * @returns {object}
     * Returns the api instance provided
     */
    ezRegisterExternal(apiName, apiInstance) {
        if (!EzString.stringHasLength(apiName)) {
            throw new Error('A non-empty name is required to register with ezApi.');
        }
        if (!EzObject.isValid(apiInstance)) {
            throw new Error('You can only register valid, non-null instances with ezApi.');
        }

        EzApi.ezInstance.ezclocker[apiName] = apiInstance;
        return EzApi.ezInstance.ezclocker[apiName];
    }

    /**
     * @deprecated Use EzApi.ezInstance.ezRegisterApi(name, instance); instead
     * @public
     * Registers theezApi as a global (root level) api
     * @param {string} apiName
     * Name of the API object
     * @param {object} apiInstance
     * Instance of the API object
     * @returns {object}
     * Returns the api instance provided
     */
    ezRegisterRoot(apiName, apiInstance) {
        if (!EzString.stringHasLength(apiName)) {
            throw new Error('A non-empty name is required to register with ezApi.');
        }
        if (!EzObject.isValid(apiInstance)) {
            throw new Error('You can only register valid, non-null instances with ezApi.');
        }

        EzApi.ezInstance.ezclocker[apiName] = apiInstance;
        return EzApi.ezInstance.ezclocker[apiName];
    }

    /**
     * @deprecated Use EzApi.ezInstance.ezRegisterApi(name, instance); instead
     * @public
     * Adds a public scoped object into theezApi with the provided name.
     * @param {string} name
     * @param {object} reference
     * @returns {object}
     * Returns the reference
     */
    addPublicApi(name, reference) {
        return EzApi.ezInstance.ezRegisterPublic(name, reference);
    }

    /**
     * @deprecated Use EzApi.ezInstance.ezRegisterApi(name, instance); instead
     * @public
     * Adds an ezClocker dialog reference into theezApi with the provided name
     * @param {string} name
     * @param {object} reference
     * @returns {object}
     * Returns the reference
     */
    addDialog(name, reference) {
        EzApi.ezInstance.dialogs[name] = typeof reference !== 'undefined' ? reference : null;
    }

    /**
     * @deprecated Use EzApi.ezInstance.ezRegisterApi(name, instance); instead
     * @public
     * Adds a secure scoped object into theezApi with the provided name
     * @param {string} name
     * @param {object} reference
     * @returns {object}
     * Returns the reference
     */
    addSecureApi(name, reference) {
        return EzApi.ezInstance.ezRegisterSecure(name, reference);
    }

    /**
     * @deprecated Use EzApi.ezInstance.ezRegisterApi(name, instance); instead
     * @public
     * Adds an externall scoped object into theezApi with the provided name
     * @param {string} name
     * @param {object} reference
     * @returns {object}
     * Returns the reference
     */
    addExternalApi(name, reference) {
        return EzApi.ezInstance.ezRegisterExternal(name, reference);
    }

    /**
     * @deprecated Use EzApi.ezInstance.ezApiExists(apiName) instead.
     * @public
     * Returns true if a reference with the provided name exists in the public scope
     * @param {string} name
     * @returns {boolean}
     */
    doesPublicApiExist(name) {
        return typeof EzApi.ezInstance.Public[name] !== 'undefined' && EzApi.ezInstance.Public[name];
    }

    /**
     * @deprecated Use EzApi.ezInstance.ezApiExists(apiName) instead.
     * @public
     * Returns true if a reference with the provided name exists in the secure scope
     * @param {string} name
     * @returns {boolean}
     */
    doesSecureApiExist(name) {
        return typeof EzApi.ezInstance.Secure[name] != 'undefined' && EzApi.ezInstance.Secure[name];
    }

    /**
     * @deprecated Use EzApi.ezInstance.ezApiExists(apiName) instead.
     * @public
     * Returns true if a reference with the provided name exists in the external scope
     * @param {string} name
     * @returns {boolean}
     */
    doesExternalApiExist(name) {
        return typeof EzApi.ezInstance.Secure[name] != 'undefined' && EzApi.ezInstance.External[name];
    }

    /**
     * @deprecated Switch to EzApi.ezInstance.ezSelf() instead
     * @public
     * This is the same implementation as EzApi.ezInstance.ezSelf(), which is the preferred method to use.
     * @param {string} apiName
     * @param {Object|null} selfToUse
     * @returns {object}
     */
    ezGetSelf(apiName, selfToUse) {
        return EzObject.isValid(selfToUse) ? selfToUse : EzApi.ezInstance.ezGetApi(apiName);
    }

    /**
     * @deprecated DO NOT USE
     * @public
     * Returns the reference for the given apiName by scanning all the possible api categories for the name and returning
     * the first encountered using the order: Public, Secure, Dialogs, External, Window
     * @param {string} apiName
     * @returns {object}
     */
    ezGetApi(apiName) {
        if (!EzString.stringHasLength(apiName)) {
            EzApi.ezInstance.ezLogError('EzApi.ezInstance.ezGetSelf requires a valid, non-empty api name param.');
            return null; // a name IS required
        }

        let theApi = EzApi.ezInstance.ezclocker[apiName];
        if (!EzObject.isValid(theApi)) {
            theApi = window[apiName]; // attempt to pull from global
        }

        if (!EzObject.isValid(theApi)) {
            EzApi.ezInstance.ezLogError('Unable to locate an ezApi with the name ' + apiName);
            return null;
        }
        return theApi;
    }

    /**
     * @deprecated Move to EzJson.toJson()
     * @public
     * Converts an object to JSON string
     * @param {*} jsonObject
     */
    toJsonString(item) {
        if (EzApi.ezInstance.ezIsString(item)) {
            return item;
        }
        try {
            return JSON.stringify(item);
        } catch (ex) {
            return EzJson.toJson(EzApi.ezInstance.buildJsonError('500', 'Failed to convert ' + item +
                'to a JSON string.', ex));
        }
    }

    /**
     * @deprecated Move to EzApi.ezInstance.ezFromJson()
     * @public
     * Returns the Javascript Object created from the provided String. If a non-string value is passed, that value
     * is simply reflected back in this call.
     * @param {string} jsonString
     */
    fromJsonString(jsonString) {
        if (!EzApi.ezInstance.ezIsString(jsonString)) {
            // Item passed is not a string! Just return the item
            return jsonString;
        }
        if (jsonString.length === 0) {
            // return an empty json object if string is empy
            return {};
        }
        // Use jQuery JSON parser if available OR fall back to the native browser JSON.parse
        try {
            return JSON.parse(jsonString);
        } catch (ex) {
            // failed to parse JSON string
            return EzApi.ezInstance.buildJsonError('500', 'Failed to parse ' + jsonString + ' to a javascript object.', ex);
        }
    }

    /**
     * @deprecated Move to ezUi.ezElementExists()
     * @public
     * Determines if the element with provided ID exists (using $() call)
     * @param {string} id
     * @returns {boolean}
     */
    ezElementExists(id) {
        return EzApi.ezInstance.ezElementExists$('#' + id);
    }

    /**
     * @deprecated Move to ezUi.ezElementExists$()
     * @public
     * Determines if the element with provided ID exists (using $() call)
     * @param {string} jquerySelector
     * @returns {boolean}
     */
    ezElementExists$(jquerySelector) {
        if (!EzString.stringHasLength(jquerySelector)) {
            return false;
        }

        let element = EzApi.ezInstance.ez$(jquerySelector);
        return EzObject.isValid(element) && element.length !== 0;
    }

    /**
     * @deprecated Move to EzApi.ezInstance.ezIsUndefined()
     * @public
     * Return true if the provided item is undefined
     * @param {*} item
     */
    isUndefined(item) {
        return typeof item === 'undefined';
    }

    /**
     * @deprecated Move to EzApi.ezInstance.ezGetObjectType()
     * @public
     * Returns the Object.prototype.toString.call() result applied to the provided object
     * @param {*} object
     */
    getObjectType(object) {
        return Object.prototype.toString.call(object);
    }

    /**
     * @deprecated Move to EzApi.ezInstance.ezIsNull()
     * @public
     * Returns true if the provided item is null (does not evaluate undefined)
     * @param {*} item
     */
    isNull(item) {
        return null == item;
    }

    /**
     * @deprecated Move to EzApi.ezInstance.ezIsObject()
     * @public
     * Returns true if the provided item is an object type
     * @param {*} item
     */
    isObject(item) {
        return EzObject.isValid(item) && typeof item === 'object';
    }

    /**
     * @deprecated Switch to EzObject.isValid()
     * @public
     * Returns true if the item passed is defined and not null.
     * @param {*} item
     */
    isValid(item) {
        return typeof item !== 'undefined' && item !== null;
    }

    /**
     * @deprecated Switch to !EzObject.isValid()
     * @public
     * Returns true if the item passed is undefined OR null
     * @param {*} item
     */
    isNotValid(item) {
        return !EzObject.isValid(item);
    }

    /**
     * @deprecated Use EzApi.ezInstance.ezAllValid() instead
     * @public
     * Evaluates all the provided arguments (if any) to be valid
     */
    allValid() {
        for (let aIndex in arguments) {
            if (!EzObject.isValid(arguments[aIndex])) {
                return false;
            }
        }
        return true;
    }

    /**
     * @deprecated Move to EzApi.ezInstance.ezAnyNotValid()
     * @public
     * Determines if any of the passed arguments are not valid
     */
    anyNotValid() {
        for (let aIndex in arguments) {
            if (!EzObject.isValid(arguments[aIndex])) {
                return true;
            }
        }
        return false;
    }

    /**
     * @deprecated Move to EzApi.ezInstance.ezIsString()
     * @public
     * Determines if the value passed is a string
     * @param {*} value
     */
    isString(object) {
        return EzObject.isValid(object) && typeof object === 'string';
    }

    /**
     * @public
     * Safely returns the index of the first occurance of aPart within the provdied aString by checking for null
     * or undefined values before hand.
     * If aString is not a valid string then -1 is returned
     * If aPart is not a valid string, then -1 is returned
     * @returns {number}
     */
    ezIndexOf(aString, aPart) {
        return undefined !== aString && null !== aString && 'string' === typeof aString &&
            undefined !== aPart && null !== aPart && 'string' === typeof aPart
            ? aString.indexOf(aPart)
            : -1;
    }

    /**
     * @deprecated Move to EzApi.ezInstance.ezIsMoment()
     * @public
     * Determines if the passed object is an actual moment.js object or not.
     * @param {*} object
     */
    isMoment(object) {
        return EzObject.isValid(object) && true === object._isAMomentObject;
    }

    /**
     * @deprecated Use !EzString.stringHasLength() instead.
     * @public
     * Determines if the passed string is undefined, null, or has length zero
     * @param {string} string
     */
    isEmptyString(stringValue) {
        return !EzString.stringHasLength(stringValue);
    }

    /**
     * @deprecated Use EzApi.ezInstance.ezIsEmptyArray() instead
     * @public
     * Determines if the passed array is not undefined, not null, and has a length greater than zero
     * @param {array} array
     */
    isEmptyArray(array) {
        return !EzArray.isArray(array) || array.length === 0;
    }

    /**
     * @deprecated Use EzApi.ezInstance.ezIsNotEmptyArray() instead.
     * @public
     * Determines if the passed array is not undefined, not null, and has a length greater than zero
     * @param {array} array
     */
    isNotEmptyArray(array) {
        return !EzApi.ezInstance.ezIsEmptyArray(array);
    }

    /**
     * @deprecated Use EzArray.isArray() instead.
     * @public *
     * Determines if the passed object is an array or not.
     * @param {array|null} array
     */
    isArray(array) {
        return EzObject.isValid(array) && EzApi.ezInstance.ezGetObjectType(array) === '[object Array]';
    }

    /**
     * @deprecated Move to EzApi.ezInstance.ezIsNumber()
     * @public
     * Determines if the passed object is a number type.
     * @param {*} object
     */
    isNumber(aObject) {
        return EzObject.isValid(aObject) &&
            (typeof aObject === 'number' || EzApi.ezInstance.ezGetObjectType(aObject) === '[object Number]');
    }

    /**
     * @deprecated Move to EzApi.ezInstance.ezIsBoolean()
     * @public
     * Determines if the passed object is a boolean type.
     * @param {*} object
     */
    isBoolean(object) {
        return EzObject.isValid(object) && EzApi.ezInstance.ezGetObjectType(object) === '[object Boolean]';
    }

    /**
     * @deprecated Move to EzApi.ezInstance.ezIsFalse()
     * @public
     * Returns true if the boolean value is false. Otherwise, returns false if the value is NOT a boolean at all OR
     * is actually true.
     * @param {boolean} value
     */
    isFalse(value) {
        return EzApi.ezInstance.ezIsBoolean(value) ? false === value : false;
    }

    /**
     * @deprecated Use EzFunction.isFunction() instead
     * @public
     * Returns true if the passed ref is a javascript function
     * @param {Function} functionRef
     */
    isFunction(functionRef) {
        return EzObject.isValid(functionRef) && 'function' === typeof functionRef;
    }

    /**
     * @deprecated Move to EzApi.ezInstance.ezIsNotEmptyString()
     * @public
     * Determines if the passed string is not undefined, not null, AND has a length greater than zero
     * @param {string} stringValue
     */
    isNotEmptyString(stringValue) {
        return EzApi.ezInstance.ezIsString(stringValue) && 0 < stringValue.length;
    }

    /**
     * @deprecated Move to EzApi.ezInstance.ezString()
     * @public
     * Returns the passed string OR if the string is empty, null, or undefined a blank string is returned
     * @param {string} stringValue
     */
    gString(stringValue) {
        return EzString.stringHasLength(stringValue)
            ? stringValue
            : '';
    }

    /**
     * @public
     * Alternative wrapper for ezReject
     * @param {object} response
     * @deprecated
     * Migrate to: EzPromise.reject(...)
     */
    Reject(response) {
        return EzApi.ezInstance.ezReject(response);
    }

    /**
     * @deprecated Move to EzApi.ezInstance.ezResolve()
     * @public
     * Executes Promise.resolve, passing the provided response in the resolve.
     * @param {object} response
     */
    Resolve(response) {
        return EzApi.ezInstance.ezResolve(response);
    }

    /**
     * @public
     * Use in promise.catch handlers to genericlly catch issues from the promise.
     */
    ezPromiseCatch() {
        let logError = EzObject.isValid(arguments) && arguments.length > 0
            ? 'ezApi caught an unhandled promise exception/catch. Catch arguments: ' + EzJson.toJson(arguments)
            : 'ezApi caught an unhandled promise exception/catch. No arguments available.';

        window.console.error(logError);
        return EzApi.ezInstance.ezCreateErrorResponse(500, 'An unexpected error occurred while executing a Promise', arguments);
    }

    /**
     * @public
     * Creates a basic response with error message, error code, and optional entity.
     * @param {string} em
     * @param {Number|null} ec
     * @param {string|null} optionalEndPoint
     * @param {Object|null} optionalEntity
     * @returns {object}
     */
    ezCreateErrorResponse(ec, em, optionalEndPoint, optionalEntity) {
        let eResponse = {
            errorCode: EzApi.ezInstance.ezIsNumber(ec)
                ? ec
                : 500,
            message: !EzString.stringHasLength(em)
                ? 'Unexpected error'
                : em
        };

        if (EzString.stringHasLength(optionalEndPoint)) {
            eResponse['endPoint'] = optionalEndPoint;
        }
        if (EzObject.isValid(optionalEntity)) {
            eResponse['entity'] = optionalEntity;
        }

        return eResponse;
    }

    /**
     * @public
     * Determines if the objectRef has the property propertyName. Returns null if the objectRef is false, the
     * @param {object} objectRef
     * @param {string} propertyName
     * @returns {boolean}
     */
    ezHasOwnProperty(objectRef, propertyName) {
        if (!EzObject.isValid(objectRef)) {
            throw new EzBadParamException(
                'objectRef',
                EzApi.ezInstance.ezTypeName,
                'ezHasOwnProperty(objectRef, propertyName)');
        }
        if (!EzObject.isValid(propertyName)) {
            throw new EzBadParamException(
                'propertyName',
                EzApi.ezInstance.ezTypeName,
                'ezHasOwnProperty(objectRef, propertyName)');
        }

        let pName = EzApi.ezInstance.ezIsString(propertyName)
            ? propertyName
            : propertyName.toString();
        if (!EzString.stringHasLength(pName)) {
            throw new EzBadParamException(
                'propertyName',
                EzApi.ezInstance.ezTypeName,
                'ezHasOwnProperty(objectRef, propertyName)');
        }

        return Object.hasOwn(objectRef, pName);
    }

    /**
     * @public
     * Returns if the objectRef is an instance of the provided clazz reference.
     * Note: The instanceof operator to test if the prototype property of a constructor appears anywhere in the
     * prototype chain of an object. The return value is a boolean value.
     * @param {object} objectRef
     * @param {Constructor|Class} clazz
     */
    ezInstanceOf(objectRef, clazz) {
        if (!EzObject.isValid(objectRef)) {
            throw new EzBadParamException(
                'objectRef',
                EzApi.ezInstance.ezTypeName,
                'ezInstanceOf(objectRef, Clazz)');
        }
        if (!EzObject.isValid(clazz)) {
            throw new EzBadParamException(
                'clazz',
                EzApi.ezInstance.ezTypeName,
                'ezInstanceOf(objectRef, Clazz)');
        }

        return objectRef instanceof clazz;
    }

    /**
     * @public
     * Returns if the objectRef is an instance of the provided clazz reference. In addition, a warning log is written
     * if the provided objectRef is not an instance of the provided Clazz/prototype constructor.
     * @param {*} objectRef
     * @param {*} Clazz
     * @returns {boolean}
     */
    ezWarnIfNotInstanceOf(objectRef, Clazz) {
        if (!EzApi.ezInstance.ezInstanceOf(objectRef, Clazz)) {
            EzApi.ezInstance.ezclocker.logger.warn(
                EzApi.ezInstance.ezMsg`
                    Action object is not an instance of ${Clazz.name}.
                    Action object is an instance of ${objectRef.constructor.name}.`);
            return false;
        }

        return true;
    }

    /**
     * @public
     * Returns the reference of the provided ezApiName, thisRef, or paramRef if it is valid and an instance of Clazz.
     * Returns the reference based on the following requirements:
     * EzApi.ezInstance.ezclocker[ezApiName] is returned if ezApiName is a valid Api name in EzApi.ezInstance.ezclocker and is an instance of
     * the provided Clazz.
     * - OR -
     * thisRef is returned if thisRef is a valid instance of the provided Clazz
     * - OR -
     * paramRef is returned if paramRef is a valid instance of the provided Clazz
     * - Otherwise -
     * Null is returned as the self reference. In addition, a warning is logged as each contender is evaluated to
     * be an instanceof Clazz and fails that evaluation.
     * @param {Constructor|Class} Clazz
     * @param {string|null} ezApiName
     * @param {Object|null} thisRef
     * @param {Object|null} paramRef
     * @returns {Object|null}
     */
    ezSelfRef(Clazz, thisRef, ezApiName, paramRef) {
        if (!EzObject.isValid(Clazz)) {
            Clazz = Object;
        }

        let refSet = [];
        if (EzObject.isValid(thisRef)) {
            refSet.push(thisRef);
        }
        if (EzString.stringHasLength(ezApiName)) {
            refSet.push(EzApi.ezInstance.ezclocker[ezApiName]);
        }
        if (EzObject.isValid(paramRef)) {
            refSet.push(paramRef);
        }

        for (let ref of refSet) {
            if (EzApi.ezInstance.ezWarnIfNotInstanceOf(ref, Clazz)) {
                return ref;
            }
        }

        // None of the references met the requirements
        return null;
    }

    /**
     * @public
     * Returns true if the aObject is an instance of Set()
     * @param {Object|null} aObject
     * @returns {boolean}
     */
    ezIsSet(aObject) {
        return EzObject.isValid(aObject) && EzApi.ezInstance.ezGetObjectType(aObject) === '[object Set]';
    }

    /**
     * @public
     * Returns true if the aObject is not an instance of Set()
     * @param {Object|null} aObject
     * @returns {boolean}
     */
    ezIsNotSet(aObject) {
        return !EzApi.ezInstance.ezIsSet(aObject);
    }

    /**
     * @public
     * Returns true if aObject is a Set() and the set is empty.
     * @param {Set} aObject
     * @returns {boolean}
     */
    ezIsEmptySet(aObject) {
        return EzApi.ezInstance.ezIsSet(aObject) && 0 === aObject.size;
    }

    /**
     * @public
     * Returns true if aObject is a Set() and the set is NOT empty.
     * @param {Set} aObject
     * @returns {boolean}
     */
    ezIsNotEmptySet(aObject) {
        return EzApi.ezInstance.ezIsSet(aObject) && 0 !== aObject.size();
    }

    /**
     * @public
     * Returns a get/set object operating from the provided parent object selfRef. Gets the value of
     * the selfRef property named propName. Sets the value of the selfRef objects property propName OR sets the
     * setDefValue if the provided setter value is not valid.
     * @param {object} self
     * @param {string} propName
     * @param {*} setDefValue
     * @returns {GetterSetter}
     */
    ezGetSet(selfRef, propName, propType, initialValue, setterDefaultValue, setterRequirements) {
        let ezGetterSetter = new EzGetterSetter(selfRef, propName, propType, initialValue, setterDefaultValue, setterRequirements);
        return function() {
            return ezGetterSetter;
        };
    }

    /**
     * @public
     * Returns a getter object operating from the provided parent object selfRef. Gets the value of
     * the selfRef property named propName.
     * @param {object} self
     * @param {string} propName
     * @returns {GetterSetter}
     */
    ezGetter(selfRef, propName) {
        let ezGetter = new EzGetter(selfRef, propName);
        return function() {
            return ezGetter;
        };
    }

    /**
     * @public
     * Returns a getter object operating from the provided parent object selfRef. Gets the value of
     * the selfRef property named propName.
     * @param {object} self
     * @param {string} propName
     * @param {*} initValue
     * @returns {GetterSetter}
     */
    ezGetterX(selfRef, propName, initValue) {
        let fName = 'get' + propName.replace(propName.charAt(0), propName.charAt(0).toUpperCase());
        selfRef[fName] = function() {
            return selfRef[propName];
        };
        return initValue;
    }

    /**
     * @public
     * Verifies the core dependencies are available
     * @returns {boolean}
     */
    ezValidateCoreDependencies() {
        let ezApiDep = '/public/javascript/common/ezapi.js';
        let publicJsCommon = '/public/javascript/common/';

        if (!EzObject.isValid(EzApi.ezInstance.ezclocker.ezLogger)) {
            EzApi.ezInstance.ezclocker.ezLogger.error('Definition of ' + publicJsCommon + 'ezclocker-logger.js is required after ' +
                ezApiDep);
            return false;
        }
        if (!EzObject.isValid(EzApi.ezInstance.ezclocker.ezEvents)) {
            EzApi.ezInstance.ezclocker.ezLogger.error('Definition of ' + publicJsCommon + 'ez-events.js is required after ' + ezApiDep);
            return false;
        }
        if (!EzObject.isValid(EzApi.ezInstance.ezclocker.ezUrlHelper)) {
            EzApi.ezInstance.ezclocker.ezLogger.error('Definition of ' + publicJsCommon + 'ezclocker-url-helper2.js is required after '
                +
                ezApiDep);
            return false;
        }
        if (!EzObject.isValid(EzApi.ezInstance.ezclocker.nav)) {
            EzApi.ezInstance.ezclocker.ezLogger.error('Definition of ' + publicJsCommon +
                'ezclocker-navigation-helper.js is required after ' +
                ezApiDep);
            return false;
        }
        if (!EzObject.isValid(EzApi.ezInstance.ezclocker.ezDateTime)) {
            EzApi.ezInstance.ezclocker.ezLogger.error('Definition of ' + publicJsCommon + 'ez-date-time.js is required after ' +
                ezApiDep);
            return false;
        }
        if (!EzObject.isValid(EzApi.ezInstance.ezclocker.ezBrowserInfo)) {
            EzApi.ezInstance.ezclocker.ezLogger.error('Definition of ' + publicJsCommon +
                'ezclocker-mobile-helper.js is required after ' +
                ezApiDep);
            return false;
        }

        return true;
    }

    /**
     * @public
     * Makes a deep copy of the propertyes of the provided sourceObject. Methods will not be copied over to the new Object.
     * @param {object} sourceObject
     * @returns {object}
     */
    ezPropClone(sourceObject) {
        if (!EzObject.isValid(sourceObject)) {
            return sourceObject;
        }

        return JSON.parse(JSON.stringify(sourceObject));
    }

    /**
     * @public
     * Makes a deep clone of the sourceObject.
     * Handles the cloning of functions and multiple/cyclic references (what this means is that if two properties in the
     * tree which is cloned are references of the same object, the cloned object tree will have these properties point to
     * one and the same clone of the referenced object)
     * Also solves for cyclic dependencies to prevent an infinite loop.
     * The complexity of the algorithm is O(n)
     * Research Link
     * https://stackoverflow.com/questions/728360/how-do-i-correctly-clone-a-javascript-object
     * @param {object} sourceObject
     * @returns {object}
     */
    ezDeepClone(sourceObject) {

        let originalObjectsArray = []; //used to remove the unique ids when finished
        let next_objid = 0;

        function objectId(aObject) {
            if (aObject == null) {
                return null;
            }
            if (aObject.__obj_id == undefined) {
                aObject.__obj_id = next_objid++;
                originalObjectsArray[aObject.__obj_id] = aObject;
            }
            return sourceObject.__obj_id;
        }

        let clonedObjectsArray = [];

        function cloneRecursive(aObject) {
            if (null === aObject) {
                return aObject;
            }

            let typeOfObject = typeof aObject;
            if ('string' === typeOfObject || 'number' === typeOfObject || 'boolean' === typeOfObject) {
                return aObject;
            }

            // Handle Date
            if (aObject instanceof Date) {
                let dateCopy = new Date();
                dateCopy.setTime(aObject.getTime());
                return dateCopy;
            }

            // Handle Array
            if (aObject instanceof Array) {
                let arrayCopy = [];
                for (let x = 0; x < aObject.length; ++x) {
                    arrayCopy[x] = cloneRecursive(aObject[x]);
                }
                return arrayCopy;
            }

            // Handle Object
            if (aObject instanceof Object) {
                if (undefined !== clonedObjectsArray[objectId(aObject)]) {
                    return clonedObjectsArray[objectId(aObject)];
                }

                let objectCopy = aObject instanceof Function
                    // Handle Function
                    ? aObject.apply(this, arguments)
                    : {};

                clonedObjectsArray[objectId(aObject)] = objectCopy;

                for (let propName in aObject) {
                    if ('__obj_id' !== propName && EzObject.hasProperty(aObject, propName)) {
                        objectCopy[propName] = cloneRecursive(aObject[propName]);
                    }
                }

                return objectCopy;
            }

            throw new Error('Unable to clone an object of type ' +
                sourceObject.constructor.name + '. The type is not yet supported.');
        }

        let clonedObject = cloneRecursive(sourceObject);

        // Remove the unique ids
        for (let originalObject of originalObjectsArray) {
            delete originalObject.__obj_id;
        }

        return clonedObject;
    }

    /**
     * @public
        Replaces all characters in the provided value with the obscureChar (uses * as default obscure char)
        If value is empty or null then {obscureChar} is returned.
        If obscureChar is empty or null, then * is used.
     * @param {string|null} value
     * @param {string|null} obscureChar
     * @returns {string}
     */
    ezObscureValue(value, obscureChar) {
        let oChar = EzString.stringHasLength(obscureChar)
            ? obscureChar
            : '*';

        if (!EzString.stringHasLength(value)) {
            return oChar;
        }

        return value.replace(/(.?)/g, oChar);
    }

    /**
     * Performs a shallow copy of the provided sourceObject. Will include any 'shallow' methods on the sourceObject.
     * @param {object} sourceObject
     * @returns {object}
     */
    ezShallowClone(sourceObject) {
        if (!EzObject.isValid(sourceObject)) {
            return sourceObject;
        }

        return Object.assign({}, sourceObject);
    }

    /**
     * @public
     * Generates a hash code for the provided value. If the value is not a string, the toString() value is used
     * to calculate the hash.
     * @returns {number}
     */
    ezHash32(value) {
        if (null === value || undefined === value) {
            throw new EzBadParamException('value', 'EzApi', 'ezGenerateHashCode');
        }

        return value
            .split('')
            .reduce(
                (prevHash, currVal) => {
                    return (((prevHash << 5) - prevHash) + currVal.charCodeAt(0)) | 0;
                });
    }

    ezValidContextDataRequiredException(dataName, functionName) {
        return EzApi.ezInstance.ezException('A ' + dataName + ' is required for EzClockerContext.' + functionName);
    }


    /**
     * @public
     * Attempts to separate the provided fullName into firstName and lastName parts.
     * @returns {object}
     * {
     *     firstName: <first_name_part>,
     *     lastName: <last_name_part>
     * };
     */
    ezFullNameToFirstLastName(fullName, lastNameIsFirst) {
        let result = {
            firstName: '',
            lastName: ''
        };

        if (!EzString.stringHasLength(fullName)) {
            return result;
        }

        let nameParts;
        if (EzBoolean.isTrue(lastNameIsFirst)) {
            // Assuming fullName is formatted as: 'LastName, FirstName' OR 'LastName FirstName' OR 'LastName'
            nameParts = fullName.split(',');
            if (1 === nameParts.length) {
                nameParts = fullName.split(' ');
            }
            if (1 === nameParts.length) {
                result.lastName = fullName.trim();
                return result;
            }

            for (let index = 0; index < nameParts.length; index++) {
                if (0 === index) {
                    result.lastName = nameParts[index].trim();
                } else {
                    result.firstName += `${nameParts[index]} `;
                }
            }
            result.firstName = result.firstName.trim();

            return result;
        }

        // Assuming fullName is formatted as: 'FirstName LastName' OR 'FirstName'
        nameParts = fullName.split(' ');
        if (1 === nameParts.length) {
            result.lastName = fullName.trim();
            return result;
        }

        for (let index = 0; index < nameParts.length; index++) {
            if (0 === index) {
                result.firstName = nameParts[index].trim();
            } else {
                result.lastName += `${nameParts[index]} `;
            }
        }
        result.lastName = result.lastName.trim();

        return result;
    }

    /**
     * @deprecated
     * Move all use of this method. Will get removed in a future version.
     * @public
     * @param {string} ezTypeName
     * @param {object} thisRef
     */
    ezSelfFromThis(ezTypeName, thisRef) {
        if (!EzString.stringHasLength(ezTypeName)) {
            throw new EzBadParamException('ezTypeName', 'EzApi', 'ezSelfFromThis');
        }
        if (!EzObject.isValid(thisRef)) {
            throw new EzBadParamException('thisRef', 'EzApi', 'ezSelfFromThis');
        }

        if (EzObject.hasProperty(thisRef, 'ezTypeName') && ezTypeName === thisRef.ezTypeName ||
            ezTypeName === thisRef.constructor.name) {
            // verified type
            return thisRef;
        }

        // Unable to verify type, print warning
        EzApi.ezInstance.ezclocker.ezLogger.warn(
            EzString.em`Unable to verify the provided thisRef is of type ${ezTypeName}`);

        return thisRef;
    }

    /**
     * @public
     * Returns all the names of the parameters of the provided function ref (if any)
     * @returns {Array}
     */
    ezGetFunctionParamNames(functionRef) {
        if (!EzFunction.isFunction(functionRef)) {
            throw new EzBadParamException('functionRef', 'EzApi', 'ezGetFunctionParamNames');
        }

        let reg = /\(([\s\S]*?)\)/;

        let functionParamInfo = reg.exec(functionRef);

        if (!EzObject.isValid(functionParamInfo)) {
            return [];
        }

        return functionParamInfo[1]
            .split(',')
            .filter((paramName) => {
                return 'string' === typeof paramName && 0 < paramName.length;
            })
            .reduce((accumulator, currentValue) => {
                let reducedArray = 'string' === typeof accumulator
                    ? [accumulator.trim()]
                    : accumulator;

                reducedArray.push(currentValue.trim());
                return reducedArray;
            });
    }
}

/**
    Exporting the singleton reference
 */
export function ezApi() {
    return EzApi.ezInstance;
}
