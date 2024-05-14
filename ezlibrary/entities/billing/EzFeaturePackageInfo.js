import {
    EzBadParamException
} from '/ezlibrary/exceptions/EzExceptions.js';

import { EzJSONSerializable } from '/ezlibrary/entities/EzJSONSerializable.js';

import {
    EzObject,
    EzBoolean,
    EzNumber,
    EzString,
    EzArray,
    EzHtml
} from '/ezlibrary/helpers/EzHelpers.js';

/**
    @class
    @extends {EzJSONSerializable}
    @description
    Defines a add-on feature with a subscription configuration
    ---------------------------------------------------------------------------
    Import with:
        import { EzFeaturePackageInfo } from '/ezlibrary/entities/billing/EzSubscriptionAddOn.js';
    ---------------------------------------------------------------------------
 */
export class EzFeaturePackageInfo extends EzJSONSerializable {
    /**
        @public @constructor
        Creates a new instance of EzSubscriptionAddOn
        @param {string} ezFeaturePackageId
        A valid enum property value from EzFeaturePackageId
        @param {string} name
        @param {boolean} enabled,
        @param {string} additionalFee
        @param {details} details
     */
    constructor(
        ezFeaturePackageId,
        providerAddOnId,
        braintreeAddOnId,
        appleAddOnId,
        googlePlayAddOnId,
        payPalAddOnId,
        name,
        enabled,
        availableForSubscriptionIds = [],
        additionalFee = 0,
        free = false,
        billedMonthly = true,
        billedYearly = false,
        billedOnce = false,
        marketingBlurb = EzString.EMPTY,
        subscribedBlurb = EzString.EMPTY) {
        super();

        if (!EzString.stringHasLength(ezFeaturePackageId)) {
            throw new EzBadParamException(
                'ezFeaturePackageId',
                this,
                this.constructor);
        }
        if (!EzString.stringHasLength(name)) {
            throw new EzBadParamException(
                'name',
                this,
                this.constructor);
        }
        if (!EzBoolean.isBoolean(enabled)) {
            throw new EzBadParamException(
                'enabled',
                this,
                this.constructor);
        }
        if (!EzNumber.isNumber(additionalFee)) {
            throw new EzBadParamException(
                'additionalFee',
                this,
                this.constructor);
        }

        this.ezFeaturePackageId = ezFeaturePackageId;

        this.providerAddOnId = providerAddOnId;

        this.braintreeAddOnId = EzString.stringOrDefault(
            braintreeAddOnId,
            providerAddOnId);

        this.appleAddOnId = EzString.stringOrDefault(
            appleAddOnId,
            providerAddOnId);

        this.googlePlayAddOnId = EzString.stringOrDefault(
            googlePlayAddOnId,
            providerAddOnId);

        this.payPalAddOnId = EzString.stringOrDefault(
            payPalAddOnId,
            providerAddOnId);

        this.name = name;

        this.enabled = enabled;

        this.availableForSubscriptionIds = availableForSubscriptionIds;

        this.additionalFee = additionalFee;

        this.free = free;

        this.billedMonthly = billedMonthly;

        this.billedYearly = billedYearly;

        this.billedOnce = billedOnce;

        this.marketingBlurb = marketingBlurb;

        this.subscribedBlurb = EzString.stringOrDefault(
            subscribedBlurb,
            this.marketingBlurb);
    }

    /**
        @private @field
        Stores the EzFeaturePackageId associated with this EzFeaturePackageInfo data
        @type {string}
        A valid enum property value from EzFeaturePackageId
     */
    #ezFeaturePackageId = 'UNKNOWN';
    /**
        @public @property @getter
        Gets the EzFeaturePackageId associated with this EzFeaturePackageInfo data
        @returns {string}
        A valid enum property value from EzFeaturePackageId
     */
    get ezFeaturePackageId() {
        return this.#ezFeaturePackageId;
    }
    /**
        @public @property @setter
        Sets the EzFeaturePackageId associated with this EzFeaturePackageInfo data
        @param {string} ezFeaturePackageId
        A valid enum property value from EzFeaturePackageId
     */
    set ezFeaturePackageId(ezFeaturePackageId){
        if (!EzString.stringHasLength(ezFeaturePackageId)) {
            throw new EzBadParamException(
                'ezFeaturePackageId',
                this,
                this.ezFeaturePackageId);
        }

        this.#ezFeaturePackageId = ezFeaturePackageId;
    }

