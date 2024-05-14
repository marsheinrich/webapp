import {
    EzBadParamException
} from '/ezlibrary/exceptions/EzExceptions.js';

import {
    EzObject,
    EzBoolean,
    EzString,
    EzArray
} from '/ezlibrary/helpers/EzHelpers.js';

import {
    EzRegistrationState,
    EzLicenseFeatureId,
    EzClockerContextEventName
} from '/ezlibrary/enums/EzEnumerations.js';

import { EzClass } from '/ezlibrary/EzClass.js';

import { EzEventEngine } from '/ezlibrary/ez-event-engine.js';

/**
    @class
    @extends {EzClass}
    @description
    Controller for license related feature toggles.
    ---------------------------------------------------------------------------
    Import with:
        import { EzLicenseFeatureToggle } from '/ezlibrary/EzLicenseFeatureToggle.js';
    ---------------------------------------------------------------------------
    Singleton instance ready for use when the below evaluates to true:
        globalThis.ezApi.ezclocker[EzLicenseFeatureToggle.ezApiName] &&
        globalThis.ezApi.ezclocker[EzLicenseFeatureToggle.ezApiName].ready;
    ---------------------------------------------------------------------------
    Listen to onReady event:
        document.addEventListener(
            EzLicenseFeatureToggle.ezEventNames.onReady,
            this.ezRegistrator);
    ---------------------------------------------------------------------------
    Singleton Instance Access:
        ezApi.ezclocker.ezLicenseFeatureToggle
    ---------------------------------------------------------------------------
 */
export class EzLicenseFeatureToggle extends EzClass {
    /**
         @static
         @public @readonly @property
         Returns the name of this class's singleton instance when registered with ezApi.
         @returns {string}
      */
    static get ezApiName() {
        return 'ezLicenseFeatureToggle';
    }

    /**
        @static
        @public @readonly @property
        Returns an object of event names that this class may trigger.
        @returns {object}
     */
    static get ezEventNames() {
        return {
            onEzLicenseFeatureToggleApplied: 'ezOn_EzLicenseFeatureToggle_Applied'
        };
    }

    /**
        @static
        @private @field
        Stores the singleton instance of this class that was created by and registerd with EzApi.
        @type {EzLicenseFeatureToggle}
     */
    static #ezInstance = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzLicenseFeatureToggle.ezApiName])
        ? globalThis.ezApi.ezclocker[EzLicenseFeatureToggle.ezApiName]
        : null;

    /**
        @static
        @public @property @getter
        Returns the singleton instance of this class that is registered with EzApi (if available yet)
        @returns {EzLicenseFeatureToggle}
     */
    static get ezInstance() {
        return EzLicenseFeatureToggle.#ezInstance;
    }

    /**
        @static
        @public @property @getter
        Sets the singleton instance of of this class that is registered with EzApi.
        @param {EzLicenseFeatureToggle} instance
     */
    static set ezInstance(instance) {
        if (null != EzLicenseFeatureToggle.#ezInstance) {
            throw new Error('EzLicenseFeatureToggle\'s singleton instance is already reigstered with EzApi.');
        }

        EzLicenseFeatureToggle.#ezInstance = instance;
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
        EzObject.isValid(globalThis.ezApi.ezclocker[EzLicenseFeatureToggle.ezApiName])
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
        return EzLicenseFeatureToggle.#ezApiRegistrationState;
    }

