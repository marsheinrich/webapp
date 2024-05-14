/*
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    ENGINEERING NOTES
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    Please keep this class in sync with the following Java classes:
        * com.ezclocker.domain.interfaces.IEzSubscriptionFeaturePackage.java
        * com.ezclocker.domain.entities.EzSubscriptionFeaturePackage.java
        * com.ezclocker.domain.SubscriptionFeaturePackage.java
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

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

import {
    EzFeaturePackageId,
    EzSubscriptionPlanProvider
} from '/ezlibrary/enums/EzEnumerations.js';

import { EzJSONSerializable } from '/ezlibrary/entities/EzJSONSerializable.js';

/**
    @class
    @extends {EzJSONSerializable}
    @description
    EzSubscriptionFeaturePackage entity
    Javascript entity for the equivlant Java entity com.ezclocker.domain.entities.EzSubscriptionFeaturePackage.java
    ---------------------------------------------------------------------------
    Import with:
        import { EzSubscriptionFeaturePackage } from '/ezlibrary/entities/EzSubscriptionFeaturePackage.js';
    ---------------------------------------------------------------------------
 */
export class EzSubscriptionFeaturePackage extends EzJSONSerializable {
    /**
        @public @constructor
        Creates a new instance of EzSubscriptionFeaturePackage
        @param {undefined|null|object} ezSubscriptionFeaturePacakgeJsonObject
        JSON object with matching properties
     */
    constructor(ezSubscriptionFeaturePacakgeJsonObject) {
        super();

        if (EzObject.isValid(ezSubscriptionFeaturePacakgeJsonObject)) {
            this.ezFromJSONObject(ezSubscriptionFeaturePacakgeJsonObject);
        }
    }

    /**
        @private @field
        Stores the subscription's plan provider id
        @type {string}
        A valid enum property value from EzSubscriptionPlanProvider
     */
    #subscriptionPlanProvider = EzSubscriptionPlanProvider.UNKNOWN;
    /**
        @public @property @getter
        Gets the subscription's plan provider id
        @returns {string}
        A valid enum property value from EzSubscriptionPlanProvider
     */
    get subscriptionPlanProvider() {
        return this.#subscriptionPlanProvider;
    }
    /**
        @public @property @getter
        Sets the subscription's plan provider id
        @param {string} subscriptionPlanProvider
        A valid enum property value from EzSubscriptionPlanProvider
        Default: EzSubscriptionPlanProvider.UNKNOWN;
     */
    set subscriptionPlanProvider(subscriptionPlanProvider) {
        this.#subscriptionPlanProvider = EzSubscriptionPlanProvider.ezValueOf(subscriptionPlanProvider);
    }

    /**
        @private @field
        Stores the EzClocker EzFeaturePackageId associated with this feature package.
        @type {string}
        A valid enum property value from EzFeaturePackageId
     */
    #featurePackageId = EzFeaturePackageId.UNKNOWN;
    /**
        @public @property @getter
        Gets the EzClocker EzFeaturePackageId associated with this feature package.
        @returns {string}
        A valid enum property value from EzFeaturePackageId
     */
    get featurePackageId() {
        return this.#featurePackageId;
    }
    /**
        @public @property @getter
        Sets the EzClocker EzFeaturePackageId associated with this feature package.
        @param {undefined|null|string} featurePackageId
        A valid enum property value from EzFeaturePackageId
        Default: UNKNOWN
     */
    set featurePackageId(featurePackageId) {
        this.#featurePackageId = EzFeaturePackageId.ezValueOf(featurePackageId);
    }

    /**
        @private @field
        Stores the billing providers add-on id associated with this feature package.
        @type {string}
     */
    #providerAddOnId = EzString.EMPTY;
    /**
        @public @property @getter
        Gets the billing providers add-on id associated with this feature package.
        @returns {string}
     */
    get providerAddOnId() {
        return this.#providerAddOnId;
    }
    /**
        @public @property @getter
        Sets the billing providers add-on id associated with this feature package.
        @param {undefined|null|string} providerAddOnId
        Default: Empty string
     */
    set providerAddOnId(providerAddOnId) {
        this.#providerAddOnId = EzString.stringOrEmpty(providerAddOnId);
    }

    /**
        @private @field
        Stores the version of the feature package.
        @type {string}
     */
    #version = 'r72-3';
    /**
        @public @property @getter
        Gets the version of the feature package.
        @returns {string}
     */
    get version() {
        return this.#version;
    }
    /**
        @public @property @getter
        Sets the version of the feature package.
        @param {undefined|null|string} version
        Default: 'r72-3'
     */
    set version(version) {
        this.#version = EzString.stringOrDefault(version, 'r72-3');
    }