    /**
        @private @field
        Stores the provider's add on id associated with this EzFeaturePackageInfo data
        @type {string}
     */
    #providerAddOnId = 'UNKNOWN';
    /**
        @public @property @getter
        Gets the provider's add on id associated with this EzFeaturePackageInfo data
        @returns {string}
     */
    get providerAddOnId() {
        return this.#providerAddOnId;
    }
    /**
        @public @property @setter
        Sets the provider's add on id associated with this EzFeaturePackageInfo data
        @param {string} providerAddOnId
     */
    set providerAddOnId(providerAddOnId){
        if (!EzString.stringHasLength(providerAddOnId)) {
            throw new EzBadParamException(
                'providerAddOnId',
                this,
                this.providerAddOnId);
        }

        this.#providerAddOnId = providerAddOnId;
    }

    /**
        @private @field
        Stores the Braintree Payments provider's add on id associated with this EzFeaturePackageInfo data
        @type {string}
     */
    #braintreeAddOnId = 'UNKNOWN';
    /**
        @public @property @getter
        Gets
        @returns {string}
     */
    get braintreeAddOnId() {
        return this.#braintreeAddOnId;
    }
    /**
        @public @property @setter
        Sets
        @param {string} braintreeAddOnId
     */
    set braintreeAddOnId(braintreeAddOnId){
        if (!EzString.stringHasLength(braintreeAddOnId)) {
            throw new EzBadParamException(
                'braintreeAddOnId',
                this,
                this.braintreeAddOnId);
        }

        this.#braintreeAddOnId = braintreeAddOnId;
    }

    /**
        @private @field
        Stores the Apple provider's add on id associated with this EzFeaturePackageInfo data
        @type {string}
     */
    #appleAddOnId = 'UNKNOWN';
    /**
        @public @property @getter
        Gets
        @returns {string}
     */
    get appleAddOnId() {
        return this.#appleAddOnId;
    }
    /**
        @public @property @setter
        Sets
        @param {string} appleAddOnId
     */
    set appleAddOnId(appleAddOnId){
        if (!EzString.stringHasLength(appleAddOnId)) {
            throw new EzBadParamException(
                'appleAddOnId',
                this,
                this.appleAddOnId);
        }

        this.#appleAddOnId = appleAddOnId;
    }

    /**
        @private @field
        Stores the Google Play provider's add on id associated with this EzFeaturePackageInfo data
        @type {string}
     */
    #googlePlayAddOnId = 'UNKNOWN';
    /**
        @public @property @getter
        Gets
        @returns {string}
     */
    get googlePlayAddOnId() {
        return this.#googlePlayAddOnId;
    }
    /**
        @public @property @setter
        Sets
        @param {string} googlePlayAddOnId
     */
    set googlePlayAddOnId(googlePlayAddOnId){
        if (!EzString.stringHasLength(googlePlayAddOnId)) {
            throw new EzBadParamException(
                'googlePlayAddOnId',
                this,
                this.googlePlayAddOnId);
        }

        this.#googlePlayAddOnId = googlePlayAddOnId;
    }

    /**
        @private @field
        Stores the PayPal provider's add on id associated with this EzFeaturePackageInfo data
        @type {string}
     */
    #payPalAddOnId = 'UNKNOWN';
    /**
        @public @property @getter
        Gets
        @returns {string}
     */
    get payPallAddOnId() {
        return this.#payPalAddOnId;
    }
    /**
        @public @property @setter
        Sets
        @param {string} payPalAddOnId
     */
    set payPalAddOnId(payPalAddOnId){
        if (!EzString.stringHasLength(payPalAddOnId)) {
            throw new EzBadParamException(
                'payPalAddOnId',
                this,
                this.payPalAddOnId);
        }

        this.#payPalAddOnId = payPalAddOnId;
    }

    /**
        @private @field
        Stores the name of the subscription add on
        @type {string}
     */
    #name;
    /**
        @public @property @getter
        Gets the name of the subscription add on
        @returns {string}
     */
    get name() {
        return this.#name;
    }
    /**
        @public @property @getter
        Sets the name of the subscription add on
        @param {string} name
     */
    set name(name) {
        if (!EzString.stringHasLength(name)) {
            throw new EzBadParamException(
                'name',
                this,
                this.name);
        }

        this.#name = name;
    }

