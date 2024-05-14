import { EzApiClient } from '/ezlibrary/api_clients/EzApiClient.js';

import {
    EzObject,
    EzBoolean
} from '/ezlibrary/helpers/EzHelpers.js';

import {
    EzRegistrationState
} from '/ezlibrary/enums/EzEnumerations.js';

import { EzEntityCollectionResponse } from '/ezlibrary/entities/responses/EzEntityCollectionResponse.js';

/**
    @class
    @extends {EzClass}
    @description
    Description of what class is for here :)
    ---------------------------------------------------------------------
    Import with:
        import { EzEmployerFeaturePackagesApiClient } from '/ezlibrary/api_clients/EzEmployerFeaturePackagesApiClient.js';
    ---------------------------------------------------------------------
    Ready Check:
        globalThis.ezApi.ezclocker[EzEmployerFeaturePackagesApiClient.ezApiName] &&
        globalThis.ezApi.ezclocker[EzEmployerFeaturePackagesApiClient.ezApiName].ready
    ---------------------------------------------------------------------
    Listen for Ready Event:
        document.addEventListener(
            EzEmployerFeaturePackagesApiClient.ezEventNames.onReady,
            this.#ezRegistrator);
    ---------------------------------------------------------------------
 */
export class EzEmployerFeaturePackagesApiClient extends EzApiClient {
    /**
        @static
        @public @readonly @property
        Returns the name of this class's singleton instance when registered with ezApi.
        @returns {string}
     */
    static ezApiName = 'ezEmployerFeaturePackagesApiClient';

    /**
        @static
        @public @readonly @property
        Returns an object of event names that this class may trigger.
        @returns {object}
     */
    static ezEventNames = {
        onReady: 'ezOn_EzEmployerFeaturePackagesApiClient_Ready'
    };

    /**
        @static
        @private @field
        Stores the singleton instance of this class that was created by and registerd with EzApi.
        @type {EzEmployerFeaturePackagesApiClient}
     */
    static #ezInstance = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzEmployerFeaturePackagesApiClient.ezApiName])
        ? globalThis.ezApi.ezclocker[EzEmployerFeaturePackagesApiClient.ezApiName]
        : null;

    /**
        @static
        @public @property @getter
        Returns the singleton instance of this class that is registered with EzApi (if available yet)
        @returns {EzResetPasswordView}
     */
    static get ezInstance() {
        return EzEmployerFeaturePackagesApiClient.#ezInstance;
    }

    /**
        @static
        @public @property @setter
        Sets the singleton instance of of this class that is registered with EzApi.
        @param {EzEmployerFeaturePackagesApiClient} instance
     */
    static set ezInstance(instance) {
        if (null != EzEmployerFeaturePackagesApiClient.#ezInstance) {
            throw new Error('EzEmployerFeaturePackagesApiClient\'s singleton instance is already reigstered with EzApi.');
        }

        EzEmployerFeaturePackagesApiClient.#ezInstance = instance;
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
        EzObject.isValid(globalThis.ezApi.ezclocker[EzEmployerFeaturePackagesApiClient.ezApiName])
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
        return EzEmployerFeaturePackagesApiClient.#ezApiRegistrationState;
    }

    /**
        @static
        @public @property @setter
        Sets the ezApi registration state of this classes's singleton instance.
        @param {string} ezApiRegistrationState
        A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzEmployerFeaturePackagesApiClient.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
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
        return EzRegistrationState.PENDING === EzEmployerFeaturePackagesApiClient.ezApiRegistrationState &&
            EzObject.hasProperty(globalThis, 'ezApi') &&
            EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready);
    }

    /**
        @static
        @private @readonly @property
        Returns if this class's singleton instance is registered with ezApi yet.
        @returns {boolean}
     */
    static get #ezIsRegistered() {
        return null != EzEmployerFeaturePackagesApiClient.ezInstance &&
            EzRegistrationState.REGISTERED === EzEmployerFeaturePackagesApiClient.ezApiRegistrationState;
    }

    /**
        @static
        @private @method
        Attempts to register the singleton instance for this class with ezApi. Returns true
        if successful, false otherwise.
        @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzEmployerFeaturePackagesApiClient.#ezCanRegister && !EzEmployerFeaturePackagesApiClient.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzEmployerFeaturePackagesApiClient, EzEmployerFeaturePackagesApiClient.ezApiName);
        }

        return EzEmployerFeaturePackagesApiClient.#ezIsRegistered;
    }

    /**
        @static
        Static Initialization
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        >> IMPORTANT <<
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        Make sure the following properties and methods get defined BEFORE this static initialization section:
            1) Property getter EzEmployerFeaturePackagesApiClient.ezApiName
            2) Property getter EzEmployerFeaturePackagesApiClient.ezEventNames
            3) Property getter EzEmployerFeaturePackagesApiClient.ezInstance
            4) Property setter EzEmployerFeaturePackagesApiClient.ezInstance
            5) Property getter EzEmployerFeaturePackagesApiClient.ezApiRegistrationState
            6) Property setter EzEmployerFeaturePackagesApiClient.ezApiRegistrationState
            7) Property getter EzEmployerFeaturePackagesApiClient.#ezCanRegister
            8) Property getter EzEmployerFeaturePackagesApiClient.#ezIsRegistered
            9) Method EzEmployerFeaturePackagesApiClient.#ezRegistrator()
     */
    static {
        if (!EzEmployerFeaturePackagesApiClient.#ezIsRegistered) {
            EzEmployerFeaturePackagesApiClient.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzEmployerFeaturePackagesApiClient.#ezRegistrator()) {
                document.addEventListener(
                    EzEmployerFeaturePackagesApiClient.ezOnEzApiReadyEventName,
                    EzEmployerFeaturePackagesApiClient.#ezRegistrator);
            }
        }
    }

    /**
        @public @constructor
        >> DO NOT CREATE NEW INSTANCES OUTSIDE OF THE STATIC INITIALIZATION FLOW <<
        Use the static singleton instance available from ezApi: ezApi.ezclocker.EzEmployerFeaturePackagesApiClient.
    */
    constructor() {
        super('/_api/v1/feature-packages');
    }

    /**
        @override
        @protected @method
        Initializes EzEmployerFeaturePackagesApiClient
        @returns {EzEmployerFeaturePackagesApiClient}
     */
    ezInit() {
        return EzEmployerFeaturePackagesApiClient.ezInstance;
    }

    /**
        @public @method
        Gets all Feature Packages for the currently logged in employer.
        @returns {Promise}
     */
    ezGetAllFeaturePackagesForEmployer() {
        return EzEmployerFeaturePackagesApiClient.ezInstance.ezGet()
            .then(
                EzEntityCollectionResponse.ezFromResponse,
                EzEntityCollectionResponse.ezFromResponse);
    }
}
