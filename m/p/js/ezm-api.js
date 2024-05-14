/* exported EzApi */
/**
 * @public
 * Constructor for EzApi object. Provides utility methods, helper methods, and ezClocker API registration/access
 * @returns {EzApi}
 */
function EzApi() {
    this.ready = false;
    this.ezDebugMode = false;

    this.paramEvalClass = {
        functionClass: 'EzApi'
    };

    //this.ex = ezExceptionFactory;

    this.ezclocker = {}; // Access to all registered api's within the context
    this.enums = []; // Access to all registered enumerations
    this.events = []; // All registered event names (access with: window.ezApi.events[{eventOwner}.{eventCategory}])

    // Verifies that Promise is available
    if (typeof Promise === 'undefined' || !Promise) {
        var em = '[EzApi Constructor]: Promise functionality is NOT available and IS required!';
        if (window.console && window.console.error) {
            window.console.error(em);
        }
        throw new Error(em);
    }
    /**
     * @deprecated Use window.ezApi.ezPromise()
     */
    this.Promise = Promise;
    /**
     * @deprecated Use window.ezApi.ezPromise()
     */
    this.promise = this.Promise;

    /**
     * @deprecated DO NOT USE
     * EzApiRegistrationScope is deprecated and should no longer be used anywhere.
     */
    this.EzApiRegistrationScope = {
        EZCLOCKER: 'ezclocker',
        ROOT: 'r',
        PUBLIC: 'p',
        SECURE: 's',
        EXTERNAL: 'x',
        DIALOGS: 'd',
        WINDOW: 'window',
        fromEzApiRegistrationScopeValue: function(ezApiRegistrationScopeValue) {
            for (var key in this.EzApiRegistrationScope) {
                if (this.EzApiRegistrationScope[key] === ezApiRegistrationScopeValue) {
                    return this.EzApiRegistrationScope;
                }
            }
            return this.EzApiRegistrationScope.ROOT;
        }
    };
    this.enums.push('EzApiRegistrationScope', this.EzApiRegistrationScope);

    // NOTE: All below api 'category' references are deprecated.
    /**
     * @deprecated Use window.ezApi.ezclocker instead
     */
    this.Public = this.ezclocker;
    /**
     * @deprecated Use window.ezApi.ezclocker instead
     */
    this['public'] = this.ezclocker;
    /**
     * @deprecated Use window.ezApi.ezclocker instead
     */
    this.p = this.ezclocker;
    /**
     * @deprecated Use window.ezApi.ezclocker instead
     */
    this.Secure = this.ezclocker;
    /**
     * @deprecated Use window.ezApi.ezclocker instead
     */
    this.secure = this.ezclocker;
    /**
     * @deprecated Use window.ezApi.ezclocker instead
     */
    this.s = this.ezclocker;
    /**
     * @deprecated Use window.ezApi.ezclocker instead
     */
    this.External = this.ezclocker;
    /**
     * @deprecated Use window.ezApi.ezclocker instead
     */
    this.external = this.ezclocker;
    /**
     * @deprecated Use window.ezApi.ezclocker instead
     */
    this.x = this.ezclocker;
    /**
     * @deprecated Use window.ezApi.ezclocker instead
     */
    this.Dialogs = this.ezclocker;
    /**
     * @deprecated Use window.ezApi.ezclocker instead
     */
    this.dialogs = this.ezclocker;
    /**
     * @deprecated Use window.ezApi.ezclocker instead
     */
    this.d = this.ezclocker;

    return this;
}

/**
 * @public
 * Creates a new Error() with the provided message.
 *
 * @param {String} em
 */
EzApi.prototype.ezException = function(em) {
    return new Error(em);
};

/**
 * @public
 * Creates a new Error() with the provided message.
 *
 * @param {String} em
 */
EzApi.prototype.ezBadParam = function(paramName, ownerName, functionName) {
    return window.ezApi.ezException('A valid ' + paramName + ' param is required in call to ' + ownerName + '.' + functionName);
};

/**
 * @public
 * Obtains the api reference for the provided api id. If the provided api id does not match a known api reference, then
 * the defaultApiReference is returned.
 * @param {String} apiId
 * @param {null|Object} defaultApiReference
 * @returns {Object}
 */
EzApi.prototype.ezGetApiIdReference = function(apiId, defaultApiReference) {
    return window.ezApi.ezIsNotEmptyString(apiId) && window.ezApi.ezIsValid(window.ezApi.ezclocker[apiId])
        ? window.ezApi.ezclocker[apiId]
        : defaultApiReference;
};

/**
 * @protected
 * Initalizes window.ezApi
 * @returns {EzApi}
 */
EzApi.prototype.ezInit = function() {
    window.ezApi.ready = true;

    this.enableDebugLogging = window.ezApi.ezIsWindowConsoleFunctionAvailable('debug');
    this.enableInfoLogging = window.ezApi.ezIsWindowConsoleFunctionAvailable('info');
    this.enableWarnLogging = window.ezApi.ezIsWindowConsoleFunctionAvailable('warn');
    this.enableErrorLogging = window.ezApi.ezIsWindowConsoleFunctionAvailable('error');

    return window.ezApi;
};

/**
 * @public
 * Determines if the window.console[{FunctionName}] is available to call.
 * @param {String} functionName
 * @returns {Boolean}
 */
EzApi.prototype.ezIsWindowConsoleFunctionAvailable = function(functionName) {
    return window.ezApi.ezIsValid(window.console) &&
        window.ezApi.ezIsFunction(window.console[functionName]);
};

/**
 * @public
 * Sets the enableDebugLogging. When true, ezApi will allow log writing to the window.console.debug.
 * If debugLogEnabled is null, then it is assumed false.
 * @param {null|Boolean} debugLogEnabled
 */
EzApi.prototype.ezSetEnableDebugLogging = function(debugLogEnabled) {
    window.ezApi.enableDebugLogging = window.ezApi.ezIsTrue(debugLogEnabled);
};

/**
 * @public
 * Sets the enableInfoLogging. When true, ezApi will allow log writing to the window.console.info.
 *
 * If infoLogEnabled is null, then it is assumed false.
 * @param {null|Boolean} infoLogEnabled
 */
EzApi.prototype.ezSetEnableInfoLogging = function(infoLogEnabled) {
    window.ezApi.enableInfoLogging = window.ezApi.ezIsTrue(infoLogEnabled);
};

/**
 * @public
 * Sets the enableErrorLogging. When true, ezApi will allow log writing to the window.console.warn.
 * If warnLogEnabled is null, then it is assumed false.
 * @param {null|Boolean} warnLogEnabled
 */
EzApi.prototype.ezSetEnableWarnLogging = function(warnLogEnabled) {
    window.ezApi.enableWarnLogging = window.ezApi.ezIsTrue(warnLogEnabled);
};

/**
 * @public
 * Sets the enableErrorLogging. When true, ezApi will allow log writing to the window.console.error.
 * If infoLogEnabled is null, then it is assumed false.
 * @param {null|boolean} errorLogEnabled
 */
EzApi.prototype.ezSetEnableErrorLogging = function(errorLogEnabled) {
    window.ezApi.enableErrorLogging = window.ezApi.ezIsTrue(errorLogEnabled);
};

/**
 * @public
 * Logs a function parameter error if the evalResult is false.
 *
 * @param {Boolean|null} evalResult
 * @param {String|null} paramName
 * @param {String|null} functionName
 * @param {String|null} className
 *
 * @returns {Boolean}
 * Returns true if an error log was NOT written, true otherwise.
 */
EzApi.prototype.ezValidateParam = function(evalResult, paramName, functionName, className) {
    return window.ezApi.ezValidParam({
        result: window.ezApi.ezIsBoolean(evalResult) ? evalResult : false,
        param: window.ezApi.ezIsNotEmptyString(paramName) ? paramName : '',
        callerFunction: window.ezApi.ezIsNotEmptyString(functionName) ? functionName : '',
        functionClass: window.ezApi.ezIsNotEmptyString(className) ? className : '',
    });
};

/**
 * @public
 * Logs a function parameter error if the evalResult is false.
 *
 * @param {Boolean|null} evalResult
 * @param {String|null} paramName
 * @param {String|null} functionName
 * @param {String|null} className
 *
 * @returns {Boolean}
 * Returns true if an error log was written, false otherwise.
 */
EzApi.prototype.ezParamNotValid = function(evalResult, paramName, functionName, className) {
    return window.ezApi.ezNotValidParam({
        result: window.ezApi.ezIsBoolean(evalResult) ? evalResult : false,
        param: window.ezApi.ezIsNotEmptyString(paramName) ? paramName : '',
        callerFunction: window.ezApi.ezIsNotEmptyString(functionName) ? functionName : '',
        functionClass: window.ezApi.ezIsNotEmptyString(className) ? className : '',
    });
};

/**
 * @public
 * Processes the evalObject to determine if a bad parameter error log needs written.
 *
 * @param {Object} evalObject
 *
 * @returns {Boolean}
 * Returns true if an error log was NOT written. False otherwise.
 */
EzApi.prototype.ezValidParam = function(evalObject) {
    return !window.ezApi.ezNotValidParam(evalObject);
};

/**
 * @public
 * Processes the evalObject to determine if a function parameter error needs logged and returns if an error
 * was logged or not (indicating the param is not valid).
 *
 * @param {Object} evalObject
 *
 * @returns {Boolean}
 * Returns true if an error log was written. False otherwise.
 */
EzApi.prototype.ezNotValidParam = function(evalObject) {
    if (window.ezApi.ezIsNotValid(evalObject)) {
        window.ezApi.ezLogError('The evalObject param is required in call to EzApi.ezValidParam().');
        return true;
    }

    if (window.ezApi.ezIsFalse(evalObject)) {
        var em = '';
        if (window.ezApi.ezIsEmptyString(evalObject.param)) {
            em += 'Then ' + evalObject.param + ' is required';
        } else {
            em += 'Failed to validate a required param';
        }

        if (!window.ezApi.ezIsEmptyString(evalObject.functionClass) && !window.ezApi.ezIsEmptyString(evalObject.callerFunction)) {
            em += ' in call to ' + evalObject.functionClass + '.' + evalObject.callerFunction + '().';
        } else if (!window.ezApi.ezIsEmptyString(evalObject.callerFunction)) {
            em += ' in call to ' + evalObject.callerFunction + '().';
        }

        window.ezApi.ezclocker.logger.error(em);
        return true;
    }

    return false;
};

/**
 * @public
 * Writes to the window.console.debug if available AND window.ezApi.enableDebugLogging is true.
 *
 * @param {String} dMessage
 */
EzApi.prototype.ezLogDebug = function(dMessage) {
    if (ezApi.ezIsFalse(window.ezApi.ezDebugMode)) {
        return;
    }

    if (window.ezApi.ezIsWindowConsoleFunctionAvailable('debug') &&
        window.ezApi.ezIsNotEmptyString(dMessage) &&
        window.ezApi.ezIsTrue(window.ezApi.enableDebugLogging)) {
        window.console.debug('[EzApi] [DEBUG]: ' + dMessage);
    }
};

/**
 * @deprecated Migrate to: window.ezApi.ezLogInfo(iMessage)
 *
 * @param {String} iMessage
 */
EzApi.prototype.ezLog = function(iMessage) {
    window.ezApi.ezLogInfo(iMessage);
};

/**
 * @public
 * Logs to window.console.info if available AND window.ezApi.enableInfoLogging is true.
 *
 * @param {String} iMessage
 */
EzApi.prototype.ezLogInfo = function(iMessage) {
    if (window.ezApi.ezIsWindowConsoleFunctionAvailable('info') &&
        window.ezApi.ezIsNotEmptyString(iMessage) &&
        window.ezApi.ezIsTrue(window.ezApi.enableInfoLogging)) {
        window.console.info('[EzApi] [INFO ]: ' + iMessage);
    }
};

/**
 * @public
 * Logs to window.console.warn if available AND window.ezApi.enableWarnLogging is true.
 * @param {String} message
 */
EzApi.prototype.ezLogError = function(wMessage) {
    if (window.ezApi.ezIsWindowConsoleFunctionAvailable('warn') &&
        window.ezApi.ezIsNotEmptyString(wMessage) &&
        window.ezApi.ezIsTrue(window.ezApi.enableWarnLogging)) {
        window.console.warn('[EzApi] [ERROR]: ' + wMessage);
    }
};

/**
 * @public
 * Logs to window.console.warn if available AND window.ezApi.enableWarnLogging is true.
 * @param {String} message
 */
EzApi.prototype.ezLogWarn = function(eMessage) {
    if (window.ezApi.ezIsWindowConsoleFunctionAvailable('warn') &&
        window.ezApi.ezIsNotEmptyString(eMessage) &&
        window.ezApi.ezIsTrue(window.ezApi.enableWarnLogging)) {
        window.console.warn('[EzApi] [WARN ]: ' + eMessage);
    }
};

/**
 * @public
 * Logs to window.console.error if available AND window.ezApi.enableErrorLogging is true.
 * @param {String} message
 */
EzApi.prototype.ezLogError = function(eMessage) {
    if (window.ezApi.ezIsWindowConsoleFunctionAvailable('error') &&
        window.ezApi.ezIsNotEmptyString(eMessage) &&
        window.ezApi.ezIsTrue(window.ezApi.enableErrorLogging)) {
        window.console.error('[ezClocker API]: ' + eMessage);
    }
};

/**
 * @deprecated Use window.ezApi.ezRegisterNewEnum() instead
 *
 * @public
 * Registers an enumeration with the ezApi instance. Registered enumerations are available from
 * window.ezApi.enums
 *
 * @param {String} constName
 * @param {Object} constInstance
 *
 * @return {Object}
 * constInstance passed in
 */
EzApi.prototype.ezRegisterEnum = function(enumerationName, enumerationInstance) {
    if (window.ezApi.ezIsEmptyString(enumerationName)) {
        throw new Error('[EzApi.ezRegisterEnum]: A non-empty name is required to register with window.ezApi.');
    }
    if (window.ezApi.ezIsNotValid(enumerationInstance)) {
        throw new Error('[EzApi.ezRegisterEnum]: You can only register valid, non-null instances with window.ezApi.');
    }

    window.ezApi.enums[enumerationName] = enumerationInstance;

    // Add the common properties and methods
    if (window.ezApi.ezIsEmptyString(enumerationInstance.UNKNOWN)) {
        enumerationInstance.UNKNOWN = 'UNKNOWN';
    }
    if (!window.ezApi.ezIsFunction(enumerationInstance.ezFromValue)) {
        enumerationInstance.ezFromValue = function(enumValue) {
            return window.ezApi.ezGetJSONObjectPropertyValueOrDefault(enumValue, enumerationInstance.UNKNOWN);
        };
    }

    return window.ezApi.enums[enumerationName];
};

