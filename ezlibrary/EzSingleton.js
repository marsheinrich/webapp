import { EzBadParamException } from '/ezlibrary/exceptions/EzBadParamException.js';

import {
    EzObject
} from '/ezlibrary/helpers/EzHelpers.js';

import { EzInstanceState } from '/ezlibrary/EzInstanceState.js';
import { EzRegistrationState } from '/ezlibrary/enums/EzRegistrationState.js';

/** ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    @module /ezlibrary/EzSingleton.js
    @summary
    EzClocker's module for base singleton class objects.
    @description
    ---------------------------------------------------------------------
    Exports:
        EzSingletonRequiredDependencyInfo
        EzSingletonRequiredDependencies
        EzSingleton
    ---------------------------------------------------------------------
    NOTE: In most cases the EzSingletonRequiredDependencInfo class is not
    needed outside of this module.
    ---------------------------------------------------------------------
    Most common import:
        import {
            EzSingletonRequiredDependencies,
            EzSingleton
        } from '/ezlibrary/EzSingleton.js';
    ---------------------------------------------------------------------
    Most common import when you also need to import other supported ezClocker JS classes:
        import {
            EzSingletonRequiredDependencies,
            EzSingleton,
            ... other supported classes ...
        } from ''/ezlibrary/ezclocker-classes/EzClasses.js';
    ---------------------------------------------------------------------
    Import all classes in this module with:
        import {
            EzSingletonRequiredDependencyInfo,
            EzSingletonRequiredDependencies,
            EzSingleton
        } from '/ezlibrary/EzSingleton.js';
    ---------------------------------------------------------------------
    Import all classes in the module when you also need to import other supported ezClocker JS classes:
         import {
            EzSingletonRequiredDependencyInfo,
            EzSingletonRequiredDependencies,
            EzSingleton,
            ... other supported classes ...
        } from ''/ezlibrary/ezclocker-classes/EzClasses.js';
    ---------------------------------------------------------------------
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

/**
    @class {EzSingletonRequiredDependencyInfo}
    @description
    Stores information about a dependency class that is required before
    a EzSingleton derrived class to register with EzApi.
    ---------------------------------------------------------------------
    NOTE:
        In most cases the EzSingletonRequiredDependencInfo class is not
        needed outside of this module.
    ---------------------------------------------------------------------
    Import with:
        import { EzSingletonRequiredDependencyInfo } from '/ezlibrary/EzSingleton.js';
    ---------------------------------------------------------------------
    Import when you also need to import other supported ezClocker JS classes:
        import {
            EzSingletonRequiredDependencyInfo,
            ... other supported classes ...
        } from ''/ezlibrary/ezclocker-classes/EzClasses.js';
    ---------------------------------------------------------------------
 */
export class EzSingletonRequiredDependencyInfo {
    /**
        @public @constructor
        Creates a new instance of EzSingletonRequiredDependencyInfo
        @param {string} singletonEzApiName
        The ezApiName of the dependency class that is required.
        @param {undefined|null|string} singletonOnReadyEventName
        The name of the onReady event for the dependency class.
        NOTE:
            If the singletonOnReadyEventName is undefined, null, blank, or
            not a string then the constructor will 'guess' the name of the onReady
            event using the following pattern:
                let assumedClassName = singletonEzApiName.charAt(0).toUpperCase() + singletonEzApiName.slice(1);
                singletonOnReadyEventName = `ezOn_${assumedClassName}_Ready`;
     */
    constructor (singletonEzApiName, singletonOnReadyEventName) {
        if (!singletonEzApiName || 'string' !== typeof singletonEzApiName || 0 == singletonEzApiName.length) {
            throw new EzBadParamException(
                'singletonEzApiName',
                this,
                this.constructor);
        }

        if (!singletonOnReadyEventName || 'string' !== typeof singletonOnReadyEventName || 0 == singletonOnReadyEventName.length) {
            let assumedClassName = singletonEzApiName.charAt(0).toUpperCase() + singletonEzApiName.slice(1);
            singletonOnReadyEventName = `ezOn_${assumedClassName}_Ready`;
        }

        this.#ezSingletonEzApiName = singletonEzApiName;
        this.#ezSingletonOnReadyEventName = singletonOnReadyEventName;
    }

    /**
        @private @field
        Stores the required dependency's ezApiName
        @type {string}
     */
    #ezSingletonEzApiName = null;

    /**
        @public @readonly @property @getter
        Gets the required dependency's ezApiName
        @returns {string}
     */
    get ezSingletonEzApiName() {
        return this.#ezSingletonEzApiName;
    }

