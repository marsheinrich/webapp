import { EzClass } from '/ezlibrary/EzClass.js';

import {
    EzObject,
    EzBoolean,
    EzString,
    EzArray,
    EzPromise,
    EzJson
} from '/ezlibrary/helpers/EzHelpers.js';

import {
    EzRegistrationState
} from '/ezlibrary/enums/EzEnumerations.js';

import { EzEventEngine } from '/ezlibrary/ez-event-engine.js';

import { EzEmployerFeaturePackagesApiClient } from '/ezlibrary/api_clients/EzEmployerFeaturePackagesApiClient.js';

import { EzUI } from '/public/javascript/common/ezui.js';

/**
    @class
    @extends {EzClass}
    @description
    Manages features enabled/disabled via feature packages
    ---------------------------------------------------------------------
    Import with:
        import { EzFeaturePackageManager } from '/ezlibrary/EzFeaturePackageManager.js';
    ---------------------------------------------------------------------
    Ready event checks:
        globalThis.ezApi.ezclocker[EzFeaturePackageManager.ezApiName] &&
        globalThis.ezApi.ezclocker[EzFeaturePackageManager.ezApiName].ready
    ---------------------------------------------------------------------
    Listen for onReady event:
        document.addEventListener(
            EzFeaturePackageManager.ezEventNames.onReady,
            this.#ezRegistrator);
    ---------------------------------------------------------------------
 */
export class EzFeaturePackageManager extends EzClass {
    /**
         @static
         @public @readonly @property
         Returns the name of this class's singleton instance when registered with ezApi.
         @returns {string}
      */
    static ezApiName = 'ezFeaturePackageManager';

    /**
        @static
        @public @readonly @property
        Returns an object of event names that this class may trigger.
        @returns {object}
     */
    static ezEventNames = {
        onReady: 'ezOn_EzFeaturePackageManager_Ready',
        onFeaturePackagesLoaded: 'ezOn_EzFeaturePackageManager_FeaturePackages_Loaded',
        onFeaturePackagesApplied: 'ezOn_EzFeaturePackageManager_FeaturePackages_Applied'
    };