/**
 * @public
 * Registers a new enumeration instance. Calls new on the provided EnumerationReference.
 *
 * Will add the UNKNOWN enum value if it is not already on the enumeration.
 * Will add the ezFromValue function if not already implemented on the provided enumeration instance.
 *
 * Example:
 *      function MyEnumeration() {
 *          ENUM_VALUE_1 = 'enumValue1';
 *          ENUM_EVALUE_2 = 'enumValue2';
 *      }
 *      document.addEventListener('onEzApiReady', function() { window.ezApi.ezRegisterNewEnum(MyEnumeration); });
 *
 * @param {Function} EnumerationReference
 * @param {String} enumName
 *
 * @returns {Object}
 *
 * Returns the registered enumeration instance
 */
EzApi.prototype.ezRegisterNewEnum = function(EnumerationReference, enumName) {
    if (!window.ezApi.ezIsFunction(EnumerationReference)) {
        throw ezApi.ezBadParam('EnumerationReference', 'EzApi', 'ezRegisterNewEnum');
    }

    var enumInstance = new EnumerationReference();

    if (window.ezApi.ezIsEmptyString(enumInstance.ENUM_NAME)) {
        if (ezApi.ezIsNotEmptyString(enumName)) {
            enumInstance.ENUM_NAME = enumName;
        } else if (ezApi.ezIsValid(enumInstance.constructor.name)) {
            try {
                enumInstance.ENUM_NAME = enumInstance.constructor.name;
            } catch (err) {
                window.ezApi.ezLogError('EzApi.ezRegisterNewEnum: Unable to register a new enumeration. ' +
                    'Encounted an unexpected error during the attempt to discover the name of the enumeration ' +
                    'from {enumInstance}.constructor.name. Error: ' + err.message);
                throw (err);
            }
        }
    }

    return window.ezApi.ezStoreEnum(enumInstance.ENUM_NAME, enumInstance);
};

/**
 * @private
 * Adds the UNKNOWN enum value to the provided enumeration (if not already present).
 * Adds the ezFromValue function to the provided enumerationInstance if not already available.
 * Adds the ezAsSet function to the provided enumeraionInstance if not already available.
 * Finally, stores enumerationInstance within ezApi.enums with the provided enumberationName.
 *
 * @param {String} enumerationName
 * @param {Object} enumerationInstance
 *
 * @return {Object}
 */
EzApi.prototype.ezStoreEnum = function(enumerationName, enumerationInstance) {
    if (window.ezApi.ezIsEmptyString(enumerationName)) {
        throw window.ezApi.ezBadParam('enumerationName', 'EzApi', 'ezStoreEnum');
    }
    if (window.ezApi.ezIsNotValid(enumerationInstance)) {
        throw window.ezApi.ezBadParam('enumerationInstance', 'EzApi', 'ezStoreEnum');
    }

    // Store the enumeration instance in ezApi
    window.ezApi.enums[enumerationName] = enumerationInstance;

    // Add the common properties
    if (window.ezApi.ezIsEmptyString(enumerationInstance.UNKNOWN)) {
        enumerationInstance.UNKNOWN = 'UNKNOWN';
    }

    // Add the common methods
    if (!window.ezApi.ezIsFunction(enumerationInstance.getClass)) {
        enumerationInstance.ezGetClass = function() {
            return enumerationInstance.constructor;
        };
    }
    if (!window.ezApi.ezIsFunction(enumerationInstance.toString)) {
        enumerationInstance.ezToString = function() {
            return '[' + enumerationInstance.ezGetClass().name + ']';
        };
    }
    if (window.ezApi.ezIsNotFunction(enumerationInstance.ezFromValue)) {
        enumerationInstance.ezFromValue = function(enumValue) {
            if (window.ezApi.ezIsEmptyString(enumValue)) {
                return enumerationInstance.UNKNOWN;
            }
            if (window.ezApi.ezHasOwnProperty(this, enumValue)) {
                return enumerationInstance[enumValue];
            }

            var keys = Object.keys(this);
            for (var index in keys) {
                var enumKey = keys[index];
                if (enumKey !== 'ENUM_NAME' && enumerationInstance[enumKey] === enumValue) {
                    return enumerationInstance[enumKey];
                }
            }
            return enumerationInstance.UNKNOWN;
        };
    }
    if (window.ezApi.ezIsNotFunction(enumerationInstance.ezAsSet)) {
        enumerationInstance.ezAsSet = function() {
            var aSet = new Set();
            for (var x = 0; x < arguments.length; x++) {
                aSet.add(enumerationInstance.ezFromValue(arguments[x]));
            }
            return aSet;
        };
    }

    // Return the stored instance
    return window.ezApi.enums[enumerationName];
};

/**
 * @public
 * Register an api with the EzApi system.
 *
 * @param {String} apiName
 * @param {Object} apiInstance
 *
 * @returns {Object}
 * Returns the Api instance that is provided
 */
EzApi.prototype.ezRegisterApi = function(apiName, apiInstance, apiClass) {
    if (window.ezApi.ezIsEmptyString(apiName)) {
        throw window.ezApi.ezBadParam('apiName', 'EzApi', 'ezRegisterApi');
    }
    if (window.ezApi.ezIsNotValid(apiInstance)) {
        throw window.ezApi.ezBadParam('apiInstance', 'EzApi', 'ezRegisterApi');
    }

    if (window.ezApi.ezIsValid(window.ezApi.ezclocker[apiName])) {
        if (window.ezApi.ezIsTrue(window.ezApi.ezDebugMode)) {
            window.ezApi.ezLogError('EzApi: The api named "' + apiName + '" is already registered.' +
                'Do not register an api with the same name or more than once.' +
                'Multiple registrations indicate a defect, duplicate api names, or duplicate imports of dependencies.');
        } else {
            window.ezApi.ezLogWarn('EzApi: Replacing already registered api "' + apiName + '". with another instance.');
        }
        window.ezApi.ezclocker[apiName] = apiInstance;
        window.ezApi.ezLogDebug('EzApi: Replaced existing registration of api "' + apiName + '".');
    } else {
        window.ezApi.ezclocker[apiName] = apiInstance;
        window.ezApi.ezLogDebug('EzApi: Registered api with name=' + apiName + '.');
    }

    var typeName = null;
    if (window.ezApi.ezIsValid(apiClass)) {
        typeName = apiClass.constructor.name;
    } else if (window.ezApi.ezJsonObjectHasProperty(apiInstance, 'CLASS_NAME')) {
        typeName = apiInstance.CLASS_NAME;
    } else {
        typeName = apiName.replace(apiName.charAt(0), apiName.charAt(0).toUpperCase());
    }

    if (window.ezApi.ezIsNotEmptyString(typeName)) {
        // Apply common helper functions to the instance...
        apiInstance.toString = function() {
            return '[object ' + typeName + ']';
        };
    }

    return window.ezApi.ezclocker[apiName];
};

/**
 * @public
 * Registers a new api instance from the provided class. Calls the objects ezInit() method if it exists. Returns the
 * new api instance.
 *
 * @param {class} apiClass
 * @param {string} apiName
 *
 * @returns {object}
 */
EzApi.prototype.ezRegisterNewApi = function(apiClass, apiName) {
    if (window.ezApi.ezIsNotValid(apiClass)) {
        throw window.ezApi.ezBadParam('apiClass', 'EzApi', 'ezRegisterNewApi');
    }

    if (ezApi.ezIsEmptyString(apiName)) {
        try {
            if (ezApi.ezIsValid(apiClass.prototype.constructor.name)) {
                apiName = apiClass.prototype.constructor.name;
            } else {
                // Try to guess the old fashion way...
                var result = /^function\s+([\w\$]+)\s*\(/.exec(apiClass.toString());
                apiName = result
                    ? result[1]
                    : '';
            }
        } catch (instanceNameError) {
            window.ezApi.ezLogError('EzApi: Unable to determine the api instance name to use' +
                ' from the provided api class/constructor ' + apiClass.name + '. Reason: ' +
                instanceNameError.name + ': ' + instanceNameError.message + '.');
            throw (instanceNameError);
        }

        if (ezApi.ezIsEmptyString(apiName)) {
            ezApi.ezclocker.logger.error(
                'Unable to determine the name from the constructor of an API class. Registration cannot continue.');
            return null;
        }
        apiName = apiName.replace(apiName.charAt(0), apiName.charAt(0).toLowerCase());
    }

    var apiInstance;
    try {
        apiInstance = new apiClass.prototype.constructor();
        apiInstance.toString = function() {
            return '[object ' + apiClass.prototype.constructor.name + ']';
        };
    } catch (constructError) {
        window.ezApi.ezLogError('Creation of new instance of ' + apiClass.name + ' failed. Reasy: ' +
            constructError.name + ': ' + constructError.message + '.');
        throw (constructError);
    }

    if (window.ezApi.ezHasOwnProperty(window.ezApi.ezclocker, apiName)) {
        if (window.ezApi.ezIsTrue(window.ezApi.ezDebugMode)) {
            window.ezApi.ezLogError('EzApi: The api named "' + apiName + '" is already registered.' +
                'Do not register an api with the same name or more than once.' +
                'Multiple registrations indicate a defect, duplicate api names, or duplicate imports of dependencies.');
        } else {
            window.ezApi.ezLogWarn('EzApi: Replacing already registered api "' + apiName + '". with another instance.');
        }
        window.ezApi.ezLogDebug('EzApi: Replaced existing registration of api "' + apiName + '".');
    }
    window.ezApi.ezclocker[apiName] = apiInstance;

    if (window.ezApi.ezIsFunction(apiInstance.ezInit)) {
        try {
            apiInstance.ezInit();
        } catch (initError) {
            window.ezApi.ezLogError('EzApi: Initialization of api "' + apiName + '" from the provided api ' +
                'class/constructor "' + apiClass.name + '" failed.');
            throw (initError);
        }
    } else if (window.ezApi.ezIsTrue(window.ezApi.ezDebugMode)) {
        window.ezApi.ezLogWarn('[ezClocker API]: Api with apiName=' + apiName +
            ' did not provide an ezInit method. No initialization was performed.');
    }

    // Forward along the debug flag
    window.ezApi.ezclocker[apiName].ezDebugMode = window.ezApi.ezDebugMode;
    return window.ezApi.ezclocker[apiName];
};

/**
 * @public
 * Unregisters an api from ezApi (if it exists)
 *
 * @returns {Boolean}
 * True if the API was unregisterd, false otherwise
 */
EzApi.prototype.ezUnRegisterApi = function(apiName) {
    if (window.ezApi.ezIsEmptyString(apiName)) {
        throw window.ezApi.ezBadParam('apiName', 'EzApi', 'ezUnRegisterApi');
    }

    if (window.ezApi.ezIsNotValid(window.ezApi.ezclocker[apiName])) {
        if (window.ezApi.ezIsTrue(window.ezApi.ezDebugMode)) {
            window.ezApi.ezLogError('EzApi: No need to unregister the api with name=' + apiName +
                ' because it is not registerd with window.ezApi.');
        }
        return false;
    }

    try {
        delete window.ezApi.ezclocker[apiName];
        window.ezApi.ezLogDebug('EzApi: Unregistered api ' + apiName + '.');
        return true;
    } catch (err) {
        window.ezApi.ezLogDebug('EzApi: Unregistration of api with name=' + apiName + ' failed. Reason: ' +
            err.name + ': ' + err.message);
        throw (err);
    }
};

/**
 * @public
 * Registers thewindow.ezApi as a global (root level) api. Avoid registering an Api on on the window if possible.
 * @param {String} apiName
 * Name of the API object
 * @param {Object} apiInstance
 * Instance of the API object
 * @returns {Object}
 * Returns the api instance provided
 */
EzApi.prototype.ezRegisterWindow = function(apiName, apiInstance) {
    if (window.ezApi.ezIsEmptyString(apiName)) {
        throw window.ezApi.ezBadParam('apiName', 'EzApi', 'ezRegisterWindow');
    }
    if (window.ezApi.ezIsNotValid(apiInstance)) {
        throw window.ezApi.ezBadParam('apiInstance', 'EzApi', 'ezRegisterWindow');
    }

    // Window level API is NOT uppercase
    window[apiName] = apiInstance;
    return window[apiName];
};

/**
 * @public
 * Determines if an api exists in the EzApi system.
 *
 * @param {String} apiName
 *
 * @returns {Boolean}
 */
EzApi.prototype.ezApiExist = function(apiName) {
    if (window.ezApi.ezIsEmptyString(apiName)) {
        return false;
    }

    if (!window.ezApi.ezHasOwnProperty(window.ezApi.ezclocker, apiName)) {
        return false;
    }

    var theApi = window.ezApi.ezclocker[apiName];
    if (window.ezApi.ezIsNotValid(theApi)) {
        if (!window.ezApi.ezHasOwnProperty(window, apiName)) {
            return false;
        }
        theApi = window[apiName];
    }

    return ezApi.ezIsValid(theApi);
};

/**
 * @public
 * Registers a global categorized event for the owner
 *
 * If eventOwnerName OR eventName is empty or null the event will NOT register and the return is null.
 *
 * If the eventCategory is not provided, then onEvent is used.
 *
 * @param {String} eventOwnerName
 * @param {String|null} eventCategory
 * The eventCategory value is transformed to camel case when registering and can only be one of the following values:
 * onReady, onClick, onValidate, onShow, onClose, onCancel, onRefresh, onSuccess, onFailure,
 * or onEvent (the default category)
 * @param {String} eventName
 *
 * @returns {String|null}
 * Returns the event's registration name: {eventOwnerName}.{eventCategory}
 *
 * @deprecated Migrate to ezApi.ezEventEngine events.
 */
EzApi.prototype.ezRegisterGlobalEvent = function(eventOwnerName, eventCategory, eventName) {
    if (window.ezApi.ezIsEmptyString(eventOwnerName) || window.ezApi.ezIsEmptyString(eventName)) {
        throw window.ezApi.ezBadParam('eventOwnerName', 'EzApi', 'ezRegisterGlobalEvent');
    }

    var useEventCategory = window.ezApi.ezIsNotEmptyString(eventCategory)
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
            if (window.ezApi.ezIsTrue(window.ezApi.ezDebugMode)) {
                window.ezApi.ezLogWarn('EzApi: Detected an unknown event category of ' + useEventCategory +
                    ' for eventName=' + eventName + ' and eventOwner=' + eventOwnerName +
                    '. Will use the default category of "onEvent" as a fallback.');
            }
            useEventCategory = 'onEvent';
            break;
    }

    var eventRegName = eventOwnerName + '.' + useEventCategory;
    window.ezApi.ezLogDebug('EzApi: Registered global event: ' + eventRegName + '=' + eventName);

    if (window.ezApi.ezIsNotEmptyArray(window.ezApi.events)) {
        window.ezApi.events[eventRegName].push(eventName);
    } else {
        window.ezApi.events[eventRegName] = [];
        window.ezApi.events[eventRegName].push(eventName);
    }

    return eventRegName + '.' + eventName;
};

/**
 * @public
 * Generates an ezClocker objectid in the format:
 *
 * 'EzId' + new Date().getTime()
 *
 * @returns {String}
 */
