import {
    EzBadParamException
} from '/ezlibrary/exceptions/EzExceptions.js';

import {
    EzObject,
    EzBoolean,
    EzNumber,
    EzString,
    EzArray,
    EzJson
} from '/ezlibrary/helpers/EzHelpers.js';

import {
    EzBillingFrequency
} from '/ezlibrary/enums/EzEnumerations.js';

import { EzSubscriptionPlan } from '/ezlibrary/entities/EzSubscriptionPlan.js';

import { EzSubscriptionCard } from '/secure/widgets/EzSubscriptionCard/EzSubscriptionCard.js';

/**
 * @class
 * @description
 * Class that contains all the available subscription cards
 * ---------------------------------------------------------------------------
 * Import with:
 *     import { EzSubscriptionCards } from '/secure/widgets/EzSubscriptionCard/EzSubscriptionCards.js';
 * ---------------------------------------------------------------------------
 */
export class EzSubscriptionCards {
    /**
     * @public @constructor
     * Creates a new instance of EzSubscriptionCards
     * @param {undefined|null|array} monthlySubscriptionPlans
     * @param {undefined|null|array} yearlySubscriptionPlans
     */
    constructor(monthlySubscriptionPlans = [], yearlySubscriptionPlans = []) {
        if (EzArray.hasLength(monthlySubscriptionPlans)) {
            this.ezAddSubscriptionCards(monthlySubscriptionPlans);
        }

        if (EzArray.hasLength(yearlySubscriptionPlans)) {
            this.ezAddSubscriptionCards(yearlySubscriptionPlans);
        }
    }

    /**
     * @private @field
     * Stores the EzSubsubscriptionCard instance
     * @type {array}
     */
    #ezAllSubscriptionCardsList = [];
    /**
     * @public @readonly @property
     * Gets a key/value object where key = subscription plan id and value = EzSubscriptionCard instance
     * for all subscription plan billing frequencies.
     * @returns {array}
     */
    get ezAllSubscriptionCardsList() {
        return this.#ezAllSubscriptionCardsList;
    }

    /**
     * @private @field
     * Stores a key/value object where key = subscription plan id and value = EzSubscriptionCard instance
     * for all subscription plan billing frequencies.
     * @type {object}
     */
    #ezAllSubscriptionCards = {};
    /**
     * @public @readonly @property
     * Gets a key/value object where key = subscription plan id and value = EzSubscriptionCard instance
     * for all subscription plan billing frequencies.
     * @returns {object}
     */
    get ezAllSubscriptionCards() {
        return this.#ezAllSubscriptionCards;
    }

    /**
     * @private @field
     * Stores a key/value object where key = subscription plan id and value = EzSubscriptionCard instance
     * for subscription plans with monthly billing frequencies.
     * @type {object}
     */
    #ezMonthlySubscriptionCards = {};
    /**
     * @public @readonly @property
     * Gets a key/value object where key = subscription plan id and value = EzSubscriptionCard instance
     * for subscription plans with monthly billing frequencies.
     * @returns {object}
     */
    get ezMonthlySubscriptionCards() {
        return this.#ezMonthlySubscriptionCards;
    }

    /**
     * @private @field
     * Stores a key/value object where key = subscription plan id and value = EzSubscriptionCard instance
     * for subscription plans with yearly billing frequencies.
     * @type {object}
     */
    #ezYearlySubscriptionCards = {};
    /**
     * @public @readonly @property
     * Gets a key/value object where key = subscription plan id and value = EzSubscriptionCard instance
     * for subscription plans with yearly billing frequencies.
     * @returns {object}
     */
    get ezYearlySubscriptionCards() {
        return this.#ezYearlySubscriptionCards;
    }

    /**
     * @public @method
     * Adds ezSubscriptionCards for each available subscription plan.
     * @param {array|array} subscriptionPlans
     * Array of subscription plan instances.
     * @returns {array}
     * Returns the array of EzSubscriptionCards created from the provied subscription plans.
     */
    ezAddSubscriptionCards(subscriptionPlans) {
        if (EzArray.hasLength(subscriptionPlans)) {
            subscriptionPlans.forEach(
                (subscriptionPlan) => {
                    if (EzObject.isValid(subscriptionPlan) && EzBoolean.isTrue(subscriptionPlan.enabled)) {
                        this.ezAddSubscriptionCard(subscriptionPlan);
                    }
                });
        }

        return this.ezAllSubscriptionCards;
    }

