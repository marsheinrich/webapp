import {
    EzBadParamException
} from '/ezlibrary/exceptions/EzExceptions.js';

import {
    EzObject,
    EzBoolean,
    EzArray
} from '/ezlibrary/helpers/EzHelpers.js';

import { EzJSONSerializable } from '/ezlibrary/entities/EzJSONSerializable.js';

/**
    @class
    @description
    Contains information related to the available subscription plans data
    ---------------------------------------------------------------------------
    Import with:
        import { EzAvailableSubscriptionPlans } from '/ezlibrary/EzClockerContext/EzAvailableSubscriptionPlans.js';
    ---------------------------------------------------------------------------
 */
export class EzAvailableSubscriptionPlans extends EzJSONSerializable {
    /**
        @public @Constructor
        Creates a new instance of EzAvailableSubscriptionPlans
        @param {undefined|null|array} monthlyPlans
        Default: []
        @param {undefined|null|array} yearlyPlans
        Default: []
        @param {undefined|null|boolean} ready
        Default: false
     */
    constructor(monthlyPlans, yearlyPlans, ready) {
        super();

        this.monthlyPlans = monthlyPlans;
        this.yearlyPlans = yearlyPlans;
        this.ready = ready;
    }

    /**
        @private @Field
        Stores the available monthly subscription plans
        @type {array}
     */
    #monthlyPlans;
    /**
        @public @property @getter
        Gets the available monthly subscription plans
        @returns {array}
     */
    get monthlyPlans() {
        return this.#monthlyPlans;
    }
    /**
        @public @property @Setter
        Sets the available monthly subscription plans
        @param {array} monthlyPlans
     */
    set monthlyPlans(monthlyPlans) {
        this.#monthlyPlans = EzArray.arrayOrEmpty(monthlyPlans);
    }

    /**
        @private @Field
        Stores the available yearly subscription plans
        @type {array}
     */
    #yearlyPlans = [];
    /**
        @public @property @getter
        Gets the available yearly subscription plans
        @returns {array}
     */
    get yearlyPlans() {
        return this.#yearlyPlans;
    }
    /**
        @public @property @Setter
        Sets the available yearly subscription plans
        @param {array} yearlyPlans
        Default: []
     */
    set yearlyPlans(yearlyPlans) {
        this.#yearlyPlans = EzArray.arrayOrEmpty(yearlyPlans);
    }

    /**
        @private @Field
        Stores if the available subscriptions plan data is ready
        @type {boolean}
     */
    #ready = false;
    /**
        @public @property @getter
        Gets if the available subscriptions plan data is ready
        @returns {boolean}
     */
    get ready() {
        return this.#ready;
    }
    /**
        @public @property @Setter
        Sets if the available subscriptions plan data is ready
        @param {boolean} ready
        Default: false
     */
    set ready(ready) {
        this.#ready = EzBoolean.booleanOrFalse(ready);
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
            monthlyPlans: this.monthlyPlans,
            yearlyPlans: this.yearlyPlans,
            ready: this.readys
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

        this.monthlyPlans = jsonObject.monthlyPlans;
        this.yearlyPlans = jsonObject.yearlyPlans;
        this.ready = jsonObject.ready;

        return this;
    }
}
