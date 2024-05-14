import {
    EzObject,
    EzBoolean,
    EzString,
    EzArray
} from '/ezlibrary/helpers/EzHelpers.js';

import {
    EzRegistrationState
} from '/ezlibrary/enums/EzEnumerations.js';

import { EzClass } from '/ezlibrary/EzClass.js';

import { EzEventEngine } from '/ezlibrary/ez-event-engine.js';

import {
    EzClockerCookieName,
    EzCookies
} from '/public/javascript/common/ez-cookies.js';

import { EzAmplitudeIntegration } from '/ezlibrary/analytics_metrics/amplitude/EzAmplitudeIntegration.js';
import { EzGoogleTagMangerIntegration } from '/ezlibrary/analytics_metrics/google/EzGoogleTagManagerIntegration.js';
import { EzGoogleG4Integration } from '/ezlibrary/analytics_metrics/google/EzGoogleG4Integration.js';

import { EzVersion } from '/ezlibrary/EzVersion.js';

/**
    @class
    @implements {EzClass}
    @description
    Manages all analytics and metric systems. Allows for globally disabling/enabling of
    systems that support this ability.
    ---------------------------------------------------------------------------
    Import with:
        import { EzAnalyticsAndMetrics } from '/ezlibrary/analytics_metrics/EzAnalyticsAndMetrics.js';
    ---------------------------------------------------------------------------
    Check if ready:
        globalThis.ezApi.ezclocker[EzAnalyticsAndMetrics.ezApiName] &&
        globalThis.ezApi.ezclocker[EzAnalyticsAndMetrics.ezApiName].ready &&
    ---------------------------------------------------------------------------
    Hook onReady event:
        document.addEventListener(
            EzAnalyticsAndMetrics.ezEventNames.onReady,
            this.#ezRegistrator);
    ---------------------------------------------------------------------------
    Singleton Instance:
        ezApi.ezclocker.ezAnalyticsAndMetrics
    ---------------------------------------------------------------------------
 */
export class EzAnalyticsAndMetrics extends EzClass {
    /**
        @static
        @public @readonly @property
        Returns the name of this class's singleton instance when registered with ezApi.
        @returns {string}
     */
    static get ezApiName() {
        return 'ezAnalyticsAndMetrics';
    }

    /**
        @static
        @public @readonly @property
        Returns an object of event names that this class may trigger.
        @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzAnalyticsAndMetrics_Ready'
        };
    }

    /**
         @static
         @private @field
         Stores the singleton instance of this class that was created by and registerd with EzApi.
         @type {EzAnalyticsAndMetrics}
      */
    static #ezInstance = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzAnalyticsAndMetrics.ezApiName])
        ? globalThis.ezApi.ezclocker[EzAnalyticsAndMetrics.ezApiName]
        : null;

    /**
        @static
        @public @property @getter
        Returns the singleton instance of this class that is registered with EzApi (if available yet)
        @returns {EzAnalyticsAndMetrics}
     */
    static get ezInstance() {
        return EzAnalyticsAndMetrics.#ezInstance;
    }

    /**
        @static
        @public @property @setter
        Sets the singleton instance of of this class that is registered with EzApi.
        @param {EzAnalyticsAndMetrics} instance
     */
    static set ezInstance(instance) {
        if (null != EzAnalyticsAndMetrics.#ezInstance) {
            throw new Error('EzAnalyticsAndMetrics\'s singleton instance is already reigstered with EzApi.');
        }

        EzAnalyticsAndMetrics.#ezInstance = instance;
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
        EzObject.isValid(globalThis.ezApi.ezclocker[EzAnalyticsAndMetrics.ezApiName])
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
        return EzAnalyticsAndMetrics.#ezApiRegistrationState;
    }

