import {
    EzBadParamException
} from '/ezlibrary/exceptions/EzExceptions.js';

import {
    EzObject,
    EzBoolean,
    EzNumber,
    EzString,
    EzArray
} from '/ezlibrary/helpers/EzHelpers.js';

import { EzJSONSerializable } from '/ezlibrary/entities/EzJSONSerializable.js';

/*
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    ENGINEERING NOTES
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    Please keep this class in sync with the equivalent java class:
        com.ezclocker.services.responses.LicenseConfigurationResponse.java
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

/**
    @class
    @description
    Contains information related to the available subscription plans data
    ---------------------------------------------------------------------------
    Import with:
        import { EzLicenseManagerConfiguration } from '/ezlibrary/entities/EzLicenseManagerConfiguration.js';
    ---------------------------------------------------------------------------
 */
export class EzLicenseManagerConfiguration extends EzJSONSerializable {
    /**
        @public @Constructor
        Creates a new instance of EzAvailableSubscriptionPlans
        @param {undefined|null|object|EzLicenseManagerConfiguration} licenseManagerConfiguration
     */
    constructor(licenseManagerConfiguration) {
        super();

        if (EzObject.isValid()) {
            this.ezFromJSONObject(licenseManagerConfiguration);
        }
    }

    /**
        @private @Field
        Stores the force skip remote proider check option
        @type {boolean}
     */
    #forceSkipRemoteProviderCheck = false;
    /**
        @public @property @getter
        Gets the force skip remote proider check option
        @returns {boolean}
        Default: false
     */
    get forceSkipRemoteProviderCheck() {
        return this.#forceSkipRemoteProviderCheck;
    }
    /**
        @public @property @Setter
        Sets the force skip remote proider check option
        @param {boolean} forceSkipRemoteProviderCheck
        Default: false
     */
    set forceSkipRemoteProviderCheck(forceSkipRemoteProviderCheck) {
        this.#forceSkipRemoteProviderCheck = EzBoolean.booleanOrFalse(forceSkipRemoteProviderCheck);
    }

    /**
        @private @Field
        Stores the force never skip provider checks option
        @type {boolean}
        Default: false
     */
    #forceNeverSkipProviderChecks = false;
    /**
        @public @property @getter
        Gets the force never skip provider checks option
        @returns {boolean}
     */
    get forceNeverSkipProviderChecks() {
        return this.#forceNeverSkipProviderChecks;
    }
    /**
        @public @property @Setter
        Sets the force never skip provider checks option
        @param {boolean} forceNeverSkipProviderChecks
        Default: false
     */
    set forceNeverSkipProviderChecks(forceNeverSkipProviderChecks) {
        this.#forceNeverSkipProviderChecks = EzArray.arrayOrEmpty(forceNeverSkipProviderChecks);
    }

    /**
        @private @Field
        Stores the free subscription plan id
        @type {number}
     */
    #freeSubscriptionPlanId = 19;
    /**
        @public @property @getter
        Gets the free subscription plan id
        @returns {number}
        Default: 19 (prd)
     */
    get freeSubscriptionPlanId() {
        return this.#freeSubscriptionPlanId;
    }
    /**
        @public @property @Setter
        Sets the free subscription plan id
        @param {undefined|null|number} freeSubscriptionPlanId
        Default: 19 (prd)
     */
    set freeSubscriptionPlanId(freeSubscriptionPlanId) {
        this.#freeSubscriptionPlanId = EzArray.arrayOrEmpty(freeSubscriptionPlanId);
    }

    /**
        @private @Field
        Stores the free subscription plan's planId string
        @type {undefined|null|string}
     */
    #subscriptionFreePlanId = 'ez2018.monthly.ezclocker.free';
    /**
        @public @property @getter
        Gets the free subscription plan's planId string
        @returns {undefined|null|string}
        Default: 'ez2018.monthly.ezclocker.free' (prd)
     */
    get subscriptionFreePlanId() {
        return this.#subscriptionFreePlanId;
    }
    /**
        @public @property @Setter
        Sets the free subscription plan's planId string
        @param {undefined|null|string} subscriptionFreePlanId
        Default: 'ez2018.monthly.ezclocker.free' (prd)
     */
    set subscriptionFreePlanId(subscriptionFreePlanId) {
        this.#subscriptionFreePlanId = EzArray.arrayOrEmpty(subscriptionFreePlanId);
    }

