import {
    EzBadParamException
} from '/ezlibrary/exceptions/EzExceptions.js';

import {
    EzObject
} from '/ezlibrary/helpers/EzHelpers.js';

import { EzSubscriptionPlan } from '/ezlibrary/entities/EzSubscriptionPlan.js';

/**
 * @class
 * @description
 * Provides the Ids for the EzSubscriptionCard HTML UX
 * ---------------------------------------------------------------------------
 * Import with:
 *     import { EzSubscriptionCard } from '/secure/widgets/EzSubscriptionCard/EzSubscriptionCard.js';
 * ---------------------------------------------------------------------------
 */
export class EzSubscriptionCard {
    /**
     * @static
     * @public @readonly @property
     * Gets the EzSubscriptionCard's ID prefix
     * @returns {string}
     */
    static get EZ_SUBSCRIPTION_CARD_ID_PREFIX() {
        return 'EzAvailableezSubscriptionCard';
    }

    /**
     * @public @constructor
     * Creates a new EzSubscriptionCardId instance
     * @param {object} subscriptionPlan;
     */
    constructor(subscriptionPlan) {
        this.ezSubscriptionPlan = subscriptionPlan;
    }

    /**
     * @private @field
     * Stores the subscription plan associated with the EzSubscriptionCard
     * @type {EzSubscriptionPlan}
     */
    #ezSubscriptionPlan = new EzSubscriptionPlan();
    /**
     * @public @property @getter
     * Gets the subscription plan associated with the EzSubscriptionCard
     * @returns {EzSubscriptionPlan}
     */
    get ezSubscriptionPlan() {
        return this.#ezSubscriptionPlan;
    }
    /**
     * @public @property @setter
     * Sets the subscription plan associated with the EzSubscriptionCard
     * @param {EzSubscriptionPlan} subscriptionPlan
     */
    set ezSubscriptionPlan(subscriptionPlan) {
        if (!EzObject.isValid(subscriptionPlan)) {
            throw new EzBadParamException(
                'subscriptionPlan',
                this,
                this.subscriptionPlan);
        }

        this.#ezSubscriptionPlan = new EzSubscriptionPlan(subscriptionPlan);
    }
    /**
     * @public @property @getter
     * Gets the subscription plan associated with the EzSubscriptionCard
     * @returns {EzSubscriptionPlan}
     */
    get subscriptionPlan() {
        return this.ezSubscriptionPlan;
    }

    /**
     * @public @readonly @property
     * Gets the subscription card's HTML layout container id
     * @returns {string}
     */
    get ezSubscriptionCardLayoutContainerId() {
        return `${EzSubscriptionCard.EZ_SUBSCRIPTION_CARD_ID_PREFIX}_LayoutContainer_${this.subscriptionPlan.id}`;
    }

    /**
     * @public @readonly @property
     * Gets the subscription card's HTML card container id
     * @returns {string}
     */
    get ezSubscriptionCardContainerId() {
        return `${EzSubscriptionCard.EZ_SUBSCRIPTION_CARD_ID_PREFIX}_Container_${this.subscriptionPlan.id}`;
    }

    /**
     * @public @readonly @property
     * Gets the subscription card's HTML title container id
     * @returns {string}
     */
    get ezSubscriptionCardTitleId() {
        return `${EzSubscriptionCard.EZ_SUBSCRIPTION_CARD_ID_PREFIX}_TitleContainer_${this.subscriptionPlan.id}`;
    }

    /**
     * @public @readonly @property
     * Gets the subscription card's HTML detail container id
     * @returns {string}
     */
    get ezSubscriptionCardDetailsContainerId() {
        return `${EzSubscriptionCard.EZ_SUBSCRIPTION_CARD_ID_PREFIX}_DetailsContainer_${this.subscriptionPlan.id}`;
    }

    /**
     * @public @readonly @property
     * Gets the subscription card's HTML description id
     * @returns {string}
     */
    get ezSubscriptionCardDetailsDescriptionId() {
        return `${EzSubscriptionCard.EZ_SUBSCRIPTION_CARD_ID_PREFIX}_DetailsDescriptionContainer_${this.subscriptionPlan.id}`;
    }

    /**
     * @public @readonly @property
     * Gets the subscription card's HTML subscription button container id
     * @returns {string}
     */
    get ezSubscriptionCardSubscribeButtonContainerId() {
        return `${EzSubscriptionCard.EZ_SUBSCRIPTION_CARD_ID_PREFIX}_SubscribeButtonContainer_${this.subscriptionPlan.id}`;
    }

    /**
     * @public @readonly @property
     * Gets the subscription card's HTML subscribe button id
     * @returns {string}
     */
    get ezSubscriptionCardSubscribeButtonId() {
        return `${EzSubscriptionCard.EZ_SUBSCRIPTION_CARD_ID_PREFIX}_SubscribeButton_${this.subscriptionPlan.id}`;
    }

/**
     * @public @readonly @property
     * Gets the subscription card's HTML subscription status container id
     * @returns {string}
     */
    get ezSubscriptionStatusContainerId() {
        return `${EzSubscriptionCard.EZ_SUBSCRIPTION_CARD_ID_PREFIX}_SubscriptionStatusContainer_${this.subscriptionPlan.id}`;
    }

    /**
     * @public @property @getter
     * Gets the subscription card's HTML subscription status label od
     * @returns {string}
     */
    get ezSubscriptionStatusLabelId() {
        return `${EzSubscriptionCard.EZ_SUBSCRIPTION_CARD_ID_PREFIX}_SubscriptionStatusLabel_${this.subscriptionPlan.id}`;
    }

    /**
     * @public @method
     * Gets the subscription card's bullet point id for the provided index
     * @param {index}
     * @returns {string}
     */
    ezGenerateSubscriptionCardBulletPointIdForIndex(index) {
        return `${EzSubscriptionCard.EZ_SUBSCRIPTION_CARD_ID_PREFIX}_BulletPoint_${index}_${this.subscriptionPlan.id}`;
    }
}
