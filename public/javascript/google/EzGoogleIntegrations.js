import {
    EzObject,
    EzBoolean,
    EzString,
} from '/ezlibrary/helpers/EzHelpers.js';

import {
    EzRegistrationState
} from '/ezlibrary/enums/EzEnumerations.js';

import { EzClass } from '/ezlibrary/EzClass.js';

import { EzEventEngine } from '/ezlibrary/ez-event-engine.js';
import { EzHttpHelper } from '/public/javascript/common/ezclocker-http-helper.js';

import { EzUI } from '/public/javascript/common/ezui.js';

/**
 * @class
 * @extends {EzClass}
 * @description
 * Manager for Google Integrations used in ezClocker website.
 */
export class EzGoogleIntegrations extends EzClass {
    /**
        @static
        @public @readonly @property
        Returns the name of this class's singleton instance when registered with ezApi.
        @returns {string}
     */
    static get ezApiName() {
        return 'ezGoogleIntegrations';
    }

    /**
        @static
        @public @readonly @property
        Returns an object of event names that this class may trigger.
        @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzGoogleApi_Ready',
            onInjectingGoogleMaps: `${EzGoogleApi.ezApiName}_Maps_Injecting`,
            onGoogleMapsReady: `${EzGoogleApi.ezApiName}_Maps_Ready`,
            onGoogleMapsError: `${EzGoogleApi.ezApiName}_Maps_Error`
        };
    }

    /**
        @static
        @private @field
        Stores the singleton instance of this class that was created by and registerd with EzApi.
        @type {EzGoogleIntegrations}
     */
    static #ezInstance = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzGoogleIntegrations.ezApiName])
        ? globalThis.ezApi.ezclocker[EzGoogleIntegrations.ezApiName]
        : null;

    /**
        @static
        @public @property @getter
        Returns the singleton instance of this class that is registered with EzApi (if available yet)
        @returns {EzGoogleIntegrations}
     */
    static get ezInstance() {
        return EzGoogleIntegrations.#ezInstance;
    }

    /**
        @static
        @public @property @setter
        Sets the singleton instance of of this class that is registered with EzApi.
        @param {EzGoogleIntegrations} instance
     */
    static set ezInstance(instance) {
        if (null != EzGoogleIntegrations.#ezInstance) {
            throw new Error('EzGoogleIntegrations\'s singleton instance is already reigstered with EzApi.');
        }

        EzGoogleIntegrations.#ezInstance = instance;
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
        EzObject.isValid(globalThis.ezApi.ezclocker[EzGoogleIntegrations.ezApiName])
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
        return EzGoogleIntegrations.#ezApiRegistrationState;
    }

