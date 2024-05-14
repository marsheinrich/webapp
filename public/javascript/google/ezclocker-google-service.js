import {
    EzBoolean,
    EzString,
    EzPromise,
    EzUrl
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
 * Loads Google API keys from the service
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Import with:
 *     import { EzGoogleApi } from '/public/javascript/google/ezclocker-google-service.js';
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Check if singleton instance is ready:
 *     globalThis.ezApi.ezclocker?.[ezGoogleApi.ezApiName]?.ready
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Listen to onReady event:
 *     document.addEventListener(
 *         ezGoogleApi.ezEventNames.onReady,
 *         {listening_class}.#ezRegistrator);
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Static references:
 *  From outside this class: ezApi.ezclocker.ezGoogleApi
 *  From outside this class: EzGoogleApi.ezInstance
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
export class EzGoogleApi extends EzClass {
    /**
     * @private @field
     * Stores if the Google Maps Label Api is injected into the document or not.
     * @type {boolean}
     * Default: false
     */
    #mapsLabelApiInjected = false;
    /**
     * @public @property @getter
     * Gets if the Google Maps Label Api is injected into the document or not.
     * @returns {boolean}
     */
    get mapsLabelApiInjected() {
        return this.#mapsLabelApiInjected;
    }
    /**
     * @public @property @setter
     * Sets if the Google Maps Label Api is injected into the document or not.
     * @param {boolean} mapsLabelApiInjected
     * Default: false
     */
    set mapsLabelApiInjected(mapsLabelApiInjected) {
        this.#mapsLabelApiInjected = EzBoolean.booleanOrFalse(mapsLabelApiInjected);
    }

    /**
     * @private @field
     * Stores if the google maps api is injected into the document or not
     * @type {boolean}
     * Default: false
     */
    #mapsApiInjected = false;
    /**
     * @public @property @getter
     * Gets if the google maps api is injected into the document or not
     * @returns {boolean}
     */
    get mapsApiInjected() {
        return this.#mapsApiInjected;
    }
    /**
     * @public @property @setter
     * Sets if the google maps api is injected into the document or not
     * @param {boolean} mapsApiInjected
     * Default: false
     */
    set mapsApiInjected(mapsApiInjected) {
        this.#mapsApiInjected = EzBoolean.booleanOrFalse(mapsApiInjected);
    }

    /**
     * @private @field
     * Stores the google api key to use
     * @type {string}
     * Default: null
     */
    #apiKey = null;
    /**
     * @public @property @getter
     * Gets the google api key to use
     * @returns {string}
     */
    get apiKey() {
        return this.#apiKey;
    }
    /**
     * @public @property @setter
     * Sets the google api key to use
     * @param {string} apiKey
     * Default: null
     */
    set apiKey(apiKey) {
        this.#apiKey = EzString.stringOrNull(apiKey);
    }

    /**
     * @public @readonly @property
     * Gets the google maps api base url
     * @returns {string}
     */
    get GOOGLE_API_BASE_URL() {
        return 'https://maps.googleapis.com';
    }

    /**
     * @private @field
     * Stores the Google Maps api script URL
     * @type {string}
     */
    #googleApiMapsApiPathTemplate = EzUrl.build`
        ${this.GOOGLE_API_BASE_URL}/maps/api/js
        ?v=weekly
        &callback=ezApi.ezclocker.ezGoogleApi.ezHandleGoogleMapsReadyCallback
        &sensor=true&key=`;
    /**
     * @public @readonly @property
     * Gets the Google Maps api script URL
     * @returns {string}
     */
    get GOOGLE_API_MAPS_API_PATH_TEMPLATE() {
        return this.#googleApiMapsApiPathTemplate;
    }

    /**
     * @public @readonly @property
     * Gets the google maps label api URI
     * @returns {string}
     */
    get mapsLabelApiUrl() {
        return '/public/javascript/google/maplabel-compiled.js';
    }

    /**
     * @public @readonly @property
     * Gets the ezClocker api endpoint to obtain the google maps api key
     * @returns {string}
     */
    get googleApiKeyService() {
        return '/_api/v1/google/credential';
    }

    /**
     * @public @readonly @property
     * Gets an object of key = event name for events triggered by this class.
     * @deprecated
     * Migrate to static property: EzGoogleApi.ezEventNames
     */
    get ezEventNames() {
        return EzGoogleApi.ezEventNames;
    }

    /**
     * @public @method
     * Initializes EzGoogleApi
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

        EzGoogleApi.ezInstance.ezInjectGoogleMapsApi();

        return EzGoogleApi.ezInstance;
    }

    /**
     * @public @method
     * Injects the google maps API into the documentc
     */
    ezInjectGoogleMapsApi() {
        if (EzBoolean.isTrue(EzGoogleApi.ezInstance.mapsApiInjected)) {
            return;
        }

        EzGoogleApi.ezInstance.ezTriggerInjectingGoogleMapsEvent();

        EzGoogleApi.ezInstance.ezGetGoogleMapsUrl()
            .then(
                (urlResponse) => {
                    let googleMapsApiUrl = urlResponse.googleMapsApiUrl;

                    ezApi.ezclocker.ezUi.ezAppendScriptTag(
                        'EzGoogleMapsApi',
                        googleMapsApiUrl,
                        true)
                        .then(
                            () => EzGoogleApi.ezInstance.mapsApiInjected = true);
                });
    }

    /**
     * @public @method
     * Inject the maplabel-compiled.js.
     * Must have received the callback from google maps api when it is ready to consume before
     * injecting the google maps label api.
     * @returns {Promise.resolve}
     */
    ezInjectGoogleMapsLabelApi() {
        return EzPromise.asyncAction(
            (finished) => {
                if (EzBoolean.isTrue(EzGoogleApi.ezInstance.mapsLabelApiInjected)) {
                    return finished({
                        errorCode: 0,
                        message: 'Success',
                        googleMapsLabelApiInjected: EzGoogleApi.ezInstance.mapsLabelApiInjected
                    });
                }

                if (EzBoolean.isFalse(EzGoogleApi.ezInstance.mapsApiInjected)) {
                    let em = 'Cannot inject the google maps label api before the google maps api is ready to use.';

                    ezApi.ezclocker.ezLogger.error(em);

                    return finished({
                        errorCode: 500,
                        message: em,
                        googleMapsLabelApiInjected: EzGoogleApi.ezInstance.mapsLabelApiInjected
                    });
                }

                ezApi.ezclocker.ezUi.ezAppendScriptTag(
                    'EzGoogleMapsLabelApi',
                    EzGoogleApi.ezInstance.mapsLabelApiUrl,
                    true)
                    .then(
                        () => {
                            EzGoogleApi.ezInstance.mapsLabelApiInjected = true;
                            return finished({
                                errorCode: 0,
                                message: 'Success',
                                googleMapsLabelApiInjected: EzGoogleApi.ezInstance.mapsLabelApiInjected
                            });
                        });
            });
    }

    /**
     * @protected @method
     * Handles the callback that the google maps api is ready to use
     */
    ezHandleGoogleMapsReadyCallback() {
        EzGoogleApi.ezInstance.mapsApiInjected = true;

        EzGoogleApi.ezInstance.ezInjectGoogleMapsLabelApi()
            .then(
                () => EzGoogleApi.ezInstance.ezTriggerGoogleMapsReadyEvent(),
                (eResponse) => {
                    eResponse.googleMapsApiInjected = EzGoogleApi.ezInstance.mapsApiInjected;

                    ezApi.ezclocker.ezLogger.error(eResponse.message);

                    EzGoogleApi.ezInstance.ezTriggerGoogleMapsErrorEvent(eResponse);
                });
    }

    /**
     * @public @method
     * Obtains the google maps url (with API embedded)
     * @returns {Promise.resolve}
     */
    ezGetGoogleMapsUrl() {
        return EzPromise.asyncAction(
            (finished) => EzGoogleApi.ezInstance.ezGetGoogleApiKeyFromService()
                .then(
                    (response) => {
                        return finished({
                            errorCode: 0,
                            message: 'Success',
                            apiKey: response.googleApiKey,
                            googleMapsApiUrl: EzUrl.build`
                                ${EzGoogleApi.ezInstance.GOOGLE_API_MAPS_API_PATH_TEMPLATE}
                                ${EzString.stringOrEmpty(response.googleApiKey)}`
                        });
                    },
                    (eResponse) => {
                        let em = `Failed to obtain the google api key. Error: ${EzJson.toJson(eResponse)}`;

                        ezApi.ezclocker.ezLogger.error(em);

                        EzGoogleApi.ezInstance.ezTriggerGoogleMapsErrorEvent(em);

                        eResponse.googleMapsApiUrl = null;

                        return finished(eResponse);
                    }));
    }

    /**
     * @protected @method
     * Triggers the EzGoogleApi.ezEventNames.onInjectingGoogleMaps event
     */
    ezTriggerInjectingGoogleMapsEvent() {
        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
            EzGoogleApi.ezEventNames.onInjectingGoogleMaps,
            EzGoogleApi.ezApiName);
    }

    /**
     * @protectd @method
     * Triggers the EzGoogleApi.ezEventNames.onInjectingGoogleMaps event
     */
    ezTriggerGoogleMapsErrorEvent(em) {
        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
            EzGoogleApi.ezEventNames.onGoogleMapsError,
            ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                EzGoogleApi.ezApiName,
                em));
    }

    /**
     * @protectd @method
     * Triggers the EzGoogleApi.ezEventNames.onInjectingGoogleMaps event
     */
    ezTriggerGoogleMapsReadyEvent() {
        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
            EzGoogleApi.ezEventNames.onGoogleMapsReady,
            EzGoogleApi.ezApiName);
    }

    /**
     * @protected @method
     * Obtains the Google API key from the services
     * @returns {Promise.resolve}
     */
    ezGetGoogleApiKeyFromService() {
        if (EzString.hasLength(EzGoogleApi.ezInstance.apiKey)) {
            return EzPromise.resolve({
                errorCode: 0,
                message: 'Succcess',
                googleApiKey: EzGoogleApi.ezInstance.apiKey
            });
        }

        EzGoogleApi.ezInstance.apiKey = null;

        return EzPromise.asyncAction(
            (finished) => ezApi.ezclocker.ezHttpHelper.ezGet(EzGoogleApi.ezInstance.googleApiKeyService)
                .then(
                    (response) => {
                        EzGoogleApi.ezInstance.apiKey = EzString.stringOrEmpty(response.message);

                        return finished({
                            errorCode: 0,
                            message: 'Succcess',
                            googleApiKey: EzGoogleApi.ezInstance.apiKey
                        });
                    },
                    (eResponse) => {
                        let em = ezApi.ezclocker.ezHttpHelper.extractErrorResponseMessage(eResponse);

                        ezApi.ezclocker.ezLogger.error(em);

                        return finished(eResponse);
                    }));
    }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // Class Initialization and EzApi Registration Section
    // !! DO NOT PLACE ANY non-initialization fields, getter/setter methods, static methods, or class methods beyond this section !!
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    /**
     * @static
     * @public @readonly @property
     * Returns the name of this class's singleton instance when registered with ezApi.
     * @returns {string}
     */
    static get ezApiName() {
        return 'ezGoogleApi';
    }

    /**
     * @static
     * @public @readonly @property
     * Returns an object of event names that this class may trigger.
     * @returns {object}
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
     * @static
     * @private @field
     * Stores the singleton instance of this class that was created by and registerd with EzApi.
     * @type {EzGoogleApi}
     */
    static #ezInstance = globalThis?.ezApi?.ready && globalThis.ezApi?.ezclocker?.[EzGoogleApi.ezApiName]
        ? globalThis.ezApi.ezclocker[EzGoogleApi.ezApiName]
        : null;
    /**
     * @static
     * @public @property @getter
     * Returns the singleton instance of this class that is registered with EzApi (if available yet)
     * @returns {EzGoogleApi}
     */
    static get ezInstance() {
        return EzGoogleApi.#ezInstance;
    }
    /**
     * @static
     * @public @property @setter
     * Sets the singleton instance of of this class that is registered with EzApi.
     * @param {EzGoogleApi} instance
     */
    static set ezInstance(instance) {
        if (null != EzGoogleApi.#ezInstance) {
            throw new Error('EzGoogleApi\'s singleton instance is already reigstered with EzApi.');
        }

        EzGoogleApi.#ezInstance = instance;
    }

    /**
     * @static
     * @private @field
     * Stores the EzApi registration state for this class.
     * Default value is NULL
     * Class is registerd with EzApi when value is EzRegistrationState.REGISTERED
     * @type {string}
     * A valid enum property value from EzRegistrationState
     */
    static #ezApiRegistrationState = globalThis?.ezApi?.ready && globalThis.ezApi?.ezclocker?.[EzGoogleApi.ezApiName]
        ? EzRegistrationState.REGISTERED
        : null;
    /**
     * @static
     * @public @property @getter
     * Returns the ezApi registration state of this classes's singleton instance.
     * @returns {string}
     * A valid enum property value from EzRegistrationState
     */
    static get ezApiRegistrationState() {
        return EzGoogleApi.#ezApiRegistrationState;
    }
    /**
     * @static
     * @public @property @setter
     * Sets the ezApi registration state of this classes's singleton instance.
     * @param {string} ezApiRegistrationState
     * A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzGoogleApi.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
    }

    /**
     * @static
     * @private @readonly @property
     * Returns true when all required dependencies for this class report ready.
     * In otherwords, the require dependency's singleton instance is created
     * and is registered with and accessable from EzApi with ezApi.ezclocker.{dependency_name}.
     * @returns {boolean}
     */
    static get #ezCanRegister() {
        return EzRegistrationState.PENDING === EzGoogleApi.ezApiRegistrationState &&
            globalThis?.ezApi?.ready && globalThis.ezApi?.ezclocker &&

            ezApi.ezclocker?.[EzEventEngine.ezApiName]?.ready &&

            ezApi.ezclocker?.[EzHttpHelper.ezApiName]?.ready &&

            ezApi.ezclocker?.[EzUI.ezApiName]?.ready;
    }

    /**
     * @static
     * @private @readonly @property
     * Returns if this class's singleton instance is registered with ezApi yet.
     * @returns {boolean}
     */
    static get #ezIsRegistered() {
        return EzGoogleApi.ezInstance && EzRegistrationState.REGISTERED === EzGoogleApi.ezApiRegistrationState;
    }

    /**
     * @static
     * @private @method
     * Attempts to register the singleton instance for this class with ezApi. Returns true
     * if successful, false otherwise.
     * @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzGoogleApi.#ezCanRegister && !EzGoogleApi.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzGoogleApi, EzGoogleApi.ezApiName);
        }

        return EzGoogleApi.#ezIsRegistered;
    }

    /**
     * @static
     * Static Initialization
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * >> IMPORTANT <<
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * Make sure the following properties and methods get defined BEFORE this static initialization section:
     *     1) Property getter EzGoogleApi.ezApiName
     *     2) Property getter EzGoogleApi.ezEventNames
     *     3) Property getter EzGoogleApi.ezInstance
     *     4) Property setter EzGoogleApi.ezInstance
     *     5) Property getter EzGoogleApi.ezApiRegistrationState
     *     6) Property setter EzGoogleApi.ezApiRegistrationState
     *     7) Property getter EzGoogleApi.#ezCanRegister
     *     8) Property getter EzGoogleApi.#ezIsRegistered
     *     9) Method EzGoogleApi.#ezRegistrator()
     */
    static {
        if (!EzGoogleApi.#ezIsRegistered) {
            EzGoogleApi.ezApiRegistrationState = 'PENDING';

            if (!EzGoogleApi.#ezRegistrator()) {
                document.addEventListener(
                    EzGoogleApi.ezOnEzApiReadyEventName,
                    EzGoogleApi.#ezRegistrator);

                document.addEventListener(
                    EzEventEngine.ezEventNames.onReady,
                    EzGoogleApi.#ezRegistrator);

                document.addEventListener(
                    EzHttpHelper.ezEventNames.onReady,
                    EzGoogleApi.#ezRegistrator);

                document.addEventListener(
                    EzUI.ezEventNames.onReady,
                    EzGoogleApi.#ezRegistrator);
            }
        }
    }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // NO CODE AFTER THIS SECTION
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

}