EzApi.prototype.ezGenerateObjectId = function() {
    return 'EzId' + new Date().getTime();
};

/**
 * @deprecated Use ez-date-time.js module instead.
 *
 * @public
 * Returns the UTC offset for the local time zone
 */
EzApi.prototype.getLocalUTCOffset = function() {
    if (window.ezApi.ezIsValid(moment)) {
        return moment.tz(self.ezGetPreferredTimeZone()).utcOffset();
    }

    var offset = new Date().getTimezoneOffset();
    var minutes = Math.abs(offset);
    var hours = Math.floor(minutes / 60);
    var prefix = offset < 0 ? '+' : '-';

    return prefix + hours;
};

/**
 * @public
 * Returns the local browser timezone id - if possible
 */
EzApi.prototype.getLocalTimeZoneId = function() {
    if (window.ezApi.ezIsValid(moment) && window.ezApi.ezIsValid(moment.tz)) {
        return moment.tz.guess();
    }
    if (window.ezApi.ezIsValid(jstz)) {
        jstz.determine().name();
    }
    return 'UTC';
};

/**
 * @public
 * Creates a timestamp with optional prefix and suffix text in the format:
 *
 * {prefix-}YYYY.MM.kk.mm{-suffix}
 */
EzApi.prototype.ezCreateTimeStamp = function(prefix, suffix) {
    var pre = window.ezApi.ezIsNotEmptyString(prefix) ? prefix + '-' : '';
    var suf = window.ezApi.ezIsNotEmptyString(suffix) ? '-' + suffix : '';
    return pre + moment.tz(window.ezApi.ezGetPreferredTimezone()).format('YYYY.MM.kk.mm') + suf;
};

/**
 * @public
 * Gets the user's preferred timezone
 * @returns {String}
 * User's preferred timezone
 */
EzApi.prototype.ezGetPreferredTimeZone = function() {
    var self = window.ezApi;
    if (self.ezIsEmptyString(window.ezApi.ezPreferredTimeZone)) {
        if (self.ezIsValid(moment) && self.isValid(moment.tz)) {
            self.ezPreferredTimeZone = moment.tz.guess(true);
        } else {
            self.ezPreferredTimeZone = new Date().getTimezoneOffset();
        }
    }
    return self.ezPreferredTimeZone;
};

/**
 * @public
 * Converts the item to JSON if it is NOT a string. Otherwise, returns the string.
 *
 * @param {object} item
 *
 * @returns {string|object}
 * JSON string version of the provided item OR the actual value of the item if it cannot convert to json.
 */
EzApi.prototype.ezToJson = function(item, indentValue, htmlDisplay) {
    if (window.ezApi.ezIsString(item)) {
        return item;
    }
    if (window.ezApi.ezIsNotValid(item)) {
        return '{}';
    }

    try {
        if (window.ezApi.ezIsTrue(htmlDisplay)) {
            indentValue = window.ezApi.ezIsValid(indentValue)
                ? indentValue
                : 3;
            var formattedJson = JSON.stringify(item, null, indentValue);
            return '<code style="font:"Lucida Console",Monaco,monospace,"Courier New",Courier;padding:4px;" ' +
                'lang="javascript"><pre>' + formattedJson + '</pre></code>';
        }
        var jsonString = window.ezApi.ezIsValid(indentValue) ?
            JSON.stringify(item, null, indentValue) :
            JSON.stringify(item);
        if (2 === jsonString.length && '{}' === jsonString && '{}' !== item) {
            // Probably not json
            return item;
        }
        return jsonString;
    } catch (ex) {
        window.ezApi.ezLog('Failed to convert "' + item + '" to json.');
        return item;
    }
};

/**
 * @public
 * Returns and JS object created from the provided JSON string
 * @param {String} jsonString
 */
EzApi.prototype.ezFromJson = function(jsonString) {
    if (window.ezApi.ezIsEmptyString(jsonString)) {
        return jsonString;
    }
    try {
        return JSON.parse(jsonString);
    } catch (ex) {
        window.ezApi.ezLog('Failed to convert "' + jsonString + '" to a Javascript object.');
        return jsonString;
    }
};

/**
 * @public
 * Builds a default exception json message (similar to what service would return with)
 *
 * @param {String} errorCode
 * @param {String} message
 * @param {Object} ex
 */
EzApi.prototype.buildJsonError = function(errorCode, message, ex) {
    if (window.ezApi.ezIsValid(ex)) {
        message = window.ezApi.ezIsNotEmptyString(message)
            ? message + ' Error: ' + window.ezApi.toJsonString(ex)
            : ' Error: ' + window.ezApi.toJsonString(ex);
    } else {
        message = window.ezApi.ezIsNotEmptyString(message)
            ? message
            : 'Failed';
    }
    errorCode = window.ezApi.ezIsValid(errorCode) ? errorCode : '500';
    return window.ezApi.buildBasicJsonResponse(errorCode, message);
};

/**
 * @public
 * Builds the basic JSON response object with errorCode = 0
 *
 * @param {String} response
 *
 * @returns {Object}
 *  {
 *      errorCode: '0',
 *      messasge: {response|'Success'}
 *  }
 */
EzApi.prototype.buildBasicJsonResponse = function(response) {
    return {
        errorCode: '0',
        message: window.ezApi.ezIsNotEmptyString(response)
            ? response
            : 'Success'
    };
};

/**
 * @public
 *
 * @param {Number=500} errorCode
 * @param {String='No error message provided.'} errorMessage
 *
 * @returns {Object}
 *  {
 *      errorCode: {errorCode|500}
 *      message: {errorMessage|'No error message provided.'}
 *  }
 */
EzApi.prototype.ezBuildEzClockerErrorResponse = function(errorCode, errorMessage) {
    return {
        'errorCode': window.ezApi.ezIsNumber(errorCode)
            ? errorCode
            : 500,
        'message': window.ezApi.ezIsEmptyString(errorMessage)
            ? 'No error message provided.'
            : errorMessage
    };
};

/**
 * @public
 * Returns the passed item as a json string. If the item is already a string, the string is simply reflected back
 * as is.
 * @param {*} jsonItem
 */
EzApi.prototype.gJsonString = function(jsonItem) {
    return window.ezApi.toJsonString(jsonItem);
};

/**
 * @public
 * Returns a Javascript object jsonItem is a json string. Otherwise, returns the object as is.
 */
EzApi.prototype.gJsonObject = function(jsonItem) {
    return window.ezApi.fromJsonString(jsonItem);
};

/**
 * @public
 * Adds the key property with value to the provided jsonObject. If jsonObject is null an empty json object is used.
 *
 * @param {Object} jsonObject
 * @param {String} key
 * @param {*} value
 */
EzApi.prototype.ezAddJsonProp = function(jsonObject, key, value) {
    jsonObject = window.ezApi.ezIsValid(jsonObject)
        ? jsonObject
        : {};

    if (window.ezApi.ezIsEmptyString(key)) {
        return jsonObject;
    }

    jsonObject[key] = window.ezApi.ezIsValid(value)
        ? value
        : '';

    return jsonObject;
};

/**
 * @public
 * If condition is true, then result of aCallback() is returned. Otherwise, the result of bCallback() is returned. If
 * the calling callback is null, null is returned.
 * @param {Boolean} condition
 * @param {Function} aCallback
 * @param {Function} bCallback
 */
EzApi.prototype.callAelseB = function(condition, aCallback, bCallback) {
    if (window.ezApi.ezIsTrue(condition)) {
        if (window.ezApi.ezIsFunction(aCallback)) {
            return aCallback();
        }
    } else if (window.ezApi.ezIsFunction(bCallback)) {
        return bCallback();
    }
    return null;
};

/**
 * @public
 * Wrapps up $('#' + id) jquery syntax and allows for caching of the references
 * Always assumes single id passed!
 *
 * @param {String} id
 *
 * @deprecated Use ezUi.ezId()
 */
EzApi.prototype.ez = function(id) {
    return $('#' + id);
};

/**
 * @public
 * Alternate wrapper for jquery $(#..) calls
 * Always assumes single id passed!
 *
 * @param {String} id
 *
 * @deprecated Use ezUi.ezId()
 */
EzApi.prototype.ezId = function(id) {
    return $('#' + id);
};

/**
 * @public
 * Alternate wrapper for jquery $(#..) calls
 * Always assumes single id passed!
 *
 * @param {String} id
 *
 * @deprecated Use ezUi.ezId()
 */
EzApi.prototype.ezId$ = function(id) {
    return $('#' + id);
};

/**
 * @public
 * Alternate wrapper for $() call
 *
 * @param {String} id
 *
 * @deprecated Use ezUi.ezId()
 */
EzApi.prototype.ez$ = function(jQuerySelector) {
    return $(jQuerySelector);
};

/**
 * @public
 * Alternate wrapper for $() call
 *
 * @param {String} id
 *
 * @deprecated Use ezUi.ezId()
 */
EzApi.prototype.ezJQuery = function(jQuerySelector) {
    return $(jQuerySelector);
};

/**
 * @public
 * Returns the element identified by the provided jQuery selector. If the element does not exist,
 * null is returned instead.
 *
 * @param {String|null} id
 *
 * @deprecated Use ezUi.ezId()
 */
EzApi.prototype.ezEid = function(id) {
    if (window.ezApi.ezIsEmptyString(id)) {
        return null;
    }
    return window.ezApi.ezEid$('#' + id);
};

/**
 * @public
 * Returns the element identified by the provided jQuery selector. If the element does not exist,
 * null is returned instead.
 *
 * @param {String|null} jQuerySelector
 *
 * @deprecated Use ezUi.ezId()
 */
EzApi.prototype.ezEid$ = function(jQuerySelector) {
    if (window.ezApi.ezIsNotValid(jQuerySelector)) {
        return null;
    }
    var element = window.ezApi.ez$(jQuerySelector);
    return window.ezApi.ezIsValid(element) && element.length !== 0 ?
        element :
        null;
};

/**
 * @public
 * Returns the referehce to the document either via $('document') or if no jquery available, then returns
 * the global window.document.
 */
EzApi.prototype.ezDocument = function() {
    return window.ezApi.ezIsValid($) ? $(document) : window.document;
};

/**
 * @public
 * Returns the reference to the document's body. Either returns iva $('body') via jquery, or if no jquery is available
 * returns window.document.body
 */
EzApi.prototype.ezBody = function() {
    return window.ezApi.ezIsValid($) ? $('body') : window.document.body;
};

/**
 * @public
 * Wraps access to the window
 */
EzApi.prototype.ezWindow = function() {
    return window.ezApi.ezIsValid($) ? $(window) : window;
};

/**
 * @public
 * Builds the single auto-closed html tag
 *
 * Code:
 * window.ezApi.tag('br');
 * Output:
 *  <br/>
 *
 * @param {String} tagName
 *
 * @deprecated Migrate to different soluction. Removing in a future release
 */
EzApi.prototype.tag = function(tagName) {
    return '<' + tagName + '/>';
};

/**
 * @public
 * Builds a starting html tag
 *
 * Code:
 * window.ezApi.stag('body');
 * Output:
 *  <body>
 *
 * @param {String} tagName
 *
 * @deprecated Migrate to different soluction. Removing in a future release
 */
EzApi.prototype.stag = function(tagName, params) {
    var htmlTag = '<' + tagName;
    if (window.ezApi.ezIsValid(params)) {
        Object.keys(params).forEach(function(key) {
            var value = window.ezApi.ezString(params[key], key);
            if (window.ezApi.ezIsNotEmptyString(value)) {
                htmlTag += ' ' + key + '="' + value + '"';
            } else if (!window.ezApi.isUndefined(value) && window.ezApi.isNull(value)) {
                htmlTag += ' ' + key;
            }
        });
    }
    return htmlTag + '>';
};

/**
 * @public
 * Builds an HTML ending tag.
 *
 * Code:
 * window.ezApi.stag('body') +window.ezApi.etag('body');
 * Output:
 *  <body></body>
 *
 * @param {String} tagName
 *
 * @deprecated Migrate to different soluction. Removing in a future release
 */
EzApi.prototype.etag = function(tagName) {
    return '</' + tagName + '>';
};

/**
 * @public
 * Builds an complete html tag with optional params
 * and content.
 *
 * Code:
 * window.ezApi.htmlTag('a', [{href: 'https://ezclocker.com'}], 'Click');
 * Output:
 *  <a href="https://ezclocker.com">Click</a>
 *
 * @param {String} tagName
 * @param {Object} params
 * @param {String} content
 *
 * @deprecated Migrate to different soluction. Removing in a future release
 */
EzApi.prototype.htmlTag = function(tagName, params, content) {
    var htmlTag = '<' + tagName;
    if (window.ezApi.ezIsValid(params)) {
        Object.keys(params).forEach(function(key) {
            var value = window.ezApi.ezString(params[key], params[key]);
            if (!window.ezApi.isUndefined(value)) {
                if (window.ezApi.ezIsNotEmptyString(value)) {
                    htmlTag += ' ' + key + '="' + value + '"';
                } else if (!window.ezApi.isUndefined(value) && window.ezApi.isNull(value)) {
                    htmlTag += ' ' + key;
                }
            }
        });
    }
    htmlTag += '>';
    if (window.ezApi.ezIsValid(content)) {
        htmlTag += '\n\t' + content + '\n';
    }
    htmlTag += '</' + tagName + '>\n';
    return htmlTag;
};

/**
 * @public
 * Builds an HTML tag param string with leading space.
 *
 * Code:
 *  var link = '<a' +window.ezApi.tagParam('href', 'https://ezclocker.com') + '>Click</a>';
 * Produces:
 *  <a href="https://ezclocker.com">Click</a>
 *
 * @param {String} name
 * @param {String} value
 *
 * @deprecated Migrate to different soluction. Removing in a future release
 */
EzApi.prototype.tagProp = function(propName, propValue) {
    return ' ' + propName + '="' + propValue + '"';
};

/**
 * @public
 * Appends the subpath to the provided url:
 *
 * Example:
 *
 * url: https://ezclocker.com
 * subPath: /public/signin.html
 *
 * result: https://ezclocker.com/public/signin.html
 *
 * @param {String} url
 * @param {String} subPath
 *
 * @deprecated Migrate to different soluction. Removing in a future release
 */
EzApi.prototype.urlAppend = function(url) {
    var newUrl = url;
    var pathSeparator = window.ezApi.ezIsEmptyString(url) && url.charAt(url.length - 1) === '/' ? '' : '/';
    for (var ai = 1; ai < arguments.length; ai++) {
        var value = window.ezApi.ezString(arguments[ai], arguments[ai]);
        if (window.ezApi.ezIsNotEmptyString(value)) {
            newUrl += pathSeparator + value;
        }
    }
    return newUrl;
};

/**
 * @public
 * Builds an api path from the items in the array. Appends the '/' after each item.
 *
 * @param {array} pathParts
 *
 * @deprecated Migrate to different soluction. Removing in a future release
 */
EzApi.prototype.buildApiPath = function(pathParts) {
    var apiPath = '';
    for (var x = 0; x < pathParts.length; x++) {
        apiPath += pathParts[x] + '/';
    }
    return apiPath;
};