    /**
        @private @Field
        Stores the maximum number of free trial days option.
        @type {number}
        Default: 30 (prd)
     */
    #maximumFreeTrialDays = 30;
    /**
        @public @property @getter
        Gets the maximum number of free trial days option.
        @returns {number}
     */
    get maximumFreeTrialDays() {
        return this.#maximumFreeTrialDays;
    }
    /**
        @public @property @Setter
        Sets the maximum number of free trial days option.
        @param {undefined|null|number} maximumFreeTrialDays
        Default: 30 (prd)
     */
    set maximumFreeTrialDays(maximumFreeTrialDays) {
        this.#maximumFreeTrialDays = EzArray.arrayOrEmpty(maximumFreeTrialDays);
    }

    /**
        @private @Field
        Stores the subscription grace period days
        @type {number}
        Default: 3 (prd)
     */
    #gracePeriod = 3;
    /**
        @public @property @getter
        Gets the subscription grace period days
        @returns {number}
     */
    get gracePeriod() {
        return this.#gracePeriod;
    }
    /**
        @public @property @Setter
        Sets the subscription grace period days
        @param {undefined|null|number} gracePeriod
        Default: 3 (prd)
     */
    set gracePeriod(gracePeriod) {
        this.#gracePeriod = EzArray.arrayOrEmpty(gracePeriod);
    }