    /**
        @private @field
        Stores if the subscription add-on is enabled (aka available to be added on to a subscription)
        @type {boolean}
     */
    #enabled = false;
    /**
        @public @property @getter
        Gets if the subscription add-on is enabled (aka available to be added on to a subscription)
        @returns {string}
     */
    get enabled() {
        return this.#enabled;
    }
    /**
        @public @property @getter
        Sets if the subscription add-on is enabled (aka available to be added on to a subscription)
        @param {string} enabled
     */
    set enabled(enabled) {
        this.#enabled = EzBoolean.isTrue(enabled);
    }

    /**
        @private @field
        Stores the array of subscriptions ids that can add the feature package.
        @type {array}
     */
    #availableForSubscriptionIds = [];
    /**
        @public @property @getter
        Gets the additional fee added to the current subscription
        @returns {array}
     */
    get availableForSubscriptionIds() {
        return this.#availableForSubscriptionIds;
    }
    /**
        @public @property @getter
        Sets the additional fee added to the current subscription
        @param {array} availableForSubscriptionIds
     */
    set availableForSubscriptionIds(availableForSubscriptionIds) {
        this.#availableForSubscriptionIds = EzArray.arrayOrEmpty(availableForSubscriptionIds);
    }

    /**
        @private @field
        Stores the additional fee added to the current subscription
        @type {number}
     */
    #additionalFee = 0;
    /**
        @public @property @getter
        Gets the additional fee added to the current subscription
        @returns {number}
     */
    get additionalFee() {
        return this.#additionalFee;
    }
    /**
        @public @property @getter
        Sets the additional fee added to the current subscription
        @param {number} additionalFee
     */
    set additionalFee(additionalFee) {
        this.#additionalFee = EzNumber.numberOrZero(additionalFee);
    }

    /**
        @public @readonly @property
        Gets the additional fee blurb text for UX
        @returns {string}
     */
    get additionalFeeDisplay() {
        if (EzBoolean.isTrue(this.billedMonthly)) {
            return EzString.msg`$${this.additionalFee}/month additional fee`;
        }

        if (EzBoolean.isTrue(this.billedYearly)) {
            return EzString.msg`$${this.additionalFee}/year additional fee`;
        }

        if (EzBoolean.isTrue(this.billedOnce)) {
            return EzString.msg`One time fee of $${this.additionalFee}`;
        }

        if (EzBoolean.isTrue(this.free)) {
            return 'Free (No additional fees)';
        }

        return 'Additional Fee';
    }

    /**
        @private @field
        Stores the details of enabled features when the add-on is enabled.
        Stored as HTML
        @type {string}
     */
    #marketingBlurb = EzString.EMPTY;
    /**
        @public @property @getter
        Gets the details of enabled features when the add-on is enabled.
        @returns {string}
     */
    get marketingBlurb() {
        return this.#marketingBlurb;
    }
    /**
        @public @property @getter
        Sets the details of enabled features when the add-on is enabled.
        @param {string} marketingBlurb
     */
    set marketingBlurb(marketingBlurb) {
        this.#marketingBlurb = EzString.stringHasLength(marketingBlurb)
            ? EzHtml.build`${marketingBlurb}`
            : EzString.EMPTY;
    }

    /**
        @private @field
        Stores the details of subscribed features
        Stored as HTML
        @type {string}
     */
    #subscribedBlurb = EzString.EMPTY;
    /**
        @public @property @getter
        Gets the details of subscribed features
        @returns {string}
     */
    get subscribedBlurb() {
        return this.#subscribedBlurb;
    }
    /**
        @public @property @getter
        Sets the details of subscribed features
        @param {string} subscribedBlurb
     */
    set subscribedBlurb(subscribedBlurb) {
        this.#subscribedBlurb = EzString.stringHasLength(subscribedBlurb)
            ? EzHtml.build`${subscribedBlurb}`
            : EzString.EMPTY;
    }

    /**
        @private @field
        Stores if the feature package is free of cost or not
        @type {boolean}
     */
    #free = false;
    /**
        @public @property @getter
        Gets if the feature package is free of cost or not
        @returns {boolean}
     */
    get free() {
        return this.#free;
    }
    /**
        @public @property @getter
        Sets if the feature package is free of cost or not
        @param {boolean} free
     */
    set free(free) {
        this.#free = EzBoolean.booleanOrTrue(free);
    }

    /**
        @private @field
        Stores if the feature package is billed monthly
        @type {boolean}
     */
    #billedMonthly = true;
    /**
        @public @property @getter
        Gets if the feature package is billed monthly
        @returns {boolean}
     */
    get free() {
        return this.#billedMonthly && !this.free;
    }
    /**
        @public @property @getter
        Sets if the feature package is billed monthly
        @param {boolean} billedMonthly
     */
    set free(billedMonthly) {
        this.#billedMonthly = EzBoolean.booleanOrTrue(billedMonthly);
    }