    /**
        @private @field
        Stores the required dependency's' onReady event name.
        @type {string}
     */
    #ezSingletonOnReadyEventName =  null;

    /**
        @public @readonly @property @getter
        Gets the required dependency's' onReady event name.
        @returns {string}
     */
    get ezSingletonOnReadyEventName() {
        return this.#ezSingletonOnReadyEventName;
    }
}

/**
    @public @class {EzSingletonRequiredDependencies}
    @description
    Stores the ezApiName name of classes that another class requires ready before registring with EzApi.
    ---------------------------------------------------------------------
    Import with:
        import { EzSingletonRequiredDependencies } from '/ezlibrary/EzSingleton.js';
    ---------------------------------------------------------------------
    Import when you also need to import other supported ezClocker JS classes:
        import {
            EzSingletonRequiredDependencies,
            ... other supported classes ...
        } from ''/ezlibrary/ezclocker-classes/EzClasses.js';
    ---------------------------------------------------------------------
 */
export class EzSingletonRequiredDependencies {
    /**
        @public @constructor
        Creates a new instancel of EzSingletongRequiredDependencies
        @param {undefined|null|Array} ezSingletonRequiredDependencyInfos
     */
    constructor (ezSingletonRequiredDependencyInfos) {
        if (ezSingletonRequiredDependencyInfos &&
            'object' === typeof ezSingletonRequiredDependencyInfos &&
            'Array' === ezSingletonRequiredDependencyInfos.constructor.name) {
            this.#ezSingletonRequiredDependencyInfos = [...ezSingletonRequiredDependencyInfos];
        }
    }

    /**
        @private @field
        Stores the array of EzSingletonRequiredDependencyInfo's required by a class
        derrived from EzSingleton.
        @type {Array}
        An array of EzSingletonRequiredDependencyInfo classes.
     */
    #ezSingletonRequiredDependencyInfos = [];

    /**
        @public @readonly @property @getter
        Gets the array of EzSingletonRequiredDependencyInfo's required by a class
        derrived from EzSingleton.
        @returns {Array}
        An array of EzSingletonRequiredDependencyInfo classes.
     */
    get ezSingletonRequiredDependencyInfos() {
        return this.#ezSingletonRequiredDependencyInfos;
    }

    /**
        @public @method
        Adds a ezSingletonRequiredDependencyInfo info to the array of required dependencies.
        @param {EzSingletonRequiredDependencyInfo} ezSingletonRequiredDependencyInfo
     */
    ezSingletonRequires(ezSingletonRequiredDependencyInfo) {
        if (!ezSingletonRequiredDependencyInfo || 'EzSingletonRequiredDependencyInfo' !== ezSingletonRequiredDependencyInfo.constructor.name) {
            throw new EzBadParamException(
                'ezSingletonRequiredDependencyInfo',
                this,
                this.ezRequireDependency);
        }

        this.#ezSingletonRequiredDependencyInfos.push(ezSingletonRequiredDependencyInfo);
    }
}

/**
    @public @class {EzSingleton}
    @description
    Base class for ezClocker Website Javascript Classes
    ---------------------------------------------------------------------------
    WARNING:
        1) Do not import /ezlibrary/exceptions/EzExceptions.js into this class
    ---------------------------------------------------------------------
    Import with:
        import { EzSingleton } from '/ezlibrary/EzSingleton.js';
    ---------------------------------------------------------------------
    Import when you also need to import other supported ezClocker JS classes:
        import {
            EzSingleton,
            ... other supported classes ...
        } from ''/ezlibrary/ezclocker-classes/EzClasses.js';
    ---------------------------------------------------------------------
 */
export class EzSingleton {

    /**
        @private @field
        Stores the map of EzSingletonRequiredDependencies initialized for EzSingleton objects.
        @type {Object}
     */
    #ezSingletonRequiredDependenciesMap = {};

    /**
        @public @readonly @property
        Gets the map of EzSingletonRequiredDependencies initialized for all EzSingleton derrived classes.
        @type {Object}
     */
    get ezSingletonRequiredDependenciesMap() {
        return this.#ezSingletonRequiredDependenciesMap;
    }

    /**
        @static
        @public @readonly @property
        Returns the name of this class's singleton instance when registered with ezApi.
        @returns {String}
     */
    static get ezApiName() {
        return 'ezSingleton';
    }

    /**
        @static
        @private @field
        Stores the EzApi registration state of the singleton instance of this class.
        @type {boolean}
     */
    static #ezApiRegistrationState = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzSingleton.ezApiName])
        ? EzRegistrationState.REGISTERED
        : null;