    /**
        @static
        @private @field
        Stores the singleton instance of this class that was created by and registerd with EzApi.
        @type {EzFeaturePackageManager}
     */
    static #ezInstance = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzFeaturePackageManager.ezApiName])
        ? globalThis.ezApi.ezclocker[EzFeaturePackageManager.ezApiName]
        : null;
    /**
        @static
        @public @property @getter
        Returns the singleton instance of this class that is registered with EzApi (if available yet)
        @returns {EzResetPasswordView}
     */
    static get ezInstance() {
        return EzFeaturePackageManager.#ezInstance;
    }
    /**
        @static
        @public @property @setter
        Sets the singleton instance of of this class that is registered with EzApi.
        @param {EzFeaturePackageManager} instance
     */
    static set ezInstance(instance) {
        if (null != EzFeaturePackageManager.#ezInstance) {
            throw new Error('EzFeaturePackageManager\'s singleton instance is already reigstered with EzApi.');
        }

        EzFeaturePackageManager.#ezInstance = instance;
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
        EzObject.isValid(globalThis.ezApi.ezclocker[EzFeaturePackageManager.ezApiName])
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
        return EzFeaturePackageManager.#ezApiRegistrationState;
    }
    /**
        @static
        @public @property @setter
        Sets the ezApi registration state of this classes's singleton instance.
        @param {string} ezApiRegistrationState
        A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzFeaturePackageManager.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
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
        return EzRegistrationState.PENDING === EzFeaturePackageManager.ezApiRegistrationState &&
            EzObject.hasProperty(globalThis, 'ezApi') &&
            EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&

            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName] &&
            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzEmployerFeaturePackagesApiClient.ezApiName] &&
            globalThis.ezApi.ezclocker[EzEmployerFeaturePackagesApiClient.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzUI.ezApiName] &&
            globalThis.ezApi.ezclocker[EzUI.ezApiName].ready;
    }

    /**
        @static
        @private @readonly @property
        Returns if this class's singleton instance is registered with ezApi yet.
        @returns {boolean}
     */
    static get #ezIsRegistered() {
        return null != EzFeaturePackageManager.ezInstance &&
            EzRegistrationState.REGISTERED === EzFeaturePackageManager.ezApiRegistrationState;
    }

    /**
        @static
        @private @method
        Attempts to register the singleton instance for this class with ezApi. Returns true
        if successful, false otherwise.
        @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzFeaturePackageManager.#ezCanRegister && !EzFeaturePackageManager.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzFeaturePackageManager, EzFeaturePackageManager.ezApiName);
        }

        return EzFeaturePackageManager.#ezIsRegistered;
    }

    /**
        @static
        Static Initialization
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        >> IMPORTANT <<
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        Make sure the following properties and methods get defined BEFORE this static initialization section:
            1) Property getter EzFeaturePackageManager.ezApiName
            2) Property getter EzFeaturePackageManager.ezEventNames
            3) Property getter EzFeaturePackageManager.ezInstance
            4) Property setter EzFeaturePackageManager.ezInstance
            5) Property getter EzFeaturePackageManager.ezApiRegistrationState
            6) Property setter EzFeaturePackageManager.ezApiRegistrationState
            7) Property getter EzFeaturePackageManager.#ezCanRegister
            8) Property getter EzFeaturePackageManager.#ezIsRegistered
            9) Method EzFeaturePackageManager.#ezRegistrator()
     */
    static {
        if (!EzFeaturePackageManager.#ezIsRegistered) {
            EzFeaturePackageManager.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzFeaturePackageManager.#ezRegistrator()) {
                document.addEventListener(
                    EzFeaturePackageManager.ezOnEzApiReadyEventName,
                    () => {
                        if (!EzFeaturePackageManager.#ezRegistrator()) {
                            document.addEventListener(
                                EzEventEngine.ezEventNames.onReady,
                                EzFeaturePackageManager.#ezRegistrator);

                            document.addEventListener(
                                EzEmployerFeaturePackagesApiClient.ezEventNames.onReady,
                                EzFeaturePackageManager.#ezRegistrator);

                            // Other ready listeners as needed
                            // If a dependency ready check is added to the #ezCanRegister()
                            // then the ready listener will need added here as well.
                            document.addEventListener(
                                EzUI.ezEventNames.onReady,
                                EzFeaturePackageManager.#ezRegistrator);
                        }
                    });
            }
        }
    }

    /**
        @public @constructor
        >> DO NOT CREATE NEW INSTANCES OUTSIDE OF THE STATIC INITIALIZATION FLOW <<
        Use the static singleton instance available from ezApi: ezApi.ezclocker.EzFeaturePackageManager.
    */
    constructor() {
        super();
    }

    #ezStateFlags = {
        featurePackagesLoaded: false
    };
    get ezStateFlags() {
        return this.#ezStateFlags;
    }
    set ezStateFlags(ezStateFlags) {
        if (!EzObject.isValid(ezStateFlags)) {
            throw new EzBadParamException(
                'ezStateFlags',
                this,
                this.ezStateFlags);
        }

        this.#ezStateFlags = ezStateFlags;
    }

    /**
        @private @field
        Stores the available feature packages for the authenticated user
        @type {array}
     */
    #ezFeaturePackages = [];
    /**
        @public @property @getter
        Gets the available feature packages for the authenticated user
        @returns {array}
     */
    get ezFeaturePackages() {
        return this.#ezFeaturePackages;
    }
    /**
        @public @property @setter
        Sets the available feature packages for the authenticated user
        @returns {array}
     */
    set ezFeaturePackages(ezFeaturePackages) {
        this.#ezFeaturePackages = EzArray.arrayOrEmpty(ezFeaturePackages);
    }

    /**
        @protected @method
        Initializes EzFeaturePackageManager
        @returns {EzFeaturePackageManager}
     */
    ezInit() {
        EzFeaturePackageManager.ezInstance.ezRegisterEvents();

        EzFeaturePackageManager.ezInstance.ezInitData()
            .then(
                () => {
                    ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                        EzFeaturePackageManager.ezEventNames.onFeaturePackagesLoaded,
                        ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                            EzFeaturePackageManager.ezApiName,
                            'Feature packages loaded',
                            EzFeaturePackageManager.ezInstance));
                });

        return EzFeaturePackageManager.ezInstance;
    }

    /**
        @protected @method
        Registers the events this class triggers using EzEventEngine.
        Example registration:
            ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
                EzFeaturePackageManager.ezEventNames.onEzFeaturePackageManagerEventName,
                EzFeaturePackageManager.ezApiName);
     */
    ezRegisterEvents() {
        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzFeaturePackageManager.ezApiName,
            EzFeaturePackageManager.ezEventNames.onFeaturePackagesLoaded);
    }

    /**
        @protected @method
        Initializes EzFeaturePackageManager data
     */
    ezInitData() {
        return EzPromise.asyncAction(
            (finished) => {
                // Initialize any data needed before the UX is rendered
                ezApi.ezclocker.ezEmployerFeaturePackagesApiClient.ezGetAllFeaturePackagesForEmployer()
                    .then(
                        (response) => {
                            EzFeaturePackageManager.ezInstance.ezFeaturePackages = response.entities;

                            EzFeaturePackageManager.ezInstance.ezStateFlags.featurePackagesLoaded = true;

                            return finished();
                        },
                        (eResponse) => {
                            ezApi.ezclocker.ezLogger.error(
                                EzString.em`
                                    Failed to load the available feature packages for the currently
                                    authenticated user due to the folowing error: ${eResponse.message}.
                                    [Error Response: ${EzJson.toJson(eResponse)}]`);

                            EzFeaturePackageManager.ezInstance.ezFeaturePackages = [];

                            EzFeaturePackageManager.ezInstance.ezStateFlags.featurePackagesLoaded = true;

                            return finished();
                        });
            });
    }

    /**
     * @public @method
     * Enables UX (display:unset) the feature package toggles to the current UX
     * @returns {Promise.resolve}
     */
    ezApplyFeaturePackageToggles() {
        return EzPromise.asyncAction(
            (finished) => {
                if (!EzArray.arrayHasLength(EzFeaturePackageManager.ezInstance.ezFeaturePackages)) {
                    // No Feature Packages to enable
                    return finished();
                }

                for (let employerFeaturePackage of EzFeaturePackageManager.ezInstance.ezFeaturePackages) {
                    if (EzBoolean.isTrue(employerFeaturePackage.enabled)) {
                        let featurePackageElements = document.querySelectorAll(
                            `[data-feature-package-id="${employerFeaturePackage.featurePackageId}"]`);

                        featurePackageElements.forEach(
                            (element) => {
                                element.style.display = 'contents';
                            });
                    }
                }

                ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                    EzFeaturePackageManager.ezEventNames.onFeaturePackagesApplied,
                    ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                        EzFeaturePackageManager.ezApiName,
                        'Feature packages applied for the currently authenticated user.',
                        this));

                return finished();
            });
    }

    /**
        @public @method
        Returns if a feature package assocaited with the provided featurePackageId is
        available or not.
        @param {string} featurePackageId
        @returns {boolean}
     */
    ezFeaturePackageEnabled(featurePackageId) {
        if (!EzString.stringHasLength(featurePackageId)) {
            return false;
        }

        for (let employerFeaturePackage of EzFeaturePackageManager.ezInstance.ezFeaturePackages) {
            if (employerFeaturePackage.featurePackageId === featurePackageId) {
                return true;
            }
        }

        return false;
    }
}
