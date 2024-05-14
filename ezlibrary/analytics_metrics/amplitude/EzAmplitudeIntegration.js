import * as amplitude from '@amplitude/analytics-browser';

import {
    Revenue,
    Identify
} from '@amplitude/analytics-browser';

import {
    EzObject,
    EzNumber,
    EzString,
    EzArray
} from '/ezlibrary/helpers/EzHelpers.js';

import { EzRegistrationState } from '/ezlibrary/enums/EzEnumerations.js';

import { EzClass } from '/ezlibrary/EzClass.js';

import { EzUI } from '/public/javascript/common/ezui.js';

import { EzAmplitudeEvent } from '/ezlibrary/analytics_metrics/amplitude/EzAmplitudeEvent.js';
import { EzAmplitudeEventWithProps } from '/ezlibrary/analytics_metrics/amplitude/EzAmplitudeEventWithProps.js';

/**
 * @class
 * @implements {EzClass}
 * @description
 * Helper to add/remove amplitude from an HTML page
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Import with:
 *     import { EzAmplitudeIntegration } from '/ezlibrary/analytics_metrics/amplitude/EzAmplitudeIntegration.js';
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Hook onReady event:
 *     document.addEventListener(
 *         EzAmplitudeIntegration.ezEventNames.onReady,
 *         this.#ezRegistrator);
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Check if ready:
 *     globalThis.ezApi.ezclocker[EzAmplitudeIntegration.ezApiName] &&
 *     globalThis.ezApi.ezclocker[EzAmplitudeIntegration.ezApiName].ready
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
export class EzAmplitudeIntegration extends EzClass {
    /**
     * @public @static @readonly @property
     * Returns the Amplitude integation's project id
     * @returns {string}
     */
    static get ezAmplitudeWebsiteProjectId() {
        // TODO: Move to service so it is loaded via secret manager
        return '351453';
    }

    /**
     * @public @static @readonly @property
     * Returns the Amplitude integation project's API key
     * @returns {string}
     */
    static get ezAmplitudeWebsiteAPIKey() {
        // TODO: Move to service so it is loaded via secret manager
        return '63b4edbc4ad58e5fc414875544c4a3db';
    }

    /**
     * @static
     * @public @readonly @property
     * Returns the default amplitude initi configuration object.
     * @returns {object}
     */
    static get DEFAULT_AMPLITUDE_INIT_CONFIG() {
        return {
            //flushIntervalMillis: 30 * 1000, // Sets request interval to 30s
            logLevel: amplitude.Types.LogLevel.Warn, // Set the log level by configuring the logLevel with the level you want
            serverZone: amplitude.Types.ServerZone.US,
            trackingOptions: {
                deviceManufacturer: true,
                deviceModel: true,
                ipAddress: true,
                language: true,
                osName: true,
                osVersion: true,
                platform: true
            }
        };
    }

    /**
     * @private @field
     * Stores the amplitude init configuration object
     * Object definition: https://www.docs.developers.amplitude.com/data/sdks/typescript-browser/#configuration
     * @type {object}
     */
    #ezAmplitudeInitConfig = null;
    /**
     * @public @property @getter
     * Gets the amplitude init configuration object
     * Object definition: https://www.docs.developers.amplitude.com/data/sdks/typescript-browser/#configuration
     * @returns {object} ezAmplitudeInitConfig
     */
    get ezAmplitudeInitConfig() {
        if (!EzObject.isValid(this.#ezAmplitudeInitConfig)) {
            this.#ezAmplitudeInitConfig = EzAmplitudeIntegration.DEFAULT_AMPLITUDE_INIT_CONFIG;
        }

        return this.#ezAmplitudeInitConfig;
    }
    /**
     * @public @property @setter
     * Sets the amplitude initialization configuration object
     * Object definition: https://www.docs.developers.amplitude.com/data/sdks/typescript-browser/#configuration
     * @param {object} amplitudeInitConfig
     */
    set ezAmplitudeInitConfig(amplitudeInitConfig) {
        if (EzObject.isValid(amplitudeInitConfig)) {
            this.#ezAmplitudeInitConfig.logLevel = EzObject.assignOrDefault(
                amplitudeInitConfig.logLevel,
                amplitude.Types.LogLevel.Warn);

            this.#ezAmplitudeInitConfig.serverZone = EzObject.assignOrDefault(
                amplitudeInitConfig.serverZone,
                amplitude.Types.ServerZone.US);

            this.#ezAmplitudeInitConfig.trackingOptions.deviceManufacturer = EzBoolean.booleanOrTrue(amplitudeInitConfig.trackingOptions.deviceManufacturer);

            this.#ezAmplitudeInitConfig.trackingOptions.ipAddress = EzBoolean.booleanOrTrue(amplitudeInitConfig.trackingOptions.ipAddress);

            this.#ezAmplitudeInitConfig.trackingOptions.language = EzBoolean.booleanOrTrue(amplitudeInitConfig.trackingOptions.language);

            this.#ezAmplitudeInitConfig.trackingOptions.osName = EzBoolean.booleanOrTrue(amplitudeInitConfig.trackingOptions.osName);

            this.#ezAmplitudeInitConfig.trackingOptions.osVersion = EzBoolean.booleanOrTrue(amplitudeInitConfig.trackingOptions.osVersion);

            this.#ezAmplitudeInitConfig.trackingOptions.platform = EzBoolean.booleanOrTrue(amplitudeInitConfig.trackingOptions.platform);
        }
    }

    /**
     * @public @readonly @property
     * Returns the authenticated user's userid
     * @returns {object}
     */
    get ezAmplitudeUserId() {
        return {
            user_id: ezApi.ezclocker.ezClockerContext.ezGetUserContext().ready
                ? ezApi.ezclocker.ezClockerContext.ezGetUserContext().userAccount.userId
                : 'Anonymous'
        }
    }

    /**
     * @protected @method
     * Initializes EzAmplitudeIntegration
     * @returns {EzAmplitudeIntegration}
     */
    ezInit() {
        return EzAmplitudeIntegration.ezInstance;
    }

    /**
     * @public @method
     * Enables the Amplitude integation.
     * @param {string} env
     * Current Enviornment Id
     */
    ezEnable(/* env */) {
        // Initialize amplitude with configuration
        amplitude.init(
            EzAmplitudeIntegration.ezAmplitudeWebsiteAPIKey,
            EzAmplitudeIntegration.ezInstance.ezAmplitudeInitConfig);

        amplitude.setOptOut(false);
    }

    /**
     * @public @method
     * Disables Amplitude tracking
     */
    ezDisable() {
        amplitude.setOptOut(true);
    }

    /**
     * @public @method
     * Resets the amplitude integration
     * @param {string} env
     * Current Enviornment Id
     */
    ezReload(/* env */) {
        amplitude.reset();

        EzAmplitudeIntegration.ezInstance.ezEnable();
    }

    /**
     * @public @method
     * Track an event with Amplitude (if enabled)
     * Calls aamplitude.track(eventId, eventProperties, EzAmplitudeIntegration.ezInstance.ezAmplitudeUserId)
     * @param {string} eventId
     * @param {string} action
     * @param {object} eventProperties
     */
    ezTrack(eventId, action, eventProperties) {
        if (!EzAmplitudeIntegration.ezInstance.enabled) {
            ezApi.ezclocker.ezLogger.info('Ignored Amplitude tracking event: Amplitude is disabled.');

            return;
        }

        if (!EzString.hasLength(eventId)) {
            throw new EzBadParamException(
                'eventId',
                EzAmplitudeIntegration.ezInstance,
                EzAmplitudeIntegration.ezInstance.ezTrack);
        }
        if (!EzString.hasLength(action)) {
            action = 'Generic Action';
        }

        return EzObject.isValid(eventProperties)
            ? amplitude.track(
                new EzAmplitudeEventWithProps(
                    eventId,
                    action,
                    EzObject.assignOrEmpty(window?.location),
                    ezApi?.ezclocker?.ezClockerContext?.ezGetUserContext(),
                    eventProperties))
            : amplitude.track(
                new EzAmplitudeEvent(
                    eventId,
                    action,
                    EzObject.assignOrEmpty(window?.location),
                    ezApi?.ezclocker?.ezClockerContext?.ezGetUserContext(),));
    }

    /**
     * @public @method
     * Executes the folowing in amplitude:
     *  const identifyEntity = new Identify();
     *  identifyEntity.set(propertyId, propertyValue);
     *  amplitude.identify(identifyEntity);
     * @param {string} propertyId
     * @param {string} propertyValue
     */
    ezIdentify(propertyId, propertyValue) {
        if (!EzString.hasLength(propertyId)) {
            throw new EzBadParamException(
                'propertyId',
                EzAmplitudeIntegration.ezInstance,
                EzAmplitudeIntegration.ezInstance.ezIdentify);
        }
        if (!EzString.hasLength(propertyValue)) {
            throw new EzBadParamException(
                'propertyValue',
                EzAmplitudeIntegration.ezInstance,
                EzAmplitudeIntegration.ezInstance.ezIdentify);
        }

        const identifyEntity = new Identify();

        identifyEntity.set(propertyId, propertyValue);

        amplitude.identify(identifyEntity);
    }

    /**
     * @public @method
     * Sets the value of a amplitude user property only once.
     * @param {string} propertyId
     * @param {string} propertyValue
     */
    ezIdentifyOnce(propertyId, propertyValue) {
        if (!EzString.hasLength(propertyId)) {
            throw new EzBadParamException(
                'propertyId',
                EzAmplitudeIntegration.ezInstance,
                EzAmplitudeIntegration.ezInstance.ezIdentifyOnce);
        }
        if (!EzString.hasLength(propertyValue)) {
            throw new EzBadParamException(
                'propertyValue',
                EzAmplitudeIntegration.ezInstance,
                EzAmplitudeIntegration.ezInstance.ezIdentifyOnce);
        }

        const identifyEntity = new Identify();

        identifyEntity.setOnce(propertyId, propertyValue);

        amplitude.identify(identifyEntity);
    }

    /**
     * @public @method
     * Calls amplitude.setGroup(groupType, groupName);
     * @param {string} grouptType
     * @param {string} groupName
     */
    ezSetGroup(groupType, groupName) {
        if (!EzString.hasLength(groupType)) {
            throw new EzBadParamException(
                'groupType',
                EzAmplitudeIntegration.ezInstance,
                EzAmplitudeIntegration.ezInstance.ezSetGroup);
        }
        if (!EzString.hasLength(groupName)) {
            throw new EzBadParamException(
                'groupName',
                EzAmplitudeIntegration.ezInstance,
                EzAmplitudeIntegration.ezInstance.ezSetGroup);
        }

        amplitude.setGroup(groupType, groupName);
    }

    /**
     * @public @method
     * Calls amplitude.setGroup(groupType, groupNames);
     * @param {string} grouptType
     * @param {array} groupNames
     */
    ezSetGroups(groupType, groupNames) {
        if (!EzString.hasLength(groupType)) {
            throw new EzBadParamException(
                'groupType',
                EzAmplitudeIntegration.ezInstance,
                EzAmplitudeIntegration.ezInstance.ezSetGroups);
        }
        if (!EzArray.hasLength(groupNames)) {
            throw new EzBadParamException(
                'groupNames',
                EzAmplitudeIntegration.ezInstance,
                EzAmplitudeIntegration.ezInstance.ezSetGroups);
        }

        amplitude.setGroup(groupType, groupNames);
    }

    /**
     * @public @method
     * Calls amplitude.groupIdentify(groupType, groupName, identify);
     * @param {string} groupType
     * @param {string} groupName
     * @param {string} propertyId
     * @param {string} propertyValue
     */
    ezGroupIdentify(groupType, groupName, propertyId, propertyValue) {
        if (!EzString.hasLength(groupType)) {
            throw new EzBadParamException(
                'groupType',
                EzAmplitudeIntegration.ezInstance,
                EzAmplitudeIntegration.ezInstance.ezTrack);
        }
        if (!EzString.hasLength(groupName)) {
            throw new EzBadParamException(
                'groupName',
                EzAmplitudeIntegration.ezInstance,
                EzAmplitudeIntegration.ezInstance.ezTrack);
        }
        if (!EzString.hasLength(propertyId)) {
            throw new EzBadParamException(
                'propertyId',
                EzAmplitudeIntegration.ezInstance,
                EzAmplitudeIntegration.ezInstance.ezTrack);
        }
        if (!EzString.hasLength(propertyValue)) {
            throw new EzBadParamException(
                'propertyValue',
                EzAmplitudeIntegration.ezInstance,
                EzAmplitudeIntegration.ezInstance.ezTrack);
        }

        const identifyEntity = new Identify()

        identifyEntity.set(propertyId, propertyValue);

        amplitude.groupIdentify(groupType, groupName, identify);
    }

    /**
     * @public @method
     * Performs the following actions for amplitude:
     * const revenueEntity = new Revenue();
     *
     * revenueEntity.setProductId(productId);
     *
     * revenueEntity.setPrice(price);
     *
     * revenueEntity.setQuantity(quantity);
     *
     * amplitude.revenue(revenueEntity);
     * @param {string} productId
     * @param {string} productId
     * @param {string} productId
     */
    ezRevenue(productId, price, quantity) {
        if (!EzString.hasLength(productId)) {
            throw new EzBadParamException(
                'productId',
                EzAmplitudeIntegration.ezInstance,
                EzAmplitudeIntegration.ezInstance.ezRevenue);
        }
        if (!EzNumber.isNumber(price)) {
            throw new EzBadParamException(
                'price',
                EzAmplitudeIntegration.ezInstance,
                EzAmplitudeIntegration.ezInstance.ezRevenue);
        }
        if (!EzNumber.isNumber(quantity)) {
            throw new EzBadParamException(
                'quantity',
                EzAmplitudeIntegration.ezInstance,
                EzAmplitudeIntegration.ezInstance.ezRevenue);
        }

        const revenueEntity = new Revenue();

        revenueEntity.setProductId(productId);

        revenueEntity.setPrice(price);

        revenueEntity.setQuantity(quantity);

        amplitude.revenue(revenueEntity);
    }

    /**
     * @public @method
     * Sets the amplitude user id: amplitude.setUserId(userId);
     * @param {string} userId
     */
    ezSetUserId(userId) {
        amplitude.setUserId(userId);
    }

    /**
     * @public @method
     * Sets the amplitude session id: amplitude.setSessionId(sessionId);
     * @param {string} sessionId
     */
    ezSetSessionId(sessionId) {
        amplitude.setSessionId(sessionId);
    }

    /**
     * @public @method
     * Sets the amplitude device id: amplitude.setDeviceId(deviceId);
     * @param {string} deviceId
     */
    ezSetDeviceId(deviceId) {
        amplitude.setDeviceId(deviceId);
    }

    /**
     * @public @method
     * Calls amplitude.reset();
     * @param {string} userId
     */
    ezReset() {
        amplitude.reset();
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
        return 'ezAmplitudeIntegration';
    }

    /**
     * @static
     * @public @readonly @property
     * Returns an object of event names that this class may trigger.
     * @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzAmplitudeIntegration_Ready',
        };
    }

    /**
     * @static
     * @private @field
     * Stores the singleton instance of this class that was created by and registerd with EzApi.
     * @type {EzAmplitudeIntegration}
     */
    static #ezInstance = globalThis?.ezApi?.ready && globalThis.ezApi?.ezclocker?.[EzAmplitudeIntegration.ezApiName]
        ? globalThis.ezApi.ezclocker[EzAmplitudeIntegration.ezApiName]
        : null;

    /**
     * @static
     * @public @property @getter
     * Returns the singleton instance of this class that is registered with EzApi (if available yet)
     * @returns {EzAmplitudeIntegration}
     */
    static get ezInstance() {
        return EzAmplitudeIntegration.#ezInstance;
    }

    /**
     * @static
     * @public @property @setter
     * Sets the singleton instance of of this class that is registered with EzApi.
     * @param {EzAmplitudeIntegration} instance
     */
    static set ezInstance(instance) {
        if (null != EzAmplitudeIntegration.#ezInstance) {
            throw new Error('EzAmplitudeIntegration\'s singleton instance is already reigstered with EzApi.');
        }

        EzAmplitudeIntegration.#ezInstance = instance;
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
    static #ezApiRegistrationState = globalThis?.ezApi?.ready && globalThis.ezApi?.ezclocker?.[EzAmplitudeIntegration.ezApiName]
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
        return EzAmplitudeIntegration.#ezApiRegistrationState;
    }

    /**
     * @static
     * @public @property @setter
     * Sets the ezApi registration state of this classes's singleton instance.
     * @param {string} ezApiRegistrationState
     * A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzAmplitudeIntegration.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
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
        return EzRegistrationState.PENDING === EzAmplitudeIntegration.ezApiRegistrationState &&
            globalThis?.ezApi?.ready && globalThis.ezApi?.ezclocker &&
            globalThis.ezApi.ezclocker?.[EzUI.ezApiName]?.ready;
    }

    /**
     * @static
     * @private @readonly @property
     * Returns if this class's singleton instance is registered with ezApi yet.
     * @returns {boolean}
     */
    static get #ezIsRegistered() {
        return null != EzAmplitudeIntegration.ezInstance &&
            EzRegistrationState.REGISTERED === EzAmplitudeIntegration.ezApiRegistrationState;
    }

    /**
     * @static
     * @private @method
     * Attempts to register the singleton instance for this class with ezApi. Returns true
     * if successful, false otherwise.
     * @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzAmplitudeIntegration.#ezCanRegister && !EzAmplitudeIntegration.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzAmplitudeIntegration, EzAmplitudeIntegration.ezApiName);
        }

        return EzAmplitudeIntegration.#ezIsRegistered;
    }

    /**
     * @static
     * Static Initialization
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * >> IMPORTANT <<
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * Make sure the following properties and methods get defined BEFORE this static initialization section:
     *     1) Property getter EzAmplitudeIntegration.ezApiName
     *     2) Property getter EzAmplitudeIntegration.ezEventNames
     *     3) Property getter EzAmplitudeIntegration.ezInstance
     *     4) Property setter EzAmplitudeIntegration.ezInstance
     *     5) Property getter EzAmplitudeIntegration.ezApiRegistrationState
     *     6) Property setter EzAmplitudeIntegration.ezApiRegistrationState
     *     7) Property getter EzAmplitudeIntegration.#ezCanRegister
     *     8) Property getter EzAmplitudeIntegration.#ezIsRegistered
     *     9) Method EzAmplitudeIntegration.#ezRegistrator()
     */
    static {
        if (!EzAmplitudeIntegration.#ezIsRegistered) {
            EzAmplitudeIntegration.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzAmplitudeIntegration.#ezRegistrator()) {
                document.addEventListener(
                    EzAmplitudeIntegration.ezOnEzApiReadyEventName,
                    EzAmplitudeIntegration.#ezRegistrator);

                document.addEventListener(
                    EzUI.ezEventNames.onReady,
                    EzAmplitudeIntegration.#ezRegistrator);
            }
        }
    }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // !! DO NOT PLACE ANY non-initialization fields, getter/setter methods, static methods, or class methods beyond above section !!
    // NO CODE AFTER THIS SECTION
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}