    /**
        @static
        @public @property @setter
        Sets the ezApi registration state of this classes's singleton instance.
        @param {string} ezApiRegistrationState
        A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzAnalyticsAndMetrics.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
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
        return EzRegistrationState.PENDING === EzAnalyticsAndMetrics.ezApiRegistrationState &&
            EzObject.hasProperty(globalThis, 'ezApi') &&
            EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&

            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName] &&
            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzCookies.ezApiName] &&
            globalThis.ezApi.ezclocker[EzCookies.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzAmplitudeIntegration.ezApiName] &&
            globalThis.ezApi.ezclocker[EzAmplitudeIntegration.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzGoogleG4Integration.ezApiName] &&
            globalThis.ezApi.ezclocker[EzGoogleG4Integration.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzGoogleTagMangerIntegration.ezApiName] &&
            globalThis.ezApi.ezclocker[EzGoogleTagMangerIntegration.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzVersion.ezApiName] &&
            globalThis.ezApi.ezclocker[EzVersion.ezApiName].ready;
    }

    /**
       @static
       @private @readonly @property
       Returns if this class's singleton instance is registered with ezApi yet.
       @returns {boolean}
    */
    static get #ezIsRegistered() {
        return null != EzAnalyticsAndMetrics.ezInstance &&
            EzRegistrationState.REGISTERED === EzAnalyticsAndMetrics.ezApiRegistrationState;
    }

    /**
        @static
        @private @method
        Attempts to register the singleton instance for this class with ezApi. Returns true
        if successful, false otherwise.
        @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzAnalyticsAndMetrics.#ezCanRegister && !EzAnalyticsAndMetrics.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzAnalyticsAndMetrics, EzAnalyticsAndMetrics.ezApiName);
        }

        return EzAnalyticsAndMetrics.#ezIsRegistered;
    }

    /**
        @static
        Static Initialization
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        >> IMPORTANT <<
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        Make sure the following properties and methods get defined BEFORE this static initialization section:
            1) Property getter EzAnalyticsAndMetrics.ezApiName
            2) Property getter EzAnalyticsAndMetrics.ezEventNames
            3) Property getter EzAnalyticsAndMetrics.ezInstance
            4) Property setter EzAnalyticsAndMetrics.ezInstance
            5) Property getter EzAnalyticsAndMetrics.ezApiRegistrationState
            6) Property setter EzAnalyticsAndMetrics.ezApiRegistrationState
            7) Property getter EzAnalyticsAndMetrics.#ezCanRegister
            8) Property getter EzAnalyticsAndMetrics.#ezIsRegistered
            9) Method EzAnalyticsAndMetrics.#ezRegistrator()
     */
    static {
        if (!EzAnalyticsAndMetrics.#ezIsRegistered) {
            EzAnalyticsAndMetrics.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzAnalyticsAndMetrics.#ezRegistrator()) {
                document.addEventListener(
                    EzAnalyticsAndMetrics.ezOnEzApiReadyEventName,
                    EzAnalyticsAndMetrics.#ezRegistrator);
                document.addEventListener(
                    EzEventEngine.ezEventNames.onReady,
                    EzAnalyticsAndMetrics.#ezRegistrator);

                document.addEventListener(
                    EzCookies.ezEventNames.onReady,
                    EzAnalyticsAndMetrics.#ezRegistrator);

                document.addEventListener(
                    EzAmplitudeIntegration.ezEventNames.onReady,
                    EzAnalyticsAndMetrics.#ezRegistrator);

                document.addEventListener(
                    EzGoogleG4Integration.ezEventNames.onReady,
                    EzAnalyticsAndMetrics.#ezRegistrator);

                document.addEventListener(
                    EzGoogleTagMangerIntegration.ezEventNames.onReady,
                    EzAnalyticsAndMetrics.#ezRegistrator);

                document.addEventListener(
                    EzVersion.ezEventNames.onReady,
                    EzAnalyticsAndMetrics.#ezRegistrator);
            }
        }
    }

    /**
        @public @constructor
        >> DO NOT CREATE NEW INSTANCES OUTSIDE OF THE STATIC INITIALIZATION FLOW <<
        Use the static singleton instance available from ezApi: ezApi.ezclocker.ezJobCodeDialog.
     */
    constructor() {
        super();
    }

    /**
        @private @field
        Stores the enabled analytics metrics instances
        @type {array}
     */
    #ezEnabledAnalyticsMetrics = [];
    /**
        @public @property @getter
        Returns an array of enabled anlytic/metrics instances
        @returns {array}
     */
    get ezEnabledAnalyticsMetrics() {
        return this.#ezEnabledAnalyticsMetrics;
    }
    /**
        @public @property @getter
        Sets the array of enabled anlytic/metrics instances
        @param {array} ezEnabledAnalyticsMetrics
     */
    set ezEnabledAnalyticsMetrics(ezEnabledAnalyticsMetrics) {
        this.#ezEnabledAnalyticsMetrics = EzArray.arrayHasLength(ezEnabledAnalyticsMetrics)
            ? ezEnabledAnalyticsMetrics
            : [];
    }

    /**
        @public @readonly @property
        Returns the EzEmplitudeIntegration instance
        @returns {EzAmplitudeIntegration}
     */
    get ezAmplitudeIntegration() {
        return ezApi.ezclocker.ezAmplitudeIntegration;
    }

    /**
        @public @property @getter
        Gets the instance of EzGoogleG4Integration
        @returns {EzGoogleG4Integration}
     */
    get ezGoogleG4Integration() {
        return ezApi.ezclocker.ezGoogleG4Integration;
    }

    /**
        @public @property @getter
        Gets the instance of EzGoogleG4Integration
        @returns {EzGoogleG4Integration}
     */
    get ezGoogleTagMangerIntegration() {
        return ezApi.ezclocker.ezGoogleTagMangerIntegration;
    }

    /**
        @private @field
        Stores if the user has accepted analytics and metrics or not
        @type {boolean}
     */
    #ezAcceptedAnalyticsMetrics = true;
    /**
        @public @property @getter
        Returns if the user has accepted analytics and metrics or not
        @returns {boolean}
     */
    get ezAcceptedAnalyticsMetrics() {
        return this.#ezAcceptedAnalyticsMetrics;
    }
    /**
        @public @property @setter
        Sets if the user has accepted analytics and metrics or not
        @param {boolean}
     */
    set ezAcceptedAnalyticsMetrics(ezAcceptedAnalyticsMetrics) {
        this.#ezAcceptedAnalyticsMetrics = EzBoolean.isTrue(ezAcceptedAnalyticsMetrics);

        ezApi.ezclocker.ezCookies.ezSetExpiryCookie(
            EzClockerCookieName.ANALYTICS_METRICS_ACCEPTED,
            EzBoolean.isTrue(this.#ezAcceptedAnalyticsMetrics)
                ? 'true'
                : 'false',
            ezApi.ezclocker.ezDateTime.ezAddDays(
                ezApi.ezclocker.ezDateTime.ezNow(),
                365));

        if (EzBoolean.isTrue(this.#ezAcceptedAnalyticsMetrics)) {
            EzAnalyticsAndMetrics.ezInstance.ezEnable();
        } else {
            EzAnalyticsAndMetrics.ezInstance.ezDisable();
        }
    }

    /**
        @private @field
        Stores the iso date of when the user was last prompted to accept metrics
        @type {boolean}
     */
    #ezLastPromptAcceptAnalyticsMetricsIso = null;
    /**
        @public @property @getter
        Gets the iso date of when the user was last prompted to accept metrics
        @returns {boolean}
     */
    get ezLastPromptAcceptAnalyticsMetricsIso() {
        return this.#ezLastPromptAcceptAnalyticsMetricsIso;
    }
    /**
        @public @property @setter
        Sets the iso date of when the user was last prompted to accept metrics
        @param {boolean}
     */
    set ezLastPromptAcceptAnalyticsMetricsIso(ezLastPromptAcceptAnalyticsMetricsIso) {
        this.#ezLastPromptAcceptAnalyticsMetricsIso = EzString.stringOrNull(ezLastPromptAcceptAnalyticsMetricsIso);

        if (null == this.#ezLastPromptAcceptAnalyticsMetricsIso) {
            ezApi.ezclocker.ezCookies.ezRemoveCookie(EzClockerCookieName.ANALYTICS_METRICS_PROMPT_ISO);
        } else {
            ezApi.ezclocker.ezCookies.ezSetExpiryCookie(
                EzClockerCookieName.ANALYTICS_METRICS_PROMPT_ISO,
                ezApi.ezclocker.ezDateTime.ezNowAsIso(),
                ezApi.ezclocker.ezDateTime.ezAddDays(
                    ezApi.ezclocker.ezDateTime.ezNow(),
                    365));
        }
    }

    /**
        @protected @method
        Initializes EzAnalytics and enables all the supported analytics and metrics plugins.
        @returns {EzAnalytics}
     */
    ezInit() {
        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzVersion.ezEventNames.onInitialized,
            EzAnalyticsAndMetrics.ezApiName,
            () => {
                if (EzString.stringHasLength(ezApi.ezclocker.ezVersion.ezVersionInfo.environment)) {
                    switch (ezApi.ezclocker.ezVersion.ezVersionInfo.environment.toUpperCase()) {
                        case 'DEV':
                        case 'QAL':
                        case 'E2E':
                        case 'PRF':
                            EzAnalyticsAndMetrics.ezInstance.ezDisable();

                            ezApi.ezclocker.ezLogger.warn(
                                EzString.em`
                                    All ezClocker analytics and metrics disabled due to environment detected as
                                    ${ezApi.ezclocker.ezVersion.ezVersionInfo.environment}`);

                            break;
                        case 'LOC':
                        case 'PRD':
                        default:
                            EzAnalyticsAndMetrics.ezInstance.ezInitAnalyticsAndMetricsCookies();

                            EzAnalyticsAndMetrics.ezInstance.ezPromptAcceptAnalyticsMetrics();

                            break;
                    }
                }
            });

        return EzAnalyticsAndMetrics.ezInstance;
    }

    ez

    /**
        @protected @method
        Initializes and/or loads the EzAnalyticsAndMetrics cookies
     */
    ezInitAnalyticsAndMetricsCookies() {
        let acceptedMetrics = ezApi.ezclocker.ezCookies.ezReadCookieOrDefault(
            EzClockerCookieName.ANALYTICS_METRICS_ACCEPTED,
            'true',
            false);

        EzAnalyticsAndMetrics.ezInstance.ezAcceptedAnalyticsMetrics = EzBoolean.isTrue(acceptedMetrics) || 'true' === acceptedMetrics;

        EzAnalyticsAndMetrics.ezInstance.ezLastPromptAcceptAnalyticsMetricsIso = ezApi.ezclocker.ezCookies.ezReadCookieOrDefault(
            EzClockerCookieName.ANALYTICS_METRICS_PROMPT_ISO,
            null,
            false);
    }

    /**
        @public @method
        Shows the accept analytics and/or metrics pop-up.
     */
    ezPromptAcceptAnalyticsMetrics() {
        // TODO: Show prompt that will enable/disable analytics based upon user preference
    }

    /**
        @public @method
        Enables all analytics and metrics
     */
    ezEnable() {
        if (EzBoolean.isFalse(EzAnalyticsAndMetrics.ezInstance.ezAcceptedAnalyticsMetrics)) {
            ezApi.ezclocker.ezLogger.info('Did not enable ezClocker\'s analytics and metrics: Current user has opted out.');

            return;
        }

        // Amplitude Integration
        EzAnalyticsAndMetrics.ezInstance.ezEnableIntegration(EzAnalyticsAndMetrics.ezInstance.ezAmplitudeIntegration);

        // Google G4 Integration
        EzAnalyticsAndMetrics.ezInstance.ezEnableIntegration(EzAnalyticsAndMetrics.ezInstance.ezGoogleG4Integration);

        // Google Tag Manager Integration
        EzAnalyticsAndMetrics.ezInstance.ezEnableIntegration(EzAnalyticsAndMetrics.ezInstance.ezGoogleTagMangerIntegration);

        ezApi.ezclocker.ezLogger.debug('Enabled all active ezClocker analytics and metrics integrations.');
    }

    /**
        @protected @method
        Enables a analytics and metrics integration
        @returns {boolean}
     */
    ezEnableIntegration(ezIntegrationInstance) {
        if (!EzObject.isValid(ezIntegrationInstance)) {
           throw new EzBadParamException(
                'ezIntegrationInstance',
                 EzAnalyticsAndMetrics.ezInstance,
                 EzAnalyticsAndMetrics.ezInstance.ezEnableIntegration);
        }

        if (ezIntegrationInstance.ezEnable(ezApi.ezclocker.ezVersion.ezVersionInfo.environment.toUpperCase())) {
            EzAnalyticsAndMetrics.ezInstance.ezEnabledAnalyticsMetrics.push(ezIntegrationInstance);
        }
    }

    /**
        @public @method
        Calls the ezReload() method of analytics and metrics integrations.
        NOTE:
            Might not call ALL ezReload() methods for ALL integrations if
            an integration requires reloading of the current document in the browser.
        ******************************************************************************************************
        WARNING:
            ALL calls to this method should be made expecting the current HTML document page will reload in
            the browser.
            Calls should only be made by flows that PURPOSLY want to re-enable integrations that were
            PURPOSLY disabled.
            DO NOT USE the EzAnalyticsAndMetrics.ezEnable response to determine if you should call the
            EzAnalyticsAndMetrics.ezReload()!!!
            Incorrectly calling this method will result in a never-ending page refresh lockup!
        ******************************************************************************************************
     */
    ezReload() {
        for (let analyticsMetricsInstance of EzAnalyticsAndMetrics.ezInstance.ezEnabledAnalyticsMetrics) {
            analyticsMetricsInstance.ezReload(ezApi.ezclocker.ezVersion.ezVersionInfo.environment.toUpperCase());
        }

        ezApi.ezclocker.ezLogger.debug('Reloaded all active ezClocker analytics and metrics integrations.');
    }

    /**
        @public @method
        Disables all analytics and metrics
     */
    ezDisable() {
        for (let analyticsMetricsInstance of EzAnalyticsAndMetrics.ezInstance.ezEnabledAnalyticsMetrics) {
            analyticsMetricsInstance.ezDisable();
        }

        EzAnalyticsAndMetrics.ezInstance.ezEnabledAnalyticsMetrics = [];

        ezApi.ezclocker.ezLogger.debug('Disabled all active ezClocker analytics and metrics integrations.');
    }
}