    /**
     * @public @method
     * Adds a new subscription card to the EzSubscriptionCards
     * @param {number} subscriptionPlanId
     * @returns {EzSubscriptionCard}
     */
    ezAddSubscriptionCard(subscriptionPlan) {
        if (!EzObject.isValid(subscriptionPlan)) {
            throw new EzBadParamException(
                'subscriptionPlan',
                this,
                this.ezAddSubscriptionCard);
        }

        let ezSubscriptionCard = new EzSubscriptionCard(subscriptionPlan);

        this.#ezAllSubscriptionCardsList.push(ezSubscriptionCard);

        this.#ezAllSubscriptionCards[ezSubscriptionCard.subscriptionPlan.id] = ezSubscriptionCard;

        switch (EzBillingFrequency.ezValueOf(subscriptionPlan.billingFrequency)) {
            case EzBillingFrequency.UNKNOWN:
            case EzBillingFrequency.NONE:
                this.#ezYearlySubscriptionCards[ezSubscriptionCard.subscriptionPlan.id] = ezSubscriptionCard;

                this.#ezMonthlySubscriptionCards[ezSubscriptionCard.subscriptionPlan.id] = ezSubscriptionCard;

                break;
            case EzBillingFrequency.MONTHLY:
                this.#ezMonthlySubscriptionCards[ezSubscriptionCard.subscriptionPlan.id] = ezSubscriptionCard;

                break;
            case EzBillingFrequency.YEARLY:
                this.#ezYearlySubscriptionCards[ezSubscriptionCard.subscriptionPlan.id] = ezSubscriptionCard;

                break;
            default:
                ezApi.ezclocker.ezLogger.error(
                    EzString.em`
                        Failed to categorize EzSubscriptionCard for subscription plan.
                        [Subscription plan: ${EzJson.toJson(subscriptionPlan)}]
                        [Subscription plan card: ${EzJson.toJson(ezSubscriptionCard)}`);
        }

        return ezSubscriptionCard;
    }

    /**
     * @public @method
     * Gets an existing EzSubscriptionCardId for the provided subscriptionPlanId.
     * @param {number} subscriptionPlanId
     * @returns {null|EzSubscriptionCard}
     * Returns the EzSubscriptionCard for the provided subscriptionPlanId
     * If none exists, returns null
     */
    ezGetSubscrptionCardBySubscriptionPlanId(subscriptionPlanId) {
        if (!EzNumber.isNumber(subscriptionPlanId)) {
            throw new EzBadParamException(
                'subscriptionPlanId',
                this,
                this.ezGetSubscrptionCardBySubscriptionPlanId);
        }

        if (!EzObject.hasProperty(this.#ezAllSubscriptionCards, subscriptionPlanId)) {
            return null;
        }

        return this.#ezAllSubscriptionCards[subscriptionPlanId];
    }

    /**
     * @public @method
     * Gets an existing EzSubscriptionCardId for the provided subscriptionPlanId.
     * If a matching EzSubscriptionCardId does not exist, one is created first.
     * @param {EzSubscriptionPlan} subscriptionPlanId
     * @returns {EzSubscriptionCard}
     * Returns the EzSubscriptionCard for the provided subscriptionPlanId
     */
    ezGetSubscrptionCardBySubscriptionPlan(subscriptionPlan) {
        if (!EzObject.isValid(subscriptionPlan)) {
            throw new EzBadParamException(
                'subscriptionPlan',
                this,
                this.ezGetSubscrptionCardBySubscriptionPlan);
        }

        if (!EzObject.hasProperty(this.#ezAllSubscriptionCards, subscriptionPlan.id)) {
            return this.ezAddSubscriptionCard(subscriptionPlan);
        }

        return this.#ezAllSubscriptionCards[subscriptionPlan.id];
    }
}