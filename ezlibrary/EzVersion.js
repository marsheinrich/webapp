import {
    EzObject,
    EzBoolean,
    EzString,
    EzPromise,
    EzJson
} from '/ezlibrary/helpers/EzHelpers.js';

import {
    EzRegistrationState,
    EzEnvironment
} from '/ezlibrary/enums/EzEnumerations.js';

import { EzClass } from '/ezlibrary/EzClass.js';

import { EzEventEngine } from '/ezlibrary/ez-event-engine.js';

import { EzHttpHelper } from '/public/javascript/common/ezclocker-http-helper.js';
import { EzNavigation } from '/public/javascript/common/ezclocker-navigation-helper.js';

/**
    @class
    @extends {EzClass}
    @description
    Provides the application version to the JS code base
    ---------------------------------------------------------------------------
    Import with:
        import { EzVersion } from '/ezlibrary/EzVersion.js';
    ---------------------------------------------------------------------------
    Check if ready:
        globalThis.ezApi.ezclocker[EzVersion.ezApiName] &&
        globalThis.ezApi.ezclocker[EzVersion.ezApiName].ready
    ---------------------------------------------------------------------------
    Hook onReady event:
        document.addEventListener(
            EzVersion.ezEventNames.onReady,
            {class_name}.#ezRegistrator);
    ---------------------------------------------------------------------------
    Access singleton instance outside this module:
        ezApi.ezclocker.ezVersion
    Access singleton instance within this module:
        EzVersion.ezInstance
    ---------------------------------------------------------------------------
 */
export class EzVersion extends EzClass {
    /**
        @public @static @readonly @property
        Returns the name of this class's singleton instance when registered with ezApi.
        @returns {String}
     */
    static get ezApiName() {
        return 'ezVersion';
    }

    /**
        @public @static @readonly @property
        Returns an object of event names that this class may trigger.
        @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzVersion_Ready',
            onInitialized: 'ezOn_EzVersion_Initialized',
            onError: 'ezOn_EzVersion_Error'
        };
    }

    /**
         @static
         @private @field
         Stores the singleton instance of this class that was created by and registerd with EzApi.
         @type {EzVersion}
      */
    static #ezInstance = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzVersion.ezApiName])
        ? globalThis.ezApi.ezclocker[EzVersion.ezApiName]
        : null;

    /**
        @static
        @public @property @getter
        Returns the singleton instance of this class that is registered with EzApi (if available yet)
        @returns {EzVersion}
     */
    static get ezInstance() {
        return EzVersion.#ezInstance;
    }

    /**
        @static
        @public @property @setter
        Sets the singleton instance of of this class that is registered with EzApi.
        @param {EzVersion} instance
     */
    static set ezInstance(instance) {
        if (null != EzVersion.#ezInstance) {
            throw new Error('EzVersion\'s singleton instance is already reigstered with EzApi.');
        }

        EzVersion.#ezInstance = instance;
    }

    /**
        @static
        @private @field
        Stores the EzApi registration state for this class.
        Default value is NULL
        Class is registerd with EzApi when value is EzRegistrationState.REGISTERED
        @type {string}
        A valid enum property value from EzRegistrationState
     */
    static #ezApiRegistrationState = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzVersion.ezApiName])
        ? EzRegistrationState.REGISTERED
        : null;

    /**
        @static
        @public @property @getter
        Returns the ezApi registration state of this classes's singleton instance.
        @returns {string}
        A valid enum property value from EzRegistrationState
     */
    static get ezApiRegistrationState() {
        return EzVersion.#ezApiRegistrationState;
    }

