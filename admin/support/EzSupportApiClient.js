import { EzApiClient } from "../../ezlibrary/api_clients/EzApiClient";
import {EzObject} from "../../ezlibrary/helpers/EzObject";
import {EzBoolean} from "../../ezlibrary/helpers/EzBoolean";
import {EzRegistrationState} from "../../ezlibrary/enums/EzRegistrationState";

export class EzSupportApiClient extends EzApiClient {
    /**
     @static
     @public @readonly @property
     Returns the name of this class's singleton instance when registered with ezApi.
     @returns {string}
     */
    static ezApiName = 'ezSupportApiClient';

    /**
     @static
     @public @readonly @property
     Returns an object of event names that this class may trigger.
     @returns {object}
     */
    static ezEventNames = {
        onReady: 'ezOn_EzSupportApiClient_Ready'
    };

    /**
     @static
     @private @field
     Stores the singleton instance of this class that was created by and registerd with EzApi.
     @type {EzSupportApiClient}
     */
    static #ezInstance = EzObject.hasProperty(globalThis, 'ezApi') &&
    EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
    EzObject.isValid(globalThis.ezApi.ezclocker[EzSupportApiClient.ezApiName])
        ? globalThis.ezApi.ezclocker[EzSupportApiClient.ezApiName]
        : null;

    /**
     @static
     @public @property @getter
     Returns the singleton instance of this class that is registered with EzApi (if available yet)
     @returns {EzSupportApiClient}
     */
    static get ezInstance() {
        return EzSupportApiClient.#ezInstance;
    }

    /**
     @static
     @public @property @setter
     Sets the singleton instance of of this class that is registered with EzApi.
     @param {EzSupportApiClient} instance
     */
    static set ezInstance(instance) {
        if (null != EzSupportApiClient.#ezInstance) {
            throw new Error('EzSupportApiClient\'s singleton instance is already registered with EzApi.');
        }

        EzSupportApiClient.#ezInstance = instance;
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
    EzObject.isValid(globalThis.ezApi.ezclocker[EzSupportApiClient.ezApiName])
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
        return EzSupportApiClient.#ezApiRegistrationState;
    }

    /**
     @static
     @public @property @setter
     Sets the ezApi registration state of this classes's singleton instance.
     @param {string} ezApiRegistrationState
     A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzSupportApiClient.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
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
        return EzRegistrationState.PENDING === EzSupportApiClient.ezApiRegistrationState &&
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
        return null != EzSupportApiClient.ezInstance &&
            EzRegistrationState.REGISTERED === EzSupportApiClient.ezApiRegistrationState;
    }

    /**
     @static
     @private @method
     Attempts to register the singleton instance for this class with ezApi. Returns true
     if successful, false otherwise.
     @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzSupportApiClient.#ezCanRegister && !EzSupportApiClient.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzSupportApiClient, EzSupportApiClient.ezApiName);
        }

        return EzSupportApiClient.#ezIsRegistered;
    }

    /**
     @static
     Static Initialization
     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     >> IMPORTANT <<
     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     Make sure the following properties and methods get defined BEFORE this static initialization section:
     1) Property getter EzSupportApiClient.ezApiName
     2) Property getter EzSupportApiClient.ezEventNames
     3) Property getter EzSupportApiClient.ezInstance
     4) Property setter EzSupportApiClient.ezInstance
     5) Property getter EzSupportApiClient.ezApiRegistrationState
     6) Property setter EzSupportApiClient.ezApiRegistrationState
     7) Property getter EzSupportApiClient.#ezCanRegister
     8) Property getter EzSupportApiClient.#ezIsRegistered
     9) Method EzSupportApiClient.#ezRegistrator()
     */
    static {
        if (!EzSupportApiClient.#ezIsRegistered) {
            EzSupportApiClient.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzSupportApiClient.#ezRegistrator()) {
                document.addEventListener(
                    EzSupportApiClient.ezOnEzApiReadyEventName,
                    EzSupportApiClient.#ezRegistrator);
            }
        }
    }

    /**
     @public @constructor
     >> DO NOT CREATE NEW INSTANCES OUTSIDE OF THE STATIC INITIALIZATION FLOW <<
     Use the static singleton instance available from ezApi: ezApi.ezclocker.EzEmployerFeaturePackagesApiClient.
     */
    constructor() {
        super('/_api/');
    }

    /**
     @override
     @protected @method
     Initializes EzSupportApiClient
     @returns {EzSupportApiClient}
     */
    ezInit() {
        return EzSupportApiClient.ezInstance;
    }

    /**
     @public @method
     Gets support search response.
     @returns {Promise}
     */
    ezSearchUser(path, version = 'v1', payload) {
        if (payload) {
            return EzSupportApiClient.ezInstance.ezPost(`${version}/${path}`, payload);
        } else {
            return EzSupportApiClient.ezInstance.ezGet(`${path}`);
        }

    }

}