    /**
        @private @field
        Stores the name of the feature package displayed to users.
        @type {string}
     */
    #displayName = EzString.EMPTY;
    /**
       @public @property @getter
       Gets the name of the feature package displayed to users.
       @returns {string}
    */
    get displayName() {
        return this.#displayName;
    }
    /**
        @public @property @getter
        Sets the name of the feature package displayed to users.
        @param {undefined|null|string}
        Default: Empty string
     */
    set displayName(displayName) {
        this.#displayName = EzString.stringOrEmpty(displayName);
    }

    /**
        @private @field
        Stores the marketing blurb describing the feature package.
        @type {string}
     */
    #marketingBlurb = EzString.EMPTY;
    /**
        @public @property @getter
        Gets the marketing blurb describing the feature package.
        @returns {string}
     */
    get marketingBlurb() {
        return this.#marketingBlurb;
    }
    /**
        @public @property @getter
        Sets the marketing blurb describing the feature package.
        @param {undefined|null|string} marketingBlurb
        Default: Empty string
     */
    set marketingBlurb(marketingBlurb) {
        this.#marketingBlurb = EzString.stringOrEmpty(marketingBlurb);
    }

    /**
        @private @field
        Stores if the feature package is enabled for users to purchase
        @type {boolean}
     */
    #enabled = true;
    /**
        @public @property @getter
        Gets if the feature package is enabled for users to purchase
        @returns {boolean}
     */
    get enabled() {
        return this.#enabled;
    }
    /**
        @public @property @getter
        Sets if the feature package is enabled for users to purchase
        @param {undefined|null|boolean} enabled
        Default: true
     */
    set enabled(enabled) {
        this.#enabled = EzBoolean.booleanOrTrue(enabled);
    }

    /**
        @private @field
        Stores if the feature package is free (no additional cost)
        @type {boolean}
     */
    #free = false;
    /**
        @public @property @getter
        Gets if the feature package is free (no additional cost)
        @returns {boolean}
     */
    get free() {
        return this.#free;
    }
    /**
        @public @property @getter
        Sets if the feature package is free (no additional cost)
        @param {undefined|null|boolean} free
        Default: false
     */
    set free(free) {
        this.#free = EzBoolean.booleanOrFalse(free);
    }

    /**
        @private @field
        Stores if the feature package is billed monthly.
        @type {boolean}
     */
    #billedMonthly = true
    /**
        @public @property @getter
        Gets if the feature package is billed monthly.
        @returns {boolean}
     */
    get billedMonthly() {
        return this.#billedMonthly;
    }
    /**
        @public @property @getter
        Sets if the feature package is billed monthly.
        @param {undefined|null|boolean} billedMonthly
        Default: true
     */
    set billedMonthly(billedMonthly) {
        this.#billedMonthly = EzBoolean.booleanOrTrue(billedMonthly);
    }

    /**
        @private @field
        Stores if the feature package is billed yearly
        @type {boolean}
     */
    #billedYearly = false;
    /**
        @public @property @getter
        Gets if the feature package is billed yearly
        @returns {boolean}
     */
    get billedYearly() {
        return this.#billedYearly;
    }
    /**
        @public @property @getter
        Sets if the feature package is billed yearly
        @param {undefined|null|boolean} billedYearly
        Default: false
     */
    set billedYearly(billedYearly) {
        this.#billedYearly = EzBoolean.booleanOrFalse(billedYearly);
    }

    /**
        @private @field
        Stores if the feature package is only billed once
        @type {boolean}
     */
    #billedOnce = false;
    /**
        @public @property @getter
        Gets if the feature package is only billed once
        @returns {boolean}
     */
    get billedOnce() {
        return this.#billedOnce;
    }
    /**
        @public @property @getter
        Sets if the feature package is only billed once
        @param {undefined|null|boolean} billedOnce
        Default: false
     */
    set billedOnce(billedOnce) {
        this.#billedOnce = EzBoolean.booleanOrFalse(billedOnce);
    }

    /**
        @private @field
        Stores the additional subscription amount for the feature pacakge.
        @type {number}
     */
    #billingAmount = 0.00;
    /**
       @public @property @getter
       Gets the additional subscription amount for the feature pacakge.
       @returns {number}
    */
    get billingAmount() {
        return this.#billingAmount;
    }
    /**
        @public @property @getter
        Sets the additional subscription amount for the feature pacakge.
        @param {undefined|null|number} billingAmount
        Default: 0.00
     */
    set billingAmount(billingAmount) {
        this.#billingAmount = EzNumber.numberOrDefault(billingAmount, 0.00);
    }

