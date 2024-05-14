import {
    EzBillingFrequency
} from '/ezlibrary/enums/EzEnumerations.js';

import {
    EzObject,
    EzBoolean,
    EzNumber,
    EzString,
    EzArray,
    EzHtml,
    EzPromise,
    EzJson
} from '/ezlibrary/helpers/EzHelpers.js';

import { EzJSONSerializable } from '/ezlibrary/entities/EzJSONSerializable.js';

/*
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    ENGINEERING NOTES
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    Please keep this class in sync with it's Java equivalent
    com.ezclocker.domain.entities.EzSubscriptionPlan
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

/**
 * @class
 * @extends {EzJSONSerializable}
 * @description
 * Entity for subscription plan objects.
 * ---------------------------------------------------------------------------
 * Import with:
 *     import { EzSubscriptionPlan } from '/ezlibrary/entities/EzSubscriptionPlan.js';
 * ---------------------------------------------------------------------------
 */
export class EzSubscriptionPlan extends EzJSONSerializable {
    static get FREE_SUBSCRIPTION_PLAN_REAL_ID() {
        return 19;
    }

    static FREE_SUBSCRIPTION_PLAN_ID() {
        return 'ez2018.monthly.ezclocker.free';
    }

    static get FREE_SUBSCRIPTION_PLAN_NAME() {
        return 'FREE';
    }

    static get FREE_BRAINTREE_SUBSCRIPTION_PLAN_ID() {
        return 'ez2018-monthly-ezclocker-free';
    }

    static get FREE_APPLE_SUBSCRIPTION_PLAN_NAME() {
        return 'com.eznovatech.ezclocker.ezClocker.free';
    }

    static get FREE_ANDRIOD_SUBSCRIPTION_PLAN_NAME() {
        return 'ez2018.monthly.ezclocker.free';
    }

    static get REE_PAYPAL_SUBSCRIPTION_PLAN_NAME() {
        return '';
    }

    /**
     * @public @constructor
     * Creates a new instance of EzSubscriptionPlan
     * @param {undefined|null|object} subscriptionPlanJSONObject
     * A JSON object version of a subscription plan (not of type EzSubscriptionPlan)
     */
    constructor(subscriptionPlanJSONObject) {
        super();

        if (EzObject.isValid(subscriptionPlanJSONObject)) {
            this.ezFromJSONObject(subscriptionPlanJSONObject);
        }
    }

    id = EzSubscriptionPlan.FREE_SUBSCRIPTION_PLAN_REAL_ID;

    enabled = true;

    planId = EzSubscriptionPlan.FREE_SUBSCRIPTION_PLAN_ID;

    billingFrequency = EzBillingFrequency.MONTHLY;

    planVersion = 20180101;

    planLevel = 20180000;

    planIteration = 1;

    name = EzSubscriptionPlan.FREE_SUBSCRIPTION_PLAN_NAME;

    description = 'Free Plan';

    bulletPointsJson = {
        "items": [
            "Always Free",
            "One Employee",
            "Website and mobile access",
            "Intregrations"
        ]
    };

    detail = 'Free Plan: One employee, website and mobile access, integrations.';

    maximumEmployees = 1;

    apiAccess = false;

    isFreePlan = true;

    brainTreePlanName = EzSubscriptionPlan.FREE_BRAINTREE_SUBSCRIPTION_PLAN_ID;

    applePlanName = EzSubscriptionPlan.FREE_APPLE_SUBSCRIPTION_PLAN_NAME;

    appleStoreFee = 0.00;

    andriodPlanName = EzSubscriptionPlan.FREE_ANDRIOD_SUBSCRIPTION_PLAN_NAME;

    googlePlayStoreFee = 0.00;

    paypalPlanName = EzSubscriptionPlan.FREE_PAYPAL_SUBSCRIPTION_PLAN_NAME;

    dailyFee = 0.00;

    monthlyFee = 0.00;

    yearlyFee = 0.00;

    percentDiscount = 0.00;

    cashDiscount = 0.00;