/**
 * @public
 * Wraps on event hooks with promise return
 *
 * @param {String} eventName
 *
 * @deprecated Migrate to ezUi.ezHookElementEvent()
 */
EzApi.prototype.ezOn = function(eventName) {
    if (window.ezApi.ezIsNotValid(eventName)) {
        return null;
    }
    if (window.ezApi.ezIsValid($)) {
        return window.ezApi.ezPromise(function(resolve) {
            $(window).on(eventName, resolve);
        });
    }
    return window.ezApi.ezPromise(function(resolve) {
        window.addEventListener(eventName, resolve);
    });
};

/**
 * @public
 * Uses the jquery.html() function to set the HTML contents of the item associated with the provided id
 *
 * @param {String} id
 * @param {String} html
 *
 * @deprecated Migrate to ezUi.ezSetContent()
 */
EzApi.prototype.ezHtml = function(id, html) {
    window.ezApi.ez(id).html(html);
};

/**
 * @public
 * Uses the jquery.html() function to set the HTML contents of the item associated with the provided id
 *
 * @param {String} id
 * @param {String} html
 *
 * @deprecated Migrate to ezUi.ezClearContent()
 */
EzApi.prototype.ezClearHtml = function(id) {
    window.ezApi.ez(id).html('');
};

/**
 * @public
 * Wraps the creation of html via jquery
 *
 * @param {String} htmlString
 */
EzApi.prototype.newHtml = function(htmlString) {
    return window.ezApi.ezIsEmptyArray(htmlString)
        ? null
        : $(htmlString);
};

/**
 * @public
 * Returns type information from Object.prototype.toString.call(aObject);
 *
 * Result format:
 * [object {type}]
 *
 * @param {*} aObject
 *
 * @returns {String}
 */
EzApi.prototype.ezGetObjectType = function(aObject) {
    return Object.prototype.toString.call(aObject);
};

/**
 * @public
 * Determines if the provided item is 'undefined'
 *
 * @param {*} item
 *
 * @returns {Boolean}
 */
EzApi.prototype.ezIsUndefined = function(item) {
    return undefined === item || 'undefined' === typeof item;
};

/**
 * @public
 * Determines if the provided image is null.
 *
 * @param {*} item
 *
 * @returns {Boolean}
 */
EzApi.prototype.ezIsNull = function(item) {
    return null == item;
};

/**
 * @public
 * Determines if the provided item is an object type.
 *
 * @returns {Boolean}
 */
EzApi.prototype.ezIsObject = function(item) {
    return undefined !== item && null !== item && 'object' === typeof item;
};

/**
 * @public
 * Determiens if the provided item is not null AND not 'undefined'.
 *
 * @param {*} item
 *
 * @returns {Boolean}
 */
EzApi.prototype.ezIsValid = function(item) {
    return undefined !== item && null !== item && 'undefined' !== typeof item;
};

/**
 * @public
 * Determines if the provided item is null OR 'undefined'
 *
 * @param {*} item
 *
 * @returns {Boolean}
 */
EzApi.prototype.ezIsNotValid = function(item) {
    return undefined === item || null === item || 'undefined' === typeof item;
};

/**
 * @public
 * Evaluates all the provided arguments (if any) to be valid
 *
 * @returns {Boolean}
 */
EzApi.prototype.ezAllValid = function() {
    for (var aIndex in arguments) {
        if (window.ezApi.ezIsNotValid(arguments[aIndex])) {
            return false;
        }
    }
    return true;
};

/**
 * @public
 * Determines if any of the passed arguments are not valid
 *
 * @returns {Boolean}
 */
EzApi.prototype.ezAnyNotValid = function() {
    for (var aIndex in arguments) {
        if (window.ezApi.ezIsNotValid(arguments[aIndex])) {
            return true;
        }
    }
    return false;
};

/**
 * @public
 * Determines if the provided aObject is a string type
 *
 * @param {*} aObject
 *
 * @returns {Boolean}
 */
EzApi.prototype.ezIsString = function(aObject) {
    return undefined !== aObject && null !== aObject && 'string' === typeof aObject;
};

/**
 * @public
 * Returns the provdied aString if it is a valid string. Otherwise, returns an empty string.
 *
 * @param {*} aString
 *
 * @returns {String}
 */
EzApi.prototype.ezStringOrEmpty = function(aString) {
    return undefined !== aString && null !== aString && 'string' === typeof aString
        ? aString
        : '';
};

/**
 * @public
 * Removes all extract space from the provided aTemplateLitteralValue param. Then returns
 * the value with one space in front, once space at end and a line feed.
 *
 * Result template: ' ${value_with_extra_space_removed} \n';
 *
 * @param {String} aTemplateLitteralValue
 *
 * @returns {String}
 */
EzApi.prototype.ezTemplate = function(aStrings, ...aKeys) {
    var cleanValues = '';

    if (ezApi.ezArrayHasLength(aStrings)) {
        for (var x = 0; x < aStrings.length; x++) {
            var aString = aStrings[x];
            var aKey = x < aKeys.length
                ? aKeys[x]
                : '';
            var cleanValue = aString.trimStart().replace(/( {2})+/g, ' ');
            var cleanLine = `${cleanValue}${aKey}`;
            cleanValues = `${cleanValues}${cleanLine}`;
        }
    }

    return ` ${cleanValues} \n`;
};

/**
 * @public
 * Returns the provdied aString if it is a valid string. Otherwise, returns an empty string.
 *
 * @param {*} aString
 *
 * @returns {String}
 */
EzApi.prototype.ezStringOrDefault = function(aString, aDefault) {
    return undefined !== aString && null !== aString && 'string' === typeof aString
        ? aString
        : aDefault;
};

/**
 * @public
 * Determines if the value passed is a string
 *
 * @param {*} value
 *
 * @returns {Boolean}
 *
 * @deprecated Migrate to ezApi.ezIsString()
 */
EzApi.prototype.isStringType = function(aObject) {
    return window.ezApi.ezIsString(aObject);
};

/**
 * @public
 * Determines if the passed object is an actual moment.js object or not.
 *
 * @param {*} aObject
 *
 * @returns {Boolean}
 */
EzApi.prototype.ezIsMoment = function(aObject) {
    return undefined !== aObject && null !== aObject && 'undefined' !== typeof object && moment(aObject).isValid();
};

/**
 * @public
 * Determines if the passed array is not undefined, not null, and has a length greater than zero
 *
 * @param {*} aArray
 *
 * @returns {Boolean}
 */
EzApi.prototype.ezIsEmptyArray = function(aArray) {
    return undefined === aArray || null === aArray ||
        ('[object Array]' === window.ezApi.ezGetObjectType(aArray) && 0 === aArray.length);
};

/**
 * @public
 * Determines if the passed array is not undefined, not null, and has a length greater than zero
 *
 * @param {*} aArray
 *
 * @returns {Boolean}
 */
EzApi.prototype.ezIsNotArrayOrEmptyArray = function(aArray) {
    return undefined === aArray || null === aArray ||
        '[object Array]' !== window.ezApi.ezGetObjectType(aArray) ||
        0 === aArray.length;
};

/**
 * @public
 * Determines if the passed array is not undefined, not null, and has a length greater than zero
 *
 * @param {*} aArray
 *
 * @returns {Boolean}
 */
EzApi.prototype.ezIsNotEmptyArray = function(aArray) {
    return undefined !== aArray && null !== aArray &&
        '[object Array]' === window.ezApi.ezGetObjectType(aArray) && 0 !== aArray.length;
};

/**
 * @public
 * Determines if the passed aArray is not undefined, not null, and has a length greater than zero
 *
 * @param {*} aArray
 *
 * @returns {Boolean}
 */
EzApi.prototype.ezArrayHasLength = function(aArray) {
    return undefined !== aArray && null !== aArray &&
        '[object Array]' === window.ezApi.ezGetObjectType(aArray) && 0 !== aArray.length;
};

/**
 * @public
 * Determines if the passed array is not undefined, not null, and has a length greater than zero
 *
 * @param {*} aArray
 *
 * @returns {Boolean}
 */
EzApi.prototype.ezIsNotEmptyArray = function(aArray) {
    return undefined !== aArray && null !== aArray &&
        '[object Array]' === window.ezApi.ezGetObjectType(aArray) && 0 !== aArray.length;
};

/**
 * @public
 * Determines if the passed object is an array or not.
 *
 * @param {*} aArray
 *
 * @returns {Boolean}
 */
EzApi.prototype.ezIsArray = function(aArray) {
    return undefined !== aArray && null !== aArray && '[object Array]' === window.ezApi.ezGetObjectType(aArray);
};

/**
 * @public
 * Returns the provided aArray if it is a valid array. Otherwise, returns an empty array.
 *
 * @param {*} aArray
 *
 * @returns {Array}
 */
EzApi.prototype.ezArrayOrEmpty = function(aArray) {
    return undefined !== aArray && null !== aArray && '[object Array]' === window.ezApi.ezGetObjectType(aArray)
        ? aArray
        : [];
};

/**
 * @public
 * Determines if the passed object is a number type.
 *
 * @param {*} aObject
 *
 * @returns {Boolean}
 */
EzApi.prototype.ezIsNumber = function(aObject) {
    return undefined !== aObject && null !== aObject && 'number' === typeof aObject;
};

/**
 * @public
 * Returns the provided aNumber if it is a valid number, Otherwise, returns the provided aDefault value.
 *
 * @param {*} aNumber
 * @param {Number|null} aDefault
 *
 * @returns {Number|{aDefault}}
 */
EzApi.prototype.ezNumberOrDefault = function(aNumber, aDefault) {
    return undefined !== aNumber && null !== aNumber &&
        ('number' === typeof aNumber || '[object Number]' === window.ezApi.ezGetObjectType(aNumber))
        ? aNumber
        : aDefault;
};

/**
 * @public
 * Determines if the passed object is NOT a number type.
 *
 * @param {*} aObject
 */
EzApi.prototype.ezIsNotNumber = function(aObject) {
    return undefined === aObject && null === aObject ||
        ('number' !== typeof aObject && '[object Number]' !== window.ezApi.ezGetObjectType(aObject));
};

/**
 * @public
 * Converts a string value to a Javascript number (using parseInt)
 *
 * @param {String} stringValue
 * @param {Number} [radix]
 * Optional radix value for parseInt
 *
 * @returns {Number}
 * Note that if the value cannot be converted, NaN is returned.
 */
EzApi.prototype.ezToNumber = function(stringValue, radix) {
    if (window.ezApi.ezIsEmptyString(stringValue)) {
        return 0; // fall to zero if the string value is null, empty, or undefined
    }

    return parseInt(stringValue, radix);
};

/**
 * @public
 * Determines if the provided aNumber param is within the given range.
 *
 * If aNumber is not a valid number, false is returned.
 * 
 * If aMinNumber is not provided, it is assumed equal to aNumber. 
 * If aMaxNumber is not provided, it is assumed equal to aNumber. 
 * If aMinNumber is greater than aMaxNumber, throws exception
 * If aMaxNumber is less than a aMinNumber, throws exception 
 *
 * @param {Number} aNumber
 * @param {Number} aMinNumber
 * @param {Number} aMaxNumber
 *
 * @returns {Boolean}
 * Returns true if the following is true:
 *  1) aNumber is >= aMinNumber
 *  2) aNumber <= aMaxNumber 
 */
EzApi.prototype.ezNumberWithinRange = function(aNumber, aMinNumber, aMaxNumber) {
    if (aMinNumber > aMaxNumber) {
        throw window.ezApi.ezBadParam('aMinNumber', 'EzApi', 'ezNumberBetweenRange');
    }

    if (undefined === aNumber || null === aNumber ||
        ('number' !== typeof aNumber && '[object Number]' !== window.ezApi.ezGetObjectType(aNumber))) {
        // Not a number
        return false;
    }

    return aNumber >= window.ezApi.ezNumberOrDefault(aMinNumber, aNumber) &&
        aNumber <= window.ezApi.ezNumberOrDefault(aMaxNumber, aNumber);
};

/**
 * @public
 * Determines if the provided aNumber param is between the aStartNumber and aEndNumber range.
 *
 * If aNumber is not a valid number, false is returned.
 * 
 * If aEndNumber is not provided, it is assumed equal to aNumber - 1. 
 * If aStartNumber is not provided, it is assumed equal to aNumber + 1.
 * If aStartNumber is greater than aEndNumber, throws exception
 * If aEndNumber is less than a aStartNumber, throws exception 
 *
 * @param {Number} aNumber
 * @param {Number} aStartNumber
 * @param {Number} aEndNumber
 *
 * @returns {Boolean}
 * Returns true if the following is true:
 *  1) aNumber is > aStartNumber
 *  2) aNumber is < aEndNumber 
 */
EzApi.prototype.ezNumberBetweenRange = function(aNumber, aStartNumber, aEndNumber) {
    if (undefined === aStartNumber || null === aStartNumber) {
        throw window.ezApi.ezBadParam('aStartNumber', 'EzApi', 'ezNumberBetweenRange');
    }
    if (undefined === aEndNumber || null == aEndNumber) {
        aEndNumber = aStartNumber;
    }
    if (aStartNumber > aEndNumber) {
        throw window.ezApi.ezBadParam('aStartNumber', 'EzApi', 'ezNumberBetweenRange');
    }

    if (undefined === aNumber || null === aNumber ||
        ('number' !== typeof aNumber && '[object Number]' !== window.ezApi.ezGetObjectType(aNumber))) {
        // Not a number
        return false;
    }

    return aNumber > window.ezApi.ezNumberOrDefault(aStartNumber, aNumber - 1) &&
        aNumber < window.ezApi.ezNumberOrDefault(aEndNumber, aNumber + 1);
};

/**
 * @public
 * Determines if the passed object is a boolean type.
 *
 * @param {*} aObject
 *
 * @returns {Boolean}
 */
EzApi.prototype.ezIsBoolean = function(aObject) {
    return undefined !== aObject && null !== aObject &&
        ('boolean' === typeof aObject || '[object Boolean]' === window.ezApi.ezGetObjectType(aObject));
};

/**
 * @public
 * Determines if the passed object is NOT boolean type.
 *
 * @param {*} aObject
 *
 * @returns {Boolean}
 */
EzApi.prototype.ezIsNotBoolean = function(aObject) {
    return undefined === aObject || null === aObject ||
        ('boolean' !== typeof aObject && '[object Boolean]' !== window.ezApi.ezGetObjectType(aObject));
};

/**
 * @public
 * Returns true if the boolean value is false. Otherwise, returns false if the value is NOT a boolean at all OR
 * is actually true.
 *
 * @param {Boolean} aValue
 *
 * @returns {Boolean}
 */
EzApi.prototype.ezIsFalse = function(aValue) {
    return undefined !== aValue && null !== aValue &&
        ('boolean' === typeof aValue || '[object Boolean]' === window.ezApi.ezGetObjectType(aValue)) &&
        false === aValue;
};