    /**
        @static
        @public @property @setter
        Sets the ezApi registration state of this classes's singleton instance.
        @param {string} ezApiRegistrationState
        A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzGoogleIntegrations.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
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
        return EzRegistrationState.PENDING === EzGoogleIntegrations.ezApiRegistrationState &&
            EzObject.hasProperty(globalThis, 'ezApi') &&
            EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&

            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName] &&
            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzHttpHelper.ezApiName] &&
            globalThis.ezApi.ezclocker[EzHttpHelper.ezApiName].ready &&

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
        return null != EzGoogleIntegrations.ezInstance &&
            EzRegistrationState.REGISTERED === EzGoogleIntegrations.ezApiRegistrationState;
    }

    /**
        @static
        @private @method
        Attempts to register the singleton instance for this class with ezApi. Returns true
        if successful, false otherwise.
        @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzGoogleIntegrations.#ezCanRegister && !EzGoogleIntegrations.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzGoogleIntegrations, EzGoogleIntegrations.ezApiName);
        }

        return EzGoogleIntegrations.#ezIsRegistered;
    }

    /**
        @static
        Static Initialization
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        >> IMPORTANT <<
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        Make sure the following properties and methods get defined BEFORE this static initialization section:
            1) Property getter EzGoogleIntegrations.ezApiName
            2) Property getter EzGoogleIntegrations.ezEventNames
            3) Property getter EzGoogleIntegrations.ezInstance
            4) Property setter EzGoogleIntegrations.ezInstance
            5) Property getter EzGoogleIntegrations.ezApiRegistrationState
            6) Property setter EzGoogleIntegrations.ezApiRegistrationState
            7) Property getter EzGoogleIntegrations.#ezCanRegister
            8) Property getter EzGoogleIntegrations.#ezIsRegistered
            9) Method EzGoogleIntegrations.#ezRegistrator()
     */
    static {
        if (!EzGoogleIntegrations.#ezIsRegistered) {
            EzGoogleIntegrations.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzGoogleIntegrations.#ezRegistrator()) {
                document.addEventListener(
                    EzGoogleIntegrations.ezOnEzApiReadyEventName,
                    () => {
                        if (!EzGoogleIntegrations.#ezRegistrator()) {
                            document.addEventListener(
                                EzEventEngine.ezEventNames.onReady,
                                EzGoogleIntegrations.#ezRegistrator);

                            document.addEventListener(
                                EzHttpHelper.ezEventNames.onReady,
                                EzGoogleIntegrations.#ezRegistrator);

                            document.addEventListener(
                                EzUI.ezEventNames.onReady,
                                EzGoogleIntegrations.#ezRegistrator);
                        }
                    });
            }
        }
    }

    #ezGoogleMapsLabelApiInjected = false;
    get ezGoogleMapsLabelApiInjected() {
        return this.#ezGoogleMapsLabelApiInjected;
    }
    set ezGoogleMapsLabelApiInjected(googleMapsLabelApiInjected) {
        this.#ezGoogleMapsLabelApiInjected = EzBoolean.isTrue(googleMapsLabelApiInjected);
    }

    #ezGoogleMapsApiInjected = false;
    get ezGoogleMapsApiInjected() {
        return this.#ezGoogleMapsApiInjected;
    }
    set ezGoogleMapsApiInjected(googleMapsApiInjected) {
        this.#ezGoogleMapsApiInjected = EzBoolean.isTrue(ezGoogleMapsApiInjected);
    }

    #ezGoogleMapsApiKey = null;
    get ezGoogleMapsApiKey() {
        return this.#ezGoogleMapsApiKey;
    }
    set ezGoogleMapsApiKey(googleMapsApiKey) {
        this.#ezGoogleMapsApiKey = EzString.stringOrEmpty(googleMapsApiKey);
    }

    get ezGoogleMapsApiRootUrl() {
        return 'https://maps.googleapis.com/';
    }

    #ezGoogleMapsApiScriptParams = {
        v: 'weekly',
        callback: 'ezApi.ezclocker.ezGoogleIntegrations.ezHandleGoogleMapsReadyCallback',
        key: this.ezGoogleMapsApiKey
    };
    get ezGoogleMapsApiScriptParams() {
        return this.#ezGoogleMapsApiScriptParams;
    }

    get ezGoogleMapsApiScriptUrl() {
        return ezApi.ezUrlTemplate`
            ${this.ezGoogleMapsApiRootUrl}/maps/api/js
            ?v=${this.ezGoogleMapsApiScriptParams.v}
            &callback=${this.ezGoogleMapsApiScriptParams.callback}
            &key=${this.ezGoogleMapsApiScriptParams.key}`;
    }

    get ezGoogleMapsLabelApiUrl() {
        return '/public/javascript/google/maplabel-compiled.js';
    }

    get ezGoogleCredentialsServiceEndpoint() {
        return '/_api/v1/google/credential';
    }

    /**
        @protected @method
        Initializes EzGoogleIntegrations
        @returns {EzGoogleIntegrations}
     */
    ezInit() {
        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzGoogleApi.ezApiName,
            EzGoogleApi.ezEventNames.onInjectingGoogleMaps);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzGoogleApi.ezApiName,
            EzGoogleApi.ezEventNames.onGoogleMapsReady);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzGoogleApi.ezApiName,
            EzGoogleApi.ezEventNames.onGoogleMapsError);

        EzGoogleIntegrations.ezInstance.ezGetGoogleezGoogleMapsApiKeyFromService()
            .then(EzGoogleIntegrations.ezInstance.ezInjectGoogleMapsApiScript);

        return EzGoogleIntegrations.ezInstance;
    }

    /**
        @protected @method
        Injects the google maps API into the document
     */
    ezInjectGoogleMapsApiScript() {
        if (EzBoolean.isTrue(EzGoogleIntegrations.ezInstance.ezGoogleMapsApiInjected)) {
            return;
        }

        EzGoogleIntegrations.ezInstance.ezTriggerInjectingGoogleMapsEvent();

        ezApi.ezclocker.ezUi.ezAppendScriptTag(
            'EzGoogleMapsApi',
            EzGoogleIntegrations.ezInstance.ezGoogleMapsApiScriptUrl,
            true)
            .then(
                () => EzGoogleIntegrations.ezInstance.ezGoogleMapsApiInjected = true);
    }

    /**
        @protected @method
        Inject the maplabel-compiled.js. Must be after google maps api, as it depends upon the google maps script
        @returns {Promise.resolve}
     */
    ezInjectGoogleMapsLabelApi() {
        return ezApi.ezAsyncAction(
            (finished) => {
                if (EzBoolean.isTrue(EzGoogleIntegrations.ezInstance.ezGoogleMapsLabelApiInjected)) {
                    return finished({
                        errorCode: 0,
                        message: 'Success',
                        googleezGoogleMapsLabelApiInjected: EzGoogleIntegrations.ezInstance.ezGoogleMapsLabelApiInjected
                    });
                }

                ezApi.ezclocker.ezUi.ezAppendScriptTag(
                    'EzGoogleMapsLabelApi',
                    EzGoogleIntegrations.ezInstance.ezGoogleMapsLabelApiUrl,
                    true)
                    .then(
                        () => {
                            EzGoogleIntegrations.ezInstance.ezGoogleMapsLabelApiInjected = true;
                            return finished({
                                errorCode: 0,
                                message: 'Success',
                                googleezGoogleMapsLabelApiInjected: EzGoogleIntegrations.ezInstance.ezGoogleMapsLabelApiInjected
                            });
                        });
            });
    }

    /**
        @protected @method
        Obtains the Google API key from the services
        @returns {Promise.resolve}
     */
    ezGetGoogleezGoogleMapsApiKeyFromService() {
        if (EzString.stringHasLength(EzGoogleIntegrations.ezInstance.ezGoogleMapsApiKey)) {
            return ezApi.ezResolve({
                errorCode: 0,
                message: 'Succcess',
                ezGoogleMapsApiKey: EzGoogleIntegrations.ezInstance.ezGoogleMapsApiKey
            });
        }

        return ezApi.ezAsyncAction(
            (finished) => ezApi.ezclocker.ezHttpHelper.ezGet(EzGoogleIntegrations.ezInstance.ezGoogleCredentialsServiceEndpoint)
                .then(
                    (response) => {
                        if (!EzString.stringHasLength(response.message)) {
                            let em = `Failed to obtain the Google Maps Api Key. Error response: ${ezApi.ezToJson(response)}`;
                            ezApi.ezclocker.ezLogger.error(em)

                            return finished({
                                errorCode: 404,
                                message: em,
                                ezGoogleMapsApiKey: ''
                            });
                        }

                        EzGoogleIntegrations.ezInstance.ezGoogleMapsApiKey = response.message;

                        return finished({
                            errorCode: 0,
                            message: 'Succcess',
                            ezGoogleMapsApiKey: EzGoogleIntegrations.ezInstance.ezGoogleMapsApiKey
                        });
                    },
                    (eResponse) => {
                        EzGoogleIntegrations.ezInstance.ezGoogleMapsApiKey = '';

                        ezApi.ezclocker.ezLogger.error(
                            ezApi.ezclocker.ezHttpHelper.extractErrorResponseMessage(eResponse));

                        return finished(eResponse);
                    }));
    }

    /**
        @protected @method
        Triggers the EzGoogleApi.ezEventNames.onInjectingGoogleMaps event
     */
    ezTriggerInjectingGoogleMapsEvent() {
        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
            EzGoogleApi.ezEventNames.onInjectingGoogleMaps,
            EzGoogleApi.ezApiName);
    }

    /**
        @protected @method
        Triggers the EzGoogleApi.ezEventNames.onInjectingGoogleMaps event
     */
    ezTriggerGoogleMapsErrorEvent(em) {
        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
            EzGoogleApi.ezEventNames.onGoogleMapsError,
            ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                EzGoogleApi.ezApiName,
                em));
    }

    /**
        @protected @method
        Triggers the EzGoogleApi.ezEventNames.onInjectingGoogleMaps event
     */
    ezTriggerGoogleMapsReadyEvent() {
        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
            EzGoogleApi.ezEventNames.onGoogleMapsReady,
            EzGoogleApi.ezApiName);
    }

    /**
        @protected
        Call from google maps api that indicates the API is now ready for consumption.
     */
    ezHandleGoogleMapsReadyCallback() {
        EzGoogleIntegrations.ezInstance.ezInjectGoogleMapsLabelApi()
            .then(
                EzGoogleIntegrations.ezInstance.ezTriggerGoogleMapsReadyEvent,
                (eResponse) => {
                    eResponse.googleezGoogleMapsApiInjected = EzGoogleIntegrations.ezInstance.ezGoogleMapsApiInjected;

                    ezApi.ezclocker.ezLogger.error(
                        `Failed to load Google Maps due to error: ${eResponse.message}. Error response: ${ezApi.ezToJson(eResponse)}`);

                    EzGoogleIntegrations.ezInstance.ezTriggerGoogleMapsErrorEvent(eResponse);
                });
    }
}