    /**
     * @override
     * From class EzJSONSerializable
     * @public @readonly @property
     * Returns this instance as a JSON Object (will no longer have the getter/setter methods).
     * Useful for serailization to JSON.
     * @returns {object}
     */
    get asJSONObject() {
        return {
            id: this.id,
            enabled: this.enabled,
            planId: this.planId,
            billingFrequency: this.billingFrequency,
            planVersion: this.planVersion,
            planLevel: this.planLevel,
            planIteration: this.planIteration,
            name: this.name,
            description: this.description,
            bulletPointsJson: this.bulletPointsJson,
            detail: this.detail,
            maximumEmployees: this.maximumEmployees,
            apiAccess: this.apiAccess,
            isFreePlan: this.isFreePlan,
            brainTreePlanName: this.brainTreePlanName,
            applePlanName: this.applePlanName,
            appleStoreFee: this.appleStoreFee,
            andriodPlanName: this.andriodPlanName,
            googlePlayStoreFee: this.googlePlayStoreFee,
            paypalPlanName: this.paypalPlanName,
            dailyFee: this.dailyFee,
            monthlyFee: this.monthlyFee,
            yearlyFee: this.yearlyFee,
            percentDiscount: this.percentDiscount,
            cashDiscount: this.cashDiscount
        };
    }

    /**
     * @override
     * From class EzJSONSerializable
     * @public @method
     * Copies properties from the provided jsonObject to this instance (even if this instance does not define the property)
     * @param {Object} jsonObject
     * @returns {Object}
     * Returns this instance with the key & values from the provided jsonObject.
     */
    ezFromJSONObject(jsonObject) {
        if (EzObject.isValid(jsonObject)) {
            this.id = EzNumber.numberOrNull(jsonObject.id);

            this.enabled = EzBoolean.booleanOrFalse(jsonObject.enabled);

            this.planId = EzString.stringOrEmpty(jsonObject.planId);

            this.billingFrequency = EzBillingFrequency.ezValueOf(jsonObject.billingFrequency);

            this.planVersion = EzNumber.numberOrZero(jsonObject.planVersion);

            this.planLevel = EzNumber.numberOrZero(jsonObject.planLevel);

            this.planIteration = EzNumber.numberOrZero(jsonObject.planIteration);

            this.name = EzString.stringOrEmpty(jsonObject.name);

            this.description = EzString.stringOrEmpty(jsonObject.description);

            this.bulletPointsJson = EzObject.assignOrDefault(jsonObject.bulletPointsJson, { items: [] });

            this.detail = EzString.stringOrEmpty(jsonObject.detail);

            this.maximumEmployees = EzNumber.numberOrZero(jsonObject.maximumEmployees);

            this.apiAccess = EzBoolean.booleanOrFalse(jsonObject.apiAccess);

            this.isFreePlan = EzBoolean.booleanOrTrue(jsonObject.isFreePlan);

            this.brainTreePlanName = EzString.stringOrEmpty(jsonObject.brainTreePlanName);

            this.applePlanName = EzString.stringOrEmpty(jsonObject.applePlanName);

            this.appleStoreFee = EzNumber.numberOrZero(jsonObject.appleStoreFee);

            this.andriodPlanName = EzString.stringOrEmpty(jsonObject.andriodPlanName);

            this.googlePlayStoreFee = EzNumber.numberOrZero(jsonObject.googlePlayStoreFee);

            this.paypalPlanName = EzString.stringOrEmpty(jsonObject.paypalPlanName);

            this.dailyFee = EzNumber.numberOrZero(jsonObject.dailyFee);

            this.monthlyFee = EzNumber.numberOrZero(jsonObject.monthlyFee);

            this.yearlyFee = EzNumber.numberOrZero(jsonObject.yearlyFee);

            this.percentDiscount = EzNumber.numberOrZero(jsonObject.percentDiscount);

            this.cashDiscount = EzNumber.numberOrZero(jsonObject.cashDiscount);
        }
    }

    /**
     * @override
     * From class EzJSONSerializable
     * @public @readonly @property
     * Returns this instance as JSON string (no formatting)
     * @returns {String}
     */
    get asJSON() {
        return super.asJSON;
    }

    /**
     * @override
     * From class EzJSONSerializable
     * @public @method
     * Converts this instance into a JSON string with optional formatting.
     * @param {undefined|null|Number} indentValue
     * @param {undefined|null|Boolean} htmlDisplay
     * @returns {String}
     */
    ezToJSON(indentValue, htmlDisplay) {
        return super.ezToJSON(indentValue, htmlDisplay);
    }

    /**
     * @override
     * From class EzJSONSerializable
     * @public @method
     * Converts the provided jsonString to a JSON object and then
     * passes that object to ezFromJSONObject() to copies properties to this instance
     * (even if this instance does not define the property)
     * @param {String} jsonString
     * @returns {Object}
     * Returns this instance with the key & values from the provided json string.
     */
    ezLoadFromJson(jsonString) {
        return super.ezLoadFromJson(jsonString);
    }
}