    /**
        @static
        @public @property @setter
        Sets the ezApi registration state of this classes's singleton instance.
        @param {string}ezApiRegistrationState
        A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzLicenseFeatureToggle.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
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
        return EzRegistrationState.PENDING === EzLicenseFeatureToggle.ezApiRegistrationState &&
            EzObject.hasProperty(globalThis, 'ezApi') &&
            EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&

            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName] &&
            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName].ready;
    }

    /**
        @static
        @private @readonly @property
        Returns if this class's singleton instance is registered with ezApi yet.
        @returns {boolean}
     */
    static get #ezIsRegistered() {
        return null != EzLicenseFeatureToggle.ezInstance &&
            EzRegistrationState.REGISTERED === EzLicenseFeatureToggle.ezApiRegistrationState;
    }

    /**
        @static
        @private @method
        Attempts to register the singleton instance for this class with ezApi. Returns true
        if successful, false otherwise.
        @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzLicenseFeatureToggle.#ezCanRegister && !EzLicenseFeatureToggle.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzLicenseFeatureToggle, EzLicenseFeatureToggle.ezApiName);
        }

        return EzLicenseFeatureToggle.#ezIsRegistered;
    }

    /**
        @static
        Static Initialization
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        >> IMPORTANT <<
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        Make sure the following properties and methods get defined BEFORE this static initialization section:
            1) Property getter EzLicenseFeatureToggle.ezApiName
            2) Property getter EzLicenseFeatureToggle.ezEventNames
            3) Property getter EzLicenseFeatureToggle.ezInstance
            4) Property setter EzLicenseFeatureToggle.ezInstance
            5) Property getter EzLicenseFeatureToggle.ezApiRegistrationState
            6) Property setter EzLicenseFeatureToggle.ezApiRegistrationState
            7) Property getter EzLicenseFeatureToggle.#ezCanRegister
            8) Property getter EzLicenseFeatureToggle.#ezIsRegistered
            9) Method EzLicenseFeatureToggle.#ezRegistrator()
     */
    static {
        if (!EzLicenseFeatureToggle.#ezIsRegistered) {
            EzLicenseFeatureToggle.ezApiRegistrationState = EzRegistrationState.PENDING;

            document.addEventListener(
                EzLicenseFeatureToggle.ezOnEzApiReadyEventName,
                EzLicenseFeatureToggle.ezRegistrator);

            document.addEventListener(
                EzEventEngine.ezEventNames.onReady,
                EzLicenseFeatureToggle.#ezRegistrator);
        }
    }

    /**
        @public @constructor
        >> AVOID CREATING NEW INSTANCES OUTSIDE OF THE STATIC INITIALIZATION FLOW <<
        Use the static singleton instance available from ezApi: ezApi.ezclocker.ezLicenseFeatureToggle.
     */
    constructor() {
        super();
    }

    /**
        @private @field
        Stores if the EzLicenseFeatureToggle is in debug mode
        @type {boolean}
     */
    #ezDebugMode = false;
    /**
        @public @property @getter
        Gets if the EzLicenseFeatureToggle is in debug mode
        @returns {boolean}
     */
    get ezDebugMode() {
        return this.#ezDebugMode;
    }
    /**
        @public @property @setter
        Sets if the EzLicenseFeatureToggle is in debug mode
        @param {boolean} ezDebugMode
     */
    set ezDebugMode(ezDebugMode) {
        this.#ezDebugMode = EzBoolean.isTrue(ezDebugMode);
    }

    /**
        @private @field
        Stores if the license features were applied yet
        @type {boolean}
     */
    #ezLicenseFeaturesApplied = false;
    /**
        @public @property @getter
        Gets if the license features were applied yet
        @returns {boolean}
     */
    get ezLicenseFeaturesApplied() {
        return this.#ezLicenseFeaturesApplied;
    }
    /**
        @public @property @setter
        Sets if the license features were applied yet
        @param {boolean} ezDebugMode
     */
    set ezLicenseFeaturesApplied(ezLicenseFeaturesApplied) {
        this.#ezLicenseFeaturesApplied = EzBoolean.isTrue(ezLicenseFeaturesApplied);
    }

    /**
        @public @method
        Gets if the license features were applied yet
        @deprecated
        Will remove in a future release!
        Migrate to using the property:
        ezApi.ezclocker.ezLicenseFeatureToggle.ezLicenseFeaturesApplied
     */
    ezLicenseFeaturesApplied() {
        return ezApi.ezclocker[EzLicenseFeatureToggle.ezApiName].ezLicenseFeaturesApplied;
    }

    /**
        @private @field
        Stores the ezLicenseFeatures instance
        @type {boolean}
     */
    #ezLicenseFeatures = null;
    /**
        @public @property @getter
        Gets the ezLicenseFeatures instance
        @returns {object}
     */
    get ezLicenseFeatures() {
        return this.#ezLicenseFeatures;
    }
    /**
        @public @property @setter
        Sets the ezLicenseFeatures instance
        @param {object} ezLicenseFeatures
     */
    set ezLicenseFeatures(ezLicenseFeatures) {
        this.#ezLicenseFeatures = EzObject.assignOrNull(ezLicenseFeatures);
    }

    /**
        @public @method
        Initializes EzFeatureToggles
        @returns {EzLicenseFeatureToggle}
     */
    ezInit() {
        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzLicenseFeatureToggle.ezApiName,
            EzLicenseFeatureToggle.ezEventNames.onEzLicenseFeatureToggleApplied);

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzClockerContextEventName.onActiveEmployerReady,
            EzLicenseFeatureToggle.ezApiName,
            EzLicenseFeatureToggle.ezInstance.ezProcessLicenseFeatureToggles);

        return EzLicenseFeatureToggle.ezInstance;
    }

    /**
        @protected @method
        Handles the EzClockerContextEventName.onSubscriptionContextReady event
        Starts processing the license feature toggles
        @param {object} eventData
     */
    ezProcessLicenseFeatureToggles(eventData) {
        EzLicenseFeatureToggle.ezInstance.ezLicenseFeatures = !EzObject.isValid(eventData.data) ||
            !EzObject.isValid(eventData.data.license) ||
            !EzObject.isValid(eventData.data.license.subscriptionPlan) ||
            !EzArray.arrayHasLength(eventData.data.license.subscriptionPlan.enabledFeatures)
            ? []
            : eventData.data.license.subscriptionPlan.enabledFeatures;

        if (EzArray.arrayHasLength(EzLicenseFeatureToggle.ezInstance.ezLicenseFeatures)) {
            EzLicenseFeatureToggle.ezInstance.ezLicenseFeatures.forEach(
                (featureId) => {
                    let featureElements = document.querySelectorAll(`[data-license-feature-id="${featureId}"]`);

                    if (EzObject.isValid(featureElements) && 0 !== featureElements.length) {
                        featureElements.forEach(
                            (element) => EzLicenseFeatureToggle.ezInstance.ezApplyLicenseFeatureToggleToElement(
                                element,
                                ezApi.ezIsTrue(EzLicenseFeatureId.ezToLicenseFeatureEnabled(featureId))));
                    }
                });
        }

        EzLicenseFeatureToggle.ezInstance.ezLicenseFeaturesApplied = true;

        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
            EzLicenseFeatureToggle.ezEventNames.onEzLicenseFeatureToggleApplied,
            ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                EzLicenseFeatureToggle.ezApiName,
                'EzLicenseFeatureToggle have applied.',
                EzLicenseFeatureToggle.ezInstance));
    }

    /**
        @protected @method
        Applies the needed actions enabled license features
        @param {Object} element
        @param {Boolean} enabled
     */
    ezApplyLicenseFeatureToggleToElement(element, enabled) {
        if (!EzObject.isValid(element)) {
            throw new EzBadParamException(
                'element',
                EzLicenseFeatureToggle.ezInstance,
                EzLicenseFeatureToggle.ezInstance.ezApplyLicenseFeatureToggleToElement);
        }

        if (ezApi.ezIsTrue(enabled)) {
            element.style.display = 'contents';
        } else {
            ezApi.ezclocker.ezUi.ezHideElement(element);
        }
    }

    /**
        @public @method
        Determines if a view feature is enabled or not for JS use
        @param {string} licenseFeatureId
        @returns {boolean}
     */
    ezLicenseFeatureEnabled(licenseFeatureId) {
        if (!EzString.stringHasLength(licenseFeatureId)) {
            return false;
        }

        let license = EzArray.isArray(EzLicenseFeatureToggle.ezInstance.ezLicenseFeatures)
            ? EzLicenseFeatureToggle.ezInstance.ezLicenseFeatures
            : ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccountLicense();

        if (!EzObject.isValid(license) || !EzObject.isValid(license.subscriptionPlan) ||
            !EzArray.arrayHasLength(license.subscriptionPlan.features)) {
            return false;
        }

        return -1 !== license.subscriptionPlan.features.indexOf(licenseFeatureId);
    }
}
