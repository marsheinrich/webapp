import { EzDateTime } from '/public/javascript/common/ez-date-time.js';

import { EzClass } from '/ezlibrary/EzClass.js';
import { EzEventEngine } from '/ezlibrary/ez-event-engine.js';

import { EzHttpHelper } from '/public/javascript/common/ezclocker-http-helper.js';
import { EzNavigation } from '/public/javascript/common/ezclocker-navigation-helper.js';

import { EzClockerContextEventName } from '/ezlibrary/EzClockerContext/EzClockerContextEventName.js';
import { EzClockerContext } from '/ezlibrary/EzClockerContext/ez-context.js';

import { EzActiveSubscription } from '/ezlibrary/entities/billing/EzActiveSubscription.js';
import { EzActiveBillingInformation } from '/ezlibrary/entities/billing/EzActiveBillingInformation.js';
import { EzActiveBillingAddress } from '/ezlibrary/entities/billing/EzActiveBillingAddress.js';
import { EzActiveCreditCard } from '/ezlibrary/entities/billing/EzActiveCreditCard.js';

/**
    ezClocker's Subscription Context
    Import with:
        import { EzSubscriptionContext } from '/ezlibrary/EzClockerContext/EzSubscriptionContext.js';

        globalThis.ezApi.ezclocker[EzSubscriptionContext.ezApiName] &&
        globalThis.ezApi.ezclocker[EzSubscriptionContext.ezApiName].ready

        document.addEventListener(
            EzSubscriptionContext.ezEventNames.onReady,
            this.#ezRegistrator);
 */
export class EzSubscriptionContext extends EzClass {
    static ezInstance = null;
    static ezApiRegistrationState = null;

    static get ezApiName() {
        return 'ezSubscriptionContext';
    }

    static get ezEventNames() {
        return {
            onSubscriptionContextLoading: EzClockerContextEventName.onSubscriptionContextLoading,
            onSubscriptionContextReady: EzClockerContextEventName.onSubscriptionContextReady,
            onSubscriptionContextAvailablePlansReady: EzClockerContextEventName.onSubscriptionContextAvailablePlansReady,
            onSubscriptionContextAvailablePlansChanged: EzClockerContextEventName.onSubscriptionContextAvailablePlansChanged,
            onSubscriptionContextAvailablePlansModeChanged: EzClockerContextEventName.onSubscriptionContextAvailablePlansModeChanged,
            onSubscriptionContextActiveSubscriptionReady: EzClockerContextEventName.onSubscriptionContextActiveSubscriptionReady,
            onSubscriptionContextActiveSubscriptionChanged: EzClockerContextEventName.onSubscriptionContextActiveSubscriptionChanged,
            onSubscriptionContextBillingAddressReady: EzClockerContextEventName.onSubscriptionContextBillingAddressReady,
            onSubscriptionContextBillingAddressChanged: EzClockerContextEventName.onSubscriptionContextBillingAddressChanged,
            onSubscriptionContextActiveCreditCardReady: EzClockerContextEventName.onSubscriptionContextActiveCreditCardReady,
            onSubscriptionContextActiveCreditCardChanged: EzClockerContextEventName.onSubscriptionContextActiveCreditCardChanged,
        };
    }

    static get ezCanRegister() {
        return 'PENDING' === EzSubscriptionContext.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
            globalThis.ezApi && globalThis.ezApi.ready &&

            globalThis.ezApi.ezclocker[EzDateTime.ezApiName] &&
            globalThis.ezApi.ezclocker[EzDateTime.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName] &&
            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzHttpHelper.ezApiName] &&
            globalThis.ezApi.ezclocker[EzHttpHelper.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzNavigation.ezApiName] &&
            globalThis.ezApi.ezclocker[EzNavigation.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzClockerContextEventName.ezApiName] &&
            globalThis.ezApi.ezclocker[EzClockerContextEventName.ezApiName].ready;
    }

    static #ezRegistrator() {
        if (!EzSubscriptionContext.ezCanRegister)  {
            return false;
        }

        ezApi.ezRegisterNewApi(
            EzSubscriptionContext,
            EzSubscriptionContext.ezApiName);
        EzSubscriptionContext.ezApiRegistrationState = 'REGISTERED';
        return true;
    }

    /*
    static {
        if (null == this.ezApiRegistrationState) {
            this.ezApiRegistrationState = 'PENDING';

            if (!this.#ezRegistrator()) {
                document.addEventListener(
                    'onEzApiReady',
                    () => {
                        if (!this.#ezRegistrator()) {

                            document.addEventListener(
                                EzDateTime.ezEventNames.onReady,
                                this.#ezRegistrator);

                            document.addEventListener(
                                EzEventEngine.ezEventNames.onReady,
                                this.#ezRegistrator);

                            document.addEventListener(
                                EzHttpHelper.ezEventNames.onReady,
                                this.#ezRegistrator);

                            document.addEventListener(
                                EzNavigation.ezEventNames.onReady,
                                this.#ezRegistrator);

                            document.addEventListener(
                                EzClockerContextEventName.ezEventNames.onReady,
                                this.#ezRegistrator);

                            document.addEventListener(
                                EzOptionsService.ezEventNames.onReady,
                                this.#ezRegistrator);
                        }
                    });
            }
        }
    }
    */

    /**
        @public @constructor
     */
    constructor() {
        super();

        this.activeSubscription = new EzActiveSubscription();
        this.activeCreditCard = new EzActiveCreditCard();
        this.activeBillingInformation = new EzActiveBillingInformation();
        this.activeBillingAddress = new EzActiveBillingAddress();
    }

    ezSubscriptionContextReady = false;

    activeSubscription = null;
    activeCreditCard = null;
    activeBillingInformation = null;
    activeBillingAddress = null;
    subscriptionPlanMode = 'UNKNOWN';
    availableSubscriptionPlans = {
        monthly: [],
        yearly: [],
    };

    /**
        @protected @method
        Initializes EzSubscriptionContext
        @returns {EzSubscriptionContext}
     */
    ezInit() {
        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzClockerContext.ezApiName,
            EzClockerContextEventName.onSubscriptionContextLoading);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzClockerContext.ezApiName,
            EzClockerContextEventName.onSubscriptionContextReady);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzClockerContext.ezApiName,
            EzClockerContextEventName.onSubscriptionContextAvailablePlansReady);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzClockerContext.ezApiName,
            EzClockerContextEventName.onSubscriptionContextAvailablePlansChanged);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzClockerContext.ezApiName,
            EzClockerContextEventName.onSubscriptionContextAvailablePlansModeChanged);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzClockerContext.ezApiName,
            EzClockerContextEventName.onSubscriptionContextActiveSubscriptionReady);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzClockerContext.ezApiName,
            EzClockerContextEventName.onSubscriptionContextActiveSubscriptionChanged);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzClockerContext.ezApiName,
            EzClockerContextEventName.onSubscriptionContextBillingAddressReady);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzClockerContext.ezApiName,
            EzClockerContextEventName.onSubscriptionContextBillingAddressChanged);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzClockerContext.ezApiName,
            EzClockerContextEventName.onSubscriptionContextActiveCreditCardReady);
        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzClockerContext.ezApiName,
            EzClockerContextEventName.onSubscriptionContextActiveCreditCardChanged);

        return EzSubscriptionContext.ezInstance;
    }
}