    /**
        @static
        @public @property @setter
        Sets the ezApi registration state of this classes's singleton instance.
        @param {string} ezApiRegistrationState
        A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzVersion.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
    }

    /**
        @static
        @private @readonly @property
        Returns true when all required dependencies for this class report ready.
        In otherwords, the require dependency's singleton instance is created
        and is registered with and accessable from EzApi with ezApi.ezclocker.{dependency_name}.
        @returns {boolean}
     */
    static get #ezCanRegister() {
        return EzRegistrationState.PENDING === EzVersion.ezApiRegistrationState &&
            EzObject.hasProperty(globalThis, 'ezApi') &&
            EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&

            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName] &&
            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzHttpHelper.ezApiName] &&
            globalThis.ezApi.ezclocker[EzHttpHelper.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzNavigation.ezApiName] &&
            globalThis.ezApi.ezclocker[EzNavigation.ezApiName].ready;
    }

    /**
       @static
       @private @readonly @property
       Returns if this class's singleton instance is registered with ezApi yet.
       @returns {boolean}
    */
    static get #ezIsRegistered() {
        return null != EzVersion.ezInstance &&
            EzRegistrationState.REGISTERED === EzVersion.ezApiRegistrationState;
    }

    /**
        @static
        @private @method
        Attempts to register the singleton instance for this class with ezApi. Returns true
        if successful, false otherwise.
        @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzVersion.#ezCanRegister && !EzVersion.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzVersion, EzVersion.ezApiName);
        }

        return EzVersion.#ezIsRegistered;
    }

    /**
        @static
        Static Initialization
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        >> IMPORTANT <<
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        Make sure the following properties and methods get defined BEFORE this static initialization section:
            1) Property getter EzVersion.ezApiName
            2) Property getter EzVersion.ezEventNames
            3) Property getter EzVersion.ezInstance
            4) Property setter EzVersion.ezInstance
            5) Property getter EzVersion.ezApiRegistrationState
            6) Property setter EzVersion.ezApiRegistrationState
            7) Property getter EzVersion.#ezCanRegister
            8) Property getter EzVersion.#ezIsRegistered
            9) Method EzVersion.#ezRegistrator()
     */
    static {
        if (!EzVersion.#ezIsRegistered) {
            EzVersion.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzVersion.#ezRegistrator()) {
                document.addEventListener(
                    EzVersion.ezOnEzApiReadyEventName,
                    EzVersion.#ezRegistrator);

                document.addEventListener(
                    EzEventEngine.ezEventNames.onReady,
                    EzVersion.#ezRegistrator);

                document.addEventListener(
                    EzHttpHelper.ezEventNames.onReady,
                    EzVersion.#ezRegistrator);

                document.addEventListener(
                    EzNavigation.ezEventNames.onReady,
                    EzVersion.#ezRegistrator);
            }
        }
    }

    /**
        @public @constructor
        >> DO NOT CREATE NEW INSTANCES OUTSIDE OF THE STATIC INITIALIZATION FLOW <<
        Use the static singleton instance available from ezApi: ezApi.ezclocker.ezVersion.
     */
    constructor() {
        super();
    }

    /**
        @private @field
        Stores the version information for ezClocker services.
        @type {object}
     */
    #ezVersionInfo = {
        targetEnvironment: EzEnvironment.PRD,
        environment: EzEnvironment.PRD,
        version: 'rUNKNOWN',
        build: '0',
        buildDate: EzString.EMPTY,
        branch: EzString.EMPTY
    };
    /**
        @public @property @getter
        Gets the version information for ezClocker services.
        @returns {object}
     */
    get ezVersionInfo() {
        return this.#ezVersionInfo;
    }
    /**
        @public @property @setter
        Sets the version information for ezClocker services.
        @param {undefined|null|object} ezVersionInfo
     */
    set ezVersionInfo(ezVersionInfo) {
        if (!EzObject.isValid(ezVersionInfo)) {
            this.#ezVersionInfo = {
                targetEnvironment: EzEnvironment.PRD,
                environment: EzEnvironment.PRD,
                version: 'rUNKNOWN',
                build: '0',
                buildDate: EzString.EMPTY,
                branch: EzString.EMPTY
            };
        } else {
            this.#ezVersionInfo.targetEnvironment = EzString.stringOrDefault(
                EzEnvironment.ezAsEnum(ezVersionInfo.targetEnvironment),
                EzEnvironment.PRD);

            this.#ezVersionInfo.environment = EzString.stringOrDefault(
                EzEnvironment.ezAsEnum(ezVersionInfo.targetEnvironment),
                EzEnvironment.PRD);

            this.#ezVersionInfo.version = EzString.stringOrDefault(
                ezVersionInfo.version,
                'rUNKNOWN');

            this.#ezVersionInfo.build = EzString.stringOrDefault(
                ezVersionInfo.build,
                '0');

            this.#ezVersionInfo.buildDate = EzString.stringOrEmpty(ezVersionInfo.buildDate);

            this.#ezVersionInfo.branch = EzString.stringOrEmpty(ezVersionInfo.branch);
        }
    }
    /**
        @public @method
        Get the version information object
        @returns {string}
        @deprecated
        Migrate to using the property:
            ezApi.ezclocker.ezVersion.ezVersionInfo
     */
    ezGetVersionInfo() {
        return EzVersion.ezInstance.ezVersionInfo;
    }

    /**
        @public @readonly @property
        Gets the enviornment id
        @returns {string}
        A valid enumeration value from EzEnvironment
     */
    get ezEnvironment() {
        return this.ezVersionInfo.environment;
    }
    /**
        @public @method
        Get the current ezClocker environment id
        @returns {string}
        A valid enumeration value from EzEnvironment
        @deprecated
        Migrate to the property:
            ezApi.ezclocker.ezVersion.ezEnvironment
     */
    ezGetEnvironment() {
        return EzVersion.ezInstance.ezVersionInfo.environment;
    }

    /**
        @public @readonly @property
        Get the version of the ezClocker website and services
        @returns {string}
        A valid enumeration value from EzEnvironment
     */
    get ezVersion() {
        return this.ezVersionInfo.version;
    }
    /**
        @public @method
        Get the version of the ezClocker website and services
        @returns {string}
        @deprecated
        Migrate to the property:
            ezApi.ezclocker.ezVersion.ezVersion
     */
    ezGetVersion() {
        return EzVersion.ezInstance.ezVersionInfo.version;
    }

    /**
        @public @readonly @property
        Gets the build number for the ezClocker website and services
        @returns {string}
     */
    get ezBuild() {
        return this.ezVersionInfo.build;
    }
    /**
        @public @method
        Get the current ezClocker version's build number.
        @returns {string}
        @deprecated
        Migrate to the property:
            ezApi.ezclocker.ezVersion.ezBuild
     */
    ezGetBuild() {
        return EzVersion.ezInstance.ezVersionInfo.build;
    }

    /**
        @protected
        Initializes EzVersion
        @returns {EzVersion}
     */
    ezInit() {
        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzVersion.ezApiName,
            EzVersion.ezEventNames.onInitialized);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzVersion.ezApiName,
            EzVersion.ezEventNames.onError);

        EzVersion.ezInstance.ezLoadServiceVersionInfo();

        return EzVersion.ezInstance;
    }

    /**
        @public @method
        Obtains the version info from the ezClocker service.
        @returns {Promise.resolve}
     */
    ezLoadServiceVersionInfo() {
        return EzPromise.asyncAction(
            (finished) => ezApi.ezclocker.ezHttpHelper.ezGet(
                ezApi.ezclocker.ezNavigation.ezGetPublicApiServiceUrl('version', 'v1'))
                .then(
                    (response) => {
                        EzVersion.ezInstance.ezVersionInfo = response;

                        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                            EzVersion.ezEventNames.onInitialized,
                            ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                                EzVersion.ezApiName,
                                'EzVersion information is ready.',
                                {
                                    response: response,
                                    ezVersion: EzVersion.ezInstance
                                }));

                        return finished();
                    },
                    (eResponse) => {
                        ezApi.ezclocker.ezLogger.error(
                            EzString.em`
                                Unable to obtain the ezClocker service version information.
                                Error: ${EzJson.toJson(eResponse)}`);

                        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                            EzVersion.ezEventNames.onError,
                            ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                                EzVersion.ezApiName,
                                'Error obtaining version information.',
                                {
                                    response: eResponse,
                                    ezVersion: EzVersion.ezInstance
                                }));

                        return finished();
                    }));
    }
}