    /**
        @static
        @public @property @getter
        Returns the EzApi registration state of this classes's singleton instance.
        @returns {string}
        A valid enum property value from EzRegistrationState
     */
    static get ezApiRegistrationState() {
        return this.#ezApiRegistrationState;
    }

    /**
        @static
        @public @property @setter
        Sets the ezApi registration state of this classes's singleton instance.
        @param {string} ezApiRegistrationState
        A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        this.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
    }

    /**
        @static
        @private @field
        Stores the singleton instance of this class that was created by and registerd with EzApi.
        @type {object}
     */
    static #ezInstance = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzSingleton.ezApiName])
        ? globalThis.ezApi.ezclocker[EzSingleton.ezApiName]
        : null;

    /**
        @static
        @public @property @getter
        Returns the singleton instance of this class that is registered with EzApi (if available yet)
        @returns {object}
        Returns the singleton instance of this class or null if the singleton instance is not yet
        availabe.
     */
    static get ezInstance() {
        return this.#ezInstance;
    }

    /**
        @static
        @public @property @getter
        Sets the singleton instance of of this class that is registered with EzApi.
        @param {object} singletonInstance
     */
    static set ezInstance(singletonInstance) {
        if (null != this.#ezInstance) {
            throw new Error(`${this.constructor.name}'s singleton instance is already reigstered with EzApi.`);
        }

        this.#ezInstance = undefined != singletonInstance && null != singletonInstance
            ? singletonInstance
            : null;
    }

    /**
        @static
        @public @readonly @property @getter
        Returns the name of instance member on globalThis that
        will store the singleton reference of EzApi
        (when it is available)
        @returns {string}
     */
    static get EZAPI_GLOBAL_THIS_NAME() {
        return 'ezApi';
    }

    /**
        @static
        @public @readonly @property @getter
        Returns the name of the document custom event that is fired
        when the singletong instance of EzApi is ready to use.
        @returns {string}
     */
    static get ezApiOnReadyEventName() {
        return 'onEzApiReady';
    }

    /**
        @static
        @public @readonly @property @getter
        Returns the singleton reference to EzApi from globalThis.
        If the EzApi singleton is not yet available, null is returned.
        @returns {null|EzApi}
     */
    static get ezApiInstance() {
        return EzSingleton.ezApiIsReady
            ? globalThis['ezApi']
            : null;
    }