/**
 * @public
 * Returns true if the boolean value is true. Otherwise, returns false if the value is NOT a boolean at all OR
 * is actually false.
 *
 * @param {Boolean} aValue
 *
 * @returns {Boolean}
 *
 * @deprecated Migrate to ezApi.ezIsTrue()
 */
EzApi.prototype.isTrue = function(aValue) {
    return window.ezApi.ezIsTrue(aValue);
};

/**
 * @public
 * Returns true if the boolean value is true. Otherwise, returns false if the value is NOT a boolean at all OR
 * is actually false.
 *
 * @param {Boolean} aValue
 *
 * @returns {Boolean}
 */
EzApi.prototype.ezIsTrue = function(aValue) {
    return undefined !== aValue && null !== aValue &&
        ('boolean' === typeof aValue || '[object Boolean]' === window.ezApi.ezGetObjectType(aValue)) &&
        true === aValue;
};

/**
 * @public
 * Returns true if the passed ref is a javascript function
 *
 * @param {Function} aFunction
 *
 * @returns {Boolean}
 */
EzApi.prototype.ezIsFunction = function(aFunction) {
    return undefined !== aFunction && null !== aFunction &&
        ('function' === typeof aFunction || '[object Function]' === window.ezApi.ezGetObjectType(aFunction));
};

/**
 * @public
 * Returns true if the passed ref is a javascript function
 *
 * @param {Function} aFunction
 *
 * @returns {Boolean}
 */
EzApi.prototype.ezIsNotFunction = function(aFunction) {
    return undefined !== aFunction && null === aFunction ||
        ('function' !== typeof aFunction && '[object Function]' !== window.ezApi.ezGetObjectType(aFunction));
};

/**
 * @public
 * Returns the provided item for assignment to a var if the item is valid. Otherwise, the defaultItem is returned for
 * assignment.
 *
 * @param {*} aItem
 * @param {*} aDefaultValue
 *
 * @returns {*}
 *
 * @deprecated Migrate to ezApi.ezAssignOrDefault()
 */
EzApi.prototype.ezReturnValidOrDefault = function(aItem, aDefaultValue) {
    return undefined !== aItem && null !== aItem && 'undefined' !== typeof aItem
        ? aItem
        : aDefaultValue;
};

/**
 * @public
 * Returns the provided value if it is a valid string, otherwise '' string is returned
 *
 * @param {String} aValue
 *
 * @returns {String}
 *
 * @deprecated Migrate to ezApi.ezStringOrEmpty()
 */
EzApi.prototype.ezReturnValidOrEmptyString = function(aValue) {
    return window.ezApi.ezStringOrEmpty(aValue);
};

/**
 * @public
 * Returns the provided item to assign to a variable if the item is valid. Otherwise, null is returned
 *
 * @param {*} item
 *
 * @returns {*|null}
 *
 * @deprecated Migrate to ezApi.ezAssignOrNull()
 */
EzApi.prototype.ezReturnValidOrNull = function(item) {
    return window.ezApi.ezAssignOrNull(item);
};

/**
 * @public
 * Determines if the passed aValue is undefined, null, or has length zero
 *
 * @param {*} aValue
 *
 * @returns {Boolean}
 */
EzApi.prototype.ezIsEmptyString = function(aValue) {
    return undefined === aValue || null === aValue ||
        ('string' !== typeof aValue && '[object String]' !== window.ezApi.ezGetObjectType(aValue)) ||
        0 === aValue.length;
};

/**
 * @public
 * Determines if the passed aValue is a string type AND the length is greater than zero.
 *
 * @param {*} aValue
 *
 * @returns {Boolean}
 */
EzApi.prototype.ezStringHasLength = function(aValue) {
    return undefined !== aValue && null !== aValue &&
        ('string' === typeof aValue || '[object String]' === window.ezApi.ezGetObjectType(aValue)) &&
        0 !== aValue.length;
};

/**
 * @public
 * Determines if the passed aValue is a string type AND the length is greater than zero.
 *
 * @param {*} aValue
 *
 * @returns {Boolean}
 *
 * @deprecated Migrate to ezApi.ezStringHasLength(aValue)
 */
EzApi.prototype.ezIsNotEmptyString = function(aValue) {
    return window.ezApi.ezStringHasLength(aValue);
};

/**
 * @public
 * Returns the aValue as a string.
 * Converts numbers to strings.
 * Returns objects as JSON
 * Returns null/undefined as aDefaultValue
 *
 * @param {*} aValue
 * @param {String|null} aDefaultValue
 *
 * @returns {String}
 */
EzApi.prototype.ezString = function(aValue, aDefaultValue) {
    if (undefined === aValue || null === aValue || 'undefined' === typeof aValue) {
        return aDefaultValue;
    }

    let stringValue = window.ezApi.ezIsNumber(aValue)
        ? window.ezApi.numberToString(aValue)
        : aValue;

    return window.ezApi.ezIsString(aValue)
        ? aValue
        : window.ezApi.ezToJson(stringValue);
};

/**
 * @public
 * Executes Promise.reject passing the provided response.
 * If the response is a string, an error is also logged.
 *
 * @param {Object} response
 *
 * @returns {Promise.reject}
 */
EzApi.prototype.ezReject = function(response) {
    if (window.ezApi.ezIsNotValid(response)) {
        return Promise.reject({
            errorCode: 500,
            message: 'An operation encountered an unexpected error. No additional details available.'
        });
    }

    if (window.ezApi.ezIsNotEmptyString(response)) {
        return Promise.reject({
            errorCode: 500,
            message: response
        });
    }
    return Promise.reject(response);
};

/**
 * @public
 * Executes Promise.reject passing the provided response.
 *
 * @param {String|null} em
 *
 * @returns {Promise.reject}
 */
EzApi.prototype.ezRejectWithError = function(em) {
    return window.ezApi.ezIsEmptyString(errorMessage)
        ? Promise.reject({
            errorCode: 500,
            message: 'An operation encountered an unexpected error.'
        })
        : Promise.reject(em);
};

/**
 * @public
 * Executes Promise.resolve, passing the provided response in the
 * resolve.
 *
 * @param {Object} response
 *
 * @returns {Promise.resolve}
 */
EzApi.prototype.ezResolve = function(response) {
    return Promise.resolve(response);
};

/**
 * @public
 * Wraps the provided function in a promise (only expecting a RESOLVE result)
 *
 * @param {Function} promiseFunction
 *
 * @returns {Promise.resolve}
 */
EzApi.prototype.ezResolver = function(promiseFunction) {
    return !window.ezApi.ezIsFunction(promiseFunction)
        ? Promise.resolve(promiseFunction)
        : window.ezApi.ezPromise(function(resolve) {
            return window.ezApi.ezPromise(promiseFunction)
                .then(resolve, resolve)
                .catch(resolve);
        });
};

/**
 * @public
 * Wraps the provided function in a promise (only expecting a RESOLVE result)
 *
 * @param {Function} promiseFunction
 *
 * @returns {Promise.resolve}
 */
EzApi.prototype.ezRejector = function(promiseFunction) {
    return !window.ezApi.ezIsFunction(promiseFunction)
        ? Promise.reject(promiseFunction)
        : window.ezApi.ezPromise(function(ignored_resolve, reject) {
            return window.ezApi.ezPromise(promiseFunction)
                .then(reject, reject)
                .catch(reject);
        });
};

/**
 * @public
 * Wraps the creation of a promise into thewindow.ezApi
 * @param {Function} promiseFunction
 */
EzApi.prototype.ezPromise = function(promiseFunction) {
    return !window.ezApi.ezIsFunction(promiseFunction)
        ? Promise.resolve(promiseFunction)
        : new Promise(promiseFunction).catch(function(promiseError) {
            var em = 'EzApi.ezPromise execution failed with unhandled exception. ';
            if (ezApi.ezIsValid(promiseError) && ezApi.ezIsNumber(promiseError.errorCode)) {
                // Should get handled in the reject call
                ezApi.ezclocker.logger.debug(em + 'Error: ' + ezApi.ezToJson(promiseError));
            }
            return promiseError;
        });
};

/**
 * @public
 * Provides the method for handling promise rejects with zero processing.
 */
EzApi.prototype.ezIgnoreReject = function() {
    // promise rejection handler, does nothing
};

/**
 * @public
 * Provides the method for handling resolves with zero processing.
 */
EzApi.prototype.ezIgnoreResolve = function() {
    // promise resolve handler, does nothing
};

/**
 * @public
 * Provides a method for ignoring Promise.catch calls.
 */
EzApi.prototype.ezIgnoreCatch = function() {
    // Promise catch handler that does nothing
};

/**
 * @public
 * Trims the provided value or returns null if not a valid string
 *
 * @param {*} value
 */
EzApi.prototype.trimEmptyStringToNull = function(value) {
    if (!window.ezApi.isString(value)) {
        return null;
    }
    var tvalue = value.trim();
    return window.ezApi.ezIsEmptyString(tvalue) ? null : tvalue;
};

/**
 * @public
 * Applies URL decoding to the provided string
 * @param {String} value
 */
EzApi.prototype.ezDecode = function(value) {
    if (window.ezApi.ezIsEmptyString(value)) {
        return value;
    }
    return decodeURIComponent(value);
};

/**
 * @public
 * Applies URL encoding to the provided string
 * @param {String} value
 */
EzApi.prototype.ezEncode = function(value) {
    if (window.ezApi.ezIsEmptyString(value)) {
        return value;
    }
    return encodeURIComponent(value);
};

/**
 * @public
 * Replaces HTML special character with their HTML codes
 *
 * @param {String} value
 *
 * @returns {String}
 */