    /**
        @private @field
        Stores an array of subscription ids the feature package is available for.
        @type {array}
     */
    #availableForSubscriptionIds = [];
    /**
        @public @property @getter
        Gets an array of subscription ids the feature package is available for.
        @returns {array}
     */
    get availableForSubscriptionIds() {
        return this.#availableForSubscriptionIds;
    }
    /**
        @public @property @getter
        Sets an array of subscription ids the feature package is available for.
        @param {undefined|null|array} availableForSubscriptionIds
        Default: []
     */
    set availableForSubscriptionIds(availableForSubscriptionIds) {
        this.#availableForSubscriptionIds = EzArray.arrayOrEmpty(availableForSubscriptionIds);
    }

    /**
        @public @method
        Determines if the provided subscriptionPlanId is supported by this feature package.
        @returns {boolean}
     */
    ezIsAvailableForSubscriptionPlanId(subscriptionPlanId) {
        if (!EzString.stringHasLength(subscriptionPlanId)) {
            return false;
        }

        subscriptionPlanId = subscriptionPlanId.toUpperCase();

        for (let availableSubscriptionPlanId of this.availableForSubscriptionIds) {
            if (availableSubscriptionPlanId.toUpperCase() === subscriptionPlanId) {
                return true;
            }
        }

        return false;
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
            subscriptionPlanProvider: this.ezSubscriptionPlanProviderId,
            featurePackageId: this.featurePackageId,
            providerAddOnId: this.providerAddOnId,
            enabled: this.enabled,
            version: this.version,
            displayName: this.displayName,
            marketingBlurb: this.marketingBlurb,
            free: this.free,
            billingAmount: this.billingAmount,
            billedMonthly: this.billedMonthly,
            billedYearly: this.billedYearly,
            billedOnce: this.billedOnce,
            availableForSubscriptionIds: this.availableForSubscriptionIds
        };
    }

    /**
        @override
        From class EzJSONSerializable
        @public @readonly @property
        Returns this instance as JSON string (no formatting)
        @returns {String}
    */
    get asJSON() {
        return super.asJSON;
    }

    /**
        @override
        From class EzJSONSerializable
        @public @method
        Converts this instance into a JSON string with optional formatting.
        @param {undefined|null|Number} indentValue
        @param {undefined|null|Boolean} htmlDisplay
        @returns {String}
    */
    ezToJSON(indentValue, htmlDisplay) {
        return super.ezToJSON(indentValue, htmlDisplay);
    }

    /**
        @override
        From class EzJSONSerializable
        @public @method
        Copies properties from the provided jsonObject to this instance (even if this instance does not define the property)
        @param {Object} jsonObject
        @returns {Object}
        Returns this instance with the key & values from the provided jsonObject.
    */
    ezFromJSONObject(jsonObject) {
        if (!EzObject.isValid(jsonObject)) {
            throw new EzBadParamException(
                'jsonObject',
                this,
                this.ezFromJSONObject);
        }

        this.subscriptionPlanProvider = jsonObject.subscriptionPlanProvider;

        this.featurePackageId = jsonObject.featurePackageId;

        this.providerAddOnId = jsonObject.providerAddOnId;

        this.enabled = jsonObject.enabled;

        this.version = jsonObject.version;

        this.displayName = jsonObject.displayName;

        this.marketingBlurb = jsonObject.marketingBlurb;

        this.free = jsonObject.free;

        this.billingAmount = jsonObject.billingAmount;

        this.billedMonthly = jsonObject.billedMonthly;

        this.billedYearly = jsonObject.billedYearly;

        this.billedOnce = jsonObject.billedOnce;

        this.availableForSubscriptionIds = jsonObject.availableForSubscriptionIds;

        return this;
    }

    /**
        @override
        From class EzJSONSerializable
        @public @method
        Converts the provided jsonString to a JSON object and then
        passes that object to ezFromJSONObject() to copies properties to this instance
        (even if this instance does not define the property)
        @param {String} jsonString
        @returns {Object}
        Returns this instance with the key & values from the provided json string.
    */
    ezLoadFromJson(jsonString) {
        return super.ezLoadFromJson(jsonString);
    }

    toString() {
        return this.asJSON;
    }
}
