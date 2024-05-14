import {
    EzBoolean,
} from '/ezlibrary/helpers/EzHelpers.js';

import { EzEventEngine } from '/ezlibrary/ez-event-engine.js';

/**
 * @class
 * @description
 * Stores the ready states for the EzSubscriptionPlansView
 * ---------------------------------------------------------------------------
 * Import with:
 *     import { EzSubscriptionPlansViewReadyStates } from '/ezlibrary/entities/EzSubscriptionPlansViewReadyStates.js';
 * ---------------------------------------------------------------------------
 */
export class EzSubscriptionPlansViewReadyStates {
    /**
     * @static
     * @public @readonly @property
     * Returns key/value object that defines the names of events triggered by this class.
     */
    static get ezEventNames() {
        return {
            ezOnEzSubscriptionPlansViewStateReady: 'ezOn_EzSubscriptionPlansViewReadyStates_StateReady'
        }
    }

    /**
     * @public @constructor
     * Creates a new instance of EzSubscriptionPlansViewReadyStates
     * Requires ezApi.ezclocker.ezEventEngine availability.
     */
    constructor() {
        if (!globalThis.ezApi.ezclocker[EzEventEngine.ezApiName] || EzBoolean.isFalse(globalThis.ezApi.ezclocker[EzEventEngine.ezApiName].ready)) {
            throw new EzBadStateException(
                'Expecting ezApi to provide a valid instance of EzEventEngine.',
                'Detected ezApi.ezclocker.ezEventEngine is undefined or null',
                this,
                this.constructor);
        }

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            'EzSubscriptionPlansViewReadyStates',
            EzSubscriptionPlansViewReadyStates.ezEventNames.ezOnEzSubscriptionPlansViewStateReady);
    }

    /**
     * @private @field
     * Stores if the ready state event has triggered or not
     * @type {boolean}
     */
    #ezReadyStateEventTriggered = false;

    /**
     * @private @field
     * Stores the Selected employer license ready state
     * @type {boolean}
     */
    #ezSelectedEmployerLicenseReady = false;
    /**
     * @public @property @getter
     * Gets the Selected employer license ready state
     * @returns {boolean}
     */
    get ezSelectedEmployerLicenseReady() {
        return this.#ezSelectedEmployerLicenseReady;
    }
    /**
     * @public @property @setter
     * Sets the Selected employer license ready state
     * @param {boolean} ezSelectedEmployerLicenseReady
     */
    set ezSelectedEmployerLicenseReady(ezSelectedEmployerLicenseReady) {
        this.#ezSelectedEmployerLicenseReady = EzBoolean.booleanOrFalse(ezSelectedEmployerLicenseReady);

        this.#ezCheckReadyState();
    }

    /**
     * @private @field
     * Stores the subscription context active subscription ready state
     * @type {boolean}
     */
    #ezSubscriptionContextActiveSubscriptionReady = false;
    /**
     * @public @property @getter
     * Gets the subscription context active subscription ready state
     * @returns {boolean}
     */
    get ezSubscriptionContextActiveSubscriptionReady() {
        return this.#ezSubscriptionContextActiveSubscriptionReady;
    }
    /**
     * @public @property @setter
     * Sets the subscription context active subscription ready state
     * @param {boolean} ezSubscriptionContextActiveSubscriptionReady
     */
    set ezSubscriptionContextActiveSubscriptionReady(ezSubscriptionContextActiveSubscriptionReady) {
        this.#ezSubscriptionContextActiveSubscriptionReady = EzBoolean.booleanOrFalse(ezSubscriptionContextActiveSubscriptionReady);

        this.#ezCheckReadyState();
    }

    /**
     * @private @field
     * Stores the Subscription context available plans ready state
     * @type {boolean}
     */
    #ezSubscriptionContextAvailablePlansReady = false;
    /**
     * @public @property @getter
     * Gets the Subscription context available plans ready state
     * @returns {boolean}
     */
    get ezSubscriptionContextAvailablePlansReady() {
        return this.#ezSubscriptionContextAvailablePlansReady;
    }
    /**
     * @public @property @setter
     * Sets the Subscription context available plans ready state
     * @param {boolean} ezSubscriptionContextAvailablePlansReady
     */
    set ezSubscriptionContextAvailablePlansReady(ezSubscriptionContextAvailablePlansReady) {
        this.#ezSubscriptionContextAvailablePlansReady = EzBoolean.booleanOrFalse(ezSubscriptionContextAvailablePlansReady);

        this.#ezCheckReadyState();
    }

    /**
     * @public @readonly @property
     * Gets if all ready state flags are true
     * @returns {boolean}
     */
    get isReady() {
        return EzBoolean.isTrue(this.ezSubscriptionContextActiveSubscriptionReady);
        /*
        return EzBoolean.isTrue(this.ezSelectedEmployerLicenseReady) &&
            EzBoolean.isTrue(this.ezSubscriptionContextAvailablePlansReady)
            EzBoolean.isTrue(this.ezSubscriptionContextActiveSubscriptionReady);
        */
    }

    /**
     * @private @method
     * Checks the ready state and if true triggers the state ready event.
     */
    #ezCheckReadyState() {
        if (EzBoolean.isFalse(this.#ezReadyStateEventTriggered) && EzBoolean.isTrue(this.isReady)) {
            // Only trigger this event ONCE during initial loading.
            ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                EzSubscriptionPlansViewReadyStates.ezEventNames.ezOnEzSubscriptionPlansViewStateReady,
                ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                    'EzSubscriptionPlansViewReadyStates',
                    "View State is Ready",
                    this));

            this.#ezReadyStateEventTriggered = true;
        }
    }
}