EzApi.prototype.ezHtmlEncode = function(value) {
    if (window.ezApi.ezIsEmptyString(value)) {
        return '';
    }

    value = value.replace(/&/g, '&amp;'); // &
    value = value.replace(/"/g, '&quot;'); // "
    value = value.replace(/\//g, '&frasl;'); // /
    value = value.replace(/</g, '&lt;'); // <
    value = value.replace(/>/g, '&gt;'); // >
    value = value.replace(/'/g, '&#96;'); // '
    value = value.replace(/@/g, '&#64;'); // @
    value = value.replace(/!/g, '&#33'); // !
    value = value.replace(/=/g, '&#61'); // =
    value = value.replace(/-/g, '&#45'); // =

    return value;
};

/**
 * @public
 * Converts the provided number to a string or returns NAN if not possible
 * @param {Number} num
 * @returns {String}
 */
EzApi.prototype.ezNumberToString = function(num) {
    if (!window.ezApi.isNumber(num)) {
        // If it is a string, return that. Otherwise, return NAN
        return window.ezApi.ezIsNotEmptyString(num) ? num : 'NAN';
    }
    try {
        return num.toString();
    } catch (ex) {
        return 'NAN';
    }
};

/**
 * @public
 * Converts the provided number to a string. If conversion fails, either the defaultValue
 * is returned (if not null/empty string) OR 'NAN' is returned.
 * @param {Number} num,
 * @param {null|string} defaultValue
 * @returns {String}
 */
EzApi.prototype.ezNumberToStringDefault = function(num, defaultValue) {
    defaultValue = window.ezApi.ezIsEmptyString(defaultValue) ? 'NAN' : defaultValue;
    if (!window.ezApi.isNumber(num)) {
        // If it is a string, return that. Otherwise, return defaultValue
        return window.ezApi.ezIsNotEmptyString(num) ? num : defaultValue;
    }
    try {
        return num.toString();
    } catch (ex) {
        return defaultValue;
    }
};

/**
 * @public
 * Safely extracts a value from an array. Returns the provided defaultValue if unable to obtain a value from
 * the provided array at the provided index OR returns null if defaultValue is not provided.
 * @param {array} array
 * @param {Number} index
 * @param {*} defaultValue
 */
EzApi.prototype.aGet = function(array, index, defaultValue) {
    defaultValue = window.ezApi.ezIsValid(defaultValue) ? defaultValue : null;
    if (window.ezApi.ezIsValid(index) && window.ezApi.isNotEmptyArray(array) && array.length > index) {
        var item = array[index];
        return window.ezApi.ezIsValid(item) ? item : defaultValue;
    }
};

/**
 * @public
 * Logs a deprecation message
 * @param {String} deprecatedItem
 * @param {String} useInsteadItem
 * @param {String} additionalMessage
 */
EzApi.prototype.deprecated = function(deprecatedItem, useInsteadItem, additionalMessage) {
    if (window.ezApi.ezIsEmptyString(deprecatedItem)) {
        return; // not logging, no specific item
    }
    var dm = 'DEPRECATED: ' + deprecatedItem + ' is deprecated and will be removed in the future.';
    if (window.ezApi.ezIsNotEmptyString(useInsteadItem)) {
        dm += ' Please use ' + useInsteadItem + ' instead.';
    }
    if (window.ezApi.ezIsNotEmptyString(additionalMessage)) {
        dm += ' ' + +window.ezApi.gString(additionalMessage);
    }
    if (window.ezApi.ezIsValid(window.ezApi.p) && window.ezApi.ezIsValid(window.ezApi.p.logger)) {
        window.ezApi.p.logger.warn(dm);
    } else {
        window.console.warn(dm);
    }
};

/**
 * @public
 * Opens a new window in the browser to the provided url and adds the provided windowTitle. If not title is provided
 * ezclocker.com is used instead.
 * @param {String} url
 * @param {String} windowTitle
 */
EzApi.prototype.ezNewWindow = function(url, windowTitle) {
    if (window.ezApi.ezIsEmptyString(url)) {
        return; // nothing to open
    }
    var title = window.ezApi.ezIsEmptyString(windowTitle) ? 'ezClocker.com' : windowTitle;
    window.open(url, title);
};

/**
 * @public
 * Implementation of onCallback handler. All arguments (except for the callback function reference) are
 * passed into the onCallback function call.
 * @param {Function} callback
 * @returns {Boolean}
 * True if processing can proceed, false if processing should stop
 */
EzApi.prototype.ezOnCallback = function() {
    var args = Array.prototype.slice.call(arguments);
    var callBack = args[0];
    if (!window.ezApi.ezIsFunction(callBack)) {
        return window.ezApi.ezResolve(true); // no handler, continue
    }

    return window.ezApi.ezPromise(function(resolve, reject) {
        var params = args.slice(1);
        if (window.ezApi.isFalse(callBack.apply(this, params))) {
            return reject(false);
        }
        return resolve(true);
    });
};

/**
 * @public
 * Verifies the passed function is valid, and returns the call to that method. Otherwise, returns null
 * @param {Function} callBackRef
 */
EzApi.prototype.ezCallback = function() {
    var args = Array.prototype.slice.call(arguments);
    var callBack = args[0];
    if (!window.ezApi.ezIsFunction(callBack)) {
        return null;
    }
    var params = args.slice(1);
    return callBack.apply(this, params);
};

/**
 * @public
 * Returns the function for assignment, or returns null
 * if not a valid function.
 *
 * @param {Function|null} handler
 *
 * @deprecated Use a Promise pattern instead.
 */
EzApi.prototype.ezAssignHandler = function(handler) {
    return window.ezApi.ezIsFunction(handler)
        ? handler
        : function() {
            return;
        };
};

/**
 * @public
 * Creates a basic JSON service response object
 *
 * @param {long|null} errorCode
 * @param {String|null} message
 *
 * @returns {Object}
 */
EzApi.prototype.ezResponse = function(errorCode, message) {
    return {
        errorCode: window.ezApi.ezIsValid(errorCode)
            ? errorCode
            : 0,
        message: window.ezApi.ezStringHasLength(message)
            ? message
            : 'Success'
    };
};

/**
 * @public
 * Returns if the current browser is a variation of Internet Explorer or Edge
 *
 * @returns {Boolean}
 *
 * @deprecated Use ezlibrary/ez-old-browser-check.js functionality instead.
 */
EzApi.prototype.ezIsIeCrap = function() {
    var ua = window.navigator.userAgent;
    // Test values; Uncomment to check result …

    // IE 10
    // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';

    // IE 11
    // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';

    // Edge 12 (Spartan)
    // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';

    // Edge 13
    // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';

    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
        // Edge (IE 12+) => return version number
        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }

    // other browser
    return false;
};

/**
 * @public
 * Injects the Internet Explorer Outdated Message if the browser is a flavor of Internet Explorer or Edge.
 */
EzApi.prototype.ezInjectIeWarning = function() {
    if (window.ezApi.ezIsFalse(window.ezApi.ezIsIeCrap())) {
        return;
    }

    // Internet Explorer Warning
    window.ezApi.ezId('_PageContent').prepend('<div style="padding:4px;background-color:#ffc500">' +
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
};

/**
 * @public
 * Returns the provided selfToUse if the reference is valid. Otherwise, returns the instance referenced by the provided
 * apiName. *
 * @param {String} apiName
 * @param {Object|null} selfToUse
 * @returns {Object}
 */
EzApi.prototype.ezSelf = function(apiName, selfToUse) {
    var theApi = window.ezApi.ezIsValid(selfToUse) ? selfToUse : window.ezApi.ezclocker[apiName];
    if (window.ezApi.ezIsNotValid(theApi)) {
        theApi = window[apiName]; // attempt to pull from global
    }

    if (window.ezApi.ezIsNotValid(theApi)) {
        window.ezApi.ezLogError('Unable to locate an ezApi with the name ' + apiName);
        return null;
    }

    return theApi;
};

/**
 * @public
 * Applies the the / character as the last charcter of the provided path.
 * If the path already has / as the last charcter, the path is returned as is.
 * If the path is empty or null, a single / character is returned
 * @param {String|null} path
 * @returns {String}
 * A string value of the path with a single applied / at the end if needed.
 */
EzApi.prototype.ezPostSlash = function(path) {
    if (window.ezApi.ezIsEmptyString(path)) {
        return '/';
    }
    return path[path.length - 1] == '/' ? path : path + '/';
};

/**
 * @public
 * Applies the the / character as the first charcter of the provided path.
 * If the path already has / as the first charcter, the path is returned as is.
 * If the path is empty or null, a single / character is returned
 * @param {String|null} path
 * @returns {String}
 * A string value of the path with a single / at the beginning if needed.
 */
EzApi.prototype.ezPreSlash = function(path) {
    if (window.ezApi.ezIsEmptyString(path)) {
        return '/';
    }
    return path[0] == '/' ? path : '/' + path;
};

/**
 * @public
 * Builds a path from the provided arguments. Placeing the / character at the
 * beginning (if not already there), between each argument (if not already there).
 * A / character is NOT added to the end of the path, but if one exists in the last argument it will return.
 * @param {arguments}
 * @returns {String}
 * A string value of the host root relative path
 */
EzApi.prototype.ezBuildRootPath = function() {
    if (window.ezApi.ezIsNotValid(arguments) || 0 === arguments.length) {
        return '/';
    }

    var path = window.ezApi.isArray(arguments[0]) ?
        window.ezApi.ezBuildUrl('', arguments[0]) :
        window.ezApi.ezBuildUrl.call(this, '', arguments);

    return ('/' === path[0]) ? path.substring(1) : path;
};

/**
 * @public
 * Builds a url from the baseUrl and array of path parts.
 * The baseUrl is used as the initial url. Any / character at the end of baseUrl is removed first.
 * Path parts are appended to the initial url with a preceeding / character (if one doesn't already exist).
 *
 * @param {String|null} baseUrl
 * The path's prefixing domain + host (if any)
 * @param {array|null} pathParts
 * The array of paths to build
 *
 * @returns {String}
 * A string value of the host root relative path
 */
EzApi.prototype.ezBuildUrl = function(baseUrl, pathParts) {
    if (window.ezApi.ezIsNotValid(pathParts) || pathParts.length === 0) {
        return window.ezApi.ezIsNotValid(baseUrl) ? '/' : baseUrl;
    }

    var path = window.ezApi.ezIsNotEmptyString(baseUrl) ? window.ezApi.ezPostSlash(baseUrl) : '';
    for (var i in pathParts) {
        var pathPart = pathParts[i];

        if (window.ezApi.ezIsNotEmptyString(pathPart)) {
            // Appending to path: {arguments[ai]}/
            if ('/' === path[path.length - 1]) {
                // Remove if first character is a /
                path = path.substr(0, path.length - 1);
            }

            path += pathPart[0] == '/' ? pathPart : '/' + pathPart;
        }
    }

    return path;
};

/**
 * @public
 * Creates new references of objects based upon the ezClocker JS Object template.
 *
 * @param {Function} ezClockerApiObject
 *
 * @returns {Object}
 */
EzApi.prototype.ezNew = function() {
    var constructorFunction = arguments[0];
    if (window.ezApi.ezIsNotValid(constructorFunction) || !window.ezApi.ezIsFunction(constructorFunction)) {
        window.ezApi.ezLogError('ezNew requires the first argument to be the object\'s constructor function.');
        return null;
    }

    var ref = new (Function.prototype.bind.apply(constructorFunction, arguments));
    if (window.ezApi.ezIsFunction(ref.ezInit)) {
        return ref.ezInit();
    }

    return ref;
};

/**
 * @public
 * Returns true if the response contains the basic pieces: Error Code and message, neither being null
 * @param {} response
 */
EzApi.prototype.ezIsValidApiResponse = function(response) {
    return window.ezApi.ezIsValid(response) &&
        window.ezApi.ezIsValid(response.errorCode) &&
        window.ezApi.ezIsValid(response.message);
};

/**
 * @public
 * Returns true if the response is a valid api response AND the error code is not zero.
 * @param {*} eResponse
 */
EzApi.prototype.ezIsValidApiErrorResponse = function(eResponse) {
    return window.ezApi.ezIsValidApiResponse(eResponse) && eResponse.errorCode !== 0;
};

/* ************************************************************************************* */
/* DEPRECATED METHODS ****************************************************************** */
/* ************************************************************************************* */

/**
 * @deprecated Dialogs should no longer be registered with ezApi but instead register via window.ezApi.ezRegisterApi()
 * @public
 * @param {String} dialogName
 * @param {Object} dialogInstance
 * @returns {Object}
 * Returns instance associated with the dialog name
 */
EzApi.prototype.ezRegisterDialog = function(dialogName, dialogInstance) {
    if (window.ezApi.ezIsEmptyString(dialogName)) {
        throw new Error('[EzApi.ezRegisterDialog]: A non-empty name is required to register with window.ezApi.');
    }
    if (window.ezApi.ezIsNotValid(dialogInstance)) {
        throw new Error('[EzApi.ezRegisterDialog]: You can only register valid, non-null instances with window.ezApi.');
    }

    window.ezApi.ezclocker[dialogName] = dialogInstance;
    return window.ezApi.ezclocker[dialogName];
};

/**
 * @deprecated Call window.ezApi.ezRegisterGlobalEvent directly with a specific name for the event.
 * @public
 * Registers an onReady event for the owner
 * @param {String} eventOwnerName
 */
EzApi.prototype.ezRegisterReadyEvent = function(eventOwnerName) {
    if (window.ezApi.ezIsEmptyString(eventOwnerName)) {
        window.ezApi.ezLogError('A valid, non-empty event owner name is required to register a global OnReady event.');
    }
    window.ezApi.ezRegisterGlobalEvent(eventOwnerName, 'onReady', '_EzOn' + eventOwnerName + '_Ready');
};

/**
 * @deprecated Move to window.ezApi.ezCallback()
 * @public
 * Verifies the passed function is valid, and returns the call to that method. Otherwise, returns null
 * @param {Function} callBackRef
 */
EzApi.prototype.callBack = function() {
    var args = Array.prototype.slice.call(arguments);
    var callBack = args[0];
    if (!window.ezApi.ezIsFunction(callBack)) {
        return null;
    }
    var params = args.slice(1);
    return callBack.apply(this, params);
};

/**
 * @public
 * Determines of the provided object reference has the property named as the string provided in propertyName.
 *
 * @param {object} ref
 * @param {string} propertyName
 *
 * @returns {boolean}
 */
EzApi.prototype.ezJsonObjectHasProperty = function(ref, propertyName) {
    if (window.ezApi.ezIsNotValid(ref) || window.ezApi.ezIsEmptyString(propertyName)) {
        return false;
    }

    return Object.prototype.hasOwnProperty.call(ref, propertyName);
};

/**
 * @deprecated Move to window.ezApi.ezReturnValidOrDefault()
 * @public
 * Returns the provided item for assignment to a var if the item is valid. Otherwise, the defaultItem is returned for
 * assignment.
 * @param {*} item
 * @param {*} defaultItem
 */
EzApi.prototype.assignOrDefault = function(item, defaultItem) {
    return window.ezApi.ezReturnValidOrDefault(item, defaultItem);
};

/**
 * @deprecated Move to window.ezApi.ezReturnValidOrDefault()
 * @public
 * Returns the provided item for assignment to a var if the item is valid. Otherwise, the defaultItem is returned for
 * assignment.
 * @param {*} item
 * @param {*} defaultItem
 */
EzApi.prototype.ezAssignOrDefault = function(item, defaultItem) {
    return window.ezApi.ezIsValid(item)
        ? item
        : defaultItem;
};

/**
 * @public
 * Returns the provided aArray if it is a valid array. Otherwise, an empty array is returned.
 *
 * @param {Array} aArray
 *
 * @returns {Array}
 */
EzApi.prototype.ezAssignOrEmptyArray = function(aArray) {
    return window.ezApi.ezIsArray(aArray)
        ? aArray
        : [];
};

/**
 * @deprecated Move to window.ezApi.ezReturnValidOrEmptyString()
 * @public
 * Returns the provided value if it is a valid string, otherwise '' string is returned
 * @param {String} value
 */
EzApi.prototype.assignOrEmpty = function(value) {
    return window.ezApi.ezReturnValidOrEmptyString(value);
};

/**
 * @deprecated Move to window.ezApi.ezAssignOrNull()
 * @public
 * Returns the provided item to assign to a variable if the item is valid. Otherwise, null is returned
 * @deprecated
 * Usewindow.window.ezApi.ezReturnValidOrNull instead.
 * @param {*} item
 *
 */
EzApi.prototype.assignOrNull = function(item) {
    return window.ezApi.ezAssignOrDefault(item, null);
};

/**
 * @deprecated Move to window.ezApi.ezReturnValidOrNull()
 * @public
 * Returns the provided item to assign to a variable if the item is valid. Otherwise, null is returned
 * @param {*} item
 */
EzApi.prototype.ezAssignOrNull = function(item) {
    return window.ezApi.ezAssignOrDefault(item, null);
};

/**
 * @deprecated Move to window.ezApi.ezDecode()
 * @public
 * Decodes the provided string, converting to a blank string first if null, undefined
 * @param {String} string
 */
EzApi.prototype.decode = function(stringValue) {
    return decodeURIComponent(window.ezApi.gString(stringValue));
};

/**
 * @deprecated Move to window.ezApi.ezNumberToString()
 * @public
 * Converts a number to a string or returns NAN if not posslbe
 * @param {Number} num
 */
EzApi.prototype.numberToString = function(num) {
    if (!window.ezApi.isNumber(num)) {
        // If it is a string, return that. Otherwise, return NAN
        return window.ezApi.ezIsNotEmptyString(num) ? num : 'NAN';
    }
    try {
        return num.toString();
    } catch (ex) {
        return 'NAN';
    }
};

/**
 * @public
 * Returns the valie of the property named {propertyKey} from the provided {jsonObject} if {jsonObject} contains
 * that valid property. Otherwise, the default value is returned.
 *
 * @param {Object} jsonObject
 * @param {String} propertyKey
 * @param {defaultValue|null} defaultValue
 */
EzApi.prototype.ezGetJSONObjectPropertyValueOrDefault = function(jsonObject, propertyKey, defaultValue) {
    if (window.ezApi.ezIsValid(jsonObject) &&
        window.ezApi.ezIsNotEmptyString(propertyKey) &&
        window.ezApi.ezIsValid(jsonObject[propertyKey])) {
        return jsonObject[propertyKey];
    }

    return defaultValue;
};

/**
 * @deprecated Use window.ezApi.ezRegisterApi(name, instance); instead
 * @public
 * Registers an ezclocker-api object with thewindow.ezApi instance with the appropriate scope.
 * @param {String} apiName
 * Name of the API object
 * @param {Object} apiInstance
 * Instance of the API object
 * @param {String|null} accessScope
 * Defaults to secure scope if none provided
 * @returns {Object}
 * Returns the api instance provided
 */
EzApi.prototype.ezRegister = function(apiName, apiInstance, accessScope) {
    if (window.ezApi.ezIsEmptyString(apiName)) {
        throw new Error('A non-empty name is required to register with window.ezApi.');
    }
    if (window.ezApi.ezIsNotValid(apiInstance)) {
        throw new Error('You can only register valid, non-null instances with window.ezApi.');
    }

    // Force API uppercase to make it non-case sensitive
    //apiName = apiName.toUpperCase();
    var scope = window.ezApi.ezIsEmptyString(accessScope) ? window.ezApi.EzApiRegistrationScope.SECURE : accessScope;
    if (window.ezApi.EzApiRegistrationScope.WINDOW === scope) {
        window.ezApi.ezLogDebug('[ezClocker API]: ' + apiName + ' registered as a GLOBAL API on the window object.');
        window[apiName] = apiInstance;
        return window[apiName];
    }
    if (window.ezApi.ezIsValid(apiInstance)) {
        apiInstance.ezApiScope = accessScope;
    }
    window.ezApi.ezLogDebug('[ezClocker API]: ' + apiName + ' registered.');
    window.ezApi.ezclocker[apiName] = apiInstance;
    return window.ezApi.ezclocker[apiName];
};

/**
 * @deprecated Use window.ezApi.ezRegisterApi(name, instance); instead
 * @public
 * Registers thewindow.ezApi as a public api
 * @param {String} apiName
 * Name of the API object
 * @param {Object} apiInstance
 * Instance of the API object
 * @returns {Object}
 * Returns the api instance provided
 */
EzApi.prototype.ezRegisterPublic = function(apiName, apiInstance) {
    if (window.ezApi.ezIsEmptyString(apiName)) {
        throw new Error('A non-empty name is required to register with window.ezApi.');
    }
    if (window.ezApi.ezIsNotValid(apiInstance)) {
        throw new Error('You can only register valid, non-null instances with window.ezApi.');
    }

    window.ezApi.ezclocker[apiName] = apiInstance;
    return window.ezApi.ezclocker[apiName];
};

/**
 * @deprecated Use window.ezApi.ezRegisterApi(name, instance); instead
 * @public
 * Registers thewindow.ezApi as a secure api
 * @param {String} apiName
 * Name of the API object
 * @param {Object} apiInstance
 * Instance of the API object
 * @returns {Object}
 * Returns the api instance provided
 */
EzApi.prototype.ezRegisterSecure = function(apiName, apiInstance) {
    if (window.ezApi.ezIsEmptyString(apiName)) {
        throw new Error('A non-empty name is required to register with window.ezApi.');
    }
    if (window.ezApi.ezIsNotValid(apiInstance)) {
        throw new Error('You can only register valid, non-null instances with window.ezApi.');
    }

    window.ezApi.ezclocker[apiName] = apiInstance;
    return window.ezApi.ezclocker[apiName];

};

/**
 * @deprecated Use window.ezApi.ezRegisterApi(name, instance); instead
 * @public
 * Registers an external API
 * @param {String} apiName
 * Name of the API object
 * @param {Object} apiInstance
 * Instance of the API object
 * @returns {Object}
 * Returns the api instance provided
 */
EzApi.prototype.ezRegisterExternal = function(apiName, apiInstance) {
    if (window.ezApi.ezIsEmptyString(apiName)) {
        throw new Error('A non-empty name is required to register with window.ezApi.');
    }
    if (window.ezApi.ezIsNotValid(apiInstance)) {
        throw new Error('You can only register valid, non-null instances with window.ezApi.');
    }

    window.ezApi.ezclocker[apiName] = apiInstance;
    return window.ezApi.ezclocker[apiName];
};

/**
 * @deprecated Use window.ezApi.ezRegisterApi(name, instance); instead
 * @public
 * Registers thewindow.ezApi as a global (root level) api
 * @param {String} apiName
 * Name of the API object
 * @param {Object} apiInstance
 * Instance of the API object
 * @returns {Object}
 * Returns the api instance provided
 */
EzApi.prototype.ezRegisterRoot = function(apiName, apiInstance) {
    if (window.ezApi.ezIsEmptyString(apiName)) {
        throw new Error('A non-empty name is required to register with window.ezApi.');
    }
    if (window.ezApi.ezIsNotValid(apiInstance)) {
        throw new Error('You can only register valid, non-null instances with window.ezApi.');
    }

    window.ezApi.ezclocker[apiName] = apiInstance;
    return window.ezApi.ezclocker[apiName];
};

/**
 * @deprecated Use window.ezApi.ezRegisterApi(name, instance); instead
 * @public
 * Adds a public scoped object into thewindow.ezApi with the provided name.
 * @param {String} name
 * @param {Object} reference
 * @returns {Object}
 * Returns the reference
 */
EzApi.prototype.addPublicApi = function(name, reference) {
    return window.ezApi.ezRegisterPublic(name, reference);
};

/**
 * @deprecated Use window.ezApi.ezRegisterApi(name, instance); instead
 * @public
 * Adds an ezClocker dialog reference into thewindow.ezApi with the provided name
 * @param {String} name
 * @param {Object} reference
 * @returns {Object}
 * Returns the reference
 */
EzApi.prototype.addDialog = function(name, reference) {
    window.ezApi.dialogs[name] = typeof reference !== 'undefined' ? reference : null;
};

/**
 * @deprecated Use window.ezApi.ezRegisterApi(name, instance); instead
 * @public
 * Adds a secure scoped object into thewindow.ezApi with the provided name
 * @param {String} name
 * @param {Object} reference
 * @returns {Object}
 * Returns the reference
 */
EzApi.prototype.addSecureApi = function(name, reference) {
    return window.ezApi.ezRegisterSecure(name, reference);
};

/**
 * @deprecated Use window.ezApi.ezRegisterApi(name, instance); instead
 * @public
 * Adds an externall scoped object into thewindow.ezApi with the provided name
 * @param {String} name
 * @param {Object} reference
 * @returns {Object}
 * Returns the reference
 */
EzApi.prototype.addExternalApi = function(name, reference) {
    return window.ezApi.ezRegisterExternal(name, reference);
};

/**
 * @deprecated Use window.ezApi.ezApiExists(apiName) instead.
 * @public
 * Returns true if a reference with the provided name exists in the public scope
 * @param {String} name
 * @returns {Boolean}
 */
EzApi.prototype.doesPublicApiExist = function(name) {
    return typeof window.ezApi.Public[name] !== 'undefined' && window.ezApi.Public[name];
};

/**
 * @deprecated Use window.ezApi.ezApiExists(apiName) instead.
 * @public
 * Returns true if a reference with the provided name exists in the secure scope
 * @param {String} name
 * @returns {Boolean}
 */
EzApi.prototype.doesSecureApiExist = function(name) {
    return typeof window.ezApi.Secure[name] != 'undefined' && window.ezApi.Secure[name];
};

/**
 * @deprecated Use window.ezApi.ezApiExists(apiName) instead.
 * @public
 * Returns true if a reference with the provided name exists in the external scope
 * @param {String} name
 * @returns {Boolean}
 */
EzApi.prototype.doesExternalApiExist = function(name) {
    return typeof window.ezApi.Secure[name] != 'undefined' && window.ezApi.External[name];
};

/**
 * @deprecated Switch to window.ezApi.ezSelf() instead
 * @public
 * This is the same implementation as window.ezApi.ezSelf(), which is the preferred method to use.
 * @param {String} apiName
 * @param {Object|null} selfToUse
 * @returns {Object}
 */
EzApi.prototype.ezGetSelf = function(apiName, selfToUse) {
    return window.ezApi.ezIsValid(selfToUse) ? selfToUse : window.ezApi.ezGetApi(apiName);
};

/**
 * @deprecated DO NOT USE
 * @public
 * Returns the reference for the given apiName by scanning all the possible api categories for the name and returning
 * the first encountered using the order: Public, Secure, Dialogs, External, Window
 * @param {String} apiName
 * @returns {Object}
 */
EzApi.prototype.ezGetApi = function(apiName) {
    if (window.ezApi.ezIsEmptyString(apiName)) {
        window.ezApi.ezLogError('window.ezApi.ezGetSelf requires a valid, non-empty api name param.');
        return null; // a name IS required
    }

    var theApi = window.ezApi.ezclocker[apiName];
    if (window.ezApi.ezIsNotValid(theApi)) {
        theApi = window[apiName]; // attempt to pull from global
    }

    if (window.ezApi.ezIsNotValid(theApi)) {
        window.ezApi.ezLogError('Unable to locate an ezApi with the name ' + apiName);
        return null;
    }
    return theApi;
};

/**
 * @deprecated Move to window.ezApi.ezToJson()
 * @public
 * Converts an object to JSON string
 * @param {*} jsonObject
 */
EzApi.prototype.toJsonString = function(item) {
    if (window.ezApi.isString(item)) {
        return item;
    }
    try {
        return JSON.stringify(item);
    } catch (ex) {
        return window.ezApi.toJsonString(window.ezApi.buildJsonError('500', 'Failed to convert ' + item +
            'to a JSON string.', ex));
    }
};

/**
 * @deprecated Move to window.ezApi.ezFromJson()
 * @public
 * Returns the Javascript Object created from the provided String. If a non-string value is passed, that value
 * is simply reflected back in this call.
 * @param {String} jsonString
 */
EzApi.prototype.fromJsonString = function(jsonString) {
    if (!window.ezApi.isString(jsonString)) {
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
        return window.ezApi.buildJsonError('500', 'Failed to parse ' + jsonString + ' to a javascript object.', ex);
    }
};

/**
 * @deprecated Move to ezUi.ezElementExists()
 * @public
 * Determines if the element with provided ID exists (using $() call)
 * @param {String} id
 * @returns {Boolean}
 */
EzApi.prototype.ezElementExists = function(id) {
    return window.ezApi.ezElementExists$('#' + id);
};

/**
 * @deprecated Move to ezUi.ezElementExists$()
 * @public
 * Determines if the element with provided ID exists (using $() call)
 * @param {String} jquerySelector
 * @returns {Boolean}
 */
EzApi.prototype.ezElementExists$ = function(jquerySelector) {
    if (window.ezApi.ezIsEmptyString(jquerySelector)) {
        return false;
    }

    var element = window.ezApi.ez$(jquerySelector);
    return window.ezApi.ezIsValid(element) && element.length !== 0;
};

/**
 * @deprecated Move to window.ezApi.ezIsUndefined()
 * @public
 * Return true if the provided item is undefined
 * @param {*} item
 */
EzApi.prototype.isUndefined = function(item) {
    return typeof item === 'undefined';
};

/**
 * @deprecated Move to window.ezApi.ezGetObjectType()
 * @public
 * Returns the Object.prototype.toString.call() result applied to the provided object
 * @param {*} object
 */
EzApi.prototype.getObjectType = function(object) {
    return Object.prototype.toString.call(object);
};

/**
 * @deprecated Move to window.ezApi.ezIsNull()
 * @public
 * Returns true if the provided item is null (does not evaluate undefined)
 * @param {*} item
 */
EzApi.prototype.isNull = function(item) {
    return null == item;
};

/**
 * @deprecated Move to window.ezApi.ezIsObject()
 * @public
 * Returns true if the provided item is an object type
 * @param {*} item
 */
EzApi.prototype.isObject = function(item) {
    return window.ezApi.ezIsValid(item) && typeof item === 'object';
};

/**
 * @deprecated Switch to window.ezApi.ezIsValid()
 * @public
 * Returns true if the item passed is defined and not null.
 * @param {*} item
 */
EzApi.prototype.isValid = function(item) {
    return typeof item !== 'undefined' && item !== null;
};

/**
 * @deprecated Switch to window.ezApi.ezIsNotValid()
 * @public
 * Returns true if the item passed is undefined OR null
 * @param {*} item
 */
EzApi.prototype.isNotValid = function(item) {
    return !window.ezApi.ezIsValid(item);
};

/**
 * @deprecated Use window.ezApi.ezAllValid() instead
 * @public
 * Evaluates all the provided arguments (if any) to be valid
 */
EzApi.prototype.allValid = function() {
    for (var aIndex in arguments) {
        if (window.ezApi.ezIsNotValid(arguments[aIndex])) {
            return false;
        }
    }
    return true;
};

/**
 * @deprecated Move to window.ezApi.ezAnyNotValid()
 * @public
 * Determines if any of the passed arguments are not valid
 */
EzApi.prototype.anyNotValid = function() {
    for (var aIndex in arguments) {
        if (window.ezApi.ezIsNotValid(arguments[aIndex])) {
            return true;
        }
    }
    return false;
};

/**
 * @deprecated Move to window.ezApi.ezIsString()
 * @public
 * Determines if the value passed is a string
 * @param {*} value
 */
EzApi.prototype.isString = function(object) {
    return window.ezApi.ezIsValid(object) && typeof object === 'string';
};

/**
 * @public
 * Safely returns the index of the first occurance of aPart within the provdied aString by checking for null
 * or undefined values before hand.
 *
 * If aString is not a valid string then -1 is returned
 * If aPart is not a valid string, then -1 is returned
 *
 * @returns {Number} 
 */
EzApi.prototype.ezIndexOf = function(aString, aPart) {
    return undefined !== aString && null !== aString && 'string' === typeof aString && 
          undefined !== aPart && null !== aPart && 'string' === typeof aPart
        ? aString.indexOf(aPart)
        : -1;
};

/**
 * @deprecated Move to window.ezApi.ezIsMoment()
 * @public
 * Determines if the passed object is an actual moment.js object or not.
 * @param {*} object
 */
EzApi.prototype.isMoment = function(object) {
    return window.ezApi.ezIsValid(object) && true === object._isAMomentObject;
};

/**
 * @deprecated Use window.ezApi.ezIsEmptyString() instead.
 * @public
 * Determines if the passed string is undefined, null, or has length zero
 * @param {String} string
 */
EzApi.prototype.isEmptyString = function(stringValue) {
    return window.ezApi.ezIsEmptyString(stringValue);
};

/**
 * @deprecated Use window.ezApi.ezIsEmptyArray() instead
 * @public
 * Determines if the passed array is not undefined, not null, and has a length greater than zero
 * @param {array} array
 */
EzApi.prototype.isEmptyArray = function(array) {
    return !window.ezApi.isArray(array) || array.length === 0;
};

/**
 * @deprecated Use window.ezApi.ezIsNotEmptyArray() instead.
 * @public
 * Determines if the passed array is not undefined, not null, and has a length greater than zero
 * @param {array} array
 */
EzApi.prototype.isNotEmptyArray = function(array) {
    return !window.ezApi.ezIsEmptyArray(array);
};



/**
 * @deprecated Use window.ezApi.ezIsArray() instead.
 * @public *
 * Determines if the passed object is an array or not.
 * @param {array|null} array
 */
EzApi.prototype.isArray = function(array) {
    return window.ezApi.ezIsValid(array) && window.ezApi.ezGetObjectType(array) === '[object Array]';
};

/**
 * @deprecated Move to window.ezApi.ezIsNumber()
 * @public
 * Determines if the passed object is a number type.
 * @param {*} object
 */
EzApi.prototype.isNumber = function(aObject) {
    return window.ezApi.ezIsValid(aObject) &&
        (typeof aObject === 'number' || window.ezApi.ezGetObjectType(aObject) === '[object Number]');
};

/**
 * @deprecated Move to window.ezApi.ezIsBoolean()
 * @public
 * Determines if the passed object is a boolean type.
 * @param {*} object
 */
EzApi.prototype.isBoolean = function(object) {
    return window.ezApi.ezIsValid(object) && window.ezApi.ezGetObjectType(object) === '[object Boolean]';
};

/**
 * @deprecated Move to window.ezApi.ezIsFalse()
 * @public
 * Returns true if the boolean value is false. Otherwise, returns false if the value is NOT a boolean at all OR
 * is actually true.
 * @param {Boolean} value
 */
EzApi.prototype.isFalse = function(value) {
    return window.ezApi.ezIsBoolean(value) ? false === value : false;
};

/**
 * @deprecated Use window.ezApi.ezIsFunction() instead
 * @public
 * Returns true if the passed ref is a javascript function
 * @param {Function} functionRef
 */
EzApi.prototype.isFunction = function(functionRef) {
    return window.ezApi.ezIsValid(functionRef) && 'function' === typeof functionRef;
};

/**
 * @deprecated Move to window.ezApi.ezIsNotEmptyString()
 * @public
 * Determines if the passed string is not undefined, not null, AND has a length greater than zero
 * @param {String} stringValue
 */
EzApi.prototype.isNotEmptyString = function(stringValue) {
    return window.ezApi.ezIsString(stringValue) && 0 < stringValue.length;
};

/**
 * @deprecated Move to window.ezApi.ezString()
 * @public
 * Returns the passed string OR if the string is empty, null, or undefined a blank string is returned
 * @param {String} stringValue
 */
EzApi.prototype.gString = function(stringValue) {
    return window.ezApi.ezIsNotEmptyString(stringValue) ? stringValue : '';
};

/**
 * @deprecated Move to window.ezApi.ezReject()
 * @public
 * Alternative wrapper for ezReject
 * @param {Object} response
 */
EzApi.prototype.Reject = function(response) {
    return window.ezApi.ezReject(response);
};

/**
 * @deprecated Move to window.ezApi.ezResolve()
 * @public
 * Executes Promise.resolve, passing the provided response in the
 * resolve.
 * @param {Object} response
 */
EzApi.prototype.Resolve = function(response) {
    return window.ezApi.ezResolve(response);
};

/**
 * @deprecated Move to window.ezApi.ezPromise()
 * @public
 * Wraps the creation of a promise into thewindow.ezApi
 * @param {Function} promiseFunction
 */
EzApi.prototype.promise = function(promiseFunction) {
    return window.ezApi.ezPromise(promiseFunction);
};

/**
 * @deprecated Move to window.ezApi.ezPromise()
 * @public
 * Wraps the creation of a promise into thewindow.ezApi
 * @param {Function} promiseFunction
 */
EzApi.prototype.Promise = function(promiseFunction) {
    return window.ezApi.ezPromise(promiseFunction);
};

/**
 * @public
 * Use in promise.catch handlers to genericlly catch issues from the promise.
 */
EzApi.prototype.ezPromiseCatch = function() {
    var logError = window.ezApi.ezIsValid(arguments) && arguments.length > 0
        ? 'ezApi caught an unhandled promise exception/catch. Catch arguments: ' + window.ezApi.ezToJson(arguments)
        : 'ezApi caught an unhandled promise exception/catch. No arguments available.';

    window.console.error(logError);
    return window.ezApi.ezCreateErrorResponse(500, 'An unexpected error occurred while executing a Promise', arguments);
};

/**
 * @public
 * Creates a basic response with error message, error code, and optional entity.
 *
 * @param {String} em
 * @param {Number|null} ec
 * @param {String|null} optionalEndPoint
 * @param {Object|null} optionalEntity
 *
 * @returns {Object}
 */
EzApi.prototype.ezCreateErrorResponse = function(ec, em, optionalEndPoint, optionalEntity) {
    var eResponse = {
        errorCode: window.ezApi.ezIsNumber(ec)
            ? ec
            : 500,
        message: window.ezApi.ezIsEmptyString(em)
            ? 'Unexpected error'
            : em
    };

    if (window.ezApi.ezIsNotEmptyString(optionalEndPoint)) {
        eResponse.endPoint = optionalEndPoint;
    }
    if (window.ezApi.ezIsValid(optionalEntity)) {
        eResponse.entity = optionalEntity;
    }

    return eResponse;
};

/**
 * @public
 * Determines if the objectRef has the property propertyName. Returns null if the objectRef is false, the
 *
 * @param {Object} objectRef
 * @param {String} propertyName
 *
 * @returns {Boolean}
 */
EzApi.prototype.ezHasOwnProperty = function(objectRef, propertyName) {
    if (window.ezApi.ezIsNotValid(objectRef)) {
        window.ezApi.ezLogError('A valid objectRef param is required in call to window.ezApi.ezHasOwnProperty()');
        return false;
    }
    var pName = propertyName.toString();

    if (window.ezApi.ezIsEmptyString(pName)) {
        window.ezApi.ezLogError('A valid propertyName param is required in call to window.ezApi.ezHasOwnProperty()');
        return false;
    }

    return Object.prototype.hasOwnProperty.call(objectRef, pName);
};

/**
 * @public
 * Returns if the objectRef is an instance of the provided clazz reference.
 *
 * Note: The instanceof operator to test if the prototype property of a constructor appears anywhere in the
 * prototype chain of an object. The return value is a boolean value.
 *
 * @param {Object} objectRef
 * @param {Constructor|Class} Clazz
 */
EzApi.prototype.ezInstanceOf = function(objectRef, Clazz) {
    if (window.ezApi.ezIsNotValid(objectRef)) {
        window.ezApi.ezLogError('A valid objectRef param is required in call to window.ezApi.ezHasOwnProperty()');
    }
    if (window.ezApi.ezIsNotValid(Clazz)) {
        window.ezApi.ezLogError('A valid objectClass param is required in call to window.ezApi.ezHasOwnProperty()');
    }

    return objectRef instanceof Clazz;
};

/**
 * @public
 * Returns if the objectRef is an instance of the provided clazz reference. In addition, a warning log is written
 * if the provided objectRef is not an instance of the provided Clazz/prototype constructor.
 *
 * @param {*} objectRef
 * @param {*} Clazz
 *
 * @returns {Boolean}
 */
EzApi.prototype.ezWarnIfNotInstanceOf = function(objectRef, Clazz) {
    if (!window.ezApi.ezInstanceOf(objectRef, Clazz)) {
        window.ezApi.ezclocker.logger.warn(
            'Action object is not an instance of ' + Clazz.name + '. Action object is an instance of ' +
            objectRef.constructor.name + '.');
        return false;
    }

    return true;
};

/**
 * @public
 * Returns the reference of the provided ezApiName, thisRef, or paramRef if it is valid and an instance of Clazz.
 *
 * Returns the reference based on the following requirements:
 *
 * window.ezApi.ezclocker[ezApiName] is returned if ezApiName is a valid Api name in window.ezApi.ezclocker and is an instance of
 * the provided Clazz.
 *
 * - OR -
 *
 * thisRef is returned if thisRef is a valid instance of the provided Clazz
 *
 * - OR -
 *
 * paramRef is returned if paramRef is a valid instance of the provided Clazz
 *
 * - Otherwise -
 * Null is returned as the self reference. In addition, a warning is logged as each contender is evaluated to
 * be an instanceof Clazz and fails that evaluation.
 *
 * @param {Constructor|Class} Clazz
 * @param {String|null} ezApiName
 * @param {Object|null} thisRef
 * @param {Object|null} paramRef
 *
 * @returns {Object|null}
 */
EzApi.prototype.ezSelfRef = function(Clazz, thisRef, ezApiName, paramRef) {
    if (window.ezApi.ezIsNotValid(Clazz)) {
        Clazz = Object;
    }

    var refSet = [];
    if (window.ezApi.ezIsValid(thisRef)) {
        refSet.push(thisRef);
    }
    if (window.ezApi.ezIsNotEmptyString(ezApiName)) {
        refSet.push(window.ezApi.ezclocker[ezApiName]);
    }
    if (window.ezApi.ezIsValid(paramRef)) {
        refSet.push(paramRef);
    }

    for (var x = 0; x < refSet.length; x++) {
        var selfRef = refSet[x];
        if (window.ezApi.ezWarnIfNotInstanceOf(selfRef, Clazz)) {
            return selfRef;
        }
    }

    // None of the references met the requirements
    return null;
};

/**
 * @public
 * Returns true if the aObject is an instance of Set()
 *
 * @param {Object|null} aObject
 *
 * @returns {Boolean}
 */
EzApi.prototype.ezIsSet = function(aObject) {
    return window.ezApi.ezIsValid(aObject) && window.ezApi.ezGetObjectType(aObject) === '[object Set]';
};

/**
 * @public
 * Returns true if the aObject is not an instance of Set()
 *
 * @param {Object|null} aObject
 *
 * @returns {Boolean}
 */
EzApi.prototype.ezIsNotSet = function(aObject) {
    return !window.ezApi.ezIsSet(aObject);
};

/**
 * @public
 * Returns true if aObject is a Set() and the set is empty.
 *
 * @param {Set} aObject
 *
 * @returns {Boolean}
 */
EzApi.prototype.ezIsEmptySet = function(aObject) {
    return window.ezApi.ezIsSet(aObject) && 0 === aObject.size;
};

/**
 * @public
 * Returns true if aObject is a Set() and the set is NOT empty.
 *
 * @param {Set} aObject
 *
 * @returns {Boolean}
 */
EzApi.prototype.ezIsNotEmptySet = function(aObject) {
    return window.ezApi.ezIsSet(aObject) && 0 !== aObject.size();
};

/**
 * @public
 * Verifies the core dependencies are available
 *
 * @returns {Boolean}
 */
EzApi.prototype.ezValidateCoreDependencies = function() {
    var ezApiDep = '/public/javascript/common/ezapi.js';
    var publicJsCommon = '/public/javascript/common/';

    if (window.ezApi.ezIsNotValid(window.ezApi.ezclocker.ezLogger)) {
        window.ezApi.ezclocker.ezLogger.error('Definition of ' + publicJsCommon + 'ezclocker-logger.js is required after ' +
            ezApiDep);
        return false;
    }
    if (window.ezApi.ezIsNotValid(window.ezApi.ezclocker.ezEvents)) {
        window.ezApi.ezclocker.ezLogger.error('Definition of ' + publicJsCommon + 'ez-events.js is required after ' + ezApiDep);
        return false;
    }
    if (window.ezApi.ezIsNotValid(window.ezApi.ezclocker.ezUrlHelper)) {
        window.ezApi.ezclocker.ezLogger.error('Definition of ' + publicJsCommon + 'ezclocker-url-helper2.js is required after '
            +
            ezApiDep);
        return false;
    }
    if (window.ezApi.ezIsNotValid(window.ezApi.ezclocker.nav)) {
        window.ezApi.ezclocker.ezLogger.error('Definition of ' + publicJsCommon +
            'ezclocker-navigation-helper.js is required after ' +
            ezApiDep);
        return false;
    }
    if (window.ezApi.ezIsNotValid(window.ezApi.ezclocker.ezDateTime)) {
        window.ezApi.ezclocker.ezLogger.error('Definition of ' + publicJsCommon + 'ez-date-time.js is required after ' +
            ezApiDep);
        return false;
    }
    if (window.ezApi.ezIsNotValid(window.ezApi.ezclocker.ezBrowserInfo)) {
        window.ezApi.ezclocker.ezLogger.error('Definition of ' + publicJsCommon +
            'ezclocker-mobile-helper.js is required after ' +
            ezApiDep);
        return false;
    }

    return true;
};

/**
 * @public
 * Makes a deep copy of the propertyes of the provided sourceObject. Methods will not be copied over to the new Object.
 *
 * @param {Object} sourceObject
 *
 * @returns {Object}
 */
EzApi.prototype.ezPropClone = function(sourceObject) {
    if (window.ezApi.ezIsNotValid(sourceObject)) {
        return sourceObject;
    }

    return JSON.parse(JSON.stringify(sourceObject));
};

/**
 * @public
 * Makes a deep clone of the sourceObject.
 *
 * Handles the cloning of functions and multiple/cyclic references (what this means is that if two properties in the
 * tree which is cloned are references of the same object, the cloned object tree will have these properties point to
 * one and the same clone of the referenced object)
 *
 * Also solves for cyclic dependencies to prevent an infinite loop.
 *
 * The complexity of the algorithm is O(n)
 *
 * Research Link
 * https://stackoverflow.com/questions/728360/how-do-i-correctly-clone-a-javascript-object
 *
 * @param {Object} sourceObject
 *
 * @returns {Object}
 */
EzApi.prototype.ezDeepClone = function(sourceObject) {

    var originalObjectsArray = []; //used to remove the unique ids when finished
    var next_objid = 0;

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

    var clonedObjectsArray = [];

    function cloneRecursive(aObject) {
        if (null === aObject) {
            return aObject;
        }

        var typeOfObject = typeof aObject;
        if ('string' === typeOfObject || 'number' === typeOfObject || 'boolean' === typeOfObject) {
            return aObject;
        }

        // Handle Date
        if (aObject instanceof Date) {
            var dateCopy = new Date();
            dateCopy.setTime(aObject.getTime());
            return dateCopy;
        }

        // Handle Array
        if (aObject instanceof Array) {
            var arrayCopy = [];
            for (var x = 0; x < aObject.length; ++x) {
                arrayCopy[x] = cloneRecursive(aObject[x]);
            }
            return arrayCopy;
        }

        // Handle Object
        if (aObject instanceof Object) {
            if (undefined !== clonedObjectsArray[objectId(aObject)]) {
                return clonedObjectsArray[objectId(aObject)];
            }

            var objectCopy = aObject instanceof Function
                // Handle Function
                ? aObject.apply(this, arguments)
                : {};

            clonedObjectsArray[objectId(aObject)] = objectCopy;

            for (var propName in aObject) {
                if ('__obj_id' !== propName && window.ezApi.ezHasOwnProperty(aObject, propName)) {
                    objectCopy[propName] = cloneRecursive(aObject[propName]);
                }
            }

            return objectCopy;
        }

        throw new Error('Unable to clone an object of type ' +
            sourceObject.constructor.name + '. The type is not yet supported.');
    }

    var clonedObject = cloneRecursive(sourceObject);

    // Remove the unique ids
    for (var i = 0; i < originalObjectsArray.length; i++) {
        delete originalObjectsArray[i].__obj_id;
    }

    return clonedObject;
};

/**
 * @public
 * Replaces all characters in the provided value with the obscureChar (uses * as default obscure char)
 *
 * If value is empty or null then {obscureChar} is returned.
 *
 * If obscureChar is empty or null, then * is used.
 *
 * @param {String|null} value
 * @param {String|null} obscureChar
 *
 * @returns {String}
 */
EzApi.prototype.ezObscureValue = function(value, obscureChar) {
    var oChar = ezApi.ezIsNotEmptyString(obscureChar)
        ? obscureChar
        : '*';
    if (ezApi.ezIsEmptyString(value)) {
        return oChar;
    }

    return value.replace(/(.?)/g, oChar);
};

/**
 * Performs a shallow copy of the provided sourceObject. Will include any 'shallow' methods on the sourceObject.
 *
 * @param {Object} sourceObject
 *
 * @returns {Object}
 */
EzApi.prototype.ezShallowClone = function(sourceObject) {
    if (window.ezApi.ezIsNotValid(sourceObject)) {
        return sourceObject;
    }

    return Object.assign({}, sourceObject);
};

var ezApi = new EzApi();
window.ezApi = ezApi;
ezApi.ezInit();
if (document.readyState != 'loading') {
    document.dispatchEvent(new CustomEvent('onEzApiReady', {
        bubbles: true,
        ezApi: window.ezApi
    }));
} else {
    document.addEventListener('DOMContentLoaded', function() {
        document.dispatchEvent(new CustomEvent('onEzApiReady', {
            bubbles: true,
            ezApi: window.ezApi
        }));
    });
}