    /**
        @private @Field
        Stores the maximum personal employees allowed
        @type {number}
        Default: 100000
     */
    #maximumPersonalEmployees = 100000;
    /**
        @public @property @getter
        Gets the maximum personal employees allowed
        @returns {number}
     */
    get maximumPersonalEmployees() {
        return this.#maximumPersonalEmployees;
    }
    /**
        @public @property @Setter
        Sets the maximum personal employees allowed
        @param {undefined|null|number} maximumPersonalEmployees
        Default: 100000
     */
    set maximumPersonalEmployees(maximumPersonalEmployees) {
        this.#maximumPersonalEmployees = EzNumber.numberOrDefault(
            maximumPersonalEmployees,
            100000);
    }

    /**
        @private @Field
        Stores the url for managing apple billing information
        @type {string}
     */
    #manageAppleAccountInformationUrl = EzString.EMPTY;
    /**
        @public @property @getter
        Gets the url for managing apple billing information
        @returns {string}
     */
    get manageAppleAccountInformationUrl() {
        return this.#manageAppleAccountInformationUrl;
    }
    /**
        @public @property @Setter
        Sets the url for managing apple billing information
        @param {string} manageAppleAccountInformationUrl
     */
    set manageAppleAccountInformationUrl(manageAppleAccountInformationUrl) {
        this.#manageAppleAccountInformationUrl = EzString.stringOrEmpty(manageAppleAccountInformationUrl);
    }

    /**
        @private @Field
        Stores the free personal subscription id
        @type {number}
        Default: 6 (prd)
     */
    #personalSubscriptionId = 6;
    /**
        @public @property @getter
        Gets the free personal subscription id
        @returns {number}
     */
    get personalSubscriptionId() {
        return this.#personalSubscriptionId;
    }
    /**
        @public @property @Setter
        Sets the free personal subscription id
        @param {undefined|null|number} personalSubscriptionId
        Default: 6 (prd)
     */
    set personalSubscriptionId(personalSubscriptionId) {
        this.#personalSubscriptionId = EzNumber.numberOrDefault(
            personalSubscriptionId,
            6);
    }

    /**
        @private @Field
        Stores the free personal subscription planId string
        @type {string}
     */
    #personalSubscriptionPlanId = 'ezclockerPersonal';
    /**
        @public @property @getter
        Gets the free personal subscription planId string
        @returns {string}
        Default: 'ezclockerPersonal' (prd)
     */
    get personalSubscriptionPlanId() {
        return this.#personalSubscriptionPlanId;
    }
    /**
        @public @property @Setter
        Sets the free personal subscription planId string
        @param {undefined|null|string} personalSubscriptionPlanId
     */
    set personalSubscriptionPlanId(personalSubscriptionPlanId) {
        this.#personalSubscriptionPlanId = EzString.stringOrEmpty(personalSubscriptionPlanId);
    }

    /**
        @private @Field
        Stores the personal pro subscription id
        @type {number}
        Default: 139 (prd)
     */
    #personalProSubscriptionId = 139;
    /**
        @public @property @getter
        Gets the personal pro subscription id
        @returns {number}
     */
    get personalProSubscriptionId() {
        return this.#personalProSubscriptionId;
    }
    /**
        @public @property @Setter
        Sets the personal pro subscription id
        @param {undefined|null|number} personalProSubscriptionId
        Default: 139 (prd)
     */
    set personalProSubscriptionId(personalProSubscriptionId) {
        this.#personalProSubscriptionId = EzArray.arrayOrEmpty(personalProSubscriptionId);
    }

    /**
        @private @Field
        Stores the personal pro subscription planId string
        @type {string}
        Default: 'ez2020-monthly-personal-pro' (prd)
     */
    #personalProSubscriptionPlanId = 'ez2020-monthly-personal-pro';
    /**
        @public @property @getter
        Gets the personal pro subscription planId string
        @returns {string}
     */
    get personalProSubscriptionPlanId() {
        return this.#personalProSubscriptionPlanId;
    }
    /**
        @public @property @Setter
        Sets the personal pro subscription planId string
        @param {undefined|null|string} personalProSubscriptionPlanId
        Default: 'ez2020-monthly-personal-pro' (prd)
     */
    set personalProSubscriptionPlanId(personalProSubscriptionPlanId) {
        this.#personalProSubscriptionPlanId = EzString.stringOrEmpty(personalProSubscriptionPlanId);
    }

    /**
        @override
        From class EzJSONSerializable
        @public @readonly @property
        Returns this instance as a JSON Object (will no longer have the getter/setter methods).
        Useful for serailization to JSON.
        @returns {object}
    */
    get asJSONObject() {
        return {
            forceNeverSkipProviderChecks: this.forceNeverSkipProviderChecks,
            freeSubscriptionPlanId: this.freeSubscriptionPlanId,
            subscriptionFreePlanId: this.subscriptionFreePlanId,
            maximumFreeTrialDays: this.maximumFreeTrialDays,
            gracePeriod: this.gracePeriod,
            maximumPersonalEmployees: this.maximumPersonalEmployees,
            manageAppleAccountInformationUrl: this.manageAppleAccountInformationUrl,
            personalSubscriptionId: this.personalSubscriptionId,
            personalSubscriptionPlanId: this.personalSubscriptionPlanId,
            personalProSubscriptionId: this.personalProSubscriptionId,
            personalProSubscriptionPlanId: this.personalProSubscriptionPlanId
        };
    }

    /**
        @override
        From class EzJSONSerializable
        @public @method
        Copies properties from the provided jsonObject to this instance (even if this instance does not define the property)
        @param {object} jsonObject
        @returns {EzLicenseManagerConfiguration}
        Returns this instance with the key & values from the provided jsonObject.
    */
    ezFromJSONObject(jsonObject) {
        if (!EzObject.isValid(jsonObject)) {
            throw new EzBadParamException(
                'jsonObject',
                this,
                this.ezFromJSONObject);
        }

        this.forceNeverSkipProviderChecks = jsonObject.forceNeverSkipProviderChecks;
        this.freeSubscriptionPlanId = jsonObject.freeSubscriptionPlanId;
        this.subscriptionFreePlanId = jsonObject.subscriptionFreePlanId;
        this.maximumFreeTrialDays = jsonObject.maximumFreeTrialDays;
        this.gracePeriod = jsonObject.gracePeriod;
        this.maximumPersonalEmployees = jsonObject.maximumPersonalEmployees;
        this.manageAppleAccountInformationUrl = jsonObject.manageAppleAccountInformationUrl;
        this.personalSubscriptionId = jsonObject.personalSubscriptionId;
        this.personalSubscriptionPlanId = jsonObject.personalSubscriptionPlanId;
        this.personalProSubscriptionId = jsonObject.personalProSubscriptionId;
        this.personalProSubscriptionPlanId = jsonObject.personalProSubscriptionPlanId;

        return this;
    }
}