    /**
        @private @field
        Stores if the feature package is is billed yearly
        @type {boolean}
     */
    #billedYearly = false;
    /**
        @public @property @getter
        Gets if the feature package is is billed yearly
        @returns {boolean}
     */
    get billedYearly() {
        return this.#billedYearly && !this.free;
    }
    /**
        @public @property @getter
        Sets if the feature package is is billed yearly
        @param {boolean} billedYearly
     */
    set billedYearly(billedYearly) {
        this.#billedYearly = EzBoolean.booleanOrTrue(billedYearly);
    }

    /**
        @private @field
        Stores if the feature package is billed only once
        @type {boolean}
     */
    #billedOnce = false;
    /**
        @public @property @getter
        Gets if the feature package is billed only once
        @returns {boolean}
     */
    get billedOnce() {
        return this.#billedOnce && !this.free;
    }
    /**
        @public @property @getter
        Sets if the feature package is billed only once
        @param {boolean} billedOnce
     */
    set billedOnce(billedOnce) {
        this.#billedOnce = EzBoolean.booleanOrTrue(billedOnce);
    }

    /**
        @public @method
        Determines if the feature package is supported by the provided subscriptionId.
        @param {string}
        @returns {boolean}
     */
    ezIsSubscriptionIdSupported(subscriptionId) {
        if (EzString.stringHasLength(subscriptionId)) {
            return false;
        }

        subscriptionId = subscriptionId.toLowerCase();

        if (EzArray.arrayHasLength(availableForSubscriptionIds)) {
            return false;
        }

        for (let availableForSubscriptionId of availableForSubscriptionIds) {
            if (subscriptionId === availableForSubscriptionId.toLowerCase()) {
                return true;
            }
        }

        return false;
    }

    /**
        @override
        @public @readonly @property
        Returns this instance as a JSON Object (will no longer have the getter/setter methods).
        Useful for serailization to JSON.
        @returns {object}
    */
    get asJSONObject() {
        return {
            ezFeaturePackageId: jasonObject.ezFeaturePackageId,
            details: jasonObject.details,
            additionalFee: jasonObject.additionalFee,
            enabled: jasonObject.enabled,
            name: jasonObject.name,
            free: jsonObject.free,
            billedMonthly: jsonObject.billedMonthly,
            billedyearly: jasonObject.billedYearly,
            billedOnce: jasonObject.billedOnce,
            marketingBlurb: jasonObject.marketingBlurb,
            subscribedBlurb: jasonObject.subscribedBlurb,
            providerAddOnId: jasonObject.providerAddOnId,
            braintreeAddOnId: jasonObject.braintreeAddOnId,
            appleAddOnId: jasonObject.appleAddOnId,
            googlePlayAddOnId: jasonObject.googlePlayAddOnId,
            payPalAddOnId: jasonObject.payPalAddOnId,
        };
    }

    /**
        @override
        @public @readonly @property
        Returns this instance as JSON string (no formatting)
        @returns {String}
    */
    get asJSON() {
        return super.asJSON;
    }

    /**
        @override
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

        if (!EzObject.isValid(jsonObject.ezFeaturePackageId)) {
             throw new EzBadParamException(
                'jsonObject.ezFeaturePackageId',
                this,
                this.ezFromJSONObject);
        }

        this.ezFeaturePackageId = jsonObject.ezFeaturePackageId;

        this.name = jsonObject.name;

        this.enabled = jsonObject.enabled;

        this.additionalFee = jsonObject.additionalFee;

        this.free = jsonObject.free;

        this.billedMonthly = jsonObject.billedMonthly;

        this.billedYearly = jsonObject.billedYearly;

        this.billedOnce = jsonObject.billedOnce;

        this.marketingBlurb = jsonObject.marketingBlurb;

        this.subscribedBlurb = EzString.stringOrDefault(
            jsonObject.subscribedBlurb,
            this.marketingBlurb);

        this.providerAddOnId = jasonObject.providerAddOnId;

        this.braintreeAddOnId = jasonObject.braintreeAddOnId;

        this.appleAddOnId = jasonObject.appleAddOnId;

        this.googlePlayAddOnId = jasonObject.googlePlayAddOnId;

        this.payPalAddOnId = jasonObject.payPalAddOnId;

        return this;
    }

    /**
        @override
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
}