    /**
        @static
        @public @readonly @property @getter
        Returns true if the EzApi singleton instance on globalThis is ready to use.
        @returns {boolean}
     */
    static get ezApiIsReady() {
        return EzObject.hasProperty(globalThis, 'ezApi') &&
            EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready);
    }


    /**
        @static
        @public @readonly @property @getter
        Returns if EzApi is ready for use.
        @returns {boolean}
     */
    static get ezCanRegisterWithEzApi() {
        if (!EzSingleton.ezApiIsReady) {
            if (globalThis && Object.prototype.hasOwnProperty.call(globalThis, 'console')) {
                console.info(
                    `Cannot register ${this.constructor.name} yet: ` +
                    `The globalThis.ezApi singleton instance is not available yet.`);
            }
            return false;
        }

        for (const ezSingletonRequiredDependencyInfo of this.#ezSingletonRequiredDependenciesMap[this.constructor.name]) {
            let dependencyRegistered = Object.prototype.hasOwnProperty.call(
                    globalThis.ezApiezclocker,
                    ezSingletonRequiredDependencyInfo.ezSingletonEzApiName) &&
                    globalThis.ezApi.ezclocker[ezSingletonRequiredDependencyInfo.ezSingletonEzApiName] &&
                    globalThis.ezApi.ezclocker[ezSingletonRequiredDependencyInfo.ezSingletonEzApiName].ready;
            if (!dependencyRegistered) {
                if (globalThis && Object.prototype.hasOwnProperty.call(globalThis, 'console')) {
                    console.info(
                        `Cannot register ${this.constructor.name} yet: The required dependency ` +
                        `globalThis.ezApi.ezclocker.${ezSingletonRequiredDependencyInfo.ezSingletonEzApiName}` +
                        ' is not available yet.');
                }

                return false;
            }
        }

        return true;
    }

    /**
        @static
        @public @readonly @property @getter
        Returns if the singleton instance of this class is
        registered with EzApi and is ready for use.
        @returns {boolean}
     */
    static get ezIsRegisteredWithEzApi() {
        return this.ezApiIsReady &&
            Object.prototype.hasOwnProperty.call(this.ezApiInstance, this.ezApiName) &&
            this.ezApiInstance[this.ezApiName] &&
            this.ezApiInstance[this.ezApiName].ready;
    }

    /**
        @static
        @public @method
        Attempts to register a singleton instance of this class with EzApi.
        Returns true if the attempt was successful. False otherwise.
     */
    static ezRegisterWithEzApi() {
        this.ezApiRegistrationState = EzRegistrationState.PENDING;

        if (this.ezCanRegisterWithEzApi && !this.ezIsRegisteredWithEzApi) {
            this.ezApiInstance.ezRegisterNewApi(
                this.constructor.name,
                this.ezApiName);
        }

        return this.ezIsRegisteredWithEzApi;
    }

    /**
        @public @static @method
        After all of this class's required dependencies return ready this class
        is registered with EzApi.
        EzApi registration creates a singleton instance (store in this class's static ezInstance property)
        and also exposes the singleton reference from ezApi's ezclocker array property of registered
        singleton instances.
        After registration with EzApi the 'onReady' event for this class is triggered on the window.document.
        @param {EzSingletonRequiredDependencies} ezSingletonRequiredDependencies
     */
    static ezIntiSingleton(ezSingletonRequiredDependencies) {
        if (!ezSingletonRequiredDependencies || 'ezSingletonRequiredDependencies' !== ezSingletonRequiredDependencies.constructor.name) {
            throw new EzBadParamException(
                'ezSingletonRequiredDependencies',
                this,
                this.ezIntiSingleton);
        }

        this.#ezSingletonRequiredDependenciesMap[this.constructor.name] = ezSingletonRequiredDependencies;

        document.addEventListener(
            this.ezApiOnReadyEventName,
            this.ezRegisterWithEzApi);

        for (const ezSingletonRequiredDependencyInfo of this.#ezSingletonRequiredDependenciesMap[this.constructor.name]) {
            if (ezSingletonRequiredDependencyInfo) {
                document.addEventListener(
                    ezSingletonRequiredDependencyInfo.ezSingletonOnReadyEventName,
                    this.ezRegisterWithEzApi);
            }
        }
    }

    /**
        @public @constructor
        >> DO NOT CREATE NEW INSTANCES (lol) <<
        This class is intended to be used as a parent class for
        classes that register as a singleton instance with EzApi.
     */
    constructor() {
        this.ezStates.push(EzInstanceState.CONSTRUCTED);
    }

    /**
        @public @field
        Stores if the singleton instance of this class is ready for use or not.
        Default value is false.
        @type {boolean}
     */
    #ready = false;

    /**
        @public @getter @property
        Gets if the singleton instance of this class is ready for use or not.
        @returns {boolean}
     */
    get ready() {
        if (globalThis && Object.prototype.hasOwnProperty.call(globalThis, 'console')) {
            if (this.#ready) {
                globalThis['console'].info(`[${this.constructor.name}]:[READY]: Singleton instance is ready for use.`);
            } else {
                globalThis['console'].debug(`[${this.constructor.name}]:[READY]: Singleton instance is NOT yet ready for use.`);
            }
        }

        return this.#ready;
    }

    /**
        @public @setter @property
        Sets if the singleton instance of this class is ready for use or not.
        If the provided isReady is undefiend or null then the current value of
        the private this.#ready field is maintained.
        @param {boolean} isReady
     */
    set ready(isReady) {
        if ('boolean' !== typeof isReady) {
            return;
        }

        this.#ready = isReady;
    }

    /**
        @private @field
        Stores the array of EzInstanceState for this class.
        Default is an empty array.
        @type {array}
     */
    #ezStates = [];

    /**
        @public @setter @property
        Gets the array of EzInstanceState for this class.
        @returns {array}
     */
    get ezStates() {
        return this.#ezStates;
    }

    /**
        @public @setter @property
        Sets the array of EzInstanceState for this class.
        If the provided states array is undefined or null then the current
        value of the private field this.#ezStates is maintained.
        @param {array} states
     */
    set ezStates(states) {
        if (!states || 'object' !== typeof states || 'Array' !== states.constructor.name) {
            if (globalThis && Object.prototype.hasOwnProperty.call(globalThis, 'console')) {
                globalThis.console.warn(
                    `[${this.constructor.name}]:[ezStates]:` +
                    'Did not set the ezStates value: the provided states param is not a valid Array.');
            }

            return;
        }

        if (globalThis && Object.prototype.hasOwnProperty.call(globalThis, 'console')) {
            globalThis.console.debug(`[${this.constructor.name}]:[EzInstanceState]: ${JSON.stringify(this.#ezStates)}`);
        }

        this.#ezStates = states;
    }
}
