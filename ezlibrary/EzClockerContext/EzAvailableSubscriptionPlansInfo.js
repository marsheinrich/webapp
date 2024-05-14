import {
    EzBadParamException
} from '/ezlibrary/exceptions/EzExceptions.js';

import {
    EzObject,
    EzString
} from '/ezlibrary/helpers/EzHelpers.js';

import {
    EzSubscriptionPlanMode
} from '/ezlibrary/enums/EzEnumerations.js';

import { EzJSONSerializable } from '/ezlibrary/entities/EzJSONSerializable.js';

import { EzAvailableSubscriptionPlans } from '/ezlibrary/EzClockerContext/EzAvailableSubscriptionPlans.js';

/**
    @class
    @description
    Contains information related to the available subscription plans data
    ---------------------------------------------------------------------------
    Import with:
        import { EzAvailableSubscriptionPlansInfo } from '/ezlibrary/EzClockerContext/EzAvailableSubscriptionPlansInfo.js';
    ---------------------------------------------------------------------------
 */
export class EzAvailableSubscriptionPlansInfo extends EzJSONSerializable {
    /**
        @public @Constructor
        Creates a new instance of EzAvailableSubscriptionPlansInfo
        @param {undefined|null|object|EzAvailableSubscriptionPlans} availableSubscriptionPlans
        Default: new EzAvailableSubscriptionPlans()
        @param {undefined|null|object} activeSubscription
        Default: null
        @param {undefined|null|string} ezSubscriptionPlanMode
        A valid enum property value from EzSubscriptionPlanMode
        Default: EzSubscriptionPlanMode.MONTHLY
     */
    constructor(availableSubscriptionPlans, activeSubscription, ezSubscriptionPlanMode) {
        super();

        this.availableSubscriptionPlans = availableSubscriptionPlans;
        this.activeSubscription = activeSubscription;
        this.subscriptionPlanMode = ezSubscriptionPlanMode;
    }

    /**
        @private @Field
        Stores the available subscription plans
        @type {EzAvailableSubscriptionPlans}
     */
    #availableSubscriptionPlans = new EzAvailableSubscriptionPlans();
    /**
        @public @property @getter
        Gets the available subscription plans
        @returns {EzAvailableSubscriptionPlans}
     */
    get availableSubscriptionPlans() {
        return this.#availableSubscriptionPlans;
    }
    /**
        @public @property @Setter
        Sets the available subscription plans
        @param {object|EzAvailableSubscriptionPlans} availableSubscriptionPlans
        Default: new EzAvailableSubscriptionPlans()
     */
    set availableSubscriptionPlans(availableSubscriptionPlans) {
        if (null == availableSubscriptionPlans) {
            this.#availableSubscriptionPlans = new EzAvailableSubscriptionPlans();
        } else {
            this.#availableSubscriptionPlans.monthlyPlans = availableSubscriptionPlans.monthlyPlans;

            this.#availableSubscriptionPlans.yearlyPlans = availableSubscriptionPlans.yearlyPlans;

            this.#availableSubscriptionPlans.ready = availableSubscriptionPlans.ready;
        }
    }

    /**
        @private @Field
        Stores the active subscription
        @type {object}
     */
    #activeSubscription;
    /**
        @public @property @getter
        Gets the active subscription
        @returns {object}
     */
    get activeSubscription() {
        return this.#activeSubscription;
    }
    /**
        @public @property @Setter
        Sets the active subscription
        @param {object} activeSubscription
     */
    set activeSubscription(activeSubscription) {
        this.#activeSubscription = EzObject.assignOrNull(activeSubscription);
    }

    /**
        @private @Field
        Stores the current subscription plan mode
        @type {string}
        A valid enum property value from EzSubscriptionPlanMode
     */
    #ezSubscriptionPlanMode = EzSubscriptionPlanMode.MONTHLY;
    /**
        @public @property @getter
        Gets the current subscription plan mode
        @returns {string}
        A valid enum property value from EzSubscriptionPlanMode
     */
    get ezSubscriptionPlanMode() {
        return this.#ezSubscriptionPlanMode;
    }
    /**
        @public @property @Setter
        Sets the current subscription plan mode
        @param {string} ezSubscriptionPlanMode
        A valid enum property value from EzSubscriptionPlanMode
        Default: EzSubscriptionPlanMode.MONTHLY
     */
    set ezSubscriptionPlanMode(ezSubscriptionPlanMode) {
        this.#ezSubscriptionPlanMode = EzString.stringOrDefault(
            EzSubscriptionPlanMode.ezValueOf(ezSubscriptionPlanMode),
            EzSubscriptionPlanMode.MONTHLY);
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
            availableSubscriptionPlans: this.availableSubscriptionPlans,
            activeSubscription: this.activeSubscription,
            ezSubscriptionPlanMode: this.ezSubscriptionPlanMode
        };
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

        this.availableSubscriptionPlans = jsonObject.availableSubscriptionPlans;
        this.activeSubscription = jsonObject.activeSubscription;
        this.ezSubscriptionPlanMode = jsonObject.ezSubscriptionPlanMode;

        return this;